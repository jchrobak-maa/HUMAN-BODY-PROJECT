# Classroom Research Portal — Build Prompt for Claude Code

> **Paste this entire file as the first message in a brand-new Claude Code session that's pointed at an empty repository.** It tells Claude what to build, the architecture decisions already made, and what to ask you first.

## What you're building

A single-page **classroom research portal** for one topic, used as **Step 1 of a student project** that culminates in a deliverable like an infographic, poster, or presentation. Each student is assigned a single **subtopic** to research in depth, takes notes inside the site, and the teacher reviews everything from a teacher portal.

A working reference implementation exists at:
**https://github.com/jchrobak-maa/HUMAN-BODY-PROJECT** (Human Body Museum, 11 organs). You can browse the source there to see exact patterns. Match its UX and architecture.

## Stack — do NOT deviate

- **Static site**: HTML + vanilla CSS + vanilla JS. No framework, no build step, no npm.
- **Deployed via GitHub Pages** from the repo root.
- **Persistence**: a single **Google Sheet via a free Apps Script web app**. POST writes are made `mode: "no-cors"` with `type: "activity"` or default `"note"` discriminator. Reads are **JSONP** (script tag with `?callback=…`) to sidestep CORS.
- **No backend service, no API key, no paid services anywhere.**

## Before you write any code — ask the user

Ask all of these in **one round**, then proceed:

1. **Topic title** — e.g. "Volcanoes of the World", "US Presidents", "Chemical Elements", "Shakespeare Plays".
2. **Subtopic list** — the things students will be assigned (5–15 items). E.g. for volcanoes: Vesuvius, Krakatoa, Mount St. Helens, Eyjafjallajökull, Mauna Loa, etc.
3. **Reading level** for the in-depth passages (e.g. "9th grade", "middle school").
4. **Project deliverable** — what students do with the research (e.g. "infographic", "trifold", "5-min presentation"). You'll use this in the Home page's project context callout.
5. **Number of clusters (class periods)** — default 5 (clusters a–e).
6. **Students per cluster** — default 12 (so `student1a`–`student12a`, etc.).
7. **Teacher login** — short password, e.g. `teacher1`. Used only by `teacher.html` and stored as a constant in the Apps Script.
8. **Source material** — does the user have a PDF/article/textbook to draw from, or should you draft content yourself for them to proofread?

## Feature requirements

Build ALL of these. They're proven to work together; the reference repo has every one of them.

### Content & structure (per subtopic)
- **Overview**: location, system/category, main function/purpose, why it matters.
- **Parts/anatomy**: array of `{ structure, function }` powering a clickable labeled SVG diagram. Click numbered pins (or the matching legend item) → a reveal panel shows that part's function.
- **"How it works with other systems"** (or topic-appropriate equivalent — for non-anatomy topics this might be "Connections" or "Related to"): array of `{ category, detail }` plus an `analysisPrompt`.
- **Case study** (disease for organs; for other topics: a real-world scenario — for volcanoes, an eruption case; for presidents, a major decision; for elements, a famous use/disaster): scenario, what's happening, causes, prevention/avoidance, treatment/response, key takeaway.
- **Fun facts** — array of 3–5.
- **Vocab** — array of `{ term, definition }`.
- **Sources** — array of `{ name, url, note }` with reputable references.
- **Watch & learn** — `[{ name, url, note }]` of curated non-YouTube video links (Khan Academy, KidsHealth, museums, gov sites). **Verify URLs via WebSearch** before adding.
- **In-depth reading** — array of `{ h, p }` paragraphs at the requested grade level, paraphrased from sources in your own words.
- **Concept figure** (optional) — a small original SVG diagram (we own it, no licensing risk) attached to the most relevant reading paragraph.

### Site structure
- **Home page** with a top hero, a bolded project-context callout (`"This is the first step of your {project deliverable}. You will use the research and notes you collect here to build a {deliverable} about your assigned {subtopic}."`), a **numbered "For students — start here" steps box**, a feature grid, a subtopic picker grid, and a small "For teachers" panel that links to `teacher.html`.
- **Sidebar nav** with a 🏛️ Home link + every subtopic (with emoji + name).
- **Per-subtopic page** rendered from a single data object: hero → Overview → Anatomy/Parts (interactive diagram) → How it works with other systems → Case study → Fun facts → Vocab → In-depth reading (paragraphs with per-paragraph notes) → Watch & learn → Big takeaway note → Sources.

