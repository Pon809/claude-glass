# Claude Glass

[![Watch the video](https://img.shields.io/badge/YouTube-Watch%20the%20video-red)](https://www.youtube.com/watch?v=EF2Xx5ZWfaI)

The `control-ui` skill from Cursor's team kit, packaged for Claude Code,
plus the piece the upstream repo does not ship: a **feature map** template.

The agent opens your app, performs one action at a time, takes a screenshot before and after,
and hands you the evidence instead of "done ✅".

## What is inside

| Path | What | Origin |
|---|---|---|
| `.claude/skills/control-ui/SKILL.md` | The skill, verbatim | cursor/plugins, MIT |
| `FEATURE_MAP.md` | Navigation map template + the demo's map | this repo |
| `demo/index.html` | Minimal task app, 3 views, one planted bug | this repo |
| `demo/harness/probe.mjs` | Playwright probe following the skill's loop | this repo |

## Try it in 2 minutes

```bash
npm install
npx playwright install chromium
npm run serve          # http://127.0.0.1:3000
npm run probe          # FAIL: task did not move to Done   <- the planted bug
```

Then in Claude Code, from the repo root:

```
the "Mark done" button does not move the task to the Done view.
repro first, then fix. use the control-ui skill and give me
before/after screenshots as proof.
```

Claude reads `.claude/skills/control-ui/SKILL.md` and `FEATURE_MAP.md`, reuses the Playwright
already in the repo, reproduces the bug with a screenshot, fixes `demo/index.html`, and reruns.
`npm run probe` should then print `PASS`.

## Use it on your own project

1. Copy `.claude/skills/control-ui/` into your repo.
2. Copy `FEATURE_MAP.md`, delete the demo entries, write yours. One entry per feature.
3. Make sure a dev server exists and Playwright (or the repo's own browser harness) is installed.
4. Put a stable marker on your app root, e.g. `data-app-root`.

## Why the feature map matters

Lauren describes the early failure mode: the agent captured traces and screenshots and confidently
diagnosed the wrong component because it did not know how to reach the feature. The map fixes that.
The skill does not include one; you write it per project.

## Attribution

`control-ui` is MIT, part of Cursor's `cursor-team-kit` plugin. See `NOTICE.md` for what the
commit history does and does not support about who wrote it, and how to re-sync with upstream.
Everything else is MIT, see `LICENSE`.
