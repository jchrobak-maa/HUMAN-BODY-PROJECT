/* =========================================================================
   HUMAN BODY MUSEUM — ORGAN CONTENT DATA
   =========================================================================
   This file holds ALL educational content for the research portal.
   It is the single source of truth for organ facts. Edit content HERE;
   do not bury text inside layout/markup elsewhere.

   STRUCTURE OF EACH ORGAN OBJECT:
     id              short key used by the app
     name            display name
     emoji           icon shown in the picker and headers
     overview        { location, bodySystem, mainFunction, whyItMatters }
     anatomy         array of { structure, function }  (powers the SVG reveal panel)
     higherLevel     one sentence tying structures to overall function
     connections     array of { system, detail }  (first 3 are required; a 4th is bonus)
     analysisPrompt  the "what if they couldn't communicate" read-only reflection
     disease         { name, scenario, whatsHappening, symptoms, causes,
                       prevention, treatment, publicHealthMessage }
     funFacts        array of strings
     vocab           array of { term, definition }   (Tier 3)
     sources         array of { name, url, note }
     watch           array of { name, url, note }  educational VIDEO links
                     (Khan Academy + KidsHealth; no YouTube). Powers the
                     "Watch & learn" section.
     reading         array of { h, p }  in-depth reading passage, ~9th-grade
                     level. Each paragraph (p) gets an optional subheading (h),
                     a per-paragraph note box, a read-aloud button, and inline
                     glossary highlighting of vocab terms. Optional per organ.

   NOTE TO BUILDER (Claude Code):
   - Treat all text as VERBATIM content. Format/style it, but do not rewrite
     the science or add new claims.
   - Every organ has exactly ONE disease case study, by design.
   - The anatomy array drives the interactive labeled SVG: each structure's
     "function" is what appears in the reveal panel when its label is clicked.
   ========================================================================= */