### Read-aloud
- **🔊 Listen button** on Overview, Case study, and every reading paragraph. Use `window.speechSynthesis` (free, built-in). Single active utterance — clicking another stops the first.

### Hover glossary
- After each page renders, scan the prose for vocab terms and wrap the **first occurrence per section** with a hover-and-tap definition tooltip. Keyboard-accessible (Tab + Enter/Space). Esc closes.

### Per-paragraph reading notes
- Each reading paragraph gets its own compact note box beside it (two-column on desktop, stacked on mobile). The note is tagged `section: "Deep dive ¶N"` when saved.

### Login (soft gate — not real auth)
- **Persistent auth bar** at the top of every page.
- Student usernames: `student<1-N><a-e>` where N is the students-per-cluster and a-e are the clusters. Teacher: literal `teacher1` (or whatever they chose).
- Username = password (a roster soft gate, NOT real security — be transparent about this in any docs you write).
- A required **"First name only — no last names"** field (bold warning) collected at login.
- Notes are stored under `localStorage["hbm_notes::<username>"]` so the next student on a shared computer can't see the previous student's notes.
- Session in `sessionStorage` (clears on browser close).
- **Explicit Log out** button + **auto-logout after 20 min of idle** (`autoLogoutMinutes` in `config.js`).
- The cluster letter is parsed from the username automatically.

### Per-section note catchers (5 per page)
After the Overview, Anatomy, How it works, Case study, and at the very bottom (Big takeaway), insert a teal-inset note box with a guiding prompt. Each save posts a `note` record to the Sheet.

### Optional self-check (free, rule-based)
- A **🔍 Check my answer** button next to Save on every note box that has a rubric.
- Rubrics live in `rubrics.js` keyed by `subtopicId.sectionKey` and contain `expect` (synonym arrays), `misconceptions` (regex triggers with custom hints), `hintLabel`, `hintSelector`, optional `softNote`.
- Four verdicts: **good** (green ✓), **close** (amber ⚠), **miss** (red ✗ — also fired by any misconception trigger), **soft** (teal 💡 for open-ended prompts).
- **"Show me where →"** scrolls to + pulses (3 flashes) the relevant section.
- Never blocks Save. **Generate the rubrics for all subtopics yourself** unless the user said they'd write them.
- **Spelling-tolerant matching**: ship a tiny Levenshtein helper in app.js. For each single-word expected term, allow 0 typos under 5 chars, 1 typo for 5–9 chars, 2 typos for 10+ chars. Multi-word terms ("blood sugar") stay strict substring. So "circulatry" still credits "circulatory" but short words don't accidentally match. Misconception regex triggers stay exact.

### Accessibility for struggling writers
- **Spell-check on**: every textarea gets `spellcheck="true"`. Add a small one-liner under each note box telling students they can right-click (or long-press on touch) red-squiggled words for suggestions.
- **Per-note word bank**: above the textarea, show clickable chips of the subtopic's general vocab + anatomy structure names (de-duplicated, parenthetical aliases split out as separate chips). Clicking a chip inserts the word at the cursor and refocuses the textarea.
  - **Source the chips from `vocab` + `anatomy` — NOT from the rubric's `expect` list.** This helps spelling and recall without handing over the literal answer keys.

### Printable worksheets
- `packet.html?#<subtopic-id>` (or `#all`) renders a print-optimized worksheet with all content + ruled blank lines after each prompt. Hide the toolbar in `@media print`. Linked from every subtopic hero and from the teacher portal.

### Cluster color coding
Color-code clusters a–e with a **muted, colorblind-friendly palette** (not pure saturated colors). Default mapping: A=red, B=yellow, C=green, D=orange, E=purple, all with soft pastel fills + bold left edge + dark text. Used in:
- The teacher portal cluster header bands.
- A small "Cluster X" pill on each student card.
- The student's auth-bar period chip.

