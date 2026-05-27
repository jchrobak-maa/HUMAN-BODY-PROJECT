/* =========================================================================
   HUMAN BODY MUSEUM — ORGAN DIAGRAMS
   =========================================================================
   One entry per organ id. Each entry provides:
     viewBox  the SVG coordinate space
     art      static illustration markup (paths/shapes only)
     markers  array of { x, y } points — MUST be in the SAME ORDER and COUNT
              as that organ's `anatomy` array in organs.js. The app overlays a
              numbered, clickable pin at each point; clicking pin N reveals
              anatomy[N].function. The numbered legend mirrors these pins.
   ========================================================================= */

const DIAGRAMS = {
  /* ------------------------------------------------------------- HEART */
  heart: {
    viewBox: "0 0 320 340",
    art: `
      <g fill="none" stroke-linecap="round">
        <path d="M118 132 C110 82 108 58 116 28" stroke="#6f7d8c" stroke-width="16"/>
        <path d="M204 128 C212 92 232 86 236 58" stroke="#5f6d7c" stroke-width="14"/>
        <path d="M150 72 C150 36 198 30 208 72 L208 122" stroke="#b23a48" stroke-width="18"/>
      </g>
      <path d="M160 310 C90 256 64 184 92 145 C112 114 152 121 161 152 C170 121 212 112 232 145 C260 186 230 256 160 310 Z"
            fill="#d07882" stroke="#a23d49" stroke-width="3"/>
      <path d="M161 152 C152 121 112 114 92 145 C64 184 90 256 160 310 C160 256 159 200 161 152 Z"
            fill="#7da7c4" opacity=".32"/>
      <ellipse cx="116" cy="162" rx="25" ry="21" fill="#ffffff" opacity=".45"/>
      <ellipse cx="206" cy="164" rx="25" ry="21" fill="#ffffff" opacity=".45"/>
      <path d="M160 154 L160 302" stroke="#8c2c38" stroke-width="3" stroke-dasharray="3 7" stroke-linecap="round"/>
      <line x1="100" y1="204" x2="138" y2="204" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>
      <line x1="182" y1="206" x2="220" y2="206" stroke="#fff" stroke-width="4" stroke-linecap="round" opacity=".7"/>
    `,
    markers: [
      { x: 112, y: 150 },  // Right atrium
      { x: 118, y: 246 },  // Right ventricle
      { x: 210, y: 152 },  // Left atrium
      { x: 204, y: 250 },  // Left ventricle
      { x: 160, y: 200 },  // Valves
      { x: 168, y: 60  },  // Aorta
      { x: 160, y: 280 },  // Septum
      { x: 242, y: 196 },  // Cardiac muscle
    ],
  },

  /* ------------------------------------------------------------- BRAIN */
  brain: {
    viewBox: "0 0 320 340",
    art: `
      <path d="M70 165 C58 118 92 78 140 74 C168 50 222 56 244 88 C284 92 296 142 270 170
               C282 198 256 230 222 226 C214 250 176 256 156 238 C120 250 86 232 86 200
               C66 198 60 178 70 165 Z"
            fill="#e7b7ad" stroke="#c98c80" stroke-width="3"/>
      <g fill="none" stroke="#c98c80" stroke-width="2.4" opacity=".85">
        <path d="M104 120 C124 110 126 138 146 130"/>
        <path d="M150 96 C168 108 150 128 172 134"/>
        <path d="M198 84 C210 104 188 116 206 132"/>
        <path d="M236 110 C246 128 226 134 240 152"/>
        <path d="M96 168 C120 160 122 186 146 178"/>
        <path d="M170 160 C186 172 168 190 190 196"/>
        <path d="M214 168 C232 178 214 196 234 200"/>
      </g>
      <path d="M222 226 C250 226 268 246 250 266 C232 284 206 270 210 246 Z"
            fill="#d98f84" stroke="#b9756a" stroke-width="2.6"/>
      <path d="M196 250 C204 286 214 300 208 318 L188 316 C190 294 182 268 182 252 Z"
            fill="#cf9a8f" stroke="#b9756a" stroke-width="2.6"/>
    `,
    markers: [
      { x: 168, y: 116 }, // Cerebrum
      { x: 236, y: 248 }, // Cerebellum
      { x: 198, y: 296 }, // Brainstem
      { x: 92,  y: 138 }, // Frontal lobe
      { x: 256, y: 142 }, // Occipital lobe
      { x: 150, y: 192 }, // Hypothalamus
      { x: 118, y: 92  }, // Neurons
    ],
  },

  /* -------------------------------------------------------------- LUNG */
  lung: {
    viewBox: "0 0 320 340",
    art: `
      <rect x="151" y="38" width="18" height="86" rx="9" fill="#cdd6dd" stroke="#a9b5be" stroke-width="2"/>
      <g fill="none" stroke="#a9b5be" stroke-width="11" stroke-linecap="round">
        <path d="M160 120 C140 132 120 138 108 150"/>
        <path d="M160 120 C180 132 200 138 212 150"/>
      </g>
      <path d="M150 120 C150 118 120 130 100 160 C78 196 78 250 96 286 C108 308 142 300 146 272
               C150 232 150 170 150 120 Z"
            fill="#e79aa0" stroke="#c66f76" stroke-width="3"/>
      <path d="M170 120 C170 118 200 130 220 160 C242 196 242 250 224 286 C212 308 178 300 174 272
               C170 232 170 170 170 120 Z"
            fill="#e79aa0" stroke="#c66f76" stroke-width="3"/>
      <g fill="none" stroke="#c66f76" stroke-width="2.2" opacity=".75">
        <path d="M120 160 C115 190 112 230 120 270"/>
        <path d="M120 175 L104 185 M120 195 L102 206 M120 215 L104 228 M120 238 L106 250"/>
        <path d="M200 160 C205 190 208 230 200 270"/>
        <path d="M200 175 L216 185 M200 195 L218 206 M200 215 L216 228 M200 238 L214 250"/>
      </g>
      <path d="M84 296 C130 312 190 312 236 296" fill="none" stroke="#9c6f4e" stroke-width="8" stroke-linecap="round"/>
    `,
    markers: [
      { x: 160, y: 58  }, // Trachea
      { x: 160, y: 130 }, // Bronchi
      { x: 116, y: 200 }, // Bronchioles
      { x: 96,  y: 252 }, // Alveoli
      { x: 214, y: 224 }, // Capillaries
      { x: 160, y: 304 }, // Diaphragm
      { x: 230, y: 178 }, // Pleura
    ],
  },

  /* ------------------------------------------------------------ KIDNEY */
  kidney: {
    viewBox: "0 0 320 340",
    art: `
      <path d="M198 70 C128 64 84 116 84 174 C84 240 130 286 192 282 C176 262 178 232 196 214
               C214 196 214 168 196 150 C180 134 178 104 198 70 Z"
            fill="#9a5b50" stroke="#7c453c" stroke-width="3"/>
      <path d="M192 282 C176 262 178 232 196 214 C214 196 214 168 196 150 C180 134 178 104 198 70"
            fill="none" stroke="#7c453c" stroke-width="3"/>
      <path d="M188 150 C172 158 168 188 188 200 C176 210 178 232 192 246"
            fill="none" stroke="#e9d4c9" stroke-width="9" stroke-linecap="round"/>
      <g fill="none" stroke="#e9d4c9" stroke-width="5" stroke-linecap="round">
        <path d="M150 130 L182 158"/><path d="M132 168 L176 178"/><path d="M150 214 L182 196"/>
      </g>
      <g stroke="#b23a48" stroke-width="6" fill="none" stroke-linecap="round">
        <path d="M214 196 C242 196 254 184 268 172"/>
      </g>
      <g stroke="#3f6f8f" stroke-width="6" fill="none" stroke-linecap="round">
        <path d="M210 214 C240 216 252 206 266 196"/>
      </g>
      <path d="M196 248 C198 286 200 312 198 330" fill="none" stroke="#cdb59f" stroke-width="8" stroke-linecap="round"/>
      <circle cx="246" cy="118" r="22" fill="#fff" stroke="#7c453c" stroke-width="2" opacity=".92"/>
      <path d="M236 118 C236 108 256 108 256 118 C256 128 236 128 236 118 Z" fill="#b23a48" opacity=".8"/>
    `,
    markers: [
      { x: 138, y: 196 }, // Nephrons
      { x: 246, y: 118 }, // Glomerulus
      { x: 108, y: 130 }, // Renal cortex
      { x: 150, y: 178 }, // Renal medulla
      { x: 186, y: 230 }, // Renal pelvis
      { x: 198, y: 312 }, // Ureter
      { x: 256, y: 184 }, // Renal artery / vein
    ],
  },

  /* ------------------------------------------------------------- LIVER */
  liver: {
    viewBox: "0 0 320 340",
    art: `
      <path d="M50 130 C120 96 230 96 282 122 C292 150 276 188 230 200 C176 214 120 214 84 198
               C56 186 44 154 50 130 Z"
            fill="#7a3b32" stroke="#5e2c25" stroke-width="3"/>
      <path d="M168 104 C176 140 176 176 170 206" fill="none" stroke="#5e2c25" stroke-width="3"/>
      <path d="M168 116 C150 120 138 134 138 150" fill="none" stroke="#caa79c" stroke-width="3" opacity=".7"/>
      <g fill="#8c4a40" opacity=".55">
        <circle cx="200" cy="140" r="5"/><circle cx="216" cy="150" r="5"/><circle cx="188" cy="156" r="5"/>
        <circle cx="208" cy="166" r="5"/><circle cx="226" cy="138" r="5"/>
      </g>
      <path d="M150 200 C150 224 150 240 158 252" fill="none" stroke="#c2a23a" stroke-width="6" stroke-linecap="round"/>
      <g stroke-linecap="round" fill="none">
        <path d="M120 200 C118 222 112 236 110 250" stroke="#b23a48" stroke-width="5"/>
        <path d="M138 204 C140 226 142 240 146 252" stroke="#3f6f8f" stroke-width="5"/>
      </g>
      <ellipse cx="158" cy="266" rx="20" ry="13" fill="#5e8d4e" stroke="#456b39" stroke-width="2.5"/>
    `,
    markers: [
      { x: 100, y: 150 }, // Lobes
      { x: 208, y: 150 }, // Hepatocytes
      { x: 168, y: 220 }, // Bile ducts
      { x: 116, y: 232 }, // Hepatic artery
      { x: 140, y: 234 }, // Hepatic portal vein
      { x: 158, y: 268 }, // Gallbladder
    ],
  },

  /* ----------------------------------------------------------- STOMACH */
  stomach: {
    viewBox: "0 0 320 340",
    art: `
      <rect x="118" y="34" width="20" height="64" rx="10" fill="#e2a6ac" stroke="#c47f86" stroke-width="2.5"/>
      <path d="M128 92 C92 104 70 142 76 186 C82 236 124 272 178 270 C224 268 252 238 250 210
               C248 188 228 184 222 200 C214 224 178 232 150 214 C118 192 112 150 130 120
               C140 104 138 96 128 92 Z"
            fill="#e79aa0" stroke="#c66f76" stroke-width="3"/>
      <g fill="none" stroke="#c66f76" stroke-width="2.4" opacity=".7">
        <path d="M96 150 C112 156 110 170 96 176"/>
        <path d="M104 188 C120 194 118 208 104 214"/>
        <path d="M124 218 C140 224 140 238 126 244"/>
      </g>
      <rect x="244" y="196" width="40" height="24" rx="12" fill="#d98f84" stroke="#b9756a" stroke-width="2.5"/>
      <circle cx="120" cy="70" r="11" fill="none" stroke="#c47f86" stroke-width="3"/>
    `,
    markers: [
      { x: 128, y: 64  }, // Lower esophageal sphincter
      { x: 104, y: 124 }, // Fundus
      { x: 150, y: 200 }, // Body
      { x: 128, y: 232 }, // Rugae
      { x: 205, y: 250 }, // Gastric glands
      { x: 262, y: 208 }, // Pyloric sphincter
      { x: 96,  y: 164 }, // Mucus lining
    ],
  },

  /* ---------------------------------------------------------- PANCREAS */
  pancreas: {
    viewBox: "0 0 320 340",
    art: `
      <path d="M58 196 C70 168 112 168 150 176 C196 186 244 178 270 150 C288 132 292 168 270 184
               C236 210 188 214 146 206 C112 200 92 206 86 226 C80 244 56 230 58 196 Z"
            fill="#e2b15a" stroke="#bd8d35" stroke-width="3"/>
      <path d="M76 200 C120 196 200 204 264 162" fill="none" stroke="#b9852f" stroke-width="2.5" opacity=".7"/>
      <g>
        <circle cx="210" cy="150" r="9" fill="#b23a48" opacity=".85"/>
        <circle cx="232" cy="120" r="8" fill="#3f6f8f" opacity=".85"/>
        <circle cx="256" cy="166" r="8" fill="#2f6f72" opacity=".85"/>
        <circle cx="170" cy="184" r="7" fill="#fff" opacity=".7"/>
        <circle cx="120" cy="186" r="7" fill="#fff" opacity=".7"/>
      </g>
    `,
    markers: [
      { x: 160, y: 188 }, // Head, body, and tail
      { x: 210, y: 150 }, // Islets of Langerhans
      { x: 110, y: 192 }, // Acinar cells
      { x: 150, y: 200 }, // Pancreatic duct
      { x: 232, y: 120 }, // Beta cells
      { x: 256, y: 166 }, // Alpha cells
    ],
  },

  /* --------------------------------------------------------------- EYE */
  eye: {
    viewBox: "0 0 320 340",
    art: `
      <circle cx="158" cy="170" r="100" fill="#f3ede1" stroke="#cdbfa3" stroke-width="3"/>
      <path d="M70 134 C54 152 54 188 70 206 C44 200 36 184 36 170 C36 156 44 140 70 134 Z"
            fill="#cfeaf0" stroke="#9cc6cd" stroke-width="2.5"/>
      <path d="M70 138 C84 150 84 190 70 202" fill="#3f6f8f" opacity=".75"/>
      <circle cx="78" cy="170" r="13" fill="#1d2b33"/>
      <ellipse cx="104" cy="170" rx="16" ry="30" fill="#cfe7ef" stroke="#8fb9c2" stroke-width="2.5" opacity=".9"/>
      <path d="M232 110 C262 140 262 200 232 230" fill="none" stroke="#b23a48" stroke-width="9" stroke-linecap="round"/>
      <g fill="#b23a48" opacity=".7">
        <circle cx="246" cy="150" r="3.4"/><circle cx="250" cy="170" r="3.4"/><circle cx="246" cy="190" r="3.4"/>
      </g>
      <path d="M252 170 C286 158 300 178 300 188 C290 196 270 196 256 188 Z" fill="#f6d98e" stroke="#cda23f" stroke-width="2.5"/>
    `,
    markers: [
      { x: 54,  y: 170 }, // Cornea
      { x: 80,  y: 170 }, // Pupil
      { x: 84,  y: 134 }, // Iris
      { x: 110, y: 170 }, // Lens
      { x: 238, y: 122 }, // Retina
      { x: 252, y: 190 }, // Rods and cones
      { x: 290, y: 184 }, // Optic nerve
    ],
  },

  /* -------------------------------------------------------------- SKIN */
  skin: {
    viewBox: "0 0 320 340",
    art: `
      <rect x="44" y="48" width="232" height="56" fill="#f0cbb4" stroke="#d6a98e" stroke-width="2"/>
      <rect x="44" y="104" width="232" height="120" fill="#e3a394" stroke="#cf8c7c" stroke-width="2"/>
      <rect x="44" y="224" width="232" height="76" fill="#f2d98f" stroke="#d8bb63" stroke-width="2"/>
      <g fill="#f2d98f" stroke="#d8bb63" stroke-width="2">
        <circle cx="92"  cy="270" r="20"/><circle cx="150" cy="276" r="22"/><circle cx="214" cy="270" r="20"/>
      </g>
      <path d="M248 60 L248 232" stroke="#7a4a2e" stroke-width="6" stroke-linecap="round"/>
      <path d="M248 60 C238 48 234 40 236 30" stroke="#7a4a2e" stroke-width="5" fill="none" stroke-linecap="round"/>
      <ellipse cx="248" cy="232" rx="14" ry="10" fill="#caa07f"/>
      <path d="M150 150 C150 200 150 230 150 252" stroke="#cf8c7c" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M150 152 C140 158 140 172 150 178 C160 172 160 158 150 152 Z" fill="#c79a3a"/>
      <path d="M196 132 C214 132 220 150 210 160 C198 168 188 156 192 142 Z" fill="#f5e6c8" stroke="#d8bb63" stroke-width="2"/>
      <circle cx="100" cy="80" r="7" fill="#5e3a24"/><circle cx="150" cy="86" r="7" fill="#5e3a24"/>
      <circle cx="200" cy="80" r="7" fill="#5e3a24"/>
      <path d="M120 300 C120 286 132 286 132 300" fill="none" stroke="#b23a48" stroke-width="4"/>
    `,
    markers: [
      { x: 64,  y: 74  }, // Epidermis
      { x: 64,  y: 162 }, // Dermis
      { x: 64,  y: 262 }, // Hypodermis
      { x: 150, y: 244 }, // Sweat glands
      { x: 200, y: 148 }, // Sebaceous (oil) glands
      { x: 248, y: 140 }, // Hair follicles
      { x: 126, y: 296 }, // Sensory receptors
      { x: 100, y: 82  }, // Melanocytes
    ],
  },

  /* --------------------------------------------------- SMALL INTESTINE */
  "small-intestine": {
    viewBox: "0 0 320 340",
    art: `
      <path d="M120 56 C150 48 168 70 158 92 C148 112 116 108 110 130 C104 154 142 162 158 150"
            fill="none" stroke="#e79aa0" stroke-width="20" stroke-linecap="round"/>
      <path d="M150 150 C100 148 86 188 120 204 C160 222 196 196 178 168 C166 150 138 156 140 178
               C142 204 184 216 210 200 C236 184 232 232 196 244 C158 256 140 240 150 270"
            fill="none" stroke="#e79aa0" stroke-width="20" stroke-linecap="round"/>
      <path d="M120 56 C150 48 168 70 158 92 C148 112 116 108 110 130 C104 154 142 162 158 150"
            fill="none" stroke="#c66f76" stroke-width="20" stroke-linecap="round" opacity=".25"/>
      <path d="M150 270 C160 296 180 300 196 296" fill="none" stroke="#cf8c7c" stroke-width="18" stroke-linecap="round"/>
      <circle cx="252" cy="130" r="34" fill="#fff" stroke="#c66f76" stroke-width="2.5"/>
      <g fill="none" stroke="#c66f76" stroke-width="4" stroke-linecap="round">
        <path d="M232 150 C232 130 236 124 240 110"/><path d="M246 152 C246 130 248 122 250 106"/>
        <path d="M260 152 C260 130 262 122 264 108"/><path d="M272 150 C272 132 274 124 276 112"/>
      </g>
    `,
    markers: [
      { x: 124, y: 70  }, // Duodenum
      { x: 132, y: 160 }, // Jejunum
      { x: 178, y: 232 }, // Ileum
      { x: 252, y: 130 }, // Villi
      { x: 276, y: 96  }, // Microvilli
      { x: 92,  y: 196 }, // Smooth muscle walls
      { x: 222, y: 180 }, // Capillaries
    ],
  },

  /* --------------------------------------------------- LARGE INTESTINE */
  "large-intestine": {
    viewBox: "0 0 320 340",
    art: `
      <path d="M96 286 L96 150 C96 110 120 92 158 92 L196 92 C232 92 232 150 200 150
               L210 150 L210 260"
            fill="none" stroke="#dcae6e" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M96 286 L96 150 C96 110 120 92 158 92 L196 92 C232 92 232 150 200 150"
            fill="none" stroke="#c7913f" stroke-width="26" stroke-linecap="round" stroke-linejoin="round" opacity=".25"/>
      <path d="M210 260 C210 290 196 304 178 308 L150 308 C150 318 150 326 158 332"
            fill="none" stroke="#cf8c7c" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M88 296 C84 314 82 322 80 332" fill="none" stroke="#e2b15a" stroke-width="13" stroke-linecap="round"/>
      <g fill="#5e8d4e" opacity=".8">
        <circle cx="210" cy="170" r="4"/><circle cx="222" cy="184" r="4"/><circle cx="200" cy="190" r="4"/>
        <circle cx="216" cy="200" r="4"/><circle cx="204" cy="210" r="4"/>
      </g>
    `,
    markers: [
      { x: 96,  y: 272 }, // Cecum
      { x: 158, y: 92  }, // Colon
      { x: 188, y: 296 }, // Rectum
      { x: 158, y: 330 }, // Anus
      { x: 80,  y: 322 }, // Appendix
      { x: 212, y: 192 }, // Gut bacteria (microbiome)
    ],
  },
};

if (typeof module !== "undefined" && module.exports) {
  module.exports = DIAGRAMS;
}
