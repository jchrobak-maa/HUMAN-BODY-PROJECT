/* =========================================================================
   HUMAN BODY MUSEUM — APP
   =========================================================================
   Renders the whole portal from the ORGANS data (organs.js) and the
   per-organ illustrations (diagrams.js). No organ text is authored here;
   this file only arranges, styles, and wires up interaction.
   ========================================================================= */
(function () {
  "use strict";

  const SVG_NS = "http://www.w3.org/2000/svg";
  const FACT_ICONS = ["🔬", "💡", "📊", "✨", "🧭", "⚙️"];

  const listEl    = document.getElementById("organList");
  const articleEl = document.getElementById("organArticle");
  const navEl     = document.getElementById("organNav");
  const mainEl    = document.getElementById("organ-main");
  const toggleEl  = document.getElementById("navToggle");

  /* --------------------------------------------------------- utilities */
  function esc(str) {
    return String(str == null ? "" : str)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function el(tag, attrs, html) {
    const node = document.createElement(tag);
    if (attrs) for (const k in attrs) {
      if (k === "class") node.className = attrs[k];
      else node.setAttribute(k, attrs[k]);
    }
    if (html != null) node.innerHTML = html;
    return node;
  }

  function organById(id) {
    return ORGANS.find(function (o) { return o.id === id; }) || ORGANS[0];
  }

  /* --------------------------------------------------- read-aloud (TTS) */
  var TTS = (function () {
    var synth = window.speechSynthesis;
    var supported = !!(synth && window.SpeechSynthesisUtterance);
    var active = null;
    function label(btn, speaking) {
      var l = btn.querySelector(".listen-btn__label");
      if (l) l.textContent = speaking ? "Stop" : (btn.getAttribute("data-label") || "Listen");
      btn.classList.toggle("is-speaking", speaking);
      btn.setAttribute("aria-pressed", speaking ? "true" : "false");
    }
    function stop() {
      if (synth) synth.cancel();
      if (active) { label(active, false); active = null; }
    }
    function speak(btn) {
      if (!supported) return;
      if (active === btn) { stop(); return; }
      stop();
      var text = btn.getAttribute("data-listen") || "";
      if (!text) return;
      var u = new SpeechSynthesisUtterance(text);
      u.rate = 0.95; u.lang = "en-US";
      u.onend = u.onerror = function () { if (active === btn) { label(btn, false); active = null; } };
      active = btn; label(btn, true);
      synth.speak(u);
    }
    return { speak: speak, stop: stop, supported: supported };
  })();

  function listenButton(text, lbl) {
    if (!TTS.supported || !text) return "";
    lbl = lbl || "Listen";
    return '<button type="button" class="listen-btn" aria-pressed="false" data-label="' + esc(lbl) + '" data-listen="' + esc(text) + '">' +
      '<span class="listen-btn__icon" aria-hidden="true">🔊</span>' +
      '<span class="listen-btn__label">' + esc(lbl) + "</span></button>";
  }

  /* --------------------------------------------------- glossary tooltips */
  function escapeRegex(s) { return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); }

  // After a page renders, wrap the first occurrence of each vocab term found in
  // the prose with a hover/tap glossary tooltip. Each term is highlighted once.
  function applyGlossary(root, vocab, selector) {
    if (!vocab || !vocab.length) return;
    var sel = selector || ".overview-card__text, .takeaway p, .connection__detail, .disease__cell p, .disease__scenario, .reading__p";
    var nodes = root.querySelectorAll(sel);
    if (!nodes.length) return;
    var terms = vocab.slice().sort(function (a, b) { return b.term.length - a.term.length; });
    var used = {};
    terms.forEach(function (v) {
      var key = v.term.toLowerCase();
      var re = new RegExp("\\b" + escapeRegex(v.term) + "\\b", "i");
      for (var i = 0; i < nodes.length; i++) {
        if (used[key]) break;
        if (wrapFirst(nodes[i], re, v)) used[key] = true;
      }
    });
  }
  function wrapFirst(container, re, v) {
    var walker = document.createTreeWalker(container, NodeFilter.SHOW_TEXT, null);
    var tn;
    while ((tn = walker.nextNode())) {
      if (tn.parentNode && tn.parentNode.closest && tn.parentNode.closest(".glossary")) continue;
      var m = re.exec(tn.nodeValue);
      if (!m) continue;
      var before = tn.nodeValue.slice(0, m.index);
      var hit = tn.nodeValue.slice(m.index, m.index + m[0].length);
      var after = tn.nodeValue.slice(m.index + m[0].length);
      var span = document.createElement("span");
      span.className = "glossary";
      span.setAttribute("tabindex", "0");
      span.setAttribute("role", "button");
      span.setAttribute("aria-label", v.term + ": " + v.definition);
      span.textContent = hit;
      var tip = document.createElement("span");
      tip.className = "glossary__tip";
      tip.setAttribute("aria-hidden", "true");
      tip.innerHTML = "<b>" + esc(v.term) + "</b> — " + esc(v.definition);
      span.appendChild(tip);
      var frag = document.createDocumentFragment();
      if (before) frag.appendChild(document.createTextNode(before));
      frag.appendChild(span);
      if (after) frag.appendChild(document.createTextNode(after));
      tn.parentNode.replaceChild(frag, tn);
      return true;
    }
    return false;
  }

  /* ------------------------------------------------------------ NAV */
  function buildNav() {
    var homeLi = el("li");
    var homeBtn = el("button", { class: "organ-btn organ-btn--home", type: "button", "data-id": "home" });
    homeBtn.innerHTML =
      '<span class="organ-btn__emoji" aria-hidden="true">🏛️</span>' +
      '<span class="organ-btn__name">Home</span>';
    homeBtn.addEventListener("click", function () {
      if (location.hash === "#home") renderHome();
      else location.hash = "home";
      closeNav();
    });
    homeLi.appendChild(homeBtn);
    listEl.appendChild(homeLi);

    ORGANS.forEach(function (organ) {
      const li = el("li");
      const btn = el("button", {
        class: "organ-btn",
        type: "button",
        "data-id": organ.id,
      });
      btn.innerHTML =
        '<span class="organ-btn__emoji" aria-hidden="true">' + esc(organ.emoji) + "</span>" +
        '<span class="organ-btn__name">' + esc(organ.name) + "</span>";
      btn.addEventListener("click", function () {
        if (location.hash === "#" + organ.id) renderOrgan(organ.id);
        else location.hash = organ.id;
        closeNav();
      });
      li.appendChild(btn);
      listEl.appendChild(li);
    });
  }

  function highlightNav(id) {
    listEl.querySelectorAll(".organ-btn").forEach(function (b) {
      const on = b.getAttribute("data-id") === id;
      if (on) b.setAttribute("aria-current", "true");
      else b.removeAttribute("aria-current");
    });
  }

  /* --------------------------------------------------- section helpers */
  function sectionTitle(text) {
    return '<h2 class="section__title">' + esc(text) + "</h2>";
  }
  function sectionHead(title, readText) {
    return '<div class="section-head">' +
      '<h2 class="section__title">' + esc(title) + "</h2>" +
      listenButton(readText, "Listen") +
    "</div>";
  }

  function overviewSection(o) {
    const ov = o.overview;
    var read = "Overview of the " + o.name + ". Location: " + ov.location +
      " Body system: " + ov.bodySystem + " Main function: " + ov.mainFunction +
      " Why it matters: " + ov.whyItMatters;
    return '<section class="section" aria-label="Overview">' +
      sectionHead("Overview", read) +
      '<div class="overview-grid">' +
        overviewCard("Location", ov.location) +
        overviewCard("Body system", ov.bodySystem) +
        overviewCard("Main function", ov.mainFunction) +
        overviewCard("Why it matters", ov.whyItMatters, true) +
      "</div>" +
    "</section>";
  }
  function overviewCard(label, text, wide) {
    return '<div class="card overview-card' + (wide ? " overview-card--wide" : "") + '">' +
      '<div class="overview-card__label">' + esc(label) + "</div>" +
      '<p class="overview-card__text">' + esc(text) + "</p>" +
    "</div>";
  }

  /* anatomy section is built as DOM (for interactivity) ---------------- */
  function anatomySection(o) {
    const wrap = el("section", { class: "section", "aria-label": "Anatomy" });
    wrap.innerHTML = sectionTitle("Anatomy — explore the parts");

    const grid = el("div", { class: "anatomy" });

    /* stage + svg */
    const stage = el("div", { class: "card anatomy__stage" });
    const diagram = DIAGRAMS[o.id];
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "diagram-svg");
    svg.setAttribute("viewBox", diagram ? diagram.viewBox : "0 0 320 340");
    svg.setAttribute("role", "img");
    svg.setAttribute("aria-label", o.name + " diagram with " + o.anatomy.length + " labeled parts");

    if (diagram) {
      const artGroup = document.createElementNS(SVG_NS, "g");
      artGroup.innerHTML = diagram.art;
      svg.appendChild(artGroup);
    }

    const markerEls = [];
    const legendEls = [];

    /* reveal panel + legend (declared before handlers) */
    const reveal = el("div", { class: "card reveal", "aria-live": "polite" });
    const legend = el("ul", { class: "legend" });

    function select(i) {
      o.anatomy.forEach(function (_, j) {
        const on = j === i;
        if (markerEls[j]) markerEls[j].classList.toggle("is-active", on);
        legendEls[j].classList.toggle("is-active", on);
      });
      const part = o.anatomy[i];
      reveal.innerHTML =
        '<div class="reveal__name"><span class="reveal__badge">' + (i + 1) + "</span>" +
          esc(part.structure) + "</div>" +
        '<p class="reveal__fn">' + esc(part.function) + "</p>";
    }

    /* markers on the svg */
    if (diagram && diagram.markers) {
      o.anatomy.forEach(function (part, i) {
        const pt = diagram.markers[i];
        if (!pt) return;
        const g = document.createElementNS(SVG_NS, "g");
        g.setAttribute("class", "marker");
        g.setAttribute("tabindex", "0");
        g.setAttribute("role", "button");
        g.setAttribute("aria-label", part.structure);

        const circle = document.createElementNS(SVG_NS, "circle");
        circle.setAttribute("class", "marker__dot");
        circle.setAttribute("cx", pt.x);
        circle.setAttribute("cy", pt.y);
        circle.setAttribute("r", 13);

        const num = document.createElementNS(SVG_NS, "text");
        num.setAttribute("class", "marker__num");
        num.setAttribute("x", pt.x);
        num.setAttribute("y", pt.y);
        num.textContent = i + 1;

        g.appendChild(circle);
        g.appendChild(num);
        g.addEventListener("click", function () { select(i); });
        g.addEventListener("keydown", function (e) {
          if (e.key === "Enter" || e.key === " ") { e.preventDefault(); select(i); }
        });
        svg.appendChild(g);
        markerEls[i] = g;
      });
    }

    stage.appendChild(svg);

    /* legend list */
    o.anatomy.forEach(function (part, i) {
      const item = el("li");
      const btn = el("button", { class: "legend__item", type: "button" });
      btn.innerHTML =
        '<span class="legend__num">' + (i + 1) + "</span>" +
        '<span class="legend__name">' + esc(part.structure) + "</span>";
      btn.addEventListener("click", function () { select(i); });
      item.appendChild(btn);
      legend.appendChild(item);
      legendEls[i] = btn;
    });

    reveal.innerHTML = '<p class="reveal__hint">Click a numbered point on the diagram — or a part in the list — to reveal what it does.</p>';

    const panel = el("div", { class: "anatomy__panel" });
    panel.appendChild(reveal);
    panel.appendChild(legend);

    grid.appendChild(stage);
    grid.appendChild(panel);
    wrap.appendChild(grid);

    /* higher-level takeaway */
    const takeaway = el("div", { class: "takeaway" });
    takeaway.innerHTML = "<p><strong>The big picture:</strong> " + esc(o.higherLevel) + "</p>";
    wrap.appendChild(takeaway);

    return wrap;
  }

  /* connections + analysis ------------------------------------------- */
  function connectionsSection(o) {
    let cards = "";
    o.connections.forEach(function (c, i) {
      const isBonus = /\(bonus\)/i.test(c.system) || i >= 3;
      const label = c.system.replace(/\s*\(bonus\)\s*/i, "");
      cards +=
        '<div class="card connection">' +
          '<span class="connection__tag ' + (isBonus ? "connection__tag--bonus" : "connection__tag--req") + '">' +
            (isBonus ? "Bonus" : "Core link") + "</span>" +
          '<div class="connection__system">' + esc(label) + "</div>" +
          '<p class="connection__detail">' + esc(c.detail) + "</p>" +
        "</div>";
    });

    return '<section class="section" aria-label="Connections to other systems">' +
      sectionTitle("How it works with other systems") +
      '<div class="connections">' + cards + "</div>" +
      '<div class="analysis">' +
        '<div class="analysis__label">Think it through</div>' +
        "<p>" + esc(o.analysisPrompt) + "</p>" +
      "</div>" +
    "</section>";
  }

  /* disease ----------------------------------------------------------- */
  function diseaseSection(o) {
    const d = o.disease;
    var read = d.name + ". Scenario: " + d.scenario + " What's happening: " + d.whatsHappening +
      " Symptoms: " + d.symptoms + " Causes: " + d.causes + " Prevention: " + d.prevention +
      " Treatment: " + d.treatment + " " + d.publicHealthMessage;
    return '<section class="section" aria-label="Disease case study">' +
      sectionHead("Disease case study", read) +
      '<div class="card disease">' +
        '<div class="disease__header">' +
          '<div class="disease__eyebrow">Case study</div>' +
          '<div class="disease__name">' + esc(d.name) + "</div>" +
        "</div>" +
        '<div class="disease__scenario"><strong>Scenario:</strong> ' + esc(d.scenario) + "</div>" +
        '<div class="disease__body">' +
          diseaseCell("What's happening", d.whatsHappening, true) +
          diseaseCell("Symptoms", d.symptoms) +
          diseaseCell("Causes", d.causes) +
          diseaseCell("Prevention", d.prevention) +
          diseaseCell("Treatment", d.treatment) +
        "</div>" +
        '<div class="disease__ph">' +
          '<div class="disease__cell-label"><span class="dot"></span>Public health message</div>' +
          "<p>" + esc(d.publicHealthMessage) + "</p>" +
        "</div>" +
      "</div>" +
    "</section>";
  }
  function diseaseCell(label, text, full) {
    return '<div class="disease__cell' + (full ? " disease__cell--full" : "") + '">' +
      '<div class="disease__cell-label"><span class="dot"></span>' + esc(label) + "</div>" +
      "<p>" + esc(text) + "</p>" +
    "</div>";
  }

  /* facts / vocab / sources ------------------------------------------ */
  function factsSection(o) {
    let cards = "";
    o.funFacts.forEach(function (f, i) {
      cards += '<div class="card fact">' +
        '<span class="fact__icon" aria-hidden="true">' + FACT_ICONS[i % FACT_ICONS.length] + "</span>" +
        "<p>" + esc(f) + "</p></div>";
    });
    return '<section class="section" aria-label="Fun facts">' +
      sectionTitle("Did you know?") +
      '<div class="facts">' + cards + "</div>" +
    "</section>";
  }

  function vocabSection(o) {
    let items = "";
    o.vocab.forEach(function (v) {
      items += '<div class="card vocab__item">' +
        '<div class="vocab__term">' + esc(v.term) + "</div>" +
        '<p class="vocab__def">' + esc(v.definition) + "</p></div>";
    });
    return '<section class="section" aria-label="Vocabulary">' +
      sectionTitle("Key vocabulary") +
      '<div class="vocab">' + items + "</div>" +
    "</section>";
  }

  function watchSection(o) {
    if (!o.watch || !o.watch.length) return "";
    let cards = "";
    o.watch.forEach(function (w) {
      cards += '<a class="card watch__item" href="' + esc(w.url) + '" target="_blank" rel="noopener noreferrer">' +
        '<span class="watch__play" aria-hidden="true">▶</span>' +
        '<span class="watch__text">' +
          '<span class="watch__name">' + esc(w.name) + "</span>" +
          (w.note ? '<span class="watch__note">' + esc(w.note) + "</span>" : "") +
        "</span>" +
      "</a>";
    });
    return '<section class="section" aria-label="Watch and learn">' +
      sectionTitle("Watch & learn") +
      '<p class="watch__lead">Short videos and animations from trusted educational sources.</p>' +
      '<div class="watch">' + cards + "</div>" +
    "</section>";
  }

  function sourcesSection(o) {
    let rows = "";
    o.sources.forEach(function (s) {
      rows += '<div class="source">' +
        '<span class="source__name">' + esc(s.name) + "</span>" +
        (s.url ? '<a class="source__link" href="' + esc(s.url) + '" target="_blank" rel="noopener noreferrer">' + esc(s.url) + "</a>" : "") +
        (s.note ? '<span class="source__note">' + esc(s.note) + "</span>" : "") +
      "</div>";
    });
    return '<section class="section" aria-label="Sources">' +
      sectionTitle("Sources") +
      '<div class="sources">' + rows + "</div>" +
    "</section>";
  }

  /* ----------------------------------------------------- STUDENT NOTES */
  var NOTES_CFG = window.NOTES_CONFIG || { endpoint: "", requireClassCode: true };
  var NOTES_PREFIX = "hbm_notes::";
  var SESSION_KEY = "hbm_session";
  var IDLE_MIN = Number(NOTES_CFG.autoLogoutMinutes || 20);

  function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (e) { return fallback; }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }

  /* --- login session (soft gate; the roster lives in client code) --------
     This is NOT strong security: the valid usernames are discoverable and
     username == password. It identifies students and keeps the next student
     on a shared computer from seeing the previous one's notes. */
  function getSession() {
    try { return JSON.parse(sessionStorage.getItem(SESSION_KEY)); } catch (e) { return null; }
  }
  function setSession(s) { try { sessionStorage.setItem(SESSION_KEY, JSON.stringify(s)); } catch (e) {} }
  function clearSession() { try { sessionStorage.removeItem(SESSION_KEY); } catch (e) {} }

  // Students: student<1-12><a-e> (a-e = the five class clusters). Teacher: teacher1.
  function validateLogin(username, password) {
    var u = (username || "").trim().toLowerCase();
    var p = (password || "").trim().toLowerCase();
    if (!u || u !== p) return null;
    if (u === "teacher1") return { username: "teacher1", role: "teacher", cls: "" };
    var m = /^student([1-9]|1[0-2])([a-e])$/.exec(u);
    if (m) return { username: u, role: "student", cls: m[2] };
    return null;
  }

  // Notes are stored under a per-username key so each student only sees their own.
  function notesKey() {
    var s = getSession();
    return NOTES_PREFIX + (s ? s.username : "anon");
  }
  function getOrganNotes(organId) {
    var all = readJSON(notesKey(), {});
    return all[organId] || [];
  }
  function getSectionNotes(organId, sectionKey) {
    return getOrganNotes(organId).filter(function (n) { return n.sectionKey === sectionKey; });
  }
  function addOrganNote(organId, entry) {
    var key = notesKey();
    var all = readJSON(key, {});
    if (!all[organId]) all[organId] = [];
    all[organId].push(entry);
    writeJSON(key, all);
  }

  function postNote(payload) {
    var endpoint = (NOTES_CFG.endpoint || "").trim();
    if (!endpoint) return Promise.resolve({ ok: false, reason: "no-endpoint" });
    // text/plain (string body) keeps it a "simple request" and skips the CORS
    // preflight that Apps Script can't answer; no-cors lets the write succeed.
    return fetch(endpoint, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) })
      .then(function () { return { ok: true }; })
      .catch(function (e) { return { ok: false, reason: e.message }; });
  }

  // Levenshtein edit distance — used so that small typos still count as a
  // match against the rubric's expected concepts. Standard DP, O(a*b).
  function editDistance(a, b) {
    if (a === b) return 0;
    if (!a.length) return b.length;
    if (!b.length) return a.length;
    var prev = new Array(b.length + 1);
    for (var j = 0; j <= b.length; j++) prev[j] = j;
    for (var i = 1; i <= a.length; i++) {
      var cur = [i];
      for (var k = 1; k <= b.length; k++) {
        var cost = a.charAt(i - 1) === b.charAt(k - 1) ? 0 : 1;
        cur[k] = Math.min(cur[k - 1] + 1, prev[k] + 1, prev[k - 1] + cost);
      }
      prev = cur;
    }
    return prev[b.length];
  }
  // Length-scaled tolerance: short words must match exactly (so "the" doesn't
  // accidentally match "tie"); medium words allow 1 typo; long words allow 2.
  function fuzzyTolerance(target) {
    if (target.length >= 10) return 2;
    if (target.length >= 5) return 1;
    return 0;
  }
  // Single-word terms get an exact-substring check first (fast) and then a
  // word-by-word Levenshtein fallback. Multi-word terms ("blood sugar") stay
  // strict substring — fuzzy-matching phrases would be unreliable.
  function termInNote(lowerNote, term) {
    var lt = term.toLowerCase();
    if (lt.indexOf(" ") !== -1) return lowerNote.indexOf(lt) !== -1;
    if (lowerNote.indexOf(lt) !== -1) return true;
    var tol = fuzzyTolerance(lt);
    if (tol === 0) return false;
    var words = lowerNote.split(/[^a-zà-ÿ0-9']+/i).filter(function (w) { return w.length > 0; });
    for (var i = 0; i < words.length; i++) {
      if (Math.abs(words[i].length - lt.length) > tol) continue;
      if (editDistance(words[i], lt) <= tol) return true;
    }
    return false;
  }

  /* --- optional self-check (free, rule-based) -------------------------
     Reads rubrics from rubrics.js if present. Returns:
       { verdict: "good"|"close"|"miss"|"soft", message, hintLabel, hintSelector }
     The Check button is only shown when a rubric (or soft-note fallback)
     exists for that prompt; it never blocks Save. */
  function rubricFor(o, sectionKey) {
    var R = (typeof RUBRICS !== "undefined" && RUBRICS[o.id]) || null;
    if (R && R[sectionKey]) return R[sectionKey];
    // soft fallback for reading-paragraph notes
    var m = /^reading-(\d+)$/.exec(sectionKey);
    if (m && o.reading) {
      var idx = parseInt(m[1], 10) - 1;
      var para = o.reading[idx];
      if (para) {
        return {
          expect: [], misconceptions: [],
          hintLabel: para.h ? "the paragraph “" + para.h + "”" : "Paragraph " + (idx + 1),
          hintSelector: '[data-reading-idx="' + (idx + 1) + '"]',
          softNote: "Re-read the paragraph and compare your note. Did you capture the key idea in your own words?"
        };
      }
    }
    return null;
  }

  function checkAnswer(note, rubric) {
    if (!rubric) return null;
    // 1) Targeted misconceptions first — these give the most useful feedback.
    var mcList = rubric.misconceptions || [];
    for (var i = 0; i < mcList.length; i++) {
      if (mcList[i].trigger && mcList[i].trigger.test(note)) {
        return { verdict: "miss", message: mcList[i].hint, hintLabel: rubric.hintLabel, hintSelector: rubric.hintSelector };
      }
    }
    var lower = note.toLowerCase();
    var expect = rubric.expect || [];
    // 2) No keywords to check + soft note → friendly nudge
    if (expect.length === 0) {
      var soft = rubric.softNote || "Compare your note to the page when you're done.";
      return { verdict: "soft", message: soft, hintLabel: rubric.hintLabel, hintSelector: rubric.hintSelector };
    }
    // 3) Keyword coverage with synonym arrays — uses fuzzy matching so small
    // typos still count (e.g. "circulatry" still credits "circulatory").
    var matched = 0, missing = [];
    for (var j = 0; j < expect.length; j++) {
      var item = expect[j];
      var synonyms = Array.isArray(item) ? item : [item];
      var hit = false;
      for (var k = 0; k < synonyms.length; k++) {
        if (termInNote(lower, synonyms[k])) { hit = true; break; }
      }
      if (hit) matched++;
      else missing.push(synonyms[0]);
    }
    var ratio = matched / expect.length;
    if (ratio >= 0.75) {
      return { verdict: "good", message: "Looks good — you covered the key ideas.", hintLabel: rubric.hintLabel, hintSelector: rubric.hintSelector };
    }
    if (ratio >= 0.4) {
      return {
        verdict: "close",
        message: "Close — try mentioning " + missing.slice(0, 2).join(" and ") + ". Look at the " + rubric.hintLabel + " section.",
        hintLabel: rubric.hintLabel, hintSelector: rubric.hintSelector
      };
    }
    return {
      verdict: "miss",
      message: "Not quite — your answer should mention " + missing.slice(0, 3).join(", ") + ". Look at the " + rubric.hintLabel + " section.",
      hintLabel: rubric.hintLabel, hintSelector: rubric.hintSelector
    };
  }

  // Scroll to + pulse a section so the student can self-correct.
  function highlightTarget(selector) {
    if (!selector) return;
    var el = document.querySelector(selector);
    if (!el) return;
    try { el.scrollIntoView({ behavior: "smooth", block: "center" }); } catch (e) { el.scrollIntoView(); }
    el.classList.add("is-highlighted");
    setTimeout(function () { el.classList.remove("is-highlighted"); }, 3000);
  }

  /* --- activity logging (anti-cheating signals) -----------------------
     Fires lightweight events into a separate Activity sheet via the same
     Apps Script endpoint (discriminated by type:"activity"). Tracks:
     login/logout, heartbeats (~active time), tab blur/focus, paste, and
     time-to-save per note. */
  var lastOrgan = "";
  var pageLoadAt = Date.now();
  var sessionStartAt = null;
  var lastBlurAt = null;
  var heartbeatTimer = null;

  function postActivity(event, detail) {
    var s = getSession();
    if (!s || s.role !== "student") return;
    var endpoint = (NOTES_CFG.endpoint || "").trim();
    if (!endpoint) return;
    var d = detail || {};
    var payload = {
      type: "activity",
      event: event,
      username: s.username,
      firstName: s.firstName || "",
      class: s.cls || "",
      organ: d.organ != null ? d.organ : lastOrgan,
      section: d.section || "",
      detail: d.text || "",
      durationMs: d.ms != null ? d.ms : "",
      at: new Date().toISOString()
    };
    try { fetch(endpoint, { method: "POST", mode: "no-cors", body: JSON.stringify(payload) }).catch(function () {}); } catch (e) {}
  }

  function startHeartbeat() {
    stopHeartbeat();
    heartbeatTimer = setInterval(function () {
      if (document.visibilityState === "visible" && getSession()) {
        postActivity("heartbeat", { organ: lastOrgan });
      }
    }, 60000); // every 60s while visible
  }
  function stopHeartbeat() {
    if (heartbeatTimer) { clearInterval(heartbeatTimer); heartbeatTimer = null; }
  }

  function onLoginActivity() {
    sessionStartAt = Date.now();
    postActivity("login", { organ: lastOrgan });
    startHeartbeat();
  }
  function onLogoutActivity(auto) {
    var ms = sessionStartAt ? Date.now() - sessionStartAt : "";
    postActivity(auto ? "logout-auto" : "logout", { ms: ms, organ: lastOrgan });
    stopHeartbeat();
    sessionStartAt = null;
    lastBlurAt = null;
  }

  // visibilitychange: log blur/focus pairs
  document.addEventListener("visibilitychange", function () {
    if (!getSession()) return;
    if (document.visibilityState === "hidden") {
      lastBlurAt = Date.now();
      postActivity("blur", { organ: lastOrgan });
    } else {
      var dur = lastBlurAt ? Date.now() - lastBlurAt : "";
      postActivity("focus", { organ: lastOrgan, ms: dur });
      lastBlurAt = null;
    }
  });
  // Catch browser close / refresh with sendBeacon (more reliable than fetch).
  window.addEventListener("beforeunload", function () {
    var s = getSession();
    var endpoint = (NOTES_CFG.endpoint || "").trim();
    if (!s || s.role !== "student" || !endpoint || !navigator.sendBeacon) return;
    var ms = sessionStartAt ? Date.now() - sessionStartAt : "";
    var payload = JSON.stringify({
      type: "activity", event: "unload",
      username: s.username, firstName: s.firstName || "", class: s.cls || "",
      organ: lastOrgan, section: "", detail: "", durationMs: ms,
      at: new Date().toISOString()
    });
    try { navigator.sendBeacon(endpoint, payload); } catch (e) {}
  });

  // Guiding question shown above each section's note box.
  function notePrompt(key, o) {
    switch (key) {
      case "overview":    return "In your own words, what is the main job of the " + o.name + " — and why does your body need it?";
      case "anatomy":     return "Pick one part you clicked on the diagram. Name it and explain what it does.";
      case "connections": return o.analysisPrompt;
      case "disease":     return "Explain " + o.disease.name + " in your own words: name one cause and one way it can be prevented or treated.";
      case "takeaway":    return "What is the single most important thing you learned about the " + o.name + "?";
      default:            return "What did you notice in this section?";
    }
  }

  /* --- persistent auth bar (lives in #authBar, not re-rendered per page) --- */
  var authBarEl = document.getElementById("authBar");
  var idleTimer = null;

  function periodLabel(cls) { return cls ? "Cluster " + cls.toUpperCase() : ""; }

  function renderAuthBar(msg, kind) {
    if (!authBarEl) return;
    var s = getSession();
    if (s) {
      authBarEl.className = "authbar authbar--in";
      authBarEl.innerHTML =
        '<div class="authbar__who"><span class="authbar__dot" aria-hidden="true">✓</span> ' +
          "Logged in as <b>" + esc(s.username) + "</b>" +
          (s.firstName ? " — " + esc(s.firstName) : "") +
          (s.cls ? ' <span class="authbar__period cluster-pill cluster-' + esc(s.cls) + '">' + esc(periodLabel(s.cls)) + "</span>" : "") +
        "</div>" +
        '<button type="button" class="authbar__logout">Log out</button>';
      authBarEl.querySelector(".authbar__logout").addEventListener("click", function () { doLogout(false); });
    } else {
      authBarEl.className = "authbar authbar--out";
      authBarEl.innerHTML =
        '<form class="authbar__form" autocomplete="off">' +
          '<span class="authbar__title">🔒 Log in to take notes</span>' +
          '<label class="authbar__field authbar__field--name"><span><b>First name only</b> — no last names</span>' +
            '<input type="text" class="auth-first" placeholder="First name" autocomplete="off"></label>' +
          '<label class="authbar__field"><span>Username</span>' +
            '<input type="text" class="auth-user" placeholder="e.g. student3b" autocomplete="off"></label>' +
          '<label class="authbar__field"><span>Password</span>' +
            '<input type="password" class="auth-pass" placeholder="same as username" autocomplete="off"></label>' +
          '<button type="submit" class="authbar__login">Log in</button>' +
          '<span class="authbar__status" role="status" aria-live="polite"></span>' +
        "</form>";
      var form = authBarEl.querySelector(".authbar__form");
      var statusEl = authBarEl.querySelector(".authbar__status");
      function warn(m) { statusEl.textContent = m; statusEl.className = "authbar__status authbar__status--warn"; }
      if (msg) { statusEl.textContent = msg; statusEl.className = "authbar__status" + (kind ? " authbar__status--" + kind : ""); }
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var first = form.querySelector(".auth-first").value.trim();
        var sess = validateLogin(form.querySelector(".auth-user").value, form.querySelector(".auth-pass").value);
        if (!first) { warn("Enter your first name."); return; }
        if (!sess) { warn("That login isn't valid. Your username and password are the same (e.g. student3b)."); return; }
        sess.firstName = first.split(/\s+/)[0];   // first name only
        setSession(sess);
        resetIdle();
        onLoginActivity();
        renderAuthBar();
        route();   // re-render so the note boxes load this user's notes
      });
    }
  }

  function doLogout(auto) {
    onLogoutActivity(auto);
    clearSession();
    if (idleTimer) { clearTimeout(idleTimer); idleTimer = null; }
    if (typeof TTS !== "undefined") TTS.stop();
    renderAuthBar(
      auto ? "You were logged out automatically due to inactivity." : "You are logged out. Your saved notes are kept.",
      auto ? "warn" : "ok");
    route();
  }

  function resetIdle() {
    if (idleTimer) clearTimeout(idleTimer);
    if (getSession() && IDLE_MIN > 0) {
      idleTimer = setTimeout(function () { doLogout(true); }, IDLE_MIN * 60000);
    }
  }

  // Word bank: general topic vocab + anatomy structure names (de-duplicated).
  // Drawn from organ data so a student gets relevant spelling help without
  // the rubric's expected keywords being handed over directly.
  function wordBankFor(o) {
    var seen = {}, out = [];
    function add(raw) {
      if (!raw) return;
      // For anatomy entries like "Cardiac muscle (myocardium)" we keep both
      // the main name AND the parenthetical, since both are useful spellings.
      String(raw).split(/\s*[(),/]\s*/).forEach(function (piece) {
        var w = piece.trim();
        if (!w || w.length < 3) return;
        var key = w.toLowerCase();
        if (seen[key]) return;
        seen[key] = true;
        out.push(w);
      });
    }
    (o.vocab || []).forEach(function (v) { add(v.term); });
    (o.anatomy || []).forEach(function (a) { add(a.structure); });
    return out;
  }
  function wordBankHtml(words) {
    if (!words.length) return "";
    return '<div class="wordbank">' +
      '<span class="wordbank__label">💡 Word bank · tap to add</span>' +
      words.map(function (w) {
        return '<button type="button" class="wordbank__chip" data-word="' + esc(w) + '">' + esc(w) + "</button>";
      }).join(" ") +
    "</div>";
  }

  // A compact note box attached to one content section, with a guiding prompt.
  function noteCatcher(o, sectionKey, sectionLabel, promptOverride) {
    var prompt = promptOverride || notePrompt(sectionKey, o);
    var rubric = rubricFor(o, sectionKey);
    var bankWords = wordBankFor(o);
    var box = el("div", { class: "card notecatcher" });
    box.innerHTML =
      '<div class="notecatcher__head"><span class="notecatcher__pen" aria-hidden="true">✎</span>' +
        '<span class="notecatcher__label">Note · ' + esc(sectionLabel) + "</span></div>" +
      '<p class="notecatcher__prompt">' + esc(prompt) + "</p>" +
      wordBankHtml(bankWords) +
      '<textarea class="notecatcher__text" rows="2" spellcheck="true" placeholder="Type your answer…"></textarea>' +
      '<p class="notecatcher__spelltip">💡 See a red squiggle under a word? Right-click it (or long-press on a touchscreen) for spelling suggestions.</p>' +
      '<div class="notecatcher__actions">' +
        '<button type="button" class="notecatcher__save">Save note</button>' +
        (rubric ? '<button type="button" class="notecatcher__check" title="Optional self-check before saving">🔍 Check my answer</button>' : "") +
        '<span class="notecatcher__status" role="status" aria-live="polite"></span>' +
      "</div>" +
      (rubric ? '<div class="notecatcher__feedback" hidden role="status" aria-live="polite"></div>' : "") +
      '<ul class="notecatcher__saved"></ul>';

    var textEl = box.querySelector(".notecatcher__text");
    var saveEl = box.querySelector(".notecatcher__save");
    var statusEl = box.querySelector(".notecatcher__status");
    var savedEl = box.querySelector(".notecatcher__saved");
    var checkEl = box.querySelector(".notecatcher__check");
    var feedbackEl = box.querySelector(".notecatcher__feedback");
    var bankEl = box.querySelector(".wordbank");

    // Word-bank chips: insert the word at the cursor (or append) and refocus.
    if (bankEl) {
      bankEl.addEventListener("click", function (e) {
        var chip = e.target.closest && e.target.closest(".wordbank__chip");
        if (!chip) return;
        var word = chip.getAttribute("data-word") || "";
        var start = textEl.selectionStart, end = textEl.selectionEnd, val = textEl.value;
        var before = val.slice(0, start), after = val.slice(end);
        // Add a space before if needed; always add a space after for the next word.
        var pad = (before.length && !/\s$/.test(before)) ? " " : "";
        var insert = pad + word + " ";
        textEl.value = before + insert + after;
        var pos = (before + insert).length;
        textEl.focus();
        try { textEl.setSelectionRange(pos, pos); } catch (err) {}
      });
    }

    if (checkEl && feedbackEl) {
      checkEl.addEventListener("click", function () {
        var note = textEl.value.trim();
        if (!note) { setStatus("Type something to check first.", "warn"); textEl.focus(); return; }
        var r = checkAnswer(note, rubric);
        if (!r) return;
        feedbackEl.hidden = false;
        feedbackEl.className = "notecatcher__feedback feedback--" + r.verdict;
        var icon = r.verdict === "good" ? "✓" : r.verdict === "close" ? "⚠" : r.verdict === "miss" ? "✗" : "💡";
        var showBtn = (r.verdict !== "good" && r.hintSelector)
          ? '<button type="button" class="feedback__show" data-selector="' + esc(r.hintSelector) + '">Show me where →</button>'
          : "";
        feedbackEl.innerHTML =
          '<span class="feedback__icon" aria-hidden="true">' + icon + "</span>" +
          '<span class="feedback__text">' + esc(r.message) + "</span>" +
          showBtn;
      });
      feedbackEl.addEventListener("click", function (e) {
        var btn = e.target.closest && e.target.closest(".feedback__show");
        if (btn) highlightTarget(btn.getAttribute("data-selector"));
      });
    }

    // anti-cheating signals scoped to this note box
    var firstInputAt = null;
    var pasteCount = 0;
    textEl.addEventListener("input", function () { if (!firstInputAt) firstInputAt = Date.now(); });
    textEl.addEventListener("paste", function (e) {
      pasteCount++;
      var pasted = "";
      try { pasted = ((e.clipboardData || window.clipboardData).getData("text") || ""); } catch (err) {}
      var sample = pasted.slice(0, 80).replace(/\s+/g, " ");
      postActivity("paste", {
        organ: o.id, section: sectionLabel,
        text: "len=" + pasted.length + (sample ? " | " + sample : "")
      });
    });

    function setStatus(msg, kind) {
      statusEl.textContent = msg;
      statusEl.className = "notecatcher__status" + (kind ? " notecatcher__status--" + kind : "");
    }
    function renderSaved() {
      var notes = getSectionNotes(o.id, sectionKey);
      if (!notes.length) { savedEl.innerHTML = ""; return; }
      savedEl.innerHTML = notes.slice().reverse().map(function (n) {
        var when = new Date(n.ts).toLocaleString();
        var badge = n.sent ? '<span class="notecatcher__badge notecatcher__badge--ok">submitted</span>'
                           : '<span class="notecatcher__badge">on this device</span>';
        return '<li class="notecatcher__item"><span class="notecatcher__item-meta">' + esc(when) + " " + badge +
          '</span><span class="notecatcher__item-text">' + esc(n.note) + "</span></li>";
      }).join("");
    }
    renderSaved();

    saveEl.addEventListener("click", function () {
      var s = getSession();
      if (!s || s.role !== "student") {
        setStatus("Log in at the top of the page to save notes.", "warn");
        if (authBarEl) authBarEl.scrollIntoView({ block: "center" });
        var uel = document.querySelector(".auth-user"); if (uel) uel.focus();
        return;
      }
      var note = textEl.value.trim();
      if (!note) { setStatus("Write something before saving.", "warn"); textEl.focus(); return; }

      resetIdle();
      saveEl.disabled = true;
      setStatus("Saving…");
      var payload = {
        username: s.username, firstName: s.firstName || "", class: s.cls || "",
        organ: o.name, organId: o.id,
        section: sectionLabel, prompt: prompt,
        note: note, at: new Date().toISOString()
      };
      var typingMs = firstInputAt ? Date.now() - firstInputAt : null;
      var dwellMs = Date.now() - pageLoadAt;
      var pastesThisNote = pasteCount;
      var noteLen = note.length;
      postNote(payload).then(function (res) {
        var sent = res.ok;
        addOrganNote(o.id, { ts: Date.now(), note: note, sectionKey: sectionKey, section: sectionLabel, sent: sent });
        postActivity("note-save", {
          organ: o.id, section: sectionLabel,
          ms: typingMs != null ? typingMs : "",
          text: "len=" + noteLen + " pastes=" + pastesThisNote + " dwell=" + Math.round(dwellMs / 1000) + "s"
        });
        firstInputAt = null; pasteCount = 0;
        textEl.value = "";
        renderSaved();
        saveEl.disabled = false;
        if (sent) setStatus("Saved & submitted.", "ok");
        else if (res.reason === "no-endpoint") setStatus("Saved on this device.", "ok");
        else setStatus("Saved here (couldn't reach the class notebook).", "warn");
      });
    });

    return box;
  }

  /* ----------------------------------------------------- in-depth reading */
  function readingSection(o) {
    if (!o.reading || !o.reading.length) return null;
    var wrap = el("section", { class: "section", "aria-label": "In-depth reading" });
    var fullText = o.reading.map(function (p) { return (p.h ? p.h + ". " : "") + p.p; }).join(" ");
    wrap.innerHTML = sectionHead("In-depth reading", fullText) +
      '<p class="reading__lead">Read each paragraph, then put its key idea in your own words in the box beside it. ' +
      'Hover or tap the <span class="reading__hl">highlighted words</span> to see what they mean, or press 🔊 to hear a paragraph read aloud.</p>';
    o.reading.forEach(function (para, i) {
      wrap.appendChild(readingRow(o, para, i));
    });
    return wrap;
  }
  function readingRow(o, para, i) {
    var prose = el("div", { class: "reading__prose" });
    var figs = (typeof FIGURES !== "undefined") ? FIGURES[o.id] : null;
    var fig = figs && figs[i];
    var figHtml = "";
    if (fig) {
      figHtml = '<figure class="reading__fig">' +
        '<svg class="fig__svg" viewBox="' + esc(fig.viewBox) + '" role="img" aria-label="' + esc(fig.caption) + '">' + fig.svg + "</svg>" +
        '<figcaption class="reading__figcap">' + esc(fig.caption) +
          (fig.credit ? ' <span class="reading__figcredit">' + esc(fig.credit) + "</span>" : "") +
        "</figcaption></figure>";
    }
    prose.innerHTML =
      '<div class="reading__phead">' +
        (para.h ? '<h3 class="reading__h">' + esc(para.h) + "</h3>" : "<span></span>") +
        listenButton(para.p, "Listen") +
      "</div>" +
      '<p class="reading__p">' + esc(para.p) + "</p>" +
      figHtml;
    var row = el("div", { class: "reading__row", "data-reading-idx": String(i + 1) });
    row.appendChild(prose);
    row.appendChild(noteCatcher(o, "reading-" + (i + 1), "Deep dive ¶" + (i + 1),
      "In your own words, what is the most important idea in this paragraph?"));
    return row;
  }

  /* hero -------------------------------------------------------------- */
  function heroHtml(o) {
    return '<header class="organ-hero">' +
      '<span class="organ-hero__emoji" aria-hidden="true">' + esc(o.emoji) + "</span>" +
      '<div class="organ-hero__text">' +
        '<div class="organ-hero__eyebrow">Exhibit</div>' +
        "<h1>" + esc(o.name) + "</h1>" +
        '<p class="organ-hero__system">' + esc(o.overview.bodySystem) + "</p>" +
      "</div>" +
      '<a class="organ-hero__print" href="packet.html#' + esc(o.id) + '" target="_blank" rel="noopener">🖨 Print worksheet</a>' +
    "</header>";
  }

  /* ------------------------------------------------------- home */
  function homeFeature(icon, title, text) {
    return '<div class="card home-feature">' +
      '<span class="home-feature__icon" aria-hidden="true">' + icon + "</span>" +
      '<div><h3 class="home-feature__title">' + esc(title) + "</h3>" +
      '<p class="home-feature__text">' + esc(text) + "</p></div></div>";
  }

  function renderHome() {
    TTS.stop();
    lastOrgan = ""; pageLoadAt = Date.now();
    var grid = ORGANS.map(function (o) {
      return '<a class="home-organ" href="#' + esc(o.id) + '">' +
        '<span class="home-organ__emoji" aria-hidden="true">' + esc(o.emoji) + "</span>" +
        '<span class="home-organ__name">' + esc(o.name) + "</span></a>";
    }).join("");

    var teacherLink = '<a href="teacher.html">Teacher view</a>';

    articleEl.innerHTML =
      '<section class="home">' +
        '<header class="home-hero">' +
          '<p class="home-hero__eyebrow">Welcome to the</p>' +
          '<h1 class="home-hero__title">Human Body Museum</h1>' +
          '<p class="home-hero__lead">A hands-on tour of the organs that keep you alive. For each organ you can explore how it is built, what it does, how it teams up with the rest of the body, and what happens when something goes wrong — and you can take notes as you learn.</p>' +
        "</header>" +

        '<section class="home-block home-directions">' +
          '<h2 class="home-directions__title">For students — start here</h2>' +
          '<p class="home-directions__intro"><strong>This is the first step of your Organ Museum presentation project. You will use the research and notes you collect here to build an infographic about your assigned organ.</strong></p>' +
          '<ol class="home-directions__steps">' +
            '<li><b>Log in</b> at the top of the page with your assigned username. Your password is the same as your username.</li>' +
            '<li><b>Type your first name only</b> (no last names) in the login box.</li>' +
            '<li><b>Find your assigned organ</b> in the menu on the left.</li>' +
            '<li><b>Read each section</b>, click the numbered parts on the diagram to learn what they do, and watch a video.</li>' +
            '<li><b>Answer the note prompts</b> beside each section. Your notes save automatically for your teacher to see.</li>' +
          "</ol>" +
        "</section>" +

        '<section class="home-block">' +
          sectionTitle("What's inside each exhibit") +
          '<div class="home-features">' +
            homeFeature("🔍", "Overview", "Where the organ sits, the body system it belongs to, and why it matters.") +
            homeFeature("🫀", "Interactive diagram", "Click the numbered parts of the organ to reveal what each structure does.") +
            homeFeature("🔗", "System connections", "See how the organ works together with the other systems around it.") +
            homeFeature("🩺", "Disease case study", "A real patient scenario, what's happening, and how it's prevented and treated.") +
            homeFeature("▶", "Watch & learn", "Short, trusted videos from Khan Academy and KidsHealth — no YouTube.") +
            homeFeature("✎", "Take notes", "Answer guided prompts in each section and save them to your class notebook.") +
          "</div>" +
        "</section>" +

        '<section class="home-block">' +
          sectionTitle("Your exhibit list") +
          '<div class="home-grid">' + grid + "</div>" +
        "</section>" +

        '<section class="home-block">' +
          '<div class="home-audience">' +
            '<div class="card home-audience__col">' +
              '<h3 class="home-audience__title">For teachers</h3>' +
              "<p>Every note students save flows into one place. Open the " + teacherLink +
              " to read all responses grouped by cluster and student, filter by class, and print them.</p>" +
            "</div>" +
          "</div>" +
        "</section>" +
      "</section>";

    highlightNav("home");
    document.title = "Human Body Museum — Explore the organs of the human body";
    mainEl.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "auto" });
    mainEl.focus({ preventScroll: true });
  }

  /* ------------------------------------------------------- render */
  function renderOrgan(id) {
    const o = organById(id);
    TTS.stop();
    lastOrgan = o.id; pageLoadAt = Date.now();

    articleEl.innerHTML = heroHtml(o);

    articleEl.insertAdjacentHTML("beforeend", overviewSection(o));
    articleEl.appendChild(noteCatcher(o, "overview", "Overview"));

    articleEl.appendChild(anatomySection(o));
    articleEl.appendChild(noteCatcher(o, "anatomy", "Anatomy"));

    articleEl.insertAdjacentHTML("beforeend", connectionsSection(o));
    articleEl.appendChild(noteCatcher(o, "connections", "How it works with other systems"));

    articleEl.insertAdjacentHTML("beforeend", diseaseSection(o));
    articleEl.appendChild(noteCatcher(o, "disease", "Disease case study"));

    articleEl.insertAdjacentHTML("beforeend",
      factsSection(o) +
      vocabSection(o));

    var reading = readingSection(o);
    if (reading) articleEl.appendChild(reading);

    articleEl.insertAdjacentHTML("beforeend", watchSection(o));

    articleEl.appendChild(noteCatcher(o, "takeaway", "Big takeaway"));

    articleEl.insertAdjacentHTML("beforeend", sourcesSection(o));

    // Glossary: highlight each term once in the main prose, and (independently)
    // once inside the reading passage so definitions are available while reading.
    applyGlossary(articleEl, o.vocab, ".overview-card__text, .takeaway p, .connection__detail, .disease__cell p, .disease__scenario");
    if (reading) applyGlossary(reading, o.vocab, ".reading__p");

    highlightNav(o.id);
    document.title = o.name + " — Human Body Museum";
    mainEl.scrollTop = 0;
    window.scrollTo({ top: 0, behavior: "auto" });
    mainEl.focus({ preventScroll: true });
  }

  /* mobile nav -------------------------------------------------------- */
  let scrim;
  function openNav() {
    navEl.classList.add("is-open");
    toggleEl.setAttribute("aria-expanded", "true");
    if (!scrim) {
      scrim = el("div", { class: "nav-scrim" });
      scrim.addEventListener("click", closeNav);
      document.body.appendChild(scrim);
    }
    requestAnimationFrame(function () { scrim.classList.add("is-open"); });
  }
  function closeNav() {
    navEl.classList.remove("is-open");
    toggleEl.setAttribute("aria-expanded", "false");
    if (scrim) scrim.classList.remove("is-open");
  }
  toggleEl.addEventListener("click", function () {
    if (navEl.classList.contains("is-open")) closeNav();
    else openNav();
  });

  /* routing ----------------------------------------------------------- */
  function route() {
    const key = (location.hash || "").replace(/^#/, "");
    if (!key || key === "home") { renderHome(); return; }
    renderOrgan(organById(key).id);
  }
  window.addEventListener("hashchange", route);

  /* read-aloud + glossary interactions (event delegation) ------------- */
  document.addEventListener("click", function (e) {
    var btn = e.target.closest && e.target.closest(".listen-btn");
    if (btn) { e.preventDefault(); TTS.speak(btn); return; }
    var watch = e.target.closest && e.target.closest(".watch__item");
    if (watch) {
      // Log the external-video click for the teacher's activity panel.
      // The link still opens (target=_blank) — we just record it on the way out.
      var name = (watch.querySelector(".watch__name") || {}).textContent || "";
      var url = watch.getAttribute("href") || "";
      postActivity("video-click", {
        organ: lastOrgan,
        section: "Watch & learn",
        text: name + " | " + url
      });
      // do not preventDefault — let the anchor open the video
    }
    var g = e.target.closest && e.target.closest(".glossary");
    document.querySelectorAll(".glossary.is-open").forEach(function (x) { if (x !== g) x.classList.remove("is-open"); });
    if (g) g.classList.toggle("is-open");
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { TTS.stop(); document.querySelectorAll(".glossary.is-open").forEach(function (x) { x.classList.remove("is-open"); }); }
    var g = e.target.closest && e.target.closest(".glossary");
    if (g && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); g.classList.toggle("is-open"); }
  });

  /* auto-logout on inactivity (and on browser close, via sessionStorage) */
  ["click", "keydown", "touchstart", "scroll"].forEach(function (ev) {
    document.addEventListener(ev, function () { if (getSession()) resetIdle(); }, { passive: true });
  });

  /* boot -------------------------------------------------------------- */
  buildNav();
  renderAuthBar();
  resetIdle();
  // resume activity heartbeat if a session survived a refresh
  if (getSession()) { if (!sessionStartAt) sessionStartAt = Date.now(); startHeartbeat(); }
  route();
})();