### Teacher portal (`teacher.html`)
- **Key-gated** by `teacher1` (or whatever the teacher chose). Stored only in Apps Script as `TEACHER_KEY`, **never in the page source** (don't display it as default text on the page).
- Two-level grouping: **Cluster → Student → Notes-by-organ**.
- **Student cards start collapsed** for easy roster scanning; clusters open.
- **Students sorted alphabetically by first name** within each cluster (case-insensitive; tiebreak by username; students with no first name sort last).
- "FirstName (username)" as the student card title.
- The collapsed card meta line shows **the timestamp of the student's most recent note** (e.g. *"Cluster B · 3 notes · last note 5/30/2026, 2:30 PM"*) so you can see at a glance when each student last submitted.
- **🚩 flag chip** next to a student name (with red left edge on the card) when any of these signals fired:
  - any paste into a note box
  - 5+ tab-aways (blur events)
  - a note saved with under 5 seconds of typing since the first keystroke (implausibly fast)
  - under 50% on-task (after at least 5 min of data)
- Hovering the 🚩 shows the exact reasons.
- **📊 Activity panel** inside each student card (always-visible summary line + expandable timeline):
  - `~X min active · Y pastes · Z tab-aways · N videos opened · P% on-task`
  - **Time per page** chips with emoji per subtopic showing minutes spent on each (driven by heartbeats).
  - The on-task % is colored: green ≥ 80%, amber 50–79%, red < 50%.
- **🖨 Per-student Print button** (uses `@media print` rules to hide other students and print just that one).
- Filters: search by name/username, cluster dropdown, subtopic dropdown.
- "Worksheets" link → `packet.html#all`.
- An **expandable legend** explaining every activity event chip + the flag rules.

### Anti-cheating activity logging
The site posts these events (with `type: "activity"`) to a separate `Activity` tab in the Sheet, without blocking the user experience:
- `login`, `logout`, `logout-auto`, `unload` (use `navigator.sendBeacon` for unload)
- `heartbeat` — every 60s while `document.visibilityState === "visible"`
- `blur` / `focus` — via `visibilitychange`; focus carries the blur duration in `durationMs`
- `paste` — captures length + first 80 characters of pasted text in `detail`
- `note-save` — typing duration since first keystroke as `durationMs`; `detail` = `len=X pastes=Y dwell=Zs`
- `video-click` — when a Watch & learn link is clicked (let the link still open in `target="_blank"`)

## Apps Script — required setup

The site needs a Google Sheet with **two tabs**:

1. **`Notes`** — `Timestamp | Username | First name | Class | Organ | Section | Prompt | Note`
2. **`Activity`** — `Timestamp | Username | First name | Class | Event | Organ | Section | Detail | Duration ms`

Apps Script (provide this to the teacher in `SETUP.md`):

```javascript
var TEACHER_KEY = 'teacher1';  // change as needed + redeploy a new version

function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    if (data.type === 'activity') {
      sheet_('Activity').appendRow([new Date(), data.username||'', data.firstName||'', data.class||'',
        data.event||'', data.organ||'', data.section||'', data.detail||'', data.durationMs||'']);
    } else {
      sheet_('Notes').appendRow([new Date(), data.username||'', data.firstName||'', data.class||'',
        data.organ||'', data.section||'', data.prompt||'', data.note||'']);
    }
    return json_({ result: 'ok' }, null);
  } catch (err) { return json_({ result: 'error', message: String(err) }, null); }
}

function doGet(e) {
  var cb = e.parameter.callback;
  if (e.parameter.key !== TEACHER_KEY) return json_({ ok: false, error: 'unauthorized' }, cb);
  var which = e.parameter.data === 'activity' ? 'Activity' : 'Notes';
  var values = sheet_(which).getDataRange().getValues();
  if (!values.length) return json_({ ok: true, rows: [] }, cb);
  var header = values.shift().map(function(h){return String(h).toLowerCase().trim();});
  function col(n){return header.indexOf(n);}
  var iT=col('timestamp');
  var rows;
  if (which === 'Activity') {
    var iU=col('username'),iF=col('first name'),iC=col('class'),iE=col('event'),iO=col('organ'),iS=col('section'),iD=col('detail'),iMs=col('duration ms');
    rows = values.filter(function(r){return iU>=0 && r[iU]!=='';}).map(function(r){return {timestamp:r[iT]||'',username:r[iU]||'',firstName:iF>=0?r[iF]:'',class:iC>=0?r[iC]:'',event:iE>=0?r[iE]:'',organ:iO>=0?r[iO]:'',section:iS>=0?r[iS]:'',detail:iD>=0?r[iD]:'',durationMs:iMs>=0?r[iMs]:''};});
  } else {
    var iUn=col('username'),iFn=col('first name'),iCn=col('class'),iOn=col('organ'),iSn=col('section'),iPn=col('prompt'),iXn=col('note');
    rows = values.filter(function(r){return (iUn>=0 && r[iUn]!=='')||(iXn>=0 && r[iXn]!=='');}).map(function(r){return {timestamp:r[iT]||'',username:r[iUn]||'',firstName:iFn>=0?r[iFn]:'',class:iCn>=0?r[iCn]:'',organ:iOn>=0?r[iOn]:'',section:iSn>=0?r[iSn]:'',prompt:iPn>=0?r[iPn]:'',note:iXn>=0?r[iXn]:''};});
  }
  return json_({ ok: true, rows: rows }, cb);
}

function sheet_(name){var ss=SpreadsheetApp.getActiveSpreadsheet();return ss.getSheetByName(name)||ss.insertSheet(name);}
function json_(obj,cb){var b=JSON.stringify(obj);if(cb)return ContentService.createTextOutput(cb+'('+b+')').setMimeType(ContentService.MimeType.JAVASCRIPT);return ContentService.createTextOutput(b).setMimeType(ContentService.MimeType.JSON);}
```

The teacher then **deploys it as a web app** (Execute as: me, Who has access: anyone), copies the `/exec` URL, and pastes it into `config.js`'s `endpoint`. Whenever they change Apps Script code, they must publish a **new version** via "Manage deployments" — saving alone doesn't change what the URL serves.

## Build sequence (work through these in order)

Don't try to build everything at once. Work in passes and commit each:

1. **Scaffold** — `index.html` with sidebar nav + main content area + auth bar. `content.js` placeholder with 1–2 subtopics. `app.js` with home + per-subtopic render from `content.js`. `styles.css` with the design system. Verify it renders.
2. **Login system + per-username notes + 5 section note-catchers** + Apps Script integration (give the teacher the doPost-only version first).
3. **Teacher portal** (`teacher.html` + `teacher.js`) with cluster grouping, search/filters, per-student print.
4. **Reading passages + per-paragraph notes + read-aloud + hover-glossary + figures.**
5. **Self-check** (`rubrics.js`) — generate rubrics for every subtopic for the 5 section prompts. Verify the four verdicts fire.
6. **Activity logging** (heartbeat, blur/focus, paste, video-click, note-save) + extend Apps Script to handle `type: "activity"` + a second sheet tab.
7. **Teacher activity panel** + **flag chip on collapsed cards** + **on-task %** + **time-per-page chips**.
8. **Printable worksheets** (`packet.html`).
9. **Color-coded clusters** (do this last; pure cosmetic).

After every pass: commit, push, ask the teacher to test live, fix anything they hit.

## Behavior the teacher cares about (don't get these wrong)
- **Soft-gate honesty:** every doc you write should say plainly that the login is identification + classroom-grade privacy, not real security. Real names never appear in the Sheet — only usernames + first names.
- **No Apps Script credentials in the page** — the teacher key lives only in Apps Script.
- **Pages cache JS aggressively** — when the teacher tests changes, tell them to hard-refresh (Ctrl/Cmd+Shift+R).
- **Apps Script needs a NEW VERSION on every code change** — not just saving. "Manage deployments → edit → Version: New version → Deploy."

## When in doubt
Look at the reference repo: **https://github.com/jchrobak-maa/HUMAN-BODY-PROJECT**. It implements every feature above. Mirror its patterns. If something's unclear, ask the teacher rather than guess.

Good luck. Start by asking the 8 questions above.
