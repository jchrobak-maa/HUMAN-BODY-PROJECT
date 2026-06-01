# Content Schema — `content.js`

> `content.js` is the **single source of truth** for everything students see. Editing this one file changes the whole site. Claude Code (in the new session) will generate this for you from your topic and subtopic list; this doc is a reference so you (or a colleague) can understand and tweak the file later.

## Top-level shape

```js
const CONTENT = [
  { /* subtopic 1 */ },
  { /* subtopic 2 */ },
  // … one object per subtopic the students can pick from
];
```

## Per-subtopic object

```js
{
  id: "vesuvius",                 // short URL slug (lowercase, no spaces)
  name: "Mount Vesuvius",         // display name
  emoji: "🌋",                    // shown in the picker + page header

  overview: {
    location: "On the Bay of Naples, Italy.",
    bodySystem: "Stratovolcano (composite volcano).",    // category/type
    mainFunction: "Releases magma, gases, and ash...",   // the topic's "what it does"
    whyItMatters: "It's one of the most dangerous volcanoes in the world..."
  },

  anatomy: [                      // array of labeled parts
    { structure: "Magma chamber", function: "Reservoir of molten rock under pressure." },
    { structure: "Conduit",       function: "Channel that carries magma upward." },
    // …
  ],
  higherLevel: "Each part contributes to how Vesuvius stores and releases magma.",

  connections: [                  // 3–4 ways this subtopic relates to other things
    { system: "Tectonics",   detail: "Sits on the boundary of the African and Eurasian plates." },
    { system: "Climate",     detail: "Eruptions inject sulfur into the atmosphere…" },
    { system: "Human history", detail: "Buried Pompeii and Herculaneum in 79 CE…" },
    { system: "Tourism (bonus)", detail: "Drives the local economy today." }
  ],
  analysisPrompt: "What would happen if Vesuvius and the populated area below couldn't communicate? For example, if no monitoring or warning systems existed…",

  disease: {                      // case study (any kind of real-world scenario)
    name: "The 79 CE Eruption",
    scenario: "A young Roman in Pompeii feels the ground shake on August 24…",
    whatsHappening: "Vesuvius is in a Plinian eruption…",
    symptoms: "Earthquakes, ash falling, pyroclastic flows…",   // observable warning signs
    causes: "Magma pressure built up over centuries…",
    prevention: "Modern: real-time seismic monitoring, evacuation plans…",
    treatment: "Once eruption begins: rapid evacuation, shelter, medical care…",
    publicHealthMessage: "Living near a volcano means knowing the warning signs."
  },

  funFacts: [
    "Vesuvius is the only active volcano on the European mainland.",
    "Over 600,000 people live in its red zone today.",
    // 3–5 short, surprising facts
  ],

  vocab: [
    { term: "Magma",       definition: "molten rock beneath the Earth's surface." },
    { term: "Pyroclastic", definition: "a fast-moving current of hot gas and volcanic material." },
    // grade-appropriate definitions — these become hover tooltips on the page
  ],

  sources: [
    { name: "USGS Volcano Hazards Program", url: "https://www.usgs.gov/programs/VHP", note: "" },
    { name: "Smithsonian Global Volcanism", url: "https://volcano.si.edu", note: "" }
  ],

  watch: [                        // educational VIDEO links (no YouTube)
    { name: "Khan Academy — Volcanoes", url: "https://www.khanacademy.org/...", note: "Short overview video." }
  ],

  reading: [                      // in-depth passage, ~5 paragraphs
    { h: "A mountain that explodes",  p: "Mount Vesuvius is a stratovolcano…" },
    { h: "How an eruption happens",   p: "Beneath the volcano sits a magma chamber…" },
    { h: "August 24, 79 CE",          p: "Pliny the Younger watched from across the bay…" },
    { h: "Monitoring today",          p: "Scientists track seismic activity, ground swelling…" },
    { h: "Why we keep watching",      p: "Six hundred thousand people live in the red zone…" }
  ]
}
```

### Field-by-field notes

