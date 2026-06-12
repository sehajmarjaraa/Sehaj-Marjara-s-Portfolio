# Sehaj_Marjara_Portfolio.xlsx

A single-page portfolio that replicates Microsoft Excel (macOS dark-ribbon style).
Built with Vite + React + Tailwind. Zero backend, fully static, deploys free on Vercel.

## Quick start

```bash
npm install
npm run dev      # local dev server
npm run build    # production build → dist/
```

## How to edit content (the only file you need)

**Everything** — text, links, placeholders — lives in [`src/content.ts`](src/content.ts).
Nothing is hardcoded in components. The comment block at the top of that file lists
every `[PLACEHOLDER_*]` token you need to replace. Edit, save, redeploy.

### Add project links

In `src/content.ts`, find the `projects` array and replace
`[PLACEHOLDER_PROJECT_LINK_1]` … `[PLACEHOLDER_PROJECT_LINK_6]` with your GitHub
repo or live-demo URLs. Each project's title, one-line description, and tech tags
are in the same object.

### Swap in the resume PDF

1. Drop your PDF into the `public/` folder, e.g. `public/Sehaj_Marjara_Resume.pdf`.
2. In `src/content.ts`, set (in the `site` object — every Resume button across the
   site reads from it):
   ```ts
   resumeUrl: "/Sehaj_Marjara_Resume.pdf",
   ```

## How to deploy (Vercel)

```bash
npm i -g vercel   # once
vercel            # from the project root — accept the defaults
vercel --prod     # promote to production
```

Vercel auto-detects Vite: build command `npm run build`, output directory `dist`.
No config file needed. Alternatively, push the repo to GitHub and import it at
vercel.com/new for automatic deploys on every push.

## Regenerating the Open Graph image

`public/og-image.png` (1200×630) is rendered from `scripts/og-image.html`.
After editing that file:

```bash
"/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" --headless \
  --screenshot=public/og-image.png --window-size=1200,630 --hide-scrollbars \
  "file://$PWD/scripts/og-image.html"
```

## Features map

| Excel element | What it does here |
| --- | --- |
| Ribbon tabs / sheet tabs | Switch sections (About, Projects, Skills, Contact + hidden Model) |
| Ribbon button groups | Per-tab quick links, scroll-to-entry buttons, and =formula shortcuts |
| Formula bar | Mirrors the selected cell and edits it live, exactly like Excel; types a joke formula on each sheet load until you interact |
| Cell reference box | Updates when you click any cell or content block (green selection border + fill handle) |
| Editable grid | Every empty cell is real: click + type, Enter commits & moves down, Tab moves right, F2 edits, Delete clears |
| Arrow keys | Move the selected cell |
| Cmd/Ctrl+F | Excel-style Find box that filters Projects |
| "+" sheet tab | Easter egg toast |
| Status bar | Per-section fake stats + a real zoom slider (75–125%) |
| Share button | mailto link · Comments button jumps to Contact |
| Recalc wave | Green flash sweeps the cells on every sheet load |
| Ghost collaborator | "Recruiter (viewing)" selection box wanders empty cells (desktop only) |
| =formulas | Type =aboutme, =experience, =involvement, or =projects in ANY cell (or the fx bar) to pull up resume sections; unknown =formulas return #NAME? |
| Skills | Hover → formula in fx bar · click → cross-reference popover that jumps sheets |
| "Model" sheet tab | Hidden working toy DCF — edit the blue input cells |

All motion respects `prefers-reduced-motion`.

## ✅ Placeholder checklist (fill these before sending to recruiters)

All in `src/content.ts` unless noted:

- [ ] `[PLACEHOLDER_RESUME_URL]` — resume PDF (drop file in `public/`, update `site.resumeUrl`)
- [ ] `[PLACEHOLDER: GPA]` — GPA (`site.gpa` + the status-bar line in `statusStats.about`)
- [ ] `skills` — per-skill `formula` strings (shown in the fx bar on hover) and `refs`
      cross-references (they drive the heat-map intensity + popover links)
- [ ] `dcfModel` — base revenue, FCF margin, input ranges, and the disclaimer line
- [ ] Optional: tweak `formulaToasts`, `statusStats`, the fake `formulas`, and `ghostLabel`

Tip: run `grep -rn "PLACEHOLDER" src/content.ts` to confirm nothing is left.
