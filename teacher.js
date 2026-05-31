/* =========================================================================
   HUMAN BODY MUSEUM — TEACHER VIEW
   =========================================================================
   Reads student notes back out of the class Google Sheet (via a key-gated
   JSONP call to the same Apps Script web app) and groups them by student.
   The teacher key is checked server-side in Apps Script; it is never stored
   in this repo. JSONP is used to sidestep cross-origin restrictions on
   Apps Script responses.
   ========================================================================= */
(function () {
  "use strict";

  var CFG = window.NOTES_CONFIG || { endpoint: "" };
  var ENDPOINT = (CFG.endpoint || "").trim();
  var KEY_LS = "hbm_teacher_key";

  // Preferred display order for organs (from the museum data) and sections.
  var ORGAN_ORDER = (typeof ORGANS !== "undefined")
    ? ORGANS.map(function (o) { return o.name; })
    : [];
  // id -> { name, emoji } so we can label heartbeats-by-organ chips.
  var ORGAN_META = (typeof ORGANS !== "undefined")
    ? ORGANS.reduce(function (m, o) { m[o.id] = { name: o.name, emoji: o.emoji }; return m; }, {})
    : {};
  var SECTION_ORDER = ["Overview", "Anatomy", "How it works with other systems", "Disease case study", "Big takeaway"];

  var STATE = { rows: [], activity: [], activityByUser: {}, collapsed: false };

  var authEl    = document.getElementById("auth");
  var keyEl     = document.getElementById("key");
  var loadEl    = document.getElementById("load");
  var rememberEl= document.getElementById("remember");
  var authStatus= document.getElementById("authStatus");
  var dashEl    = document.getElementById("dash");
  var searchEl  = document.getElementById("search");
  var classEl   = document.getElementById("classFilter");
  var organEl   = document.getElementById("organFilter");
  var summaryEl = document.getElementById("summary");
  var studentsEl= document.getElementById("students");
  var refreshEl = document.getElementById("refresh");
  var printEl   = document.getElementById("print");
  var expandEl  = document.getElementById("expand");

  /* --------------------------------------------------------- helpers */
  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function fmt(ts) {
    if (!ts) return "";
    var d = new Date(ts);
    return isNaN(d.getTime()) ? String(ts) : d.toLocaleString();
  }
  function setAuth(msg, kind) {
    authStatus.textContent = msg || "";
    authStatus.className = "teacher-status" + (kind ? " teacher-status--" + kind : "");
  }
  function orderIndex(list, val) {
    var i = list.indexOf(val);
    return i < 0 ? list.length + 1 : i;
  }

  /* ------------------------------------------------------------ JSONP */
  function fetchNotes(key) { return jsonp(key, ""); }
  function fetchActivity(key) { return jsonp(key, "activity"); }

  function jsonp(key, dataParam) {
    return new Promise(function (resolve, reject) {
      if (!ENDPOINT) { reject(new Error("no-endpoint")); return; }
      var cb = "hbm_jsonp_" + Math.random().toString(36).slice(2);
      var script = document.createElement("script");
      var timer = setTimeout(function () { cleanup(); reject(new Error("timeout")); }, 20000);
      window[cb] = function (data) { clearTimeout(timer); cleanup(); resolve(data); };
      function cleanup() {
        try { delete window[cb]; } catch (e) { window[cb] = undefined; }
        if (script.parentNode) script.parentNode.removeChild(script);
      }
      script.onerror = function () { clearTimeout(timer); cleanup(); reject(new Error("network")); };
      var url = ENDPOINT + (ENDPOINT.indexOf("?") < 0 ? "?" : "&") +
        "key=" + encodeURIComponent(key) + "&callback=" + cb;
      if (dataParam) url += "&data=" + encodeURIComponent(dataParam);
      script.src = url;
      document.body.appendChild(script);
    });
  }

  /* ------------------------------------------------------------ load */
  function load(key) {
    setAuth("Loading…");
    fetchNotes(key).then(function (data) {
      if (!data || data.ok === false) {
        setAuth(data && data.error === "unauthorized"
          ? "That key was rejected. Double-check your teacher key."
          : "Couldn't read the notebook. Make sure the Apps Script has a doGet and is re-deployed.", "warn");
        return;
      }
      if (rememberEl.checked) { try { localStorage.setItem(KEY_LS, key); } catch (e) {} }
      else { try { localStorage.removeItem(KEY_LS); } catch (e) {} }
      STATE.rows = (data.rows || []).filter(function (r) { return r && (r.note || r.name); });
      buildFilters();
      authEl.hidden = true;
      dashEl.hidden = false;
      render();
      // Activity data is a separate read; if the Apps Script supports it,
      // pull it in the background and re-render with anti-cheating signals.
      fetchActivity(key).then(function (act) {
        if (act && act.ok) {
          STATE.activity = act.rows || [];
          groupActivity();
          render();
        }
      }).catch(function () {});
    }).catch(function (e) {
      if (e.message === "no-endpoint") setAuth("No class notebook is connected (the endpoint in config.js is blank).", "warn");
      else if (e.message === "timeout") setAuth("The notebook took too long to respond. Try Refresh.", "warn");
      else setAuth("Couldn't reach the class notebook. Check your connection and the Apps Script deployment.", "warn");
    });
  }

  /* --------------------------------------------------------- filters */
  // Cluster is normally sent on each row, but for safety (old rows, missing
  // header, etc.) we fall back to parsing the cluster letter from the username.
  function clusterFor(r) {
    var c = r.class || r.classCode || "";
    if (c) return String(c).toLowerCase();
    var m = /^student\d{1,2}([a-e])$/i.exec(r.username || r.name || "");
    return m ? m[1].toLowerCase() : "";
  }

  function groupActivity() {
    STATE.activityByUser = {};
    (STATE.activity || []).forEach(function (r) {
      var u = r.username;
      if (!u) return;
      (STATE.activityByUser[u] = STATE.activityByUser[u] || []).push(r);
    });
  }
  function formatMs(ms) {
    var n = Number(ms);
    if (!n || isNaN(n)) return "";
    if (n < 1000) return n + "ms";
    var s = Math.round(n / 1000);
    if (s < 60) return s + "s";
    var m = Math.round(s / 60);
    return m + "m";
  }
  function activitySummary(username) {
    var events = (STATE.activityByUser && STATE.activityByUser[username]) || [];
    if (!events.length) return null;
    var counts = { heartbeat: 0, blur: 0, paste: 0, "logout-auto": 0, "note-save": 0, "video-click": 0 };
    var timeByOrgan = {};
    var fastSaves = 0;
    events.forEach(function (e) {
      if (counts[e.event] != null) counts[e.event]++;
      if (e.event === "heartbeat") {
        var k = e.organ || "_home";
        timeByOrgan[k] = (timeByOrgan[k] || 0) + 1;
      }
      // A "note-save" with under 5s of typing since the first keystroke is
      // implausibly fast for a thought-out answer and is a strong copy-paste signal.
      if (e.event === "note-save") {
        var ms = Number(e.durationMs);
        if (ms > 0 && ms < 5000) fastSaves++;
      }
    });
    // What earned this student a 🚩 in the collapsed view.
    var reasons = [];
    if (counts.paste > 0) reasons.push(counts.paste + " paste" + (counts.paste === 1 ? "" : "s"));
    if (counts.blur >= 5) reasons.push(counts.blur + " tab-aways");
    if (fastSaves > 0) reasons.push(fastSaves + " very fast save" + (fastSaves === 1 ? "" : "s") + " (under 5s typing)");
    return { events: events, counts: counts, activeMin: counts.heartbeat, timeByOrgan: timeByOrgan, fastSaves: fastSaves, reasons: reasons };
  }
  function activityPanel(g) {
    var s = activitySummary(g.username);
    if (!s) return "";
    var line = "~" + s.activeMin + " min active · " +
               s.counts.paste + (s.counts.paste === 1 ? " paste" : " pastes") + " · " +
               s.counts.blur + " tab-aways · " +
               s.counts["video-click"] + (s.counts["video-click"] === 1 ? " video opened" : " videos opened") +
               (s.counts["logout-auto"] ? " · " + s.counts["logout-auto"] + " auto-logouts" : "");
    var hasFlag = s.reasons && s.reasons.length > 0;

    // Time-per-page chips, sorted by most time first.
    var organKeys = Object.keys(s.timeByOrgan).sort(function (a, b) { return s.timeByOrgan[b] - s.timeByOrgan[a]; });
    var timeChips = organKeys.map(function (k) {
      var meta = (k === "_home") ? { name: "Home", emoji: "🏠" } : (ORGAN_META[k] || { name: k, emoji: "•" });
      return '<span class="t-act__timechip">' + esc(meta.emoji) + " " + esc(meta.name) +
        " · <b>" + s.timeByOrgan[k] + "m</b></span>";
    }).join("");

    var sortedEvents = s.events.slice().sort(function (a, b) { return new Date(a.timestamp) - new Date(b.timestamp); });
    var rows = sortedEvents.map(function (e) {
      return '<li class="t-act__row">' +
        '<span class="t-act__time">' + esc(fmt(e.timestamp)) + "</span>" +
        '<span class="t-act__event t-act__event--' + esc(e.event) + '">' + esc(e.event) + "</span>" +
        (e.organ ? '<span class="t-act__organ">' + esc(e.organ) + "</span>" : "") +
        (e.section ? '<span class="t-act__section">' + esc(e.section) + "</span>" : "") +
        (e.detail ? '<span class="t-act__detail">' + esc(e.detail) + "</span>" : "") +
        (e.durationMs ? '<span class="t-act__dur">' + esc(formatMs(e.durationMs)) + "</span>" : "") +
      "</li>";
    }).join("");

    return '<details class="t-activity' + (hasFlag ? " t-activity--flag" : "") + '">' +
      '<summary class="t-activity__head">' +
        '<span class="t-activity__line">📊 Activity — ' + esc(line) + '</span>' +
        (timeChips ? '<span class="t-act__times"><b>Time per page:</b> ' + timeChips + "</span>" : "") +
      "</summary>" +
      '<ul class="t-act">' + rows + "</ul>" +
    "</details>";
  }

  function uniqueSorted(vals) {
    var seen = {};
    vals.forEach(function (v) { if (v != null && v !== "") seen[v] = true; });
    return Object.keys(seen).sort();
  }
  function buildFilters() {
    var classes = uniqueSorted(STATE.rows.map(clusterFor));
    var organs = uniqueSorted(STATE.rows.map(function (r) { return r.organ; }))
      .sort(function (a, b) { return orderIndex(ORGAN_ORDER, a) - orderIndex(ORGAN_ORDER, b); });
    classEl.innerHTML = '<option value="">All clusters</option>' +
      classes.map(function (c) {
        var label = /^[a-e]$/i.test(c) ? "Cluster " + c.toUpperCase() : c;
        return '<option value="' + esc(c) + '">' + esc(label) + "</option>";
      }).join("");
    organEl.innerHTML = '<option value="">All organs</option>' +
      organs.map(function (o) { return '<option value="' + esc(o) + '">' + esc(o) + "</option>"; }).join("");
  }

  /* ---------------------------------------------------------- render */
  // Two-level grouping: Cluster → Student → notes. Makes it easy to find a
  // class, drill into a student, and print just that student's work.
  function render() {
    var nameQ = (searchEl.value || "").trim().toLowerCase();
    var classQ = classEl.value;
    var organQ = organEl.value;

    var filtered = STATE.rows.filter(function (r) {
      var uname = (r.username || r.name || "");
      var fname = (r.firstName || "");
      var cls = clusterFor(r);
      if (nameQ && (uname + " " + fname).toLowerCase().indexOf(nameQ) < 0) return false;
      if (classQ && cls !== classQ) return false;
      if (organQ && r.organ !== organQ) return false;
      return true;
    });

    var clusters = {};
    filtered.forEach(function (r) {
      var clsKey = clusterFor(r) || "_no";
      var c = clusters[clsKey] || (clusters[clsKey] = { cls: clsKey === "_no" ? "" : clsKey, students: {} });
      var uname = r.username || r.name || "(no username)";
      var sg = c.students[uname];
      if (!sg) sg = c.students[uname] = { username: uname, firstName: r.firstName || "", cls: c.cls, rows: [] };
      if (!sg.firstName && r.firstName) sg.firstName = r.firstName;
      sg.rows.push(r);
    });

    var clusterKeys = Object.keys(clusters).sort();
    var totalStudents = 0;
    clusterKeys.forEach(function (k) { totalStudents += Object.keys(clusters[k].students).length; });

    summaryEl.textContent = totalStudents + (totalStudents === 1 ? " student · " : " students · ") +
      filtered.length + (filtered.length === 1 ? " note" : " notes");

    if (!totalStudents) {
      studentsEl.innerHTML = '<p class="teacher-empty">No notes match your filters yet.</p>';
      return;
    }

    studentsEl.innerHTML = clusterKeys.map(function (ck) {
      var c = clusters[ck];
      var sKeys = Object.keys(c.students).sort();
      var nNotes = sKeys.reduce(function (sum, sk) { return sum + c.students[sk].rows.length; }, 0);
      var label = c.cls ? "Cluster " + c.cls.toUpperCase() : "(no cluster)";
      var clusterClass = c.cls ? " cluster-" + c.cls : "";
      return '<details class="t-cluster' + clusterClass + '"' + (STATE.collapsed ? "" : " open") + ">" +
        '<summary class="t-cluster__head">' +
          '<span class="t-cluster__name">' + esc(label) + "</span>" +
          '<span class="t-cluster__meta">' + sKeys.length +
            (sKeys.length === 1 ? " student · " : " students · ") +
            nNotes + (nNotes === 1 ? " note" : " notes") + "</span>" +
        "</summary>" +
        '<div class="t-cluster__body">' + sKeys.map(function (sk) { return renderStudent(c.students[sk]); }).join("") + "</div>" +
      "</details>";
    }).join("");
  }

  function renderStudent(g) {
    var byOrgan = {};
    g.rows.forEach(function (r) {
      var on = r.organ || "(unknown)";
      if (!byOrgan[on]) byOrgan[on] = [];
      byOrgan[on].push(r);
    });
    var organs = Object.keys(byOrgan).sort(function (a, b) {
      return orderIndex(ORGAN_ORDER, a) - orderIndex(ORGAN_ORDER, b);
    });

    var body = organs.map(function (on) {
      var notes = byOrgan[on].slice().sort(function (a, b) {
        var d = orderIndex(SECTION_ORDER, a.section) - orderIndex(SECTION_ORDER, b.section);
        if (d !== 0) return d;
        return new Date(a.timestamp) - new Date(b.timestamp);
      });
      var items = notes.map(function (r) {
        return '<li class="t-note">' +
          '<div class="t-note__sec">' + esc(r.section || "Note") + "</div>" +
          (r.prompt ? '<div class="t-note__prompt">' + esc(r.prompt) + "</div>" : "") +
          '<div class="t-note__text">' + esc(r.note || "") + "</div>" +
          '<div class="t-note__time">' + esc(fmt(r.timestamp)) + "</div>" +
        "</li>";
      }).join("");
      return '<div class="t-organ"><h3 class="t-organ__name">' + esc(on) + "</h3>" +
        '<ul class="t-notes">' + items + "</ul></div>";
    }).join("");

    var openAttr = STATE.collapsed ? "" : " open";
    var clusterPill = g.cls
      ? '<span class="cluster-pill cluster-' + esc(g.cls) + '">Cluster ' + esc(String(g.cls).toUpperCase()) + "</span>"
      : '<span class="cluster-pill">(no cluster)</span>';
    var display = g.firstName
      ? esc(g.firstName) + ' <span class="t-student__first">(' + esc(g.username) + ")</span>"
      : esc(g.username);
    var act = activitySummary(g.username);
    var flagHtml = (act && act.reasons.length)
      ? ' <span class="t-student__flag" title="' + esc("Worth a closer look: " + act.reasons.join("; ")) + '">🚩 ' + act.reasons.length + "</span>"
      : "";
    var flaggedClass = (act && act.reasons.length) ? " is-flagged" : "";
    return '<details class="t-student' + flaggedClass + '"' + openAttr + ' data-username="' + esc(g.username) + '">' +
      '<summary class="t-student__head">' +
        '<span class="t-student__name">' + display + flagHtml + "</span>" +
        '<span class="t-student__meta">' + clusterPill + " · " +
          g.rows.length + (g.rows.length === 1 ? " note" : " notes") + "</span>" +
        '<button type="button" class="t-student__print" title="Print just this student\'s notes">🖨 Print</button>' +
      "</summary>" +
      '<div class="t-student__body">' + activityPanel(g) + body + "</div>" +
    "</details>";
  }

  /* ------------------------------------------------------------ wire */
  loadEl.addEventListener("click", function () {
    var key = (keyEl.value || "").trim();
    if (!key) { setAuth("Enter your teacher key first.", "warn"); keyEl.focus(); return; }
    load(key);
  });
  keyEl.addEventListener("keydown", function (e) { if (e.key === "Enter") loadEl.click(); });
  searchEl.addEventListener("input", render);
  classEl.addEventListener("change", render);
  organEl.addEventListener("change", render);
  refreshEl.addEventListener("click", function () {
    var key = (keyEl.value || "").trim() || (function () { try { return localStorage.getItem(KEY_LS) || ""; } catch (e) { return ""; } })();
    if (key) load(key);
  });
  printEl.addEventListener("click", function () { window.print(); });

  // Per-student Print: hide every other cluster/student, print, then restore.
  studentsEl.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".t-student__print");
    if (!btn) return;
    e.preventDefault();
    e.stopPropagation();
    var student = btn.closest(".t-student");
    if (!student) return;
    var cluster = student.closest(".t-cluster");
    document.querySelectorAll(".t-print-target").forEach(function (x) { x.classList.remove("t-print-target"); });
    student.open = true;
    if (cluster) cluster.open = true;
    student.classList.add("t-print-target");
    if (cluster) cluster.classList.add("t-print-target");
    document.body.classList.add("printing-one");
    setTimeout(function () { window.print(); }, 50);
  });
  function endPerStudentPrint() {
    document.body.classList.remove("printing-one");
    document.querySelectorAll(".t-print-target").forEach(function (x) { x.classList.remove("t-print-target"); });
  }
  window.addEventListener("afterprint", endPerStudentPrint);
  expandEl.addEventListener("click", function () {
    STATE.collapsed = !STATE.collapsed;
    expandEl.textContent = STATE.collapsed ? "Expand all" : "Collapse all";
    studentsEl.querySelectorAll("details.t-student, details.t-cluster").forEach(function (d) { d.open = !STATE.collapsed; });
  });

  /* ------------------------------------------------------------ boot */
  (function boot() {
    if (!ENDPOINT) { setAuth("No class notebook is connected. Add your Apps Script URL to config.js first.", "warn"); }
    var saved = "";
    try { saved = localStorage.getItem(KEY_LS) || ""; } catch (e) {}
    if (saved) { keyEl.value = saved; rememberEl.checked = true; load(saved); }
  })();
})();
