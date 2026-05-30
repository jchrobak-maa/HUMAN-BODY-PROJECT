/* =========================================================================
   HUMAN BODY MUSEUM — PRINTABLE WORKSHEETS
   =========================================================================
   Builds a print-friendly work packet for one organ (or all organs) from the
   ORGANS data, with blank lines for handwritten notes after each prompt.
   For students who are working on paper instead of a computer.
   ========================================================================= */
(function () {
  "use strict";

  var root = document.getElementById("packetRoot");
  var pick = document.getElementById("organPick");
  var printBtn = document.getElementById("printBtn");

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
  }
  function lines(n) {
    var out = '<div class="ws-lines">';
    for (var i = 0; i < n; i++) out += '<span class="ws-line"></span>';
    return out + "</div>";
  }
  function block(title, inner) {
    return '<section class="ws-block"><h2 class="ws-h2">' + esc(title) + "</h2>" + inner + "</section>";
  }

  function worksheet(o) {
    var ov = o.overview;
    var html = '<article class="ws">';

    html += '<header class="ws-head">' +
      '<h1 class="ws-title">' + esc(o.emoji) + " " + esc(o.name) + "</h1>" +
      '<p class="ws-sys">' + esc(ov.bodySystem) + "</p>" +
      '<div class="ws-id"><span>First name only: ____________________</span>' +
        "<span>Cluster: ______</span><span>Date: ____________</span></div>" +
    "</header>";

    // Overview
    html += block("Overview",
      '<dl class="ws-dl">' +
        "<dt>Location</dt><dd>" + esc(ov.location) + "</dd>" +
        "<dt>Body system</dt><dd>" + esc(ov.bodySystem) + "</dd>" +
        "<dt>Main function</dt><dd>" + esc(ov.mainFunction) + "</dd>" +
        "<dt>Why it matters</dt><dd>" + esc(ov.whyItMatters) + "</dd>" +
      "</dl>" +
      '<p class="ws-prompt">In your own words, what is the main job of the ' + esc(o.name) + ", and why does your body need it?</p>" +
      lines(3));

    // Anatomy
    var parts = o.anatomy.map(function (a) {
      return "<li><b>" + esc(a.structure) + ".</b> " + esc(a.function) + "</li>";
    }).join("");
    html += block("Anatomy — the parts",
      '<ul class="ws-ul">' + parts + "</ul>" +
      '<p class="ws-prompt">Pick one part. Name it and explain what it does:</p>' +
      lines(3));

    // Connections
    var conns = o.connections.map(function (c) {
      return "<li><b>" + esc(c.system) + ".</b> " + esc(c.detail) + "</li>";
    }).join("");
    html += block("How it works with other systems",
      '<ul class="ws-ul">' + conns + "</ul>" +
      '<p class="ws-prompt">' + esc(o.analysisPrompt) + "</p>" +
      lines(3));

    // Disease
    var d = o.disease;
    html += block("Disease case study: " + d.name,
      '<p class="ws-scn"><b>Scenario:</b> ' + esc(d.scenario) + "</p>" +
      '<dl class="ws-dl">' +
        "<dt>What's happening</dt><dd>" + esc(d.whatsHappening) + "</dd>" +
        "<dt>Symptoms</dt><dd>" + esc(d.symptoms) + "</dd>" +
        "<dt>Causes</dt><dd>" + esc(d.causes) + "</dd>" +
        "<dt>Prevention</dt><dd>" + esc(d.prevention) + "</dd>" +
        "<dt>Treatment</dt><dd>" + esc(d.treatment) + "</dd>" +
        "<dt>Public health message</dt><dd>" + esc(d.publicHealthMessage) + "</dd>" +
      "</dl>" +
      '<p class="ws-prompt">Explain ' + esc(d.name) + " in your own words: one cause and one way to prevent or treat it:</p>" +
      lines(3));

    // Reading passage (full) with note lines after each paragraph
    if (o.reading && o.reading.length) {
      var rd = o.reading.map(function (p) {
        return (p.h ? '<h3 class="ws-h3">' + esc(p.h) + "</h3>" : "") +
          '<p class="ws-read">' + esc(p.p) + "</p>" +
          '<p class="ws-prompt">Key idea in your own words:</p>' + lines(2);
      }).join("");
      html += block("In-depth reading", rd);
    }

    // Vocabulary
    var vocab = o.vocab.map(function (v) {
      return "<li><b>" + esc(v.term) + "</b> — " + esc(v.definition) + "</li>";
    }).join("");
    html += block("Key vocabulary", '<ul class="ws-ul ws-vocab">' + vocab + "</ul>");

    // Big takeaway
    html += block("Big takeaway",
      '<p class="ws-prompt">What is the single most important thing you learned about the ' + esc(o.name) + "?</p>" +
      lines(4));

    html += "</article>";
    return html;
  }

  function render(id) {
    if (id === "all") {
      root.innerHTML = ORGANS.map(worksheet).join("");
    } else {
      var o = ORGANS.find(function (x) { return x.id === id; }) || ORGANS[0];
      root.innerHTML = worksheet(o);
    }
    document.title = (id === "all" ? "All worksheets" : (ORGANS.find(function (x) { return x.id === id; }) || ORGANS[0]).name + " worksheet") + " — Human Body Museum";
  }

  // build the picker
  pick.innerHTML = '<option value="all">All organs</option>' +
    ORGANS.map(function (o) { return '<option value="' + esc(o.id) + '">' + esc(o.name) + "</option>"; }).join("");

  function currentId() {
    var h = (location.hash || "").replace(/^#/, "");
    if (h === "all") return "all";
    return (ORGANS.find(function (x) { return x.id === h; }) || ORGANS[0]).id;
  }

  pick.addEventListener("change", function () { location.hash = pick.value; });
  printBtn.addEventListener("click", function () { window.print(); });
  window.addEventListener("hashchange", function () {
    var id = currentId();
    pick.value = id;
    render(id);
  });

  var start = currentId();
  pick.value = start;
  render(start);
})();