const ORGANS = [
  /* ----------------------------------------------------------------- HEART */
  {
    id: "heart",
    name: "Heart",
    reading: [
      { h: "A pump that never rests", p: "The heart is a muscular pump about the size of your fist, sitting just left of center in your chest. Its job sounds simple but is essential: keep blood moving in a continuous loop so that every cell receives oxygen and nutrients and gives up its waste. This constant movement is called circulation, and it never stops — the heart beats roughly 100,000 times a day, every day of your life." },
      { h: "Four chambers, two sides", p: "The heart is divided into four chambers. The two upper chambers are the atria (each one an atrium); the two lower chambers are the ventricles. A thick wall called the septum splits the heart into a right side and a left side. The right side handles oxygen-poor blood returning from the body, and the left side handles oxygen-rich blood coming back from the lungs. Because the septum keeps the two sides separate, 'used' and 'fresh' blood never mix." },
      { h: "One-way traffic", p: "Blood must travel in only one direction, and valves make that happen. A valve is a flap that opens to let blood through and snaps shut to stop it from flowing backward. The familiar 'lub-dub' heartbeat is the sound of these valves closing. Blood follows a fixed path: from the body to the right atrium, into the right ventricle, out to the lungs, back to the left atrium, into the left ventricle, and out to the body through the aorta, the largest artery." },
      { h: "Arteries, veins, and the lungs", p: "Blood vessels come in two main types. An artery carries blood away from the heart, while a vein carries it back. The right ventricle pumps oxygen-poor blood a short distance to the lungs, where it picks up oxygen and drops off carbon dioxide. That refreshed blood returns to the left side, and the powerful left ventricle pushes it out to the rest of the body. The heart and lungs are partners on every single beat and breath." },
      { h: "Keeping the body in balance", p: "Because it controls the delivery of oxygen, the heart is central to homeostasis — the body's effort to keep its internal conditions steady. When you exercise, your muscles need more oxygen, so signals from your nervous system and hormones like adrenaline tell the heart to beat faster. When you rest, it slows down. The heart even has its own built-in electrical system that sets this rhythm, which is why it can keep its own beat." }
    ],
    watch: [
      { name: "Khan Academy — Meet the heart!", url: "https://www.khanacademy.org/science/health-and-medicine/circulatory-system/circulatory-system-introduction/v/meet-the-heart", note: "Video lesson on how blood flows through the heart." },
      { name: "KidsHealth — How the Heart & Circulatory System Work", url: "https://kidshealth.org/en/kids/csmovie.html", note: "Animated video for kids on the heart pumping blood." }
    ],
    emoji: "🫀",
    overview: {
      location: "The heart sits in the chest, slightly left of center, behind the breastbone (sternum) and between the two lungs. It is roughly the size of your closed fist.",
      bodySystem: "Circulatory system (also called the cardiovascular system).",
      mainFunction: "The heart is a muscular pump. It pushes blood through the body in a continuous loop, delivering oxygen and nutrients to every cell and carrying away waste like carbon dioxide.",
      whyItMatters: "Every cell in your body needs a constant supply of oxygen to stay alive. The heart never stops working — it beats about 100,000 times a day. If it stops, oxygen delivery stops, and cells begin to die within minutes. The heart is central to homeostasis because it keeps blood moving so the body can maintain stable internal conditions."
    },
    anatomy: [
      { structure: "Right atrium", function: "Receives oxygen-poor blood returning from the body and passes it to the right ventricle." },
      { structure: "Right ventricle", function: "Pumps oxygen-poor blood to the lungs to pick up oxygen." },
      { structure: "Left atrium", function: "Receives oxygen-rich blood returning from the lungs and passes it to the left ventricle." },
      { structure: "Left ventricle", function: "The strongest chamber. Pumps oxygen-rich blood out to the entire body through the aorta." },
      { structure: "Valves (tricuspid, mitral, pulmonary, aortic)", function: "One-way 'doors' that keep blood flowing in the correct direction and prevent backflow." },
      { structure: "Aorta", function: "The largest artery; carries oxygen-rich blood from the left ventricle to the body." },
      { structure: "Septum", function: "The muscular wall that separates the left and right sides so oxygen-rich and oxygen-poor blood do not mix." },
      { structure: "Cardiac muscle (myocardium)", function: "Special muscle tissue that contracts to create the pumping action; it never tires." }
    ],
    higherLevel: "Each structure supports the heart's overall job of moving blood in one direction without mixing oxygen-rich and oxygen-poor blood. The chambers create the pumping rhythm, the valves enforce direction, the septum keeps the two blood supplies separate, and the muscle provides the force.",
    connections: [
      { system: "Respiratory system (lungs)", detail: "The heart pumps oxygen-poor blood to the lungs, where it picks up oxygen and releases carbon dioxide. The freshly oxygenated blood returns to the heart to be pumped out to the body. The two systems are partners in every breath." },
      { system: "Nervous system (brain)", detail: "The brain monitors the body and signals the heart to speed up or slow down. When you run, your nervous system tells your heart to beat faster to deliver more oxygen. When you rest, it slows down." },
      { system: "Endocrine system (hormones)", detail: "Hormones like adrenaline raise heart rate during stress or exercise. This is how the body prepares for 'fight or flight.'" },
      { system: "Muscular system (bonus)", detail: "During exercise, working muscles demand more oxygen, so the heart pumps harder and faster to supply them." }
    ],
    analysisPrompt: "What would happen if these systems could no longer work together? For example, if the brain could not signal the heart, it could not adjust to exercise or rest — blood flow would not match the body's needs.",
    disease: {
      name: "Coronary Artery Disease (CAD) / Heart Attack",
      scenario: "A 55-year-old patient experiences chest pain, shortness of breath, and pain spreading down the left arm.",
      whatsHappening: "The coronary arteries that supply blood to the heart muscle itself become narrowed or blocked by fatty buildup (plaque). When a section of heart muscle is starved of oxygen, those cells begin to die — this is a heart attack (myocardial infarction).",
      symptoms: "Chest pain or pressure, shortness of breath, pain in the arm/jaw/back, sweating, nausea, lightheadedness.",
      causes: "Diet high in saturated fat, smoking, lack of exercise, high blood pressure, family history, diabetes.",
      prevention: "Regular exercise, a balanced diet low in saturated fat, not smoking, managing stress and blood pressure.",
      treatment: "Medications (blood thinners, cholesterol drugs), procedures to reopen arteries (stents, bypass surgery), and lifestyle changes.",
      publicHealthMessage: "Habits you build now — staying active, avoiding smoking/vaping — protect your heart for decades."
    },
    funFacts: [
      "The heart beats roughly 100,000 times per day and about 2.5 billion times in an average lifetime.",
      "It pumps about 2,000 gallons of blood daily.",
      "The 'lub-dub' sound is the heart valves snapping shut.",
      "The heart has its own electrical system that sets its rhythm, which is why it can keep beating on its own pace."
    ],
    vocab: [
      { term: "Circulation", definition: "the continuous movement of blood through the body." },
      { term: "Homeostasis", definition: "the body's ability to maintain stable internal conditions." },
      { term: "Atrium", definition: "an upper receiving chamber of the heart." },
      { term: "Ventricle", definition: "a lower pumping chamber of the heart." },
      { term: "Artery", definition: "a vessel that carries blood away from the heart." },
      { term: "Vein", definition: "a vessel that carries blood back to the heart." }
    ],
    sources: [
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov", note: "reliable, plain-language medical info." },
      { name: "National Heart, Lung, and Blood Institute (NHLBI)", url: "https://www.nhlbi.nih.gov", note: "government source on the heart." },
      { name: "KidsHealth (Nemours)", url: "https://kidshealth.org", note: "written at an accessible reading level." },
      { name: "CDC Heart Disease", url: "https://www.cdc.gov/heartdisease", note: "prevention and public health data." }
    ]
  },

  /* ----------------------------------------------------------------- BRAIN */
  {
    id: "brain",
    name: "Brain",
    reading: [
      { h: "The body's control center", p: "The brain is the control center for everything you do. It produces your thoughts, feelings, and memories, and it directs both the actions you choose, like waving, and the ones you never think about, like breathing. It is an incredibly complex organ built from about 86 billion nerve cells, and it sits protected inside the bony skull and a cushion of fluid." },
      { h: "Billions of neurons", p: "The working unit of the brain is the neuron, a special cell that carries information as tiny electrical and chemical signals. Neurons connect to one another in vast networks, and a route that a signal travels along is called a neural pathway. When you learn something new, you are strengthening these pathways. The brain is hungry work: even though it is only about 2% of your body weight, it uses around 20% of your oxygen and energy." },
      { h: "Three main parts", p: "The brain has three major regions. The cerebrum is the large, wrinkled top part that handles thinking, the senses, personality, and voluntary movement; it is split into left and right halves. The cerebellum sits at the back and fine-tunes balance and coordination. The brainstem connects the brain to the spinal cord and runs the automatic jobs that keep you alive, such as heartbeat and breathing." },
      { h: "A two-way messaging system", p: "The brain does not work alone. It connects to the spinal cord and a body-wide network of nerves that carry messages in both directions — sensory information flowing in, and commands flowing out to the muscles. Some of these nerve fibers are remarkably long, reaching all the way from your toes to your spinal cord. Together the brain and spinal cord make up the central nervous system." },
      { h: "Linking to hormones and balance", p: "A small but powerful region called the hypothalamus helps the brain keep the body in balance, or homeostasis. It monitors signals like temperature, hunger, and thirst, and it links the nervous system to the endocrine system by controlling the pituitary gland. Through these connections the brain constantly checks the body's internal state and triggers adjustments to keep conditions stable." }
    ],
    watch: [
      { name: "Khan Academy — Structure of the nervous system", url: "https://www.khanacademy.org/science/health-and-medicine/human-anatomy-and-physiology/nervous-system-introduction/v/structure-of-the-nervous-system", note: "Video lesson on how the brain and nervous system are organized." },
      { name: "KidsHealth — How the Brain & Nervous System Work", url: "https://kidshealth.org/en/kids/nsmovie.html", note: "Animated video for kids on the brain and nerves." }
    ],
    emoji: "🧠",
    overview: {
      location: "Inside the skull, protected by the bony cranium and surrounded by protective fluid (cerebrospinal fluid). It sits at the top of the spinal cord.",
      bodySystem: "Nervous system. The brain is the control center of the entire body.",
      mainFunction: "The brain receives information from the senses, processes it, and sends out instructions to the rest of the body. It controls movement, thought, emotion, memory, and automatic functions like breathing and heartbeat.",
      whyItMatters: "The brain coordinates nearly everything the body does, consciously and unconsciously. It is central to homeostasis because it constantly monitors the body's internal state — temperature, hunger, oxygen levels — and triggers adjustments to keep conditions stable. Without the brain directing them, the other organs could not work together."
    },
    anatomy: [
      { structure: "Cerebrum", function: "The largest part. Controls thinking, voluntary movement, senses, and personality. Divided into left and right hemispheres." },
      { structure: "Cerebellum", function: "Located at the back, below the cerebrum. Controls balance, coordination, and fine motor movement." },
      { structure: "Brainstem", function: "Connects the brain to the spinal cord. Controls automatic functions: breathing, heart rate, blood pressure." },
      { structure: "Frontal lobe", function: "Front of the cerebrum. Handles decision-making, planning, and voluntary movement." },
      { structure: "Occipital lobe", function: "Back of the cerebrum. Processes vision." },
      { structure: "Hypothalamus", function: "Small but powerful. Regulates temperature, hunger, thirst, and links the nervous and endocrine systems." },
      { structure: "Neurons", function: "Specialized cells that carry electrical and chemical signals throughout the brain and body." }
    ],
    higherLevel: "Each structure supports the brain's overall job of gathering information, processing it, and sending out coordinated commands. The cerebrum handles conscious thought, the cerebellum fine-tunes movement, the brainstem keeps you alive automatically, and neurons are the wiring that carries every message.",
    connections: [
      { system: "Nervous system (rest of it)", detail: "The brain connects to the spinal cord and a body-wide network of nerves, sending and receiving signals to and from every body part. It is the command hub of this system." },
      { system: "Endocrine system (hormones)", detail: "The hypothalamus signals the pituitary gland, which controls hormone release throughout the body — influencing growth, stress response, and metabolism." },
      { system: "Circulatory system (heart/blood)", detail: "The brain demands a huge, constant supply of oxygen-rich blood — about 20% of the body's oxygen — even though it is only about 2% of body weight. It also regulates heart rate." },
      { system: "Muscular system (bonus)", detail: "The brain sends signals through nerves to tell muscles when and how to contract, enabling all voluntary movement." }
    ],
    analysisPrompt: "What would happen if these systems could no longer work together? For example, if the brain lost connection to the nervous system, signals could not reach the muscles — movement, sensation, and automatic functions would fail.",
    disease: {
      name: "Stroke",
      scenario: "A 60-year-old patient suddenly experiences slurred speech, a drooping face on one side, and weakness in one arm.",
      whatsHappening: "A stroke occurs when blood flow to part of the brain is interrupted — either by a clot blocking a vessel (ischemic stroke) or a vessel bursting (hemorrhagic stroke). Brain cells deprived of oxygen begin to die quickly, which is why a stroke is a medical emergency.",
      symptoms: "Sudden face drooping, arm weakness, slurred or difficult speech, confusion, trouble seeing or walking. The acronym FAST — Face, Arms, Speech, Time — helps people recognize it.",
      causes: "High blood pressure, smoking, diabetes, high cholesterol, irregular heartbeat, family history.",
      prevention: "Managing blood pressure, healthy diet, regular exercise, not smoking.",
      treatment: "Emergency clot-dissolving medication or surgery, followed by rehabilitation (physical, speech, occupational therapy). Speed of treatment strongly affects recovery — 'time is brain.'",
      publicHealthMessage: "Knowing the FAST warning signs can save a life — fast action during a stroke protects the brain."
    },
    funFacts: [
      "The brain contains roughly 86 billion neurons.",
      "It generates enough electricity to power a small LED light.",
      "The brain itself has no pain receptors — it cannot feel pain directly.",
      "It uses about 20% of your body's energy despite its small size."
    ],
    vocab: [
      { term: "Neuron", definition: "a specialized cell that transmits nerve signals." },
      { term: "Homeostasis", definition: "the body's ability to maintain stable internal conditions." },
      { term: "Cerebrum", definition: "the largest brain part, responsible for thought and voluntary action." },
      { term: "Cerebellum", definition: "the brain region controlling balance and coordination." },
      { term: "Hypothalamus", definition: "the brain structure that regulates temperature, hunger, and links to hormones." },
      { term: "Neural pathway", definition: "a route along which nerve signals travel." }
    ],
    sources: [
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov", note: "" },
      { name: "National Institute of Neurological Disorders and Stroke (NINDS)", url: "https://www.ninds.nih.gov", note: "" },
      { name: "KidsHealth (Nemours)", url: "https://kidshealth.org", note: "" },
      { name: "CDC Stroke", url: "https://www.cdc.gov/stroke", note: "" }
    ]
  },

  /* ------------------------------------------------------------------ LUNG */
  {
    id: "lung",
    name: "Lungs",
    reading: [
      { h: "Why we breathe", p: "Every cell in your body needs a steady supply of oxygen to release energy from food, and every cell produces carbon dioxide as waste that must be removed. The lungs handle both jobs. This trading of gases with the air is called respiration, and it is so important that cells begin to fail within minutes if it stops." },
      { h: "The path air takes", p: "Air enters through the nose and mouth and travels down the trachea, or windpipe. The trachea splits into two large tubes called bronchi, one for each lung. Inside the lungs these branch into smaller and smaller tubes called bronchioles, like an upside-down tree, carrying air deeper with every branch." },
      { h: "Where the trade happens", p: "At the very ends of the bronchioles sit millions of tiny air sacs called alveoli. This is where gas exchange takes place: oxygen passes from the air in the alveoli into the blood, while carbon dioxide passes from the blood into the air to be breathed out. The alveoli are wrapped in tiny blood vessels called capillaries, and if you spread them all out flat they would cover roughly the area of a tennis court." },
      { h: "The muscle that moves air", p: "Lungs cannot move on their own. A dome-shaped muscle below them, the diaphragm, does the work. When the diaphragm contracts and pulls down, it increases the space in your chest and draws air in; when it relaxes, air is pushed out. The muscles between your ribs help, too. You do this about 20,000 times a day, usually without thinking, because the brainstem controls it automatically." },
      { h: "Partners with the heart", p: "The lungs and the heart work as a team to keep the body in homeostasis. The heart pumps oxygen-poor blood to the lungs, the lungs refresh it, and the oxygen-rich blood returns to the heart to be sent around the body. The lungs also defend you, trapping dust and germs in mucus and sweeping them away with tiny hair-like structures called cilia." }
    ],
    watch: [
      { name: "Khan Academy — The lungs and pulmonary system", url: "https://www.khanacademy.org/science/health-and-medicine/human-anatomy-and-physiology/lung-introduction/v/the-lungs-and-pulmonary-system", note: "Video lesson introducing the lungs and breathing." },
      { name: "KidsHealth — How the Lungs & Respiratory System Work", url: "https://kidshealth.org/en/kids/rsmovie.html", note: "Animated video for kids on breathing and the lungs." }
    ],
    emoji: "🫁",
    overview: {
      location: "Inside the chest (thoracic cavity), one on each side of the heart, protected by the rib cage. The right lung has three lobes; the left has two (leaving room for the heart).",
      bodySystem: "Respiratory system.",
      mainFunction: "The lungs bring oxygen into the body and remove carbon dioxide. With every breath in, they pull in fresh air and pass oxygen into the blood; with every breath out, they release carbon dioxide waste.",
      whyItMatters: "Every cell needs oxygen to produce energy, and carbon dioxide must be removed before it builds up to dangerous levels. The lungs are essential to homeostasis because they help maintain the body's oxygen and carbon dioxide balance, and they help regulate the blood's pH. Without working lungs, oxygen cannot reach the blood, and cells begin to fail within minutes."
    },
    anatomy: [
      { structure: "Trachea (windpipe)", function: "The main airway that carries air from the throat down toward the lungs." },
      { structure: "Bronchi", function: "Two large branches that split off the trachea, one entering each lung." },
      { structure: "Bronchioles", function: "Smaller branching tubes that carry air deeper into the lungs." },
      { structure: "Alveoli", function: "Tiny air sacs at the end of the bronchioles where gas exchange happens — oxygen enters the blood and carbon dioxide leaves it." },
      { structure: "Capillaries", function: "Tiny blood vessels wrapped around the alveoli that pick up oxygen and drop off carbon dioxide." },
      { structure: "Diaphragm", function: "A dome-shaped muscle below the lungs that contracts to pull air in and relaxes to push air out." },
      { structure: "Pleura", function: "A thin protective membrane surrounding each lung, allowing smooth movement during breathing." }
    ],
    higherLevel: "Each structure supports the lungs' overall job of moving air in and out and exchanging gases with the blood. The trachea and bronchi are the pipes, the bronchioles deliver air to the alveoli, the alveoli and capillaries are the actual exchange site, and the diaphragm provides the pumping motion that drives breathing.",
    connections: [
      { system: "Circulatory system (heart/blood)", detail: "This is the lungs' closest partner. The heart pumps oxygen-poor blood to the lungs, the lungs oxygenate it, and the oxygen-rich blood returns to the heart to be pumped to the body. They work together on every single breath and heartbeat." },
      { system: "Nervous system (brain)", detail: "The brainstem automatically controls breathing rate, speeding it up during exercise and slowing it during rest — usually without you thinking about it." },
      { system: "Muscular system", detail: "The diaphragm and the muscles between the ribs (intercostal muscles) physically contract and relax to make breathing happen." },
      { system: "Immune system (bonus)", detail: "The lungs filter out dust, germs, and particles using mucus and tiny hair-like structures (cilia), helping defend the body from airborne invaders." }
    ],
    analysisPrompt: "What would happen if these systems could no longer work together? For example, if the nervous system could not signal the diaphragm, breathing would stop — oxygen would not enter the blood at all.",
    disease: {
      name: "Asthma",
      scenario: "A 14-year-old patient experiences wheezing, coughing, chest tightness, and shortness of breath, especially during exercise or around allergens.",
      whatsHappening: "In asthma, the airways (bronchioles) become inflamed and narrow, and the muscles around them tighten. This makes it harder for air to move in and out of the lungs. Extra mucus can further block the airways, causing the wheezing and difficulty breathing.",
      symptoms: "Wheezing, coughing (often at night or during exercise), chest tightness, shortness of breath.",
      causes: "Allergens (pollen, dust, pet dander), exercise, cold air, smoke, respiratory infections. Genetics and environment both play a role.",
      prevention: "Asthma cannot always be prevented, but flare-ups can be managed by avoiding triggers, using prescribed inhalers, and following an asthma action plan. Avoiding smoke and vaping protects the airways.",
      treatment: "Quick-relief inhalers (bronchodilators) that relax the airway muscles, and long-term control medications that reduce inflammation.",
      publicHealthMessage: "Avoiding smoking and vaping keeps your airways healthy — your lungs have to last a lifetime."
    },
    funFacts: [
      "If you spread out all the alveoli in your lungs flat, they would cover roughly the area of a tennis court.",
      "You take about 20,000 breaths a day.",
      "The right lung is slightly larger than the left because the heart takes up space on the left side.",
      "Lungs are the only organs that can float on water, because they are filled with air."
    ],
    vocab: [
      { term: "Respiration", definition: "the process of taking in oxygen and releasing carbon dioxide." },
      { term: "Alveoli", definition: "tiny air sacs in the lungs where gas exchange occurs." },
      { term: "Homeostasis", definition: "the body's ability to maintain stable internal conditions." },
      { term: "Diaphragm", definition: "the dome-shaped muscle that drives breathing." },
      { term: "Bronchi", definition: "the two main airways branching into each lung." },
      { term: "Gas exchange", definition: "the swapping of oxygen and carbon dioxide between the alveoli and the blood." }
    ],
    sources: [
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov", note: "" },
      { name: "National Heart, Lung, and Blood Institute (NHLBI)", url: "https://www.nhlbi.nih.gov", note: "" },
      { name: "KidsHealth (Nemours)", url: "https://kidshealth.org", note: "" },
      { name: "CDC Asthma", url: "https://www.cdc.gov/asthma", note: "" }
    ]
  },

  /* ---------------------------------------------------------------- KIDNEY */
  {
    id: "kidney",
    name: "Kidneys",
    reading: [
      { h: "The body's filters", p: "Your body is about 70% water, and that water constantly picks up waste from your cells. The kidneys are two bean-shaped organs, each about the size of a fist, that clean the blood. They remove waste and extra water and turn it into urine — a process of excretion that keeps harmful substances from building up to dangerous levels." },
      { h: "Millions of tiny filters", p: "Each kidney contains about a million microscopic filtering units called nephrons. Blood enters through the renal artery, and inside each nephron a process called filtration separates waste and excess fluid from the blood while keeping the useful substances. The word renal simply means 'related to the kidney.' The cleaned blood leaves through the renal vein, and the waste continues on as urine." },
      { h: "From kidney to bladder", p: "Urine produced in the kidneys drains into a funnel-shaped area and then travels down a tube called the ureter to the urinary bladder. The bladder is a stretchy, muscular sac that stores urine until you are ready to release it through another tube, the urethra. Muscles around the urethra let you control when this happens." },
      { h: "Balancing water and chemicals", p: "The kidneys are master regulators of homeostasis. They constantly adjust how much water stays in the body and keep substances like sodium and potassium at safe levels. When you are dehydrated, hormones tell the kidneys to conserve water, so your urine becomes darker; when you drink plenty, they release more. This is one big reason staying hydrated matters." },
      { h: "More than cleaning", p: "The kidneys do more than filter. They help control blood pressure by managing how much fluid stays in the blood, and they release a hormone that tells the body to make more red blood cells. They even help activate vitamin D for healthy bones. You can live a healthy life with just one kidney, which is why kidney donation is possible." }
    ],
    watch: [
      { name: "Khan Academy — The kidney and nephron", url: "https://www.khanacademy.org/science/biology/human-biology/kidney-nephron/v/the-kidney-and-nephron", note: "Video lesson on how nephrons filter the blood." },
      { name: "KidsHealth — How the Urinary System Works", url: "https://kidshealth.org/en/kids/usmovie.html", note: "Animated video for kids on the kidneys and urinary system." }
    ],
    emoji: "🫘",
    overview: {
      location: "Two bean-shaped organs in the back of the abdomen, one on each side of the spine, just below the rib cage. Each is about the size of a fist.",
      bodySystem: "Urinary system (also called the excretory or renal system).",
      mainFunction: "The kidneys filter waste and extra fluid out of the blood, producing urine. They also balance the body's water, salts, and minerals, and help control blood pressure.",
      whyItMatters: "The kidneys are master regulators of homeostasis. They constantly adjust the body's fluid and chemical balance, removing toxic waste before it builds up and keeping substances like sodium and potassium at safe levels. If the kidneys stop filtering, waste accumulates in the blood and quickly becomes life-threatening — which is why people with kidney failure need dialysis or a transplant."
    },
    anatomy: [
      { structure: "Nephrons", function: "The microscopic filtering units of the kidney — about a million per kidney. Each one filters blood and forms urine." },
      { structure: "Glomerulus", function: "A tiny cluster of blood vessels inside each nephron where filtration begins; it acts like a sieve." },
      { structure: "Renal cortex", function: "The outer layer of the kidney, where much of the filtering structure sits." },
      { structure: "Renal medulla", function: "The inner region that collects and concentrates urine." },
      { structure: "Renal pelvis", function: "A funnel-shaped area that collects urine and channels it toward the ureter." },
      { structure: "Ureter", function: "A tube that carries urine from the kidney down to the bladder." },
      { structure: "Renal artery / renal vein", function: "Blood vessels that bring blood in to be filtered and carry cleaned blood back out." }
    ],
    higherLevel: "Each structure supports the kidney's overall job of filtering blood and removing waste while keeping useful substances. The nephrons (with their glomeruli) do the actual filtering, the cortex and medulla organize and concentrate the urine, and the renal pelvis and ureter move the finished waste out toward the bladder.",
    connections: [
      { system: "Circulatory system (heart/blood)", detail: "The kidneys filter the entire blood supply many times a day. They also help control blood pressure by adjusting how much fluid stays in the blood and by releasing hormones that affect blood vessels." },
      { system: "Endocrine system (hormones)", detail: "The kidneys release hormones — including one that signals the body to make more red blood cells, and they help activate vitamin D for healthy bones." },
      { system: "Urinary system (bladder)", detail: "The kidneys send urine through the ureters to the bladder for storage until it is removed from the body." },
      { system: "Nervous system (bonus)", detail: "Nerve signals and hormones help the kidneys know when to conserve water (when you're dehydrated) versus release more." }
    ],
    analysisPrompt: "What would happen if these systems could no longer work together? For example, if the kidneys could not regulate blood fluid, blood pressure could swing dangerously, and waste would build up in the bloodstream.",
    disease: {
      name: "Kidney Stones",
      scenario: "A 30-year-old patient experiences sudden, severe pain in the side and back, pain while urinating, and blood-tinged urine.",
      whatsHappening: "Kidney stones are hard mineral deposits that form inside the kidney when certain substances (like calcium or salts) become too concentrated in the urine. Small stones may pass on their own, but larger ones can block the flow of urine and cause intense pain as they move through the urinary tract.",
      symptoms: "Severe pain in the side, back, or lower abdomen; pain during urination; pink, red, or brown urine; nausea.",
      causes: "Dehydration (not drinking enough water), diets high in salt or certain minerals, family history, and some medical conditions.",
      prevention: "Drinking plenty of water is the single most important step. Reducing excess salt and staying hydrated lowers the risk significantly.",
      treatment: "Small stones often pass with increased fluids and pain management; larger stones may need procedures like sound-wave therapy (lithotripsy) to break them up, or surgery.",
      publicHealthMessage: "Staying hydrated isn't just about thirst — drinking enough water helps your kidneys flush out waste and prevents painful stones."
    },
    funFacts: [
      "Your kidneys filter about 50 gallons of blood every day, producing roughly 1–2 quarts of urine.",
      "Each kidney contains about a million tiny filters called nephrons.",
      "You can live a healthy life with just one kidney — which is why kidney donation is possible.",
      "The kidneys receive about 20–25% of the blood pumped by the heart at rest."
    ],
    vocab: [
      { term: "Filtration", definition: "the process of separating waste and excess fluid from the blood." },
      { term: "Nephron", definition: "the microscopic filtering unit of the kidney." },
      { term: "Homeostasis", definition: "the body's ability to maintain stable internal conditions." },
      { term: "Urine", definition: "the liquid waste produced by the kidneys." },
      { term: "Excretion", definition: "the removal of waste products from the body." },
      { term: "Renal", definition: "a term meaning 'related to the kidneys.'" }
    ],
    sources: [
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov", note: "" },
      { name: "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)", url: "https://www.niddk.nih.gov", note: "" },
      { name: "KidsHealth (Nemours)", url: "https://kidshealth.org", note: "" },
      { name: "National Kidney Foundation", url: "https://www.kidney.org", note: "" }
    ]
  },

  /* ----------------------------------------------------------------- LIVER */
  {
    id: "liver",
    name: "Liver",
    reading: [
      { h: "The body's chemical factory", p: "The liver is the largest internal organ, weighing about three pounds and sitting in the upper-right part of your abdomen. Think of it as a busy chemical factory that performs over 500 different jobs. It filters the blood, processes the food you eat, stores energy, and removes poisons — work that is essential to keeping the body in homeostasis." },
      { h: "Cleaning the blood", p: "Blood leaving the stomach and intestines is rich in newly absorbed nutrients, but it can also carry harmful substances. This blood travels through the hepatic portal vein straight to the liver before going anywhere else. The word hepatic means 'related to the liver.' There, the liver sorts and processes nutrients and carries out detoxification — breaking down poisons, drugs, and alcohol so they can be safely removed." },
      { h: "Hepatocytes do the work", p: "Most of this chemistry happens inside the main liver cells, called hepatocytes. These cells filter, build, and store an enormous range of substances. They also make proteins that help your blood clot when you get a cut, which is why serious liver damage can cause easy bruising and bleeding." },
      { h: "Making bile for digestion", p: "One of the liver's key products is bile, a greenish fluid that helps digest fats. Bile flows through small bile ducts to the gallbladder, a little pouch that stores it. When you eat a fatty meal, the gallbladder squeezes bile into the small intestine, where it breaks large fat globules into tiny droplets the body can absorb." },
      { h: "Storing energy and regrowing", p: "The liver helps keep your blood sugar steady. After a meal it stores extra glucose as glycogen, then releases it back into the blood between meals when energy is needed. Remarkably, the liver is the only organ that can regrow lost tissue — even after losing up to two-thirds of itself, it can regenerate." }
    ],
    watch: [
      { name: "Khan Academy — Liver", url: "https://www.khanacademy.org/science/health-and-medicine/human-anatomy-and-physiology/gastrointestinal-system-introduction/v/liver", note: "Video lesson on the liver and its many jobs." },
      { name: "Khan Academy — Biliary tree", url: "https://www.khanacademy.org/science/health-and-medicine/human-anatomy-and-physiology/gastrointestinal-system-introduction/v/biliary-tree", note: "Video on bile production and the biliary system." }
    ],
    emoji: "🟤",
    overview: {
      location: "Upper right side of the abdomen, just below the diaphragm and above the stomach. It is the largest internal organ and the largest gland in the body, weighing about 3 pounds.",
      bodySystem: "Digestive system (it also plays major roles that support the circulatory and metabolic systems).",
      mainFunction: "The liver is the body's chemical processing plant. It filters toxins from the blood, produces bile to help digest fats, stores energy and nutrients, and converts food into substances the body can use.",
      whyItMatters: "The liver performs hundreds of jobs essential to homeostasis. It keeps blood sugar stable, removes poisons and drugs from the blood, manages cholesterol, and stores vitamins. It is also the only internal organ that can regrow lost tissue. Without the liver, toxins would build up in the blood and the body could not properly process food or medications."
    },
    anatomy: [
      { structure: "Lobes (right and left)", function: "The two main sections of the liver; the right is larger. They contain the working tissue." },
      { structure: "Hepatocytes", function: "The main liver cells that do most of the chemical work — filtering, processing, and storing." },
      { structure: "Bile ducts", function: "Small tubes that collect bile produced by the liver and carry it toward the gallbladder and intestine." },
      { structure: "Hepatic artery", function: "Brings oxygen-rich blood to the liver." },
      { structure: "Hepatic portal vein", function: "Brings nutrient-rich blood from the digestive organs so the liver can process what you've eaten." },
      { structure: "Gallbladder (closely connected)", function: "A small pouch that stores bile from the liver and releases it into the small intestine to digest fats." }
    ],
    higherLevel: "Each structure supports the liver's overall job of processing blood and producing substances the body needs. The hepatocytes do the chemical work, the dual blood supply (hepatic artery and portal vein) brings both oxygen and digested nutrients to be processed, and the bile ducts carry away the bile the liver makes for digestion.",
    connections: [
      { system: "Digestive system (stomach/intestines)", detail: "The liver produces bile, which breaks down fats in the small intestine. It also receives nutrient-rich blood directly from the digestive organs and processes those nutrients before they travel to the rest of the body." },
      { system: "Circulatory system (heart/blood)", detail: "The liver filters the blood, removing toxins, old red blood cells, and waste. It also makes proteins that help blood clot." },
      { system: "Endocrine/metabolic system", detail: "The liver stores glucose (as glycogen) and releases it to keep blood sugar steady between meals, working alongside hormones like insulin." },
      { system: "Immune system (bonus)", detail: "Special cells in the liver capture and destroy bacteria and worn-out cells passing through the blood." }
    ],
    analysisPrompt: "What would happen if these systems could no longer work together? For example, if the liver could not process blood from the digestive system, toxins and unprocessed nutrients would circulate through the body unchecked.",
    disease: {
      name: "Cirrhosis",
      scenario: "A 50-year-old patient experiences fatigue, yellowing of the skin and eyes (jaundice), swelling in the abdomen, and easy bruising.",
      whatsHappening: "Cirrhosis is severe scarring of the liver that builds up over time. As healthy liver tissue is replaced by scar tissue, the liver can no longer filter blood or perform its many jobs properly. The jaundice happens because the liver cannot process a yellow waste product called bilirubin, and easy bruising occurs because the liver isn't making enough clotting proteins.",
      symptoms: "Fatigue, jaundice (yellow skin/eyes), abdominal swelling, easy bruising or bleeding, nausea.",
      causes: "Long-term alcohol overuse, chronic viral hepatitis (hepatitis B and C), and fatty liver disease linked to obesity and diabetes.",
      prevention: "Limiting or avoiding alcohol, getting vaccinated against hepatitis B, maintaining a healthy weight, and avoiding risky behaviors that spread hepatitis.",
      treatment: "Treating the underlying cause early can slow or stop damage; in advanced cases, a liver transplant may be needed. Scar tissue itself cannot be reversed.",
      publicHealthMessage: "Your liver handles everything you put into your body — protecting it from alcohol and infection now keeps it working for life."
    },
    funFacts: [
      "The liver can regrow itself — even after losing up to about two-thirds of its tissue, it can regenerate.",
      "It performs over 500 different functions.",
      "The liver holds about 13% of the body's blood supply at any moment.",
      "It is the only organ that has two blood supplies coming in (the hepatic artery and the portal vein)."
    ],
    vocab: [
      { term: "Bile", definition: "a fluid made by the liver that helps digest fats." },
      { term: "Homeostasis", definition: "the body's ability to maintain stable internal conditions." },
      { term: "Hepatocyte", definition: "the main working cell of the liver." },
      { term: "Detoxification", definition: "the process of removing harmful substances from the blood." },
      { term: "Glycogen", definition: "the stored form of glucose the liver keeps for energy." },
      { term: "Hepatic", definition: "a term meaning 'related to the liver.'" }
    ],
    sources: [
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov", note: "" },
      { name: "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)", url: "https://www.niddk.nih.gov", note: "" },
      { name: "KidsHealth (Nemours)", url: "https://kidshealth.org", note: "" },
      { name: "American Liver Foundation", url: "https://liverfoundation.org", note: "" }
    ]
  },

  /* --------------------------------------------------------------- STOMACH */
  {
    id: "stomach",
    name: "Stomach",
    reading: [
      { h: "A muscular mixing bag", p: "The stomach is a stretchy, J-shaped sac in the upper-left abdomen, sitting between the esophagus and the small intestine. Its job is digestion: it stores the food you swallow and breaks it down into a soupy mixture. An empty stomach holds only about a cup, but it can stretch to hold roughly a quart of food." },
      { h: "Acid and enzymes", p: "The lining of the stomach contains gastric glands that release gastric juice — a powerful blend of mucus, enzymes, and hydrochloric acid. An enzyme is a substance that speeds up the breakdown of food, and the acid is strong enough to dissolve many materials, with a pH around 1.5 to 2. The word gastric means 'related to the stomach.' This acid also kills many harmful bacteria you swallow." },
      { h: "Why it doesn't digest itself", p: "If the stomach is full of acid strong enough to break down food, why doesn't it digest its own walls? The answer is a protective layer of mucus that coats the lining, which the stomach also rebuilds every few days. When that protection breaks down, acid can damage the wall and form a painful sore called an ulcer." },
      { h: "Gates at each end", p: "Food flow is controlled by two rings of muscle called sphincters. A sphincter opens to let material through and closes to hold it back. The lower esophageal sphincter at the top keeps acid from rising into the esophagus, and the pyloric sphincter at the bottom releases the food a little at a time into the small intestine, so digestion stays at a steady pace." },
      { h: "Part of a bigger team", p: "The stomach is one step in the digestive system, and it works on a schedule set by the rest of the body. Your brain can tell the stomach to release acid before you even take a bite — just smelling food can start it. The stomach also releases hormones that signal hunger and fullness, helping the body manage its supply of energy and nutrients, which is part of homeostasis." }
    ],
    watch: [
      { name: "Khan Academy — Stomach", url: "https://www.khanacademy.org/science/health-and-medicine/gastro-intestinal-system/gastrointestinal-intro/v/stomach", note: "Video lesson on the stomach's role in digestion." },
      { name: "KidsHealth — How the Digestive System Works", url: "https://kidshealth.org/en/kids/dsmovie.html", note: "Animated video for kids on digestion." }
    ],
    emoji: "🍽",
    overview: {
      location: "Upper left side of the abdomen, just below the diaphragm. It sits between the esophagus (the tube from the throat) and the small intestine.",
      bodySystem: "Digestive system.",
      mainFunction: "The stomach is a muscular, J-shaped sac that breaks down food. It mixes food with powerful acids and enzymes, turning it into a semi-liquid mixture that can move into the small intestine for further digestion.",
      whyItMatters: "The stomach is where serious chemical and physical digestion begins. It breaks food into a form the body can absorb, and its strong acid kills many harmful bacteria you swallow. It contributes to homeostasis by controlling the pace at which food enters the intestines and by helping maintain the body's supply of nutrients. Without it, the body would struggle to break down food — especially proteins."
    },
    anatomy: [
      { structure: "Lower esophageal sphincter", function: "A muscular ring at the top that opens to let food in and closes to keep stomach acid from rising into the esophagus." },
      { structure: "Fundus", function: "The upper curved region of the stomach that stores food and gas." },
      { structure: "Body", function: "The large central region where food is mixed with acids and enzymes." },
      { structure: "Rugae", function: "Folds in the stomach lining that expand to let the stomach hold more food." },
      { structure: "Gastric glands", function: "Glands in the lining that release stomach acid and digestive enzymes." },
      { structure: "Pyloric sphincter", function: "A muscular ring at the bottom that controls the release of food into the small intestine." },
      { structure: "Mucus lining", function: "A protective coating that keeps the stomach's own acid from digesting its walls." }
    ],
    higherLevel: "Each structure supports the stomach's overall job of breaking down food and releasing it at a controlled pace. The sphincters act as gates at each end, the rugae let the stomach stretch and hold a meal, the gastric glands provide the acid and enzymes that do the chemical breakdown, and the mucus lining protects the stomach from digesting itself.",
    connections: [
      { system: "Digestive system (rest of it)", detail: "The stomach receives food from the esophagus, partially digests it, and passes it to the small intestine. It works in sequence with every other digestive organ." },
      { system: "Nervous system (brain)", detail: "The brain triggers the stomach to release acid even before you eat (just smelling food can start it), and nerve signals control the stomach's churning muscle movements." },
      { system: "Endocrine system (hormones)", detail: "The stomach releases hormones that signal hunger and fullness and that tell other organs (like the pancreas) to prepare for digestion." },
      { system: "Circulatory system (bonus)", detail: "Nutrients released during early digestion eventually reach the bloodstream, and blood carries the stomach's hormone signals to other organs." }
    ],
    analysisPrompt: "What would happen if these systems could no longer work together? For example, if the nervous system could not signal the stomach, it might not produce acid or churn food at the right time, slowing or stalling digestion.",
    disease: {
      name: "Peptic Ulcer",
      scenario: "A 40-year-old patient experiences a burning stomach pain that gets worse between meals, bloating, and nausea.",
      whatsHappening: "A peptic ulcer is an open sore that forms in the stomach lining (or the upper small intestine) when the protective mucus layer is damaged and stomach acid eats into the tissue beneath. Most ulcers are caused by a bacterial infection (H. pylori) or by long-term use of certain pain relievers (NSAIDs).",
      symptoms: "Burning stomach pain, bloating, nausea, feeling full quickly, and in severe cases, dark stools from internal bleeding.",
      causes: "H. pylori bacterial infection, frequent use of NSAID pain relievers (like ibuprofen), and smoking. (Note: spicy food and stress can worsen symptoms but do not actually cause ulcers — a common myth.)",
      prevention: "Avoiding overuse of NSAID pain relievers, not smoking, and treating H. pylori infections.",
      treatment: "Antibiotics to clear the bacterial infection and medications that reduce stomach acid to let the ulcer heal.",
      publicHealthMessage: "Don't overuse over-the-counter pain relievers — taking them carefully and as directed protects your stomach lining."
    },
    funFacts: [
      "Stomach acid is strong enough to dissolve many materials — it is mostly hydrochloric acid with a pH around 1.5 to 2.",
      "The stomach lining replaces itself every few days so the acid doesn't digest it.",
      "An empty stomach holds only about a cup of contents but can stretch to hold around a quart of food.",
      "The 'growling' sound (borborygmi) comes from gas and fluid moving through the stomach and intestines."
    ],
    vocab: [
      { term: "Digestion", definition: "the breakdown of food into nutrients the body can absorb." },
      { term: "Homeostasis", definition: "the body's ability to maintain stable internal conditions." },
      { term: "Enzyme", definition: "a substance that speeds up the breakdown of food." },
      { term: "Gastric", definition: "a term meaning 'related to the stomach.'" },
      { term: "Sphincter", definition: "a ring of muscle that opens and closes to control flow." },
      { term: "Acid", definition: "a substance (here, in the stomach) that helps break down food and kill bacteria." }
    ],
    sources: [
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov", note: "" },
      { name: "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)", url: "https://www.niddk.nih.gov", note: "" },
      { name: "KidsHealth (Nemours)", url: "https://kidshealth.org", note: "" },
      { name: "Mayo Clinic", url: "https://www.mayoclinic.org", note: "" }
    ]
  },

  /* -------------------------------------------------------------- PANCREAS */
  {
    id: "pancreas",
    name: "Pancreas",
    reading: [
      { h: "One organ, two jobs", p: "The pancreas is a long, flat gland about six inches long, tucked behind the stomach. What makes it unusual is that it belongs to two body systems at once. As part of the digestive system it makes enzymes, and as part of the endocrine system it makes hormones. Endocrine means it releases its hormones straight into the blood." },
      { h: "Helping digest food", p: "Most of the pancreas is made of cells that produce digestive enzymes. These enzymes travel through the pancreatic duct into the small intestine, where they help break down carbohydrates, proteins, and fats so the body can absorb them. The pancreas makes about a quart of this digestive juice every day." },
      { h: "Controlling blood sugar", p: "Scattered through the pancreas are clusters of hormone-making cells called the islets of Langerhans. They release two hormones that control the amount of sugar (glucose) in your blood. A hormone is a chemical messenger carried by the blood to control activities elsewhere in the body." },
      { h: "Insulin and glucagon", p: "The two hormones work as opposites to keep blood sugar in a safe range — a clear example of homeostasis. After you eat, blood sugar rises, so the pancreas releases insulin, which lowers it by helping cells take in glucose. Between meals, blood sugar falls, so the pancreas releases glucagon, which raises it by telling the liver to release stored glucose. (Be careful: some books get this backward, but insulin lowers blood sugar and glucagon raises it.)" },
      { h: "When it goes wrong", p: "Because the pancreas manages blood sugar, problems with it can cause diabetes. In type 1 diabetes, the body's own immune system destroys the insulin-making cells, so sugar cannot move from the blood into the cells for energy. People with type 1 diabetes manage it by checking their blood sugar and taking insulin every day, which lets them live full, active lives." }
    ],
    watch: [
      { name: "Khan Academy — Pancreas: insulin & glucagon", url: "https://www.khanacademy.org/science/how-does-the-human-body-work/x0fe8768432761c62:chemical-coordination-and-integration/x0fe8768432761c62:adrenal-and-pancreas/v/pancreas-insulin-glucagon", note: "Video on how the pancreas controls blood sugar." },
      { name: "Khan Academy — Treating type 1 diabetes", url: "https://www.khanacademy.org/science/health-and-medicine/endocrine-system-diseases/diabetes/v/treating-type-i-diabetes", note: "Video connecting the pancreas to type 1 diabetes." }
    ],
    emoji: "🧪",
    overview: {
      location: "Deep in the abdomen, behind the stomach, stretching horizontally across the back of the belly. It is a long, flat gland about six inches long.",
      bodySystem: "It belongs to two systems at once — the digestive system and the endocrine system. This dual role makes it unusual and important.",
      mainFunction: "The pancreas has two jobs. As a digestive organ, it produces enzymes that break down food in the small intestine. As an endocrine gland, it produces hormones — most importantly insulin — that control blood sugar levels.",
      whyItMatters: "The pancreas is essential to homeostasis because it manages the body's blood sugar balance. Insulin lowers blood sugar after a meal, and another hormone (glucagon) raises it when it drops too low. At the same time, its digestive enzymes are critical for breaking down fats, proteins, and carbohydrates. When the pancreas cannot make enough insulin, the result is diabetes."
    },
    anatomy: [
      { structure: "Head, body, and tail", function: "The three main regions of the pancreas; the head sits near the small intestine and the tail near the spleen." },
      { structure: "Islets of Langerhans", function: "Clusters of hormone-producing cells that make insulin and glucagon to control blood sugar." },
      { structure: "Acinar cells", function: "Cells that produce digestive enzymes to break down food." },
      { structure: "Pancreatic duct", function: "A tube that carries digestive enzymes from the pancreas into the small intestine." },
      { structure: "Beta cells", function: "Cells within the islets that specifically produce insulin (which lowers blood sugar)." },
      { structure: "Alpha cells", function: "Cells within the islets that produce glucagon (which raises blood sugar)." }
    ],
    higherLevel: "Each structure supports the pancreas's overall job of managing both digestion and blood sugar. The acinar cells and pancreatic duct handle the digestive side (making and delivering enzymes), while the islets of Langerhans — with their beta and alpha cells — handle the hormonal side (releasing insulin and glucagon directly into the blood).",
    connections: [
      { system: "Digestive system (stomach/intestines)", detail: "The pancreas releases enzymes into the small intestine that break down carbohydrates, proteins, and fats so the body can absorb them." },
      { system: "Endocrine system (hormones)", detail: "The pancreas releases insulin and glucagon directly into the bloodstream to keep blood sugar within a safe range — lowering it after meals and raising it during fasting or exercise." },
      { system: "Circulatory system (heart/blood)", detail: "Blood carries the pancreas's hormones (insulin and glucagon) throughout the body, and the bloodstream is where blood sugar levels are constantly monitored and adjusted." },
      { system: "Liver (bonus)", detail: "The pancreas and liver work as a team on blood sugar — insulin tells the liver to store glucose, and glucagon tells it to release glucose back into the blood." }
    ],
    analysisPrompt: "What would happen if these systems could no longer work together? For example, if the pancreas could not send insulin through the bloodstream, blood sugar would rise to dangerous levels after every meal.",
    disease: {
      name: "Type 1 Diabetes",
      scenario: "A 12-year-old patient experiences extreme thirst, frequent urination, unexplained weight loss, and constant fatigue.",
      whatsHappening: "In Type 1 diabetes, the body's immune system mistakenly attacks and destroys the insulin-producing beta cells in the pancreas. Without insulin, sugar (glucose) cannot move from the blood into the body's cells for energy, so it builds up in the bloodstream while the cells starve. The body tries to flush the excess sugar out through urine, causing extreme thirst and frequent urination.",
      symptoms: "Extreme thirst, frequent urination, unexplained weight loss, fatigue, blurred vision, increased hunger.",
      causes: "Type 1 is an autoimmune condition; the exact cause isn't fully known, but genetics and possibly environmental triggers play a role. It is NOT caused by diet or lifestyle, and often appears in childhood or adolescence.",
      prevention: "Type 1 diabetes cannot currently be prevented. (This is an important contrast with Type 2 diabetes, which is strongly linked to lifestyle factors.)",
      treatment: "People with Type 1 diabetes manage it by monitoring blood sugar and taking insulin daily (by injection or pump) for life. Careful management lets people live full, active lives.",
      publicHealthMessage: "Recognizing the early warning signs of diabetes — extreme thirst, frequent urination, and sudden weight loss — can lead to faster diagnosis and treatment."
    },
    funFacts: [
      "The pancreas produces about a quart of digestive juice every day.",
      "It is one of the few organs that is both a gland and a digestive organ.",
      "Insulin was first discovered and used to treat diabetes in the 1920s, transforming a once-fatal disease into a manageable one.",
      "The 'islets of Langerhans' are named after the scientist who first described them."
    ],
    vocab: [
      { term: "Insulin", definition: "a hormone that lowers blood sugar by helping cells absorb glucose." },
      { term: "Glucagon", definition: "a hormone that raises blood sugar." },
      { term: "Homeostasis", definition: "the body's ability to maintain stable internal conditions." },
      { term: "Hormone", definition: "a chemical messenger released into the blood to control body functions." },
      { term: "Enzyme", definition: "a substance that speeds up the breakdown of food." },
      { term: "Endocrine", definition: "relating to glands that release hormones into the blood." }
    ],
    sources: [
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov", note: "" },
      { name: "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)", url: "https://www.niddk.nih.gov", note: "" },
      { name: "KidsHealth (Nemours)", url: "https://kidshealth.org", note: "" },
      { name: "American Diabetes Association", url: "https://diabetes.org", note: "" }
    ]
  },

  /* ------------------------------------------------------------------- EYE */
  {
    id: "eye",
    name: "Eye",
    watch: [
      { name: "Khan Academy — The structure of the eye", url: "https://www.khanacademy.org/test-prep/mcat/processing-the-environment/sight/v/vision-structure-of-the-eye", note: "Video lesson on eye anatomy and how vision works." },
      { name: "KidsHealth — How Do the Eyes Work?", url: "https://kidshealth.org/en/kids/eyes-movie.html", note: "Animated video for kids on how we see." }
    ],
    emoji: "👁",
    overview: {
      location: "Set within bony sockets (orbits) in the skull, one on each side of the nose, protected by the eyelids, lashes, and surrounding bone. Each eyeball is about an inch across.",
      bodySystem: "Nervous system (the eyes are sensory organs that connect directly to the brain). They are part of the body's sensory system.",
      mainFunction: "The eye detects light and turns it into electrical signals the brain can understand. It focuses incoming light onto light-sensitive cells, which send information through the optic nerve to the brain, where it becomes the images we 'see.'",
      whyItMatters: "Vision is one of the body's primary ways of gathering information about the world. The eye contributes to homeostasis by helping the body respond to its environment — spotting danger, finding food, and maintaining balance. It also automatically adjusts to different light levels to protect itself and keep vision clear. Without the eyes, the brain would lose its richest source of information about surroundings."
    },
    anatomy: [
      { structure: "Cornea", function: "The clear front layer that lets light in and begins focusing it." },
      { structure: "Pupil", function: "The black opening in the center that lets light into the eye; it shrinks in bright light and widens in dim light." },
      { structure: "Iris", function: "The colored ring of muscle that controls the size of the pupil." },
      { structure: "Lens", function: "A clear, flexible structure that fine-tunes focus, bending light onto the retina." },
      { structure: "Retina", function: "The light-sensitive layer at the back of the eye that converts light into electrical signals." },
      { structure: "Rods and cones", function: "Special cells in the retina; rods detect dim light and motion, cones detect color and detail." },
      { structure: "Optic nerve", function: "The cable that carries visual signals from the retina to the brain." }
    ],
    higherLevel: "Each structure supports the eye's overall job of capturing light and sending visual information to the brain. The cornea and lens focus the light, the iris and pupil control how much gets in, the retina (with its rods and cones) converts that light into signals, and the optic nerve delivers those signals to the brain for processing.",
    connections: [
      { system: "Nervous system (brain)", detail: "This is the eye's most essential partnership. The eye captures light, but the brain is what actually interprets the signals into images. The optic nerve is the direct link between them." },
      { system: "Muscular system", detail: "Tiny muscles move the eyeball so you can look in different directions, and muscles in the iris adjust the pupil. Muscles also control the lens's shape for focusing." },
      { system: "Circulatory system (blood)", detail: "Blood vessels deliver oxygen and nutrients to keep the delicate eye tissues healthy, especially the active cells of the retina." },
      { system: "Integumentary system (bonus)", detail: "The eyelids, lashes, and tears protect the eye's surface from dust, debris, and drying out." }
    ],
    analysisPrompt: "What would happen if these systems could no longer work together? For example, if the optic nerve could not carry signals to the brain, the eye could still detect light but the person would not be able to 'see' — the brain would receive nothing to interpret.",
    disease: {
      name: "Cataracts",
      scenario: "A 68-year-old patient experiences cloudy, blurry vision, faded colors, and difficulty seeing at night, especially with glare from headlights.",
      whatsHappening: "A cataract is a clouding of the eye's normally clear lens. Over time, proteins in the lens clump together and make it cloudy, like looking through a foggy window. This scatters and blocks light from focusing properly on the retina, causing blurry, dim vision.",
      symptoms: "Cloudy or blurry vision, faded or yellowed colors, poor night vision, glare or halos around lights, frequent changes in glasses prescription.",
      causes: "Aging is the most common cause. Other risk factors include long-term UV sun exposure, smoking, diabetes, and eye injury.",
      prevention: "Wearing sunglasses that block UV rays, not smoking, and protecting the eyes from injury can lower the risk or slow progression.",
      treatment: "Cataract surgery is very common and highly effective — the cloudy lens is removed and replaced with a clear artificial lens, restoring vision.",
      publicHealthMessage: "Wearing UV-blocking sunglasses isn't just about comfort — it protects your eyes from long-term damage that can lead to vision problems later in life."
    },
    funFacts: [
      "The eye can distinguish an estimated several million different colors.",
      "Your eyes process images upside down — the brain flips them right-side up.",
      "Rods in the retina are so sensitive they can detect very small amounts of light, which is why your vision adjusts in the dark.",
      "The eye is one of the fastest-reacting parts of the body, with muscles that move it constantly."
    ],
    vocab: [
      { term: "Retina", definition: "the light-sensitive layer at the back of the eye." },
      { term: "Homeostasis", definition: "the body's ability to maintain stable internal conditions." },
      { term: "Optic nerve", definition: "the nerve that carries visual signals to the brain." },
      { term: "Cornea", definition: "the clear front layer of the eye that focuses incoming light." },
      { term: "Pupil", definition: "the opening that controls how much light enters the eye." },
      { term: "Sensory organ", definition: "an organ that detects information from the environment." }
    ],
    sources: [
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov", note: "" },
      { name: "National Eye Institute (NEI)", url: "https://www.nei.nih.gov", note: "" },
      { name: "KidsHealth (Nemours)", url: "https://kidshealth.org", note: "" },
      { name: "American Academy of Ophthalmology", url: "https://www.aao.org", note: "" }
    ]
  },

  /* ------------------------------------------------------------------ SKIN */
  {
    id: "skin",
    name: "Skin",
    watch: [
      { name: "Khan Academy — What is skin?", url: "https://www.khanacademy.org/science/health-and-medicine/human-anatomy-and-physiology/integumentary-system-introduction/v/what-is-skin", note: "Video lesson on the skin and the epidermis." },
      { name: "KidsHealth — How Does the Skin Work?", url: "https://kidshealth.org/en/kids/skin-movie.html", note: "Animated video for kids on the layers of skin." }
    ],
    emoji: "🖐",
    overview: {
      location: "Covering the entire outside of the body — it is the body's outer layer. Skin is the body's largest organ, with a surface area of about 20 square feet in an adult.",
      bodySystem: "Integumentary system (which also includes hair, nails, and glands).",
      mainFunction: "The skin is the body's protective barrier. It shields the inside of the body from germs, injury, and harmful sun rays; helps control body temperature; senses touch, pressure, and pain; and prevents water loss.",
      whyItMatters: "The skin is a frontline defender and a key player in homeostasis. It regulates body temperature by sweating to cool down and adjusting blood flow to warm up or release heat. It keeps harmful microbes out, holds vital fluids in, and constantly senses the environment. Without skin, the body could not maintain stable temperature or protect itself from infection and dehydration."
    },
    anatomy: [
      { structure: "Epidermis", function: "The outermost layer; provides a waterproof barrier and creates skin tone. It constantly sheds and replaces itself." },
      { structure: "Dermis", function: "The thick middle layer containing nerves, blood vessels, hair roots, and glands." },
      { structure: "Hypodermis (subcutaneous layer)", function: "The deepest layer, made of fat and connective tissue; cushions the body and stores energy and heat." },
      { structure: "Sweat glands", function: "Produce sweat to cool the body and remove some waste." },
      { structure: "Sebaceous (oil) glands", function: "Produce oil that keeps skin and hair moisturized and protected." },
      { structure: "Hair follicles", function: "Structures in the dermis from which hair grows." },
      { structure: "Sensory receptors", function: "Nerve endings that detect touch, pressure, temperature, and pain." },
      { structure: "Melanocytes", function: "Cells that produce melanin, the pigment that gives skin color and protects against UV rays." }
    ],
    higherLevel: "Each structure supports the skin's overall job of protecting the body, regulating temperature, and sensing the environment. The epidermis forms the protective barrier, the dermis houses the working parts (nerves, vessels, glands), the sweat glands and blood vessels control temperature, the sensory receptors gather information, and melanocytes defend against the sun.",
    connections: [
      { system: "Nervous system (brain)", detail: "The skin is packed with sensory receptors that send touch, temperature, and pain signals to the brain, letting the body react to its surroundings." },
      { system: "Circulatory system (heart/blood)", detail: "Blood vessels in the skin widen to release heat (cooling you down) or narrow to conserve heat (warming you up), working with the heart to regulate temperature." },
      { system: "Immune system", detail: "The skin is the body's first line of defense, physically blocking germs and containing immune cells that fight invaders that get through." },
      { system: "Endocrine/metabolic system (bonus)", detail: "When exposed to sunlight, the skin helps produce vitamin D, which the body needs for healthy bones." }
    ],
    analysisPrompt: "What would happen if these systems could no longer work together? For example, if the skin could not signal the brain or adjust blood flow, the body could not regulate its temperature — it could dangerously overheat or get too cold.",
    disease: {
      name: "Melanoma (Skin Cancer)",
      scenario: "A 45-year-old patient notices a mole that has changed shape, has uneven edges and color, and has grown larger over a few months.",
      whatsHappening: "Melanoma is a serious type of skin cancer that begins in the melanocytes — the cells that produce skin pigment. It is most often triggered by DNA damage from UV radiation (sunlight or tanning beds). The damaged cells grow out of control, forming a tumor that can spread to other parts of the body if not caught early.",
      symptoms: "A new or changing mole, often remembered with the ABCDE rule — Asymmetry, irregular Borders, multiple Colors, Diameter larger than a pencil eraser, and Evolving/changing over time.",
      causes: "UV exposure from the sun or tanning beds, fair skin, history of sunburns, many moles, and family history.",
      prevention: "Wearing sunscreen, avoiding tanning beds, seeking shade, wearing protective clothing, and checking the skin regularly for changes.",
      treatment: "When caught early, melanoma is often treated successfully by surgically removing it. Advanced cases may require additional therapies. Early detection dramatically improves outcomes.",
      publicHealthMessage: "Skip the tanning beds and wear sunscreen — protecting your skin from UV rays now is the best way to prevent skin cancer later."
    },
    funFacts: [
      "Skin is the body's largest organ, covering about 20 square feet.",
      "You shed and replace your outer skin cells constantly — losing millions of skin cells every day.",
      "The skin completely renews its outer layer roughly every month.",
      "Skin helps make vitamin D when exposed to sunlight."
    ],
    vocab: [
      { term: "Integumentary system", definition: "the body system made of skin, hair, nails, and glands." },
      { term: "Homeostasis", definition: "the body's ability to maintain stable internal conditions." },
      { term: "Epidermis", definition: "the outermost layer of skin." },
      { term: "Dermis", definition: "the middle layer of skin containing nerves and glands." },
      { term: "Melanin", definition: "the pigment that gives skin its color and protects against UV rays." },
      { term: "Regulate", definition: "to control or maintain something at a steady level (like temperature)." }
    ],
    sources: [
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov", note: "" },
      { name: "National Institute of Arthritis and Musculoskeletal and Skin Diseases (NIAMS)", url: "https://www.niams.nih.gov", note: "" },
      { name: "KidsHealth (Nemours)", url: "https://kidshealth.org", note: "" },
      { name: "American Academy of Dermatology", url: "https://www.aad.org", note: "" }
    ]
  },

  /* -------------------------------------------------------- SMALL INTESTINE */
  {
    id: "small-intestine",
    name: "Small Intestine",
    reading: [
      { h: "Long, narrow, and busy", p: "The small intestine is a coiled tube about 20 feet long, which makes it longer than the large intestine. It is called 'small' only because it is narrow. This is where most chemical digestion finishes and where nearly all absorption happens — the taking of nutrients into the bloodstream." },
      { h: "Three sections", p: "The small intestine has three parts. The first, the duodenum, receives partly digested food from the stomach along with bile from the liver and enzymes from the pancreas to break the food down further. The middle section, the jejunum, does most of the absorbing, and the final section, the ileum, absorbs what remains before passing leftovers to the large intestine." },
      { h: "A giant surface area", p: "To absorb as much as possible, the inner wall is folded and covered with millions of tiny finger-like bumps called villi, and each one is covered with even smaller microvilli. All this folding gives the small intestine a huge surface area — often compared to the size of a tennis court — packed into your abdomen. A nutrient is a substance from food the body needs for energy, growth, and repair." },
      { h: "Into the blood", p: "Inside each villus are tiny blood vessels called capillaries. As nutrients are absorbed, they pass through the thin intestinal wall into these capillaries, which carry them to the liver for processing and then on to the rest of the body. Without this step, food could be fully digested and the body's cells would still starve — so absorption is vital to homeostasis." },
      { h: "Keeping food moving", p: "Food is pushed along the intestine by waves of muscle contraction called peristalsis. These waves keep the contents moving in one direction during digestion, which takes food roughly three to five hours to travel the whole length. Nerve signals control the timing, and hormones tell the pancreas and gallbladder when to send their juices." }
    ],
    watch: [
      { name: "Khan Academy — Small intestine 3: Absorption", url: "https://www.khanacademy.org/science/health-and-medicine/gastro-intestinal-system/gastrointestinal-intro/v/small-intestine-part-3-absorption", note: "Video on nutrient absorption and villi." },
      { name: "KidsHealth — How the Digestive System Works", url: "https://kidshealth.org/en/kids/dsmovie.html", note: "Animated video for kids covering the small intestine." }
    ],
    emoji: "🦠",
    overview: {
      location: "Coiled in the center of the abdomen, below the stomach. Despite the name 'small,' it is actually very long — about 20 feet — but it is called 'small' because it is narrow compared to the large intestine.",
      bodySystem: "Digestive system.",
      mainFunction: "The small intestine is where most digestion and nearly all nutrient absorption happen. It breaks food down further using enzymes and bile, then absorbs the nutrients into the bloodstream to fuel the entire body.",
      whyItMatters: "The small intestine is the body's main site for absorbing nutrients, making it essential to homeostasis. It pulls out the carbohydrates, proteins, fats, vitamins, and minerals the body needs and passes them into the blood for delivery to every cell. Without it, the body could not extract energy and nutrients from food, no matter how much a person ate."
    },
    anatomy: [
      { structure: "Duodenum", function: "The first section; receives food from the stomach plus enzymes from the pancreas and bile from the liver to break food down." },
      { structure: "Jejunum", function: "The middle section; where much of the nutrient absorption takes place." },
      { structure: "Ileum", function: "The final section; absorbs remaining nutrients and connects to the large intestine." },
      { structure: "Villi", function: "Tiny finger-like projections lining the inside that hugely increase the surface area for absorbing nutrients." },
      { structure: "Microvilli", function: "Even smaller projections on the villi that further increase the absorbing surface." },
      { structure: "Smooth muscle walls", function: "Muscles that contract in waves (peristalsis) to push food through the intestine." },
      { structure: "Capillaries", function: "Tiny blood vessels inside the villi that carry absorbed nutrients into the bloodstream." }
    ],
    higherLevel: "Each structure supports the small intestine's overall job of breaking down food and absorbing nutrients. The three sections (duodenum, jejunum, ileum) handle digestion and absorption in stages, the villi and microvilli create an enormous surface area to absorb as much as possible, the muscle walls keep food moving, and the capillaries carry the absorbed nutrients away into the blood.",
    connections: [
      { system: "Digestive system (stomach, liver, pancreas)", detail: "The small intestine receives partially digested food from the stomach, bile from the liver, and enzymes from the pancreas — then does the main work of digestion and absorption before passing leftovers to the large intestine." },
      { system: "Circulatory system (heart/blood)", detail: "Absorbed nutrients pass through the intestinal wall into the bloodstream, which carries them to the liver for processing and then to the rest of the body." },
      { system: "Nervous system (brain)", detail: "Nerve signals control the muscle contractions (peristalsis) that move food along, and coordinate the timing of digestion." },
      { system: "Endocrine system (bonus)", detail: "The small intestine releases hormones that signal the pancreas and gallbladder to send enzymes and bile at the right time." }
    ],
    analysisPrompt: "What would happen if these systems could no longer work together? For example, if absorbed nutrients could not pass into the circulatory system, food would be digested but the body's cells would still starve.",
    disease: {
      name: "Celiac Disease",
      scenario: "A 16-year-old patient experiences bloating, diarrhea, fatigue, and poor growth, especially after eating bread and pasta.",
      whatsHappening: "Celiac disease is an autoimmune condition where eating gluten — a protein found in wheat, barley, and rye — triggers the immune system to attack the lining of the small intestine. This damages the villi, flattening them so they can no longer absorb nutrients properly. As a result, the body becomes malnourished even when the person eats enough food.",
      symptoms: "Bloating, diarrhea, abdominal pain, fatigue, weight loss or poor growth, and nutrient deficiencies (like low iron).",
      causes: "Celiac disease is genetic (it runs in families) and is an autoimmune reaction to gluten. It is not an allergy or a food intolerance — it is the immune system damaging the body's own tissue.",
      prevention: "Celiac disease cannot be prevented, but the damage can be stopped and reversed by removing gluten from the diet.",
      treatment: "The only treatment is a strict, lifelong gluten-free diet. Once gluten is removed, the villi can heal and normal absorption returns.",
      publicHealthMessage: "Ongoing digestive problems and fatigue aren't something to just push through — seeing a doctor can uncover conditions like celiac disease that are very manageable once diagnosed."
    },
    funFacts: [
      "The small intestine is about 20 feet long — longer than the large intestine, despite its name.",
      "Its villi and microvilli give it a huge total surface area, often compared to the size of a tennis court, all packed into your abdomen.",
      "Most of the nutrients your body absorbs from food are taken in here, not in the stomach.",
      "It takes food roughly 3 to 5 hours to travel through the small intestine."
    ],
    vocab: [
      { term: "Absorption", definition: "the process of taking nutrients into the bloodstream." },
      { term: "Homeostasis", definition: "the body's ability to maintain stable internal conditions." },
      { term: "Villi", definition: "tiny finger-like projections that increase absorption surface area." },
      { term: "Peristalsis", definition: "the wave-like muscle contractions that move food along." },
      { term: "Digestion", definition: "the breakdown of food into nutrients the body can absorb." },
      { term: "Nutrient", definition: "a substance from food the body needs for energy, growth, and repair." }
    ],
    sources: [
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov", note: "" },
      { name: "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)", url: "https://www.niddk.nih.gov", note: "" },
      { name: "KidsHealth (Nemours)", url: "https://kidshealth.org", note: "" },
      { name: "Mayo Clinic", url: "https://www.mayoclinic.org", note: "" }
    ]
  },

  /* -------------------------------------------------------- LARGE INTESTINE */
  {
    id: "large-intestine",
    name: "Large Intestine",
    reading: [
      { h: "The final stretch", p: "The large intestine frames the coiled small intestine like a border around the abdomen. It is shorter than the small intestine — about five feet — but wider, which is why it is called 'large.' Its job begins after the small intestine has taken out the nutrients: it handles what is left over." },
      { h: "Saving water", p: "A major task of the large intestine is the absorption of water. As leftover material passes through, the large intestine reabsorbs large amounts of water back into the body, which helps prevent dehydration and is an important part of homeostasis. As the water is removed, the leftovers thicken into solid waste called feces." },
      { h: "The colon's path", p: "The main, longest part of the large intestine is the colon, which has four sections that travel up the right side, across the top, and down the left side of the belly. Material enters from the small intestine at a pouch called the cecum and slowly moves through the colon as water is absorbed, completing the last stage of digestion." },
      { h: "Trillions of helpers", p: "The large intestine is home to trillions of helpful bacteria known together as the gut microbiome — in fact there are more microbes in your gut than cells in your whole body. These bacteria break down some leftover material and even produce certain vitamins, such as vitamin K, which helps your blood clot. A large share of the body's immune cells also sit in the gut." },
      { h: "Storing and releasing waste", p: "At the end of the large intestine, the rectum stores feces until they can be released from the body through the anus, which is controlled by muscular sphincters. Nerve signals trigger the urge to go. The appendix, a small pouch near the cecum, has only a minor role, though it may help store helpful gut bacteria." }
    ],
    watch: [
      { name: "Khan Academy — Colon, rectum, and anus", url: "https://www.khanacademy.org/test-prep/mcat/organ-systems/the-gastrointestinal-system/v/colon-rectum-anus", note: "Video lesson on the large intestine and water absorption." },
      { name: "KidsHealth — How the Digestive System Works", url: "https://kidshealth.org/en/kids/dsmovie.html", note: "Animated video for kids covering the large intestine." }
    ],
    emoji: "📦",
    overview: {
      location: "Frames the abdomen, surrounding the coiled small intestine like a border. It runs up the right side, across the top, and down the left side of the belly. It is about 5 feet long but wider than the small intestine — which is why it is called 'large.'",
      bodySystem: "Digestive system.",
      mainFunction: "The large intestine processes what is left after the small intestine has absorbed the nutrients. It absorbs water and some remaining minerals, turns the leftover material into solid waste (feces), and stores it until it leaves the body.",
      whyItMatters: "The large intestine is key to homeostasis because it manages the body's water balance — reabsorbing large amounts of water so the body doesn't lose too much and become dehydrated. It is also home to trillions of helpful bacteria (the gut microbiome) that aid digestion and produce certain vitamins. Without it, the body would lose excessive water and struggle to eliminate solid waste."
    },
    anatomy: [
      { structure: "Cecum", function: "The pouch at the start of the large intestine, where leftover material enters from the small intestine." },
      { structure: "Colon (ascending, transverse, descending, sigmoid)", function: "The longest part; absorbs water and minerals as material passes through its four sections." },
      { structure: "Rectum", function: "Stores solid waste until it is ready to be eliminated." },
      { structure: "Anus", function: "The opening through which waste leaves the body, controlled by muscular sphincters." },
      { structure: "Appendix", function: "A small pouch attached to the cecum; its role is minor, but it may help store helpful gut bacteria." },
      { structure: "Gut bacteria (microbiome)", function: "Trillions of helpful microbes that break down leftover material and produce some vitamins (like vitamin K)." }
    ],
    higherLevel: "Each structure supports the large intestine's overall job of absorbing water and forming and eliminating waste. The cecum receives the leftovers, the colon's four sections reabsorb water and minerals as material moves through, the gut bacteria help process what remains, and the rectum and anus store and release the solid waste.",
    connections: [
      { system: "Digestive system (small intestine)", detail: "The large intestine receives the watery leftover material from the small intestine after nutrients have been absorbed, and completes the final stage of digestion." },
      { system: "Circulatory system (heart/blood)", detail: "The water and minerals the large intestine reabsorbs pass into the bloodstream, helping maintain the body's fluid balance." },
      { system: "Immune system", detail: "A large portion of the body's immune cells are located in the gut, and the helpful bacteria of the large intestine help crowd out harmful microbes." },
      { system: "Nervous system (bonus)", detail: "Nerve signals control the muscle contractions that move waste along and trigger the urge to eliminate it." }
    ],
    analysisPrompt: "What would happen if these systems could no longer work together? For example, if the large intestine could not reabsorb water into the circulatory system, the body would lose too much fluid and become dangerously dehydrated.",
    disease: {
      name: "Appendicitis",
      scenario: "A 15-year-old patient experiences sudden pain that starts near the belly button and moves to the lower right abdomen, along with fever, nausea, and loss of appetite.",
      whatsHappening: "Appendicitis is an inflammation of the appendix, the small pouch attached to the large intestine. It usually happens when the appendix gets blocked — by hardened stool, swelling, or infection — causing bacteria to multiply inside it. The appendix swells and fills with pus. If it isn't removed in time, it can burst and spread infection through the abdomen, which is a medical emergency.",
      symptoms: "Pain starting near the navel and shifting to the lower right abdomen, fever, nausea, vomiting, loss of appetite, and pain that worsens with movement.",
      causes: "A blockage in the appendix, often from hardened stool or infection. It is most common in people between the ages of 10 and 30.",
      prevention: "Appendicitis generally cannot be prevented. The key is recognizing the symptoms early and getting medical care quickly.",
      treatment: "The standard treatment is surgery to remove the appendix (an appendectomy). People live perfectly healthy lives without an appendix.",
      publicHealthMessage: "Sudden, worsening pain in the lower right abdomen with fever is a warning sign — don't ignore it. Getting medical help quickly can prevent a serious emergency."
    },
    funFacts: [
      "Your large intestine is home to trillions of bacteria — there are more microbes in your gut than there are cells in your entire body.",
      "It reabsorbs a large amount of water each day, helping prevent dehydration.",
      "Gut bacteria produce certain vitamins, including vitamin K, which helps blood clot.",
      "Even though it is shorter than the small intestine (about 5 feet vs. 20 feet), it is called 'large' because it is wider."
    ],
    vocab: [
      { term: "Microbiome", definition: "the community of helpful bacteria living in the gut." },
      { term: "Homeostasis", definition: "the body's ability to maintain stable internal conditions." },
      { term: "Colon", definition: "the main, longest section of the large intestine." },
      { term: "Absorption", definition: "the process of taking water and nutrients into the body." },
      { term: "Feces", definition: "the solid waste eliminated from the body." },
      { term: "Digestion", definition: "the breakdown of food into nutrients the body can absorb." }
    ],
    sources: [
      { name: "MedlinePlus (U.S. National Library of Medicine)", url: "https://medlineplus.gov", note: "" },
      { name: "National Institute of Diabetes and Digestive and Kidney Diseases (NIDDK)", url: "https://www.niddk.nih.gov", note: "" },
      { name: "KidsHealth (Nemours)", url: "https://kidshealth.org", note: "" },
      { name: "Mayo Clinic", url: "https://www.mayoclinic.org", note: "" }
    ]
  }
];

/* Make available to the app. Works whether loaded via <script> or a bundler. */
if (typeof module !== "undefined" && module.exports) {
  module.exports = ORGANS;
}
