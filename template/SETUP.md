# Setup Guide — Spinning Up a New Topic Site

> Start-to-finish for a teacher (or colleague) who has never built one of these. Plan on ~30 min of setup + content-author time.

## What you'll end up with
- A public website with the same features as the Human Body Museum: per-subtopic exhibits, login per student, per-section note taking that flows into your Google Sheet, teacher portal with grouping/filtering/flagging, anti-cheating signals, optional answer self-check, printable worksheets.
- Lives on your GitHub account, served free by GitHub Pages, no monthly bills.

## You'll need
- A free GitHub account
- A free Google account (for the Sheet + Apps Script)
- A Claude Code account (the AI session that builds it for you)
- Optionally: a PDF or article the AI can draw from for content. (It can draft from scratch, but you should proofread.)

---

## Step 1 — Create an empty GitHub repo (~2 min)

1. Go to **https://github.com/new**.
2. Repository name: something descriptive like `volcanoes-museum` or `presidents-project`.
3. Set it **Public** (required for free GitHub Pages).
4. Check **"Add a README file"** so the repo is initialized.
5. Click **Create repository**.
6. Note the repo URL (e.g. `https://github.com/yourname/volcanoes-museum`).

## Step 2 — Start a new Claude Code session pointed at that repo (~3 min)

1. Open Claude Code and create a new session.
2. Connect it to the new repo you just made.
3. Open **`template/PROMPT.md`** from the reference repo (you're reading the companion to it now). Copy its **entire contents**.
4. Paste it as the **first message** of the new session, then send.

Claude will respond with the 8 setup questions (topic, subtopics, reading level, project deliverable, # of clusters, students per cluster, teacher password, who's writing content). **Answer all of them in one reply.**

Tip: when Claude asks if you want it to draft content or you'll provide it, the easiest path is **"draft it yourself from reputable sources and I'll proofread."** Claude will use WebSearch to verify any video links it includes.

## Step 3 — Let Claude build (~30–60 min, mostly hands-off)

Claude works through nine build phases, committing each. You'll see it ask for confirmation on bigger choices and show test results. Be available to:
- **Hard-refresh** when it asks you to test something (`Ctrl/Cmd + Shift + R` in the browser to drop cached JS).
- **Confirm content** when it generates reading passages and case studies.
- **Approve** if it asks before pushing or making something irreversible.

Once Claude says "Phase 2 (login) needs the Apps Script set up," do Step 4 below.

## Step 4 — Create the Google Sheet + Apps Script (~10 min)

1. Open **https://sheets.google.com** → blank sheet.
2. Rename it to match your project (e.g. "Volcanoes Project Notes").
3. **Create two tabs at the bottom**, named exactly:
   - `Notes` with row-1 headers: `Timestamp | Username | First name | Class | Organ | Section | Prompt | Note`
     (the column called "Organ" holds the subtopic name — you can rename the header to "Subtopic" if you prefer; the script reads by header name)
   - `Activity` with row-1 headers: `Timestamp | Username | First name | Class | Event | Organ | Section | Detail | Duration ms`
4. **Extensions → Apps Script.** Delete the default code.
5. Paste the script Claude gave you (it's also in PROMPT.md). **Change the line `var TEACHER_KEY = 'teacher1';`** to whatever password you told Claude to use.
6. Save (`Ctrl/Cmd + S`).
7. **Deploy → New deployment** → gear → **Web app**. Set:
   - **Execute as:** Me
   - **Who has access:** **Anyone** (required so students' browsers can POST notes)
8. Click **Deploy**, accept the Google permission prompt, **copy the Web app URL** (ends in `/exec`).
9. **Tell Claude the URL.** It'll paste it into `config.js`, commit, and push.

**Whenever you later change the Apps Script code**, you must publish a **new version** via Deploy → **Manage deployments** → ✏️ pencil → Version: **New version** → Deploy. (Just saving the script alone doesn't update what your live URL serves — that catches everyone.)

## Step 5 — Enable GitHub Pages (~2 min)

1. In your repo on GitHub, **Settings → Pages**.
2. Under **Source**, select **Deploy from a branch**.
3. Branch: **main** (or whatever Claude pushed to), folder: **/ (root)**.
4. Click **Save**.
5. Wait ~1 minute for the first build. Your live URL will appear at the top of the Pages page — something like:
   **https://yourname.github.io/volcanoes-museum/**

The first deploy can take a few minutes to propagate. If you see a 404 right after enabling, give it 5–10 minutes and try again.

## Step 6 — Test as a student, then as a teacher (~5 min)

1. Open your live URL in an **incognito window** (so any earlier session data is clean).
2. You should land on the Home page. Pick any subtopic from the sidebar.
3. **Log in** with one of the test usernames (e.g. `student1a` / `student1a`) and a first name.
4. Save a note in any section. Try the **🔍 Check my answer** button. Try the **🔊 Listen** button.
5. Refresh your Google Sheet — the `Notes` tab should have a new row, the `Activity` tab should have several (login, heartbeat, note-save).
6. Log out, open `your-url/teacher.html`, log in with your teacher password. You should see the student card with the saved note inside.

If any of that doesn't work, tell Claude what you see — it'll diagnose and fix.

## Step 7 — Roll out to students

- Assign each student a username from your roster (e.g. `student1a` = Alex in Period A). **Keep that mapping in a private spreadsheet** — the website never shows real names, by design.
- Tell students: "Go to {your URL}, log in with the username I gave you (it's also your password), use your **first name only**, then go to the subtopic I assigned you."
- Make sure students do **`Log out`** when they finish or the next student on the same computer will start logged in as them. (The site also auto-logs-out after 20 min idle.)

## Troubleshooting cheat sheet

| Problem | Most common cause |
|---|---|
| Page loads but Save does nothing | `config.js` endpoint URL is blank or wrong. Get the `/exec` URL again from Apps Script's Manage Deployments. |
| Sheet rows aren't appearing | You changed the Apps Script code but didn't publish a **new deployment version**. |
| Activity panel is empty in teacher portal | Same as above — the `Activity` tab + the new `doPost` need to be deployed. |
| Teacher portal says "unauthorized" | You're entering a different teacher key than the one set in Apps Script. |
| Cluster shows as "(no cluster)" | The student typed a username outside the expected pattern (e.g. `studentXYZ`). |
| 404 on the live URL | Pages still building (give it 5–10 min) or wrong branch in Pages settings. |
| Old code still showing after a push | Browser cache — hard-refresh `Ctrl/Cmd + Shift + R`. |
| Live site flags every student | The flag thresholds (e.g. "5+ tab-aways") are too tight for your class — ask Claude to bump them in `teacher.js`. |

## What's safe to change later

You (or a future Claude session) can freely edit:
- **`content.js`** — all subtopic text, vocab, sources, reading.
- **`rubrics.js`** — the answer-check rubrics.
- **`config.js`** — the endpoint and `autoLogoutMinutes`.
- **CSS colors** — the `:root` variables at the top of `styles.css`.

Be more careful with `app.js` and `teacher.js` — those are the engines. If you want a feature change, just describe it to Claude and let it edit.

## One honest reminder

The login is a **soft gate**, not real security. The roster is in the page code; a determined student could log in as a classmate. It works fine for identification + classroom-grade privacy on shared computers, which is what schools usually want. Don't use this stack for anything with genuine privacy or grading-integrity stakes (use a school LMS for that).