| Field | Required | What it powers |
|---|---|---|
| `id`, `name`, `emoji` | yes | URL slug, page header, sidebar nav, subtopic picker |
| `overview.*` | yes | Overview section + the "Why it matters" callout used as the takeaway target |
| `anatomy` | yes | Interactive labeled diagram + reveal panel + per-paragraph "structure" terms |
| `higherLevel` | yes | The teal "Big picture" callout under the diagram |
| `connections` | yes (3 required + 1 optional "bonus") | "How it works with other systems" cards |
| `analysisPrompt` | yes | Drives the **"How it works" note prompt** verbatim — write a good open-ended question per subtopic |
| `disease.*` | yes | Case study card (rename internally if you like — it's still `disease` in the schema) |
| `funFacts` | yes (3–5) | "Did you know?" grid |
| `vocab` | yes (4–8) | Key vocabulary cards + powers the hover glossary tooltips |
| `sources` | yes (3–5) | Sources section |
| `watch` | optional | Watch & learn cards. Always non-YouTube. Verify URLs before adding. |
| `reading` | optional but recommended | "In-depth reading" section with per-paragraph note boxes |

## Companion files

`content.js` ships alongside three smaller files that are subtopic-keyed:

### `rubrics.js` — answer-check rubrics

```js
const RUBRICS = {
  vesuvius: {
    overview: {
      expect: [
        "stratovolcano",
        ["magma", "lava"],          // synonyms — ANY match counts
        ["Naples", "Italy"],
        ["dangerous", "active"]
      ],
      misconceptions: [
        { trigger: /vesuvius.*extinct|extinct.*vesuvius/i,
          hint: "Vesuvius isn't extinct — it's active and still erupts occasionally. Its last eruption was 1944." }
      ],
      hintLabel: "Overview",
      hintSelector: ".overview-grid"
    },
    anatomy: { /* … */ },
    connections: { /* … */ },
    disease: { /* … */ },
    takeaway: {
      expect: [], misconceptions: [],
      hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — one complete sentence on the most important idea about Vesuvius."
    }
  },
  // … one block per subtopic
};
```

**Rules of thumb when writing rubrics:**
- `expect` items can be a string OR an array of synonyms. 75%+ match → green ✓, 40–75% → amber ⚠, below → red ✗.
- `misconceptions` are tested FIRST and override the score — put the strongest wrong-pattern triggers there. The hint string is what the student actually sees.
- Each `hintSelector` should be a stable, unique CSS selector pointing at the on-page element to scroll-and-pulse.

### `diagrams.js` — the interactive labeled diagrams

```js
const DIAGRAMS = {
  vesuvius: {
    viewBox: "0 0 320 320",
    art: `<g>… your inline SVG markup here …</g>`,
    markers: [
      { x: 160, y: 60 },   // pin 1 → maps to anatomy[0]
      { x: 180, y: 180 },  // pin 2 → maps to anatomy[1]
      // one marker per anatomy entry, in the same order
    ]
  }
};
```

Numbered pins on the SVG must line up 1:1 with the `anatomy` array — pin N reveals `anatomy[N].function`. Schematic SVGs are easier to draw than realistic ones and read better in print.

### `figures.js` — concept illustrations for reading paragraphs (optional)

```js
const FIGURES = {
  vesuvius: {
    1: {                            // attaches to reading[1] (0-indexed)
      viewBox: "0 0 340 180",
      svg: `… inline SVG …`,
      caption: "How a stratovolcano builds up alternating layers of ash and lava."
    }
  }
};
```

One figure per subtopic is plenty. Skip subtopics where a clear concept diagram isn't obvious.

## Style + content principles

- **Don't invent facts.** Paraphrase from reputable sources you can cite (NIH, NASA, USGS, Smithsonian, etc.). Always have the teacher proofread.
- **Match the requested grade level** — the reading passages especially. Use short paragraphs, concrete examples, and define vocab inline.
- **Keep `analysisPrompt` real** — it's the question students see in the "How it works with other systems" note box. Make it open-ended and require synthesis.
- **Vocab terms become tooltips.** Pick 4–8 terms per subtopic that genuinely appear in your reading and matter to the topic.
