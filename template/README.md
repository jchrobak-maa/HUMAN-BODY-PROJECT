# Classroom Research Portal — Template Kit

This folder contains everything you (or a colleague) need to spin up a **new classroom research portal** for any topic, using the same architecture as the Human Body Museum.

## Files in this kit

| File | Read it… | Purpose |
|---|---|---|
| **[SETUP.md](./SETUP.md)** | First | End-to-end rollout: empty repo → live site, ~30 min hands-on time |
| **[PROMPT.md](./PROMPT.md)** | When you start a new Claude Code session | Paste its entire contents as the first message of a brand-new session; Claude reads it and builds the whole site for your topic |
| **[SCHEMA.md](./SCHEMA.md)** | When you (or Claude) edit content | Reference for the shape of `content.js`, `rubrics.js`, `diagrams.js`, `figures.js` |

## How to use this in 60 seconds

1. **Create a new empty GitHub repo** (e.g. `volcanoes-museum`).
2. **Start a new Claude Code session** pointed at it.
3. **Paste the contents of [PROMPT.md](./PROMPT.md)** as the first message.
4. Answer Claude's 8 questions (topic, subtopic list, reading level, deliverable, # of clusters, # of students, teacher password, who's writing content).
5. Follow [SETUP.md](./SETUP.md) for the Google Sheet + Apps Script + GitHub Pages parts.

The features that come with the template — login, per-student notes, teacher portal with cluster grouping, anti-cheating activity tracking, optional self-check, printable worksheets, color-coded clusters, read-aloud, hover-glossary — are **all included by default**. You don't need to mention any of them in the prompt.

## Reference implementation

If you want to see exactly what the finished site looks like before kicking off a new one:
**https://github.com/jchrobak-maa/HUMAN-BODY-PROJECT** (live at `https://jchrobak-maa.github.io/HUMAN-BODY-PROJECT/`).

That's the working example. Claude in the new session can look at it directly for any code patterns it needs.
