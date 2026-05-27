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

  /* ------------------------------------------------------------ NAV */
  function buildNav() {
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

  function overviewSection(o) {
    const ov = o.overview;
    return '<section class="section" aria-label="Overview">' +
      sectionTitle("Overview") +
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
    return '<section class="section" aria-label="Disease case study">' +
      sectionTitle("Disease case study") +
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
  var ID_KEY = "hbm_identity";
  var NOTES_KEY = "hbm_notes";

  function readJSON(key, fallback) {
    try { return JSON.parse(localStorage.getItem(key)) || fallback; }
    catch (e) { return fallback; }
  }
  function writeJSON(key, val) {
    try { localStorage.setItem(key, JSON.stringify(val)); } catch (e) {}
  }
  function getIdentity() { return readJSON(ID_KEY, { name: "", classCode: "" }); }
  function saveIdentity(id) { writeJSON(ID_KEY, id); }
  function getOrganNotes(organId) {
    var all = readJSON(NOTES_KEY, {});
    return all[organId] || [];
  }
  function getSectionNotes(organId, sectionKey) {
    return getOrganNotes(organId).filter(function (n) { return n.sectionKey === sectionKey; });
  }
  function addOrganNote(organId, entry) {
    var all = readJSON(NOTES_KEY, {});
    if (!all[organId]) all[organId] = [];
    all[organId].push(entry);
    writeJSON(NOTES_KEY, all);
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

  // One identity bar per page; every note gets tagged with this name + class code.
  function identityBar() {
    var id = getIdentity();
    var bar = el("section", { class: "card identitybar", "aria-label": "Your notebook details" });
    bar.innerHTML =
      '<div class="identitybar__main">' +
        '<span class="identitybar__tag">📓 Your notebook</span>' +
        '<label class="identitybar__field"><span>Name</span>' +
          '<input type="text" class="id-name" autocomplete="name" placeholder="First name" value="' + esc(id.name) + '"></label>' +
        '<label class="identitybar__field"><span>Class code</span>' +
          '<input type="text" class="id-code" placeholder="e.g. BIO-3" value="' + esc(id.classCode) + '"></label>' +
      '</div>' +
      '<p class="identitybar__hint">Fill this in once. Every note you save below is tagged with your name and class code.</p>';
    var nameEl = bar.querySelector(".id-name");
    var codeEl = bar.querySelector(".id-code");
    function persist() { saveIdentity({ name: nameEl.value.trim(), classCode: codeEl.value.trim() }); }
    nameEl.addEventListener("change", persist);
    codeEl.addEventListener("change", persist);
    return bar;
  }

  // A compact note box attached to one content section, with a guiding prompt.
  function noteCatcher(o, sectionKey, sectionLabel) {
    var prompt = notePrompt(sectionKey, o);
    var box = el("div", { class: "card notecatcher" });
    box.innerHTML =
      '<div class="notecatcher__head"><span class="notecatcher__pen" aria-hidden="true">✎</span>' +
        '<span class="notecatcher__label">Note · ' + esc(sectionLabel) + "</span></div>" +
      '<p class="notecatcher__prompt">' + esc(prompt) + "</p>" +
      '<textarea class="notecatcher__text" rows="2" placeholder="Type your answer…"></textarea>' +
      '<div class="notecatcher__actions">' +
        '<button type="button" class="notecatcher__save">Save note</button>' +
        '<span class="notecatcher__status" role="status" aria-live="polite"></span>' +
      "</div>" +
      '<ul class="notecatcher__saved"></ul>';

    var textEl = box.querySelector(".notecatcher__text");
    var saveEl = box.querySelector(".notecatcher__save");
    var statusEl = box.querySelector(".notecatcher__status");
    var savedEl = box.querySelector(".notecatcher__saved");

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
      var id = getIdentity();
      var nameInput = articleEl.querySelector(".id-name");
      var codeInput = articleEl.querySelector(".id-code");
      if (nameInput) id.name = nameInput.value.trim();
      if (codeInput) id.classCode = codeInput.value.trim();
      saveIdentity(id);

      var note = textEl.value.trim();
      if (!id.name) {
        setStatus("Add your name at the top first.", "warn");
        if (nameInput) { nameInput.focus(); nameInput.scrollIntoView({ block: "center" }); }
        return;
      }
      if (NOTES_CFG.requireClassCode && !id.classCode) {
        setStatus("Add your class code at the top first.", "warn");
        if (codeInput) { codeInput.focus(); codeInput.scrollIntoView({ block: "center" }); }
        return;
      }
      if (!note) { setStatus("Write something before saving.", "warn"); textEl.focus(); return; }

      saveEl.disabled = true;
      setStatus("Saving…");
      var payload = {
        name: id.name, classCode: id.classCode,
        organ: o.name, organId: o.id,
        section: sectionLabel, prompt: prompt,
        note: note, at: new Date().toISOString()
      };
      postNote(payload).then(function (res) {
        var sent = res.ok;
        addOrganNote(o.id, { ts: Date.now(), note: note, sectionKey: sectionKey, section: sectionLabel, sent: sent });
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

  /* hero -------------------------------------------------------------- */
  function heroHtml(o) {
    return '<header class="organ-hero">' +
      '<span class="organ-hero__emoji" aria-hidden="true">' + esc(o.emoji) + "</span>" +
      "<div>" +
        '<div class="organ-hero__eyebrow">Exhibit</div>' +
        "<h1>" + esc(o.name) + "</h1>" +
        '<p class="organ-hero__system">' + esc(o.overview.bodySystem) + "</p>" +
      "</div>" +
    "</header>";
  }

  /* ------------------------------------------------------- render */
  function renderOrgan(id) {
    const o = organById(id);

    articleEl.innerHTML = heroHtml(o);
    articleEl.appendChild(identityBar());

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
      vocabSection(o) +
      watchSection(o));

    articleEl.appendChild(noteCatcher(o, "takeaway", "Big takeaway"));

    articleEl.insertAdjacentHTML("beforeend", sourcesSection(o));

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
  function currentId() {
    const id = (location.hash || "").replace(/^#/, "");
    return organById(id).id;
  }
  window.addEventListener("hashchange", function () { renderOrgan(currentId()); });

  /* boot -------------------------------------------------------------- */
  buildNav();
  renderOrgan(currentId());
})();
