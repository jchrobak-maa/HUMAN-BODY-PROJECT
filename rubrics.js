/* =========================================================================
   HUMAN BODY MUSEUM — ANSWER-CHECK RUBRICS
   =========================================================================
   Per-organ rubrics used by the optional "Check my answer" self-check.
   Keyed by organ id, then by section key:
     overview / anatomy / connections / disease / takeaway

   Each section rubric supports:
     expect          required concepts; each item is a string OR an array
                     of synonyms (any one match counts the item as covered).
     misconceptions  ordered list of { trigger: RegExp, hint: string }.
                     The FIRST trigger that matches wins and is shown as the
                     correction — so put the strongest misconceptions first.
     hintLabel       human-readable name of the section to "go look at."
     hintSelector    CSS selector for the on-page element to scroll to and
                     pulse when the student clicks "Show me where →".
     softNote        (optional) for open-ended prompts with no required
                     keywords; shown as a friendly nudge instead of a verdict.

   This file is intentionally separate from organs.js so the content data
   stays clean. The checker degrades gracefully if a rubric is missing — the
   Check button simply doesn't appear for that prompt.
   ========================================================================= */
const RUBRICS = {

  /* ----------------------------------------------------------- HEART */
  heart: {
    overview: {
      expect: ["pump", "blood", ["circulatory", "cardiovascular"], ["oxygen", "nutrient", "nutrients"]],
      misconceptions: [
        { trigger: /heart.*(?:respiratory|part of.*lung)|respiratory.*system.*heart|(?:belongs?|part).*respiratory/i,
          hint: "Not quite — the heart isn't part of the respiratory system. It's the central organ of the circulatory (cardiovascular) system. The heart and lungs WORK TOGETHER (the heart sends blood to the lungs to pick up oxygen), but they belong to different body systems." },
        { trigger: /digestive\s*system/i,
          hint: "The heart isn't part of the digestive system. It pumps the blood that carries nutrients absorbed by the digestive system around the body." }
      ],
      hintLabel: "Overview", hintSelector: ".overview-grid"
    },
    anatomy: {
      expect: [
        ["atrium", "atria", "ventricle", "valve", "aorta", "septum", "cardiac muscle", "myocardium"],
        ["pump", "push", "receive", "fill", "contract", "squeeze", "blood", "one-way", "oxygen-rich", "oxygen-poor"]
      ],
      misconceptions: [], hintLabel: "Anatomy", hintSelector: ".anatomy"
    },
    connections: {
      expect: [
        ["lungs", "respiratory", "brain", "nervous", "hormone", "muscle", "adrenaline", "endocrine"],
        ["oxygen", "blood", "signal", "exercise", "beat", "faster", "slower"]
      ],
      misconceptions: [], hintLabel: "How it works with other systems", hintSelector: ".connections"
    },
    disease: {
      expect: [
        ["plaque", "fat", "fatty", "blocked", "blockage", "narrowed", "clot", "cholesterol", "artery", "arteries"],
        ["exercise", "diet", "smoking", "stent", "medication", "surgery", "aspirin", "bypass", "not smoking", "healthy"]
      ],
      misconceptions: [
        { trigger: /(?:contagious|catch).*(?:heart|cad|attack)/i,
          hint: "Heart disease isn't contagious — you don't 'catch' it. It builds up over time from things like diet, smoking, and high blood pressure." }
      ],
      hintLabel: "Disease case study", hintSelector: ".disease"
    },
    takeaway: {
      expect: [], misconceptions: [],
      hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — make sure your answer is a complete sentence about the single most important idea you learned about the heart."
    }
  },

  /* ----------------------------------------------------------- BRAIN */
  brain: {
    overview: {
      expect: [["control", "controls", "controlling"], "brain", ["nervous"], ["think", "memory", "movement", "automatic"]],
      misconceptions: [
        { trigger: /brain.*(?:is a muscle|made of muscle)|brain\s+muscle/i,
          hint: "The brain isn't a muscle. It's made of nerve cells (neurons) that send electrical signals. The cerebellum CONTROLS muscles, but the brain itself isn't muscle tissue." },
        { trigger: /(?:only|just).*(?:thoughts?|thinking)/i,
          hint: "The brain does more than think. It also runs automatic jobs like heartbeat and breathing (through the brainstem) and controls balance, senses, and movement." }
      ],
      hintLabel: "Overview", hintSelector: ".overview-grid"
    },
    anatomy: {
      expect: [
        ["cerebrum", "cerebellum", "brainstem", "frontal lobe", "occipital", "hypothalamus", "neuron", "neurons", "spinal cord"],
        ["control", "think", "balance", "coordin", "signal", "auto", "movement", "temperature"]
      ],
      misconceptions: [], hintLabel: "Anatomy", hintSelector: ".anatomy"
    },
    connections: {
      expect: [
        ["nervous", "endocrine", "circulatory", "muscular", "hormone", "heart", "blood", "pituitary", "muscle"],
        ["signal", "control", "oxygen", "movement", "contract", "release", "hormone"]
      ],
      misconceptions: [], hintLabel: "How it works with other systems", hintSelector: ".connections"
    },
    disease: {
      expect: [
        ["blood", "clot", "vessel", "oxygen", "artery", "burst", "blocked", "interrupt"],
        ["fast", "quick", "time", "treatment", "emergency", "clot", "rehab", "face", "arm", "speech"]
      ],
      misconceptions: [
        { trigger: /stroke.*heart attack|heart attack.*stroke/i,
          hint: "A stroke isn't the same as a heart attack. A stroke happens in the brain (blood flow interrupted to brain cells); a heart attack happens in the heart muscle." }
      ],
      hintLabel: "Disease case study", hintSelector: ".disease"
    },
    takeaway: { expect: [], misconceptions: [], hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — write one complete sentence about the most important idea you learned about the brain." }
  },

  /* ------------------------------------------------------------- LUNG */
  lung: {
    overview: {
      expect: ["oxygen", ["carbon dioxide", "co2"], ["respiratory", "breathing", "breathe"], ["exchange", "trade", "take in"]],
      misconceptions: [
        { trigger: /(?:make|produce|create).*oxygen|lungs?\s+(?:make|produce|create)/i,
          hint: "The lungs don't make or create oxygen — they take oxygen IN from the air you breathe and pass it into the blood. (Plants make oxygen; we use it.)" },
        { trigger: /(?:digestive\s*system|part of.*digest)/i,
          hint: "The lungs aren't part of the digestive system. They're part of the respiratory system." }
      ],
      hintLabel: "Overview", hintSelector: ".overview-grid"
    },
    anatomy: {
      expect: [
        ["trachea", "bronchi", "bronchiole", "alveoli", "alveolus", "capillaries", "diaphragm", "pleura", "windpipe"],
        ["air", "oxygen", "exchange", "branch", "sac", "contract", "breath"]
      ],
      misconceptions: [], hintLabel: "Anatomy", hintSelector: ".anatomy"
    },
    connections: {
      expect: [
        ["circulatory", "heart", "blood", "nervous", "brain", "muscular", "diaphragm", "immune"],
        ["oxygen", "breath", "signal", "cilia", "muscle", "exchange"]
      ],
      misconceptions: [], hintLabel: "How it works with other systems", hintSelector: ".connections"
    },
    disease: {
      expect: [
        ["inflam", "narrow", "tight", "mucus", "allergen", "trigger", "airway"],
        ["inhaler", "bronchodilator", "avoid", "action plan", "medication", "steroid"]
      ],
      misconceptions: [
        { trigger: /asthma.*(?:contagious|catch)/i,
          hint: "Asthma isn't contagious — you can't catch it from someone else. It comes from a mix of genetics and environmental triggers." }
      ],
      hintLabel: "Disease case study", hintSelector: ".disease"
    },
    takeaway: { expect: [], misconceptions: [], hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — one complete sentence on the most important idea you learned about the lungs." }
  },

  /* ---------------------------------------------------------- KIDNEY */
  kidney: {
    overview: {
      expect: [["filter", "clean", "remove"], "blood", ["urine", "waste"], ["urinary", "excretory", "renal"]],
      misconceptions: [
        { trigger: /(?:make|create|produce|build).*blood|kidneys?\s+(?:make|create|produce|build)\s+blood/i,
          hint: "The kidneys don't make blood — they FILTER it. (Bone marrow makes blood cells. Kidneys clean the blood and turn the waste into urine.)" },
        { trigger: /digestive\s*system/i,
          hint: "The kidneys aren't part of the digestive system. They're part of the urinary (excretory) system." }
      ],
      hintLabel: "Overview", hintSelector: ".overview-grid"
    },
    anatomy: {
      expect: [
        ["nephron", "glomerulus", "cortex", "medulla", "renal pelvis", "ureter", "renal artery", "renal vein"],
        ["filter", "blood", "urine", "collect", "water", "waste"]
      ],
      misconceptions: [], hintLabel: "Anatomy", hintSelector: ".anatomy"
    },
    connections: {
      expect: [
        ["circulatory", "blood", "endocrine", "hormone", "urinary", "bladder", "nervous"],
        ["pressure", "filter", "water", "red blood", "vitamin d", "signal", "conserve"]
      ],
      misconceptions: [], hintLabel: "How it works with other systems", hintSelector: ".connections"
    },
    disease: {
      expect: [
        ["mineral", "calcium", "salt", "concentrat", "stone", "dehydrat", "hard"],
        ["water", "hydrate", "drink", "reduce salt", "lithotripsy", "fluid", "pass"]
      ],
      misconceptions: [
        { trigger: /kidney\s+stones?.*(?:contagious|catch)/i,
          hint: "Kidney stones aren't contagious. They form from concentrated minerals in your own urine, often from not drinking enough water." }
      ],
      hintLabel: "Disease case study", hintSelector: ".disease"
    },
    takeaway: { expect: [], misconceptions: [], hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — one complete sentence on the most important idea you learned about the kidneys." }
  },

  /* ----------------------------------------------------------- LIVER */
  liver: {
    overview: {
      expect: [["digestive", "metabolic"], ["filter", "process", "clean"], "blood", ["bile", "detox", "toxin", "nutrient"]],
      misconceptions: [
        { trigger: /(?:makes?|produces?|creates?).*blood|liver.*(?:make|produce|create)\s+blood/i,
          hint: "The liver doesn't make blood — it processes blood that comes from the digestive system. (Bone marrow makes blood cells.) The liver does make bile, though." },
        { trigger: /(?:part of|in)\s+(?:the\s+)?respiratory/i,
          hint: "The liver isn't part of the respiratory system. It's part of the digestive system and plays a big role in processing blood." }
      ],
      hintLabel: "Overview", hintSelector: ".overview-grid"
    },
    anatomy: {
      expect: [
        ["lobe", "hepatocyte", "bile duct", "hepatic artery", "portal vein", "gallbladder"],
        ["filter", "process", "produce", "store", "bile", "blood"]
      ],
      misconceptions: [], hintLabel: "Anatomy", hintSelector: ".anatomy"
    },
    connections: {
      expect: [
        ["digestive", "stomach", "intestine", "circulatory", "blood", "endocrine", "metabolic", "immune"],
        ["bile", "nutrient", "filter", "glucose", "glycogen", "bacteria", "sugar"]
      ],
      misconceptions: [], hintLabel: "How it works with other systems", hintSelector: ".connections"
    },
    disease: {
      expect: [
        ["scar", "damage", "alcohol", "hepatitis", "fatty", "drink", "virus"],
        ["limit alcohol", "vaccin", "stop drink", "transplant", "healthy weight", "avoid alcohol"]
      ],
      misconceptions: [
        { trigger: /cirrhosis.*(?:contagious|catch)/i,
          hint: "Cirrhosis itself isn't contagious. But some of its causes (hepatitis B and C) ARE infections that can be spread — which is why the hepatitis B vaccine matters." }
      ],
      hintLabel: "Disease case study", hintSelector: ".disease"
    },
    takeaway: { expect: [], misconceptions: [], hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — one complete sentence on the most important idea you learned about the liver." }
  },

  /* --------------------------------------------------------- STOMACH */
  stomach: {
    overview: {
      expect: [["digestive"], ["break down", "digest", "mix"], ["food", "acid", "enzyme"], ["small intestine", "intestine", "chyme"]],
      misconceptions: [
        { trigger: /(?:all|most).*(?:digestion|absorption).*stomach|stomach.*(?:does most|where most.*digest)/i,
          hint: "Most digestion actually finishes in the small intestine, not the stomach. The stomach breaks food down with acid and enzymes, then passes it to the small intestine where most nutrients are absorbed." },
        { trigger: /(?:make|create|produce)\s+food/i,
          hint: "The stomach doesn't make food — it breaks down the food you eat into a soupy mixture so the small intestine can absorb the nutrients." }
      ],
      hintLabel: "Overview", hintSelector: ".overview-grid"
    },
    anatomy: {
      expect: [
        ["sphincter", "fundus", "body", "rugae", "gastric gland", "pyloric", "mucus", "mucus lining"],
        ["acid", "enzyme", "mix", "fold", "gate", "protect", "control"]
      ],
      misconceptions: [], hintLabel: "Anatomy", hintSelector: ".anatomy"
    },
    connections: {
      expect: [
        ["digestive", "esophagus", "intestine", "nervous", "brain", "endocrine", "hormone", "circulatory", "blood"],
        ["signal", "acid", "hunger", "full", "churn", "nutrient", "release"]
      ],
      misconceptions: [], hintLabel: "How it works with other systems", hintSelector: ".connections"
    },
    disease: {
      expect: [
        ["h. pylori", "bacteria", "nsaid", "pain reliever", "ibuprofen", "mucus", "acid", "smoking"],
        ["antibiotic", "reduce acid", "stop nsaid", "quit smoking", "prescription", "medication", "ppi"]
      ],
      misconceptions: [
        { trigger: /(?:spicy food|stress|coffee).*(?:cause|causes?).*ulcer/i,
          hint: "Spicy food and stress can WORSEN ulcer symptoms but don't actually cause ulcers — that's a common myth. Most ulcers are caused by an H. pylori infection or long-term NSAID (pain reliever) use." }
      ],
      hintLabel: "Disease case study", hintSelector: ".disease"
    },
    takeaway: { expect: [], misconceptions: [], hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — one complete sentence on the most important idea you learned about the stomach." }
  },

  /* -------------------------------------------------------- PANCREAS */
  pancreas: {
    overview: {
      expect: [["digestive"], ["endocrine", "hormone"], ["insulin", "glucagon", "enzyme"], ["blood sugar", "glucose", "digestion", "digest"]],
      misconceptions: [
        { trigger: /insulin.*(?:raises?|increase|increases?).*(?:blood sugar|glucose)/i,
          hint: "Got it backwards — insulin LOWERS blood sugar (it tells cells to take in glucose). Glucagon RAISES blood sugar. They work as opposites." },
        { trigger: /glucagon.*(?:lowers?|decrease|decreases?).*(?:blood sugar|glucose)/i,
          hint: "Got it backwards — glucagon RAISES blood sugar (it tells the liver to release stored glucose). Insulin LOWERS blood sugar." },
        { trigger: /(?:part of|only)\s+(?:the\s+)?nervous/i,
          hint: "The pancreas isn't part of the nervous system. It belongs to both the digestive system (it makes enzymes) and the endocrine system (it makes hormones like insulin)." }
      ],
      hintLabel: "Overview", hintSelector: ".overview-grid"
    },
    anatomy: {
      expect: [
        ["head", "body", "tail", "islet", "langerhans", "acinar", "pancreatic duct", "beta", "alpha"],
        ["enzyme", "insulin", "glucagon", "hormone", "digest", "blood sugar"]
      ],
      misconceptions: [], hintLabel: "Anatomy", hintSelector: ".anatomy"
    },
    connections: {
      expect: [
        ["digestive", "intestine", "endocrine", "hormone", "circulatory", "blood", "liver"],
        ["insulin", "glucagon", "enzyme", "blood sugar", "glucose", "store", "release"]
      ],
      misconceptions: [], hintLabel: "How it works with other systems", hintSelector: ".connections"
    },
    disease: {
      expect: [
        ["immune", "autoimmune", "beta cell", "destroy", "insulin", "attack"],
        ["insulin", "monitor", "injection", "pump", "check", "blood sugar", "manage"]
      ],
      misconceptions: [
        { trigger: /type\s*1.*(?:caused by|because).*(?:sugar|diet|food)|eat.*too much.*type\s*1/i,
          hint: "Type 1 diabetes is NOT caused by diet or eating too much sugar — that's a common myth. It's an autoimmune condition where the immune system destroys the insulin-making cells. (You may be thinking of Type 2, which is more linked to lifestyle.)" }
      ],
      hintLabel: "Disease case study", hintSelector: ".disease"
    },
    takeaway: { expect: [], misconceptions: [], hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — one complete sentence on the most important idea you learned about the pancreas." }
  },

  /* ------------------------------------------------------------- EYE */
  eye: {
    overview: {
      expect: ["light", ["signal", "electrical"], "brain", ["sensory", "nervous", "sense", "vision", "see"]],
      misconceptions: [
        { trigger: /(?:eye actually sees?|see with.*eyes? alone|eyes? sees? the world)/i,
          hint: "Not quite — your EYES capture light, but your BRAIN is what actually interprets it as the images you 'see.' Without the brain processing the optic nerve signals, the eye would just be collecting light." },
        { trigger: /(?:make|produce|create)\s+light/i,
          hint: "Your eyes don't make light — they detect it. The eye lets light in and converts it into electrical signals." }
      ],
      hintLabel: "Overview", hintSelector: ".overview-grid"
    },
    anatomy: {
      expect: [
        ["cornea", "pupil", "iris", "lens", "retina", "rod", "cone", "optic nerve"],
        ["light", "focus", "signal", "color", "dim", "brain"]
      ],
      misconceptions: [], hintLabel: "Anatomy", hintSelector: ".anatomy"
    },
    connections: {
      expect: [
        ["nervous", "brain", "muscular", "muscle", "circulatory", "blood", "integumentary", "eyelid"],
        ["signal", "focus", "tear", "protect", "interpret", "move"]
      ],
      misconceptions: [], hintLabel: "How it works with other systems", hintSelector: ".connections"
    },
    disease: {
      expect: [
        ["cloud", "protein", "lens", "age", "uv", "sun"],
        ["surgery", "artificial lens", "sunglasses", "uv", "protect"]
      ],
      misconceptions: [
        { trigger: /cataract.*(?:contagious|catch)/i,
          hint: "Cataracts aren't contagious. They form when proteins in the eye's lens clump together over time, usually from aging or long-term UV exposure." }
      ],
      hintLabel: "Disease case study", hintSelector: ".disease"
    },
    takeaway: { expect: [], misconceptions: [], hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — one complete sentence on the most important idea you learned about the eye." }
  },

  /* ------------------------------------------------------------ SKIN */
  skin: {
    overview: {
      expect: [["integumentary"], ["barrier", "protect", "cover", "largest"], ["temperature", "sweat", "regulate"], ["germ", "bacteria", "water", "uv", "infection"]],
      misconceptions: [
        { trigger: /skin.*(?:not an organ|isn'?t an organ|is not.*organ)/i,
          hint: "Skin actually IS an organ — your largest one, in fact. It's built from several kinds of tissue working together, which is the definition of an organ." },
        { trigger: /skin.*(?:one layer|just.*layer|single layer)/i,
          hint: "Skin has three layers, not one: the epidermis (outer barrier), the dermis (middle layer with nerves and glands), and the hypodermis (deepest, mostly fat)." }
      ],
      hintLabel: "Overview", hintSelector: ".overview-grid"
    },
    anatomy: {
      expect: [
        ["epidermis", "dermis", "hypodermis", "sweat", "sebaceous", "oil gland", "hair follicle", "sensory", "melanocyte"],
        ["barrier", "protect", "cool", "oil", "grow", "detect", "color", "pigment", "heat", "fat"]
      ],
      misconceptions: [], hintLabel: "Anatomy", hintSelector: ".anatomy"
    },
    connections: {
      expect: [
        ["nervous", "brain", "circulatory", "blood", "immune", "endocrine", "vitamin d"],
        ["touch", "temperature", "heat", "cool", "germ", "sun", "signal", "barrier"]
      ],
      misconceptions: [], hintLabel: "How it works with other systems", hintSelector: ".connections"
    },
    disease: {
      expect: [
        ["uv", "sun", "melanocyte", "mole", "dna", "pigment", "tan"],
        ["sunscreen", "avoid tan", "shade", "clothing", "early", "surgery", "detect"]
      ],
      misconceptions: [
        { trigger: /melanoma.*(?:contagious|catch)/i,
          hint: "Skin cancer isn't contagious. Melanoma is usually caused by UV damage to the DNA in melanocyte cells." },
        { trigger: /(?:tanning bed|tan).*safe|safe.*(?:tan|tanning)/i,
          hint: "Tanning beds aren't safer than the sun — they use UV light, which damages skin DNA the same way. They're a known cause of melanoma." }
      ],
      hintLabel: "Disease case study", hintSelector: ".disease"
    },
    takeaway: { expect: [], misconceptions: [], hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — one complete sentence on the most important idea you learned about the skin." }
  },

  /* -------------------------------------------------- SMALL INTESTINE */
  "small-intestine": {
    overview: {
      expect: [["digestive"], ["absorb", "absorption", "take"], ["nutrient", "blood", "food"], ["villi", "surface", "wall", "tube"]],
      misconceptions: [
        { trigger: /small.*(?:intestine|gut).*(?:shorter|smaller in length)/i,
          hint: "Actually the small intestine is LONGER than the large intestine — about 20 feet vs. 5 feet. It's called 'small' only because it's narrower." },
        { trigger: /(?:waste|feces|poop|stool).*(?:in|made|formed).*small intestine/i,
          hint: "Waste isn't formed in the small intestine — its job is to absorb nutrients. Solid waste forms later in the large intestine as water is removed." }
      ],
      hintLabel: "Overview", hintSelector: ".overview-grid"
    },
    anatomy: {
      expect: [
        ["duodenum", "jejunum", "ileum", "villi", "microvilli", "peristalsis", "capillaries", "smooth muscle"],
        ["absorb", "surface", "fold", "push", "nutrient", "blood"]
      ],
      misconceptions: [], hintLabel: "Anatomy", hintSelector: ".anatomy"
    },
    connections: {
      expect: [
        ["digestive", "stomach", "liver", "pancreas", "circulatory", "blood", "nervous", "endocrine", "hormone"],
        ["bile", "enzyme", "nutrient", "absorb", "signal", "push", "peristalsis"]
      ],
      misconceptions: [], hintLabel: "How it works with other systems", hintSelector: ".connections"
    },
    disease: {
      expect: [
        ["gluten", "wheat", "autoimmune", "immune", "villi", "damage", "barley", "rye"],
        ["gluten-free", "avoid gluten", "diet", "heal"]
      ],
      misconceptions: [
        { trigger: /celiac.*(?:allergy|allergic)|gluten\s+allergy/i,
          hint: "Celiac disease isn't a gluten allergy — it's an autoimmune condition where the immune system damages the villi when gluten is eaten." },
        { trigger: /celiac.*(?:contagious|catch)/i,
          hint: "Celiac isn't contagious — it's a genetic autoimmune condition." }
      ],
      hintLabel: "Disease case study", hintSelector: ".disease"
    },
    takeaway: { expect: [], misconceptions: [], hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — one complete sentence on the most important idea you learned about the small intestine." }
  },

  /* -------------------------------------------------- LARGE INTESTINE */
  "large-intestine": {
    overview: {
      expect: [["digestive"], ["water", "fluid"], ["absorb", "reabsorb"], ["waste", "feces", "stool", "leftover"]],
      misconceptions: [
        { trigger: /large.*(?:intestine|gut).*(?:longer|longest)/i,
          hint: "Actually the large intestine is SHORTER than the small intestine — about 5 feet vs. 20 feet. It's called 'large' only because it's wider." },
        { trigger: /large.*intestine.*(?:absorb|where).*nutrient/i,
          hint: "Most nutrients are absorbed in the SMALL intestine. The large intestine mainly absorbs WATER from leftovers and stores waste." }
      ],
      hintLabel: "Overview", hintSelector: ".overview-grid"
    },
    anatomy: {
      expect: [
        ["cecum", "colon", "rectum", "anus", "appendix", "gut bacteria", "microbiome"],
        ["water", "absorb", "store", "waste", "bacteria", "vitamin"]
      ],
      misconceptions: [], hintLabel: "Anatomy", hintSelector: ".anatomy"
    },
    connections: {
      expect: [
        ["digestive", "small intestine", "circulatory", "blood", "immune", "nervous"],
        ["water", "absorb", "bacteria", "crowd out", "signal", "push"]
      ],
      misconceptions: [], hintLabel: "How it works with other systems", hintSelector: ".connections"
    },
    disease: {
      expect: [
        ["block", "blockage", "infection", "swell", "stool", "bacteria", "inflam", "appendix"],
        ["surgery", "remove", "appendectomy", "emergency", "fast"]
      ],
      misconceptions: [
        { trigger: /appendicitis.*(?:contagious|catch)/i,
          hint: "Appendicitis isn't contagious. It happens when the appendix gets blocked (often by hardened stool) and bacteria multiply inside it." }
      ],
      hintLabel: "Disease case study", hintSelector: ".disease"
    },
    takeaway: { expect: [], misconceptions: [], hintLabel: "Why it matters", hintSelector: ".overview-card--wide",
      softNote: "Open-ended — one complete sentence on the most important idea you learned about the large intestine." }
  }

};

if (typeof module !== "undefined" && module.exports) {
  module.exports = RUBRICS;
}
