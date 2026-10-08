# CLAUDE.md

Portfolio website for Michelle Percy, a UX/UI designer. The brand name is "Me, Michelle & I".
It is a plain HTML/CSS/JS static site hosted on GitHub Pages.

The full brief (goals, inspiration, design decisions, content sources, current status and open
questions) is in the project brief, imported below. Read it before making design or content changes.

@docs/PROJECT.md

**Start of every session:** check "Ask the owner first" under "Status and open items" in the brief. If anything is listed there, ask the owner about it before starting other work.

## Quick facts
- **Live site:** https://man95-dev.github.io/portfolio/
- **Repo:** https://github.com/MAN95-dev/portfolio. Deploys automatically from `main`, and Pages rebuilds in about 1 minute after a push.
- **GitHub account:** push as `MAN95-dev`. If `gh auth status` shows another active account, run `gh auth switch -u MAN95-dev`.
- **Local preview:** run `npx http-server -p 8080 -c-1` from the repo root, then open http://localhost:8080.

## How to work in this repo
- **No framework and no build step.** Keep it plain HTML, CSS and vanilla JS unless the owner agrees otherwise. Astro is the agreed upgrade path if the number of case studies grows.
- **Clean URLs:** every page is a folder with an `index.html` (`about/`, `work/<slug>/`), and links point at the folder with a trailing slash (`about/`, never `about.html`). The old `about.html` and `work/*.html` files are only redirect stubs for previously shared links; don't edit content there.
- **Always use relative paths.** The site is served from `/portfolio/`, so a root-absolute path like `/css/...` breaks on Pages. `about/` uses `../` and `work/<slug>/` uses `../../`.
- **Header and footer are duplicated on every page.** When you change one, update it on all of them: `index.html`, `about/index.html` and `work/*/index.html`.
- **Design tokens** (colours, type scale, spacing) are CSS custom properties at the top of `css/styles.css`. Reuse them rather than hard-coding values. Each case study sets its colour with a body class: `.cs` is Slimming World red and `.cs--fd` is Flights Direct blue.
- **Accessibility is a requirement, not polish:**
  - Use semantic landmarks and include the skip link.
  - Give every image meaningful `alt` text, or `alt=""` if it's decorative. Don't invent details you haven't seen in the image.
  - Keep visible focus styles and meet WCAG AA contrast.
  - Add `<span class="visually-hidden"> (opens in a new tab)</span>` to `target="_blank"` links.
  - All motion must respect `prefers-reduced-motion`.
- **Motion** uses CSS plus `js/main.js`. Add the `.reveal` class (with optional `style="--d:.1s"` for delay) to fade elements up on scroll. Any new JS must be progressive enhancement, so the site still works with JS off.
- **Images:**
  - Ship only optimised `.webp` files in `assets/img/`, at most about 1800px wide (phone screens about 640px wide).
  - Always set `width` and `height` and add `loading="lazy"` below the fold.
  - Use `tools/optimize-images.js` to convert. Original exports go in `assets/raw/`, which is gitignored.
- **Password-protected case studies:**
  - Edit the readable source in `private/` (e.g. `private/group-search-full.html`), never the scrambled output it builds (e.g. `work/group-search/index.html`).
  - Then run `node tools/build-protected.js` to re-encrypt, and commit the output.
  - `private/` is gitignored and only exists on the owner's Mac. Never commit it or paste its contents anywhere public, because the repo is public.
  - The password is in `private/<name>-password.txt`. Images that must be protected go in `private/img/`, and the build embeds them into the encrypted page.
  - Keep `tools/staticrypt.json` (the salt) unchanged.
- **Before pushing,** check every page at about 1440px and 390px wide: no horizontal scroll, no broken images, no console errors.
- **Push after every change** (owner's request, 2026-10-05): once a change is checked, commit and push to `main` straight away without asking. Don't batch changes or wait for approval. The owner reviews on the live link. The only exception is anything risky or hard to undo, like deleting content or publishing new personal details: check with the owner first.
