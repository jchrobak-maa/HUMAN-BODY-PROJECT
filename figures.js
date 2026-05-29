/* =========================================================================
   HUMAN BODY MUSEUM — READING FIGURES
   =========================================================================
   Concept illustrations for the in-depth reading passages. These are our own
   simple SVG schematics (no external images, no licensing concerns). Each is
   attached to a reading paragraph by its 0-based index:

     FIGURES[organId][paragraphIndex] = { viewBox, svg, caption, credit? }

   The renderer draws the SVG and caption below that paragraph. `credit` is
   optional and only needed if a Creative-Commons/public-domain image is ever
   added later (it would show an attribution line).
   ========================================================================= */
const FIGURES = {
  /* ----------------------------------------------------------- HEART */
  heart: {
    3: {
      viewBox: "0 0 340 185",
      caption: "Blood travels in a loop: the heart sends oxygen-poor blood (blue) to the lungs, then pumps the oxygen-rich blood (red) it gets back out to the body.",
      svg: `<g font-family="Inter, sans-serif" font-size="13" text-anchor="middle">
        <rect x="18" y="58" width="78" height="78" rx="10" fill="#efe3d6" stroke="#cdbfa3" stroke-width="2"/>
        <text x="57" y="101" font-weight="600" fill="#20242b">Body</text>
        <rect x="131" y="58" width="78" height="78" rx="10" fill="#d07882" stroke="#a23d49" stroke-width="2"/>
        <text x="170" y="101" font-weight="700" fill="#ffffff">Heart</text>
        <rect x="244" y="58" width="78" height="78" rx="10" fill="#dfeceb" stroke="#9cc6cd" stroke-width="2"/>
        <text x="283" y="101" font-weight="600" fill="#20242b">Lungs</text>
        <g stroke="#b23a48" stroke-width="4" fill="none">
          <line x1="244" y1="40" x2="213" y2="40"/><line x1="131" y1="40" x2="100" y2="40"/>
        </g>
        <polygon points="205,40 216,34 216,46" fill="#b23a48"/>
        <polygon points="92,40 103,34 103,46" fill="#b23a48"/>
        <text x="170" y="30" font-size="11" fill="#b23a48" font-weight="700">oxygen-rich blood</text>
        <g stroke="#3f6f8f" stroke-width="4" fill="none">
          <line x1="96" y1="154" x2="127" y2="154"/><line x1="209" y1="154" x2="240" y2="154"/>
        </g>
        <polygon points="135,154 124,148 124,160" fill="#3f6f8f"/>
        <polygon points="248,154 237,148 237,160" fill="#3f6f8f"/>
        <text x="170" y="172" font-size="11" fill="#3f6f8f" font-weight="700">oxygen-poor blood</text>
      </g>`,
    },
  },

  /* ----------------------------------------------------------- BRAIN */
  brain: {
    1: {
      viewBox: "0 0 340 150",
      caption: "A neuron carries a message as an electrical signal: it comes in through the branching dendrites, travels along the axon, and passes to the next cell at the tips.",
      svg: `<g font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
        <g stroke="#c98c80" stroke-width="3" fill="none" stroke-linecap="round">
          <path d="M70 78 L40 54"/><path d="M70 78 L36 78"/><path d="M70 86 L40 108"/><path d="M78 92 L52 116"/>
        </g>
        <circle cx="86" cy="82" r="22" fill="#e7b7ad" stroke="#c98c80" stroke-width="2"/>
        <circle cx="86" cy="82" r="8" fill="#b9756a"/>
        <line x1="108" y1="82" x2="250" y2="82" stroke="#c98c80" stroke-width="6"/>
        <g fill="#f0cbb4" stroke="#d6a98e" stroke-width="1.5">
          <ellipse cx="140" cy="82" rx="14" ry="9"/><ellipse cx="180" cy="82" rx="14" ry="9"/><ellipse cx="220" cy="82" rx="14" ry="9"/>
        </g>
        <g stroke="#c98c80" stroke-width="3" fill="none" stroke-linecap="round">
          <path d="M250 82 L280 64"/><path d="M250 82 L284 82"/><path d="M250 82 L280 100"/>
        </g>
        <line x1="96" y1="44" x2="244" y2="44" stroke="#2f6f72" stroke-width="3"/>
        <polygon points="252,44 241,38 241,50" fill="#2f6f72"/>
        <text x="168" y="36" font-size="11" fill="#2f6f72" font-weight="700">signal travels this way →</text>
        <text x="86" y="128" fill="#20242b">cell body</text>
        <text x="196" y="128" fill="#20242b">axon</text>
      </g>`,
    },
  },

  /* ------------------------------------------------------------ LUNG */
  lung: {
    2: {
      viewBox: "0 0 340 180",
      caption: "Inside each alveolus, oxygen (O₂) moves into the blood in the capillary, and carbon dioxide (CO₂) moves out of the blood to be breathed away.",
      svg: `<g font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
        <circle cx="105" cy="95" r="58" fill="#fdeef0" stroke="#e79aa0" stroke-width="3"/>
        <text x="105" y="55" font-size="11" fill="#c66f76" font-weight="700">alveolus (air sac)</text>
        <path d="M170 35 C235 50 235 140 170 155" fill="none" stroke="#b23a48" stroke-width="16" opacity=".85"/>
        <text x="262" y="92" font-size="11" fill="#b23a48" font-weight="700">blood in</text>
        <text x="262" y="107" font-size="11" fill="#b23a48" font-weight="700">capillary</text>
        <line x1="118" y1="82" x2="172" y2="74" stroke="#3f6f8f" stroke-width="3"/>
        <polygon points="180,73 169,69 171,80" fill="#3f6f8f"/>
        <text x="120" y="74" font-size="13" fill="#3f6f8f" font-weight="700">O₂</text>
        <line x1="172" y1="116" x2="118" y2="124" stroke="#7a7f87" stroke-width="3"/>
        <polygon points="110,125 121,121 119,132" fill="#7a7f87"/>
        <text x="150" y="150" font-size="13" fill="#7a7f87" font-weight="700">CO₂</text>
      </g>`,
    },
  },

  /* ---------------------------------------------------------- KIDNEY */
  kidney: {
    1: {
      viewBox: "0 0 340 172",
      caption: "Each nephron filters the blood: waste and extra water are pulled out as urine, while the cleaned blood flows back to the body.",
      svg: `<g font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
        <rect x="12" y="68" width="74" height="44" rx="8" fill="#f6e3e2" stroke="#e0a9a9" stroke-width="2"/>
        <text x="49" y="86" font-size="11" fill="#a23d49" font-weight="700">blood</text>
        <text x="49" y="101" font-size="11" fill="#a23d49" font-weight="700">+ waste</text>
        <line x1="86" y1="90" x2="118" y2="90" stroke="#8a93a0" stroke-width="3"/><polygon points="126,90 115,84 115,96" fill="#8a93a0"/>
        <path d="M128 58 L198 58 L170 112 L156 112 Z" fill="#e9d4c9" stroke="#bd8d35" stroke-width="2"/>
        <text x="163" y="46" font-size="11" fill="#bd8d35" font-weight="700">nephron filter</text>
        <line x1="196" y1="74" x2="240" y2="62" stroke="#b23a48" stroke-width="3"/><polygon points="248,60 237,58 240,69" fill="#b23a48"/>
        <rect x="250" y="44" width="84" height="34" rx="8" fill="#f6e3e2" stroke="#e0a9a9" stroke-width="2"/>
        <text x="292" y="65" font-size="11" fill="#a23d49" font-weight="700">clean blood</text>
        <line x1="163" y1="112" x2="163" y2="138" stroke="#c2a23a" stroke-width="3"/><polygon points="163,146 157,135 169,135" fill="#c2a23a"/>
        <rect x="128" y="146" width="70" height="24" rx="8" fill="#f5ebd6" stroke="#d8bb63" stroke-width="2"/>
        <text x="163" y="162" font-size="11" fill="#9a7b1e" font-weight="700">urine</text>
      </g>`,
    },
  },

  /* ----------------------------------------------------------- LIVER */
  liver: {
    3: {
      viewBox: "0 0 340 162",
      caption: "The liver makes bile, which is stored in the gallbladder and released into the small intestine to help break down fats.",
      svg: `<g font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
        <path d="M20 48 C90 28 168 32 200 54 C206 78 150 92 90 88 C50 84 24 68 20 48 Z" fill="#7a3b32" stroke="#5e2c25" stroke-width="2"/>
        <text x="108" y="60" fill="#ffffff" font-size="11" font-weight="700">liver makes bile</text>
        <path d="M150 90 C150 108 150 116 150 124" fill="none" stroke="#c2a23a" stroke-width="5"/>
        <ellipse cx="150" cy="138" rx="26" ry="16" fill="#5e8d4e" stroke="#456b39" stroke-width="2"/>
        <text x="150" y="142" fill="#ffffff" font-size="10" font-weight="700">gallbladder</text>
        <line x1="176" y1="138" x2="226" y2="138" stroke="#c2a23a" stroke-width="4"/><polygon points="234,138 223,132 223,144" fill="#c2a23a"/>
        <text x="276" y="110" font-size="10.5" fill="#9a7b1e" font-weight="700">bile digests fats</text>
        <rect x="236" y="118" width="92" height="40" rx="10" fill="#e79aa0" stroke="#c66f76" stroke-width="2"/>
        <text x="282" y="135" font-size="10.5" fill="#a23d49" font-weight="700">small</text>
        <text x="282" y="149" font-size="10.5" fill="#a23d49" font-weight="700">intestine</text>
      </g>`,
    },
  },

  /* --------------------------------------------------------- STOMACH */
  stomach: {
    2: {
      viewBox: "0 0 340 150",
      caption: "A layer of mucus protects the stomach wall, so the strong acid digests food instead of the stomach itself.",
      svg: `<g font-family="Inter, sans-serif" font-size="11">
        <rect x="40" y="26" width="260" height="28" fill="#e3a394" stroke="#cf8c7c" stroke-width="2"/>
        <text x="170" y="44" text-anchor="middle" fill="#7a3b32" font-weight="700">stomach wall</text>
        <rect x="40" y="54" width="260" height="18" fill="#f5e6c8" stroke="#d8bb63" stroke-width="2"/>
        <text x="170" y="67" text-anchor="middle" fill="#9a7b1e" font-weight="700">protective mucus layer</text>
        <rect x="40" y="72" width="260" height="50" fill="#fdeef0" stroke="#e79aa0" stroke-width="2"/>
        <text x="170" y="102" text-anchor="middle" fill="#b23a48" font-weight="700">acid + enzymes (inside the stomach)</text>
        <g stroke="#b23a48" stroke-width="2.5">
          <line x1="90" y1="96" x2="90" y2="76"/><line x1="170" y1="96" x2="170" y2="76"/><line x1="250" y1="96" x2="250" y2="76"/>
        </g>
        <polygon points="90,74 86,82 94,82" fill="#b23a48"/><polygon points="170,74 166,82 174,82" fill="#b23a48"/><polygon points="250,74 246,82 254,82" fill="#b23a48"/>
      </g>`,
    },
  },

  /* -------------------------------------------------------- PANCREAS */
  pancreas: {
    3: {
      viewBox: "0 0 342 168",
      caption: "When blood sugar is high, the pancreas releases insulin to lower it; when it is low, it releases glucagon to raise it.",
      svg: `<g font-family="Inter, sans-serif" font-size="11" text-anchor="middle">
        <rect x="10" y="18" width="92" height="40" rx="8" fill="#f6e3e2" stroke="#e0a9a9" stroke-width="2"/>
        <text x="56" y="36" fill="#a23d49" font-weight="700">sugar HIGH</text><text x="56" y="50" fill="#8a93a0">after eating</text>
        <line x1="102" y1="38" x2="122" y2="38" stroke="#8a93a0" stroke-width="3"/><polygon points="130,38 119,33 119,43" fill="#8a93a0"/>
        <rect x="126" y="18" width="92" height="40" rx="8" fill="#e0eceb" stroke="#9cc6cd" stroke-width="2"/>
        <text x="172" y="42" fill="#2f6f72" font-weight="700">INSULIN</text>
        <line x1="218" y1="38" x2="238" y2="38" stroke="#8a93a0" stroke-width="3"/><polygon points="246,38 235,33 235,43" fill="#8a93a0"/>
        <rect x="242" y="18" width="92" height="40" rx="8" fill="#eaf3ee" stroke="#9cc5ab" stroke-width="2"/>
        <text x="288" y="42" fill="#2f7a4a" font-weight="700">sugar ↓</text>
        <text x="171" y="90" fill="#bd8d35" font-weight="700" font-size="12">the pancreas keeps blood sugar balanced</text>
        <rect x="10" y="110" width="92" height="40" rx="8" fill="#e8eef4" stroke="#a9c2da" stroke-width="2"/>
        <text x="56" y="128" fill="#3f6f8f" font-weight="700">sugar LOW</text><text x="56" y="142" fill="#8a93a0">between meals</text>
        <line x1="102" y1="130" x2="122" y2="130" stroke="#8a93a0" stroke-width="3"/><polygon points="130,130 119,125 119,135" fill="#8a93a0"/>
        <rect x="126" y="110" width="92" height="40" rx="8" fill="#f5ebd6" stroke="#d8bb63" stroke-width="2"/>
        <text x="172" y="134" fill="#9a7b1e" font-weight="700">GLUCAGON</text>
        <line x1="218" y1="130" x2="238" y2="130" stroke="#8a93a0" stroke-width="3"/><polygon points="246,130 235,125 235,135" fill="#8a93a0"/>
        <rect x="242" y="110" width="92" height="40" rx="8" fill="#f6e3e2" stroke="#e0a9a9" stroke-width="2"/>
        <text x="288" y="134" fill="#a23d49" font-weight="700">sugar ↑</text>
      </g>`,
    },
  },

  /* -------------------------------------------------- SMALL INTESTINE */
  "small-intestine": {
    2: {
      viewBox: "0 0 340 170",
      caption: "Tiny finger-like villi give the small intestine a huge surface area. Nutrients pass through them into the blood in the capillaries.",
      svg: `<g font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
        <path d="M120 152 C112 92 118 52 150 46 C182 52 188 92 180 152 Z" fill="#f6d6d9" stroke="#c66f76" stroke-width="2.5"/>
        <text x="150" y="38" fill="#c66f76" font-size="11" font-weight="700">villus</text>
        <path d="M150 150 C144 100 150 72 150 66" fill="none" stroke="#b23a48" stroke-width="8"/>
        <text x="214" y="104" fill="#b23a48" font-size="10.5" font-weight="700">capillary</text>
        <text x="214" y="118" fill="#b23a48" font-size="10.5" font-weight="700">(blood)</text>
        <g stroke="#2f7a4a" stroke-width="2.5">
          <line x1="92" y1="78" x2="126" y2="84"/><line x1="90" y1="108" x2="124" y2="108"/><line x1="92" y1="138" x2="126" y2="130"/>
        </g>
        <polygon points="134,85 123,82 126,92" fill="#2f7a4a"/><polygon points="132,108 121,104 121,114" fill="#2f7a4a"/><polygon points="134,129 123,127 126,137" fill="#2f7a4a"/>
        <text x="58" y="112" fill="#2f7a4a" font-size="10.5" font-weight="700">nutrients</text>
      </g>`,
    },
  },

  /* -------------------------------------------------- LARGE INTESTINE */
  "large-intestine": {
    1: {
      viewBox: "0 0 340 158",
      caption: "As leftover material moves through the large intestine, water is absorbed back into the body and the waste becomes more solid.",
      svg: `<g font-family="Inter, sans-serif" font-size="12" text-anchor="middle">
        <rect x="20" y="58" width="300" height="44" rx="22" fill="#dcae6e" stroke="#c7913f" stroke-width="2"/>
        <text x="64" y="50" fill="#9a7b1e" font-size="10.5" font-weight="700">watery waste in</text>
        <text x="286" y="50" fill="#7a3b32" font-size="10.5" font-weight="700">solid waste out</text>
        <line x1="40" y1="80" x2="298" y2="80" stroke="#b9852f" stroke-width="3" opacity=".55"/><polygon points="306,80 295,75 295,85" fill="#b9852f"/>
        <circle cx="72" cy="80" r="5" fill="#9a7b1e" opacity=".5"/>
        <circle cx="150" cy="80" r="7" fill="#8a5a2b" opacity=".7"/>
        <ellipse cx="262" cy="80" rx="17" ry="10" fill="#7a3b32"/>
        <g stroke="#3f6f8f" stroke-width="2.5">
          <line x1="92" y1="102" x2="92" y2="126"/><line x1="160" y1="102" x2="160" y2="126"/><line x1="226" y1="102" x2="226" y2="126"/>
        </g>
        <polygon points="92,134 87,123 97,123" fill="#3f6f8f"/><polygon points="160,134 155,123 165,123" fill="#3f6f8f"/><polygon points="226,134 221,123 231,123" fill="#3f6f8f"/>
        <text x="170" y="150" fill="#3f6f8f" font-size="11" font-weight="700">water absorbed back into the body</text>
      </g>`,
    },
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = FIGURES;
}
