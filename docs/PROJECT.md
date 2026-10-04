# Project brief — "Me, Michelle & I" portfolio

## Goal
A portfolio website for Michelle Percy, a UX/UI designer with a background in psychology,
education and front-end development. It should show her work at the standard of top designer
portfolios.

Her original Figma design is the **source of content only** (copy, imagery, case study material).
It is **not** the source of layout or visual design. The site should follow best practice from
leading portfolio sites instead.

The process agreed with the owner:
1. Research top UX/UI portfolio sites. The owner picks references. *(Done.)*
2. Build the site from the chosen direction plus the Figma content. It must be accessible,
   responsive and polished, with tasteful motion. *(Version 1 done.)*
3. Publish on GitHub Pages and iterate on the owner's feedback. *(Live; iterating.)*

## Inspiration (chosen by the owner)
| Site | What we're borrowing |
| --- | --- |
| [yesjanenoh.com/work](https://www.yesjanenoh.com/work) (Jane Noh) | Huge confident name in the hero, bold colour band per project, a summary listing project type, role and industry, and a clear "View case study" button. |
| [chenkatherine.com](https://www.chenkatherine.com/) (Katherine Chen) | Warm, friendly intro with an illustrated self-portrait. Best case study structure: Challenge → Research → Insights → Personas → Design → Test → Reflection. |
| [anabolio.com](https://www.anabolio.com/) (Ana Bolio) | Personality-first intro, playful graphic touches, tidy project cards with status labels, outcome-focused one-liners and client/year details. |
| [flo-design.eu](https://www.flo-design.eu/) (Flo) | Bold graphic contrast, a strong brand colour per project, an illustrative style. |

Shared traits we kept:
- a first-person intro with a face (the home hero uses her photo, `assets/img/michelle-photo.webp`; the About page uses a collage of her photos);
- featured case studies first;
- one colour per project;
- skimmable, sectioned case studies;
- simple navigation (Work, About, Résumé).

Note: Jane Noh also has a "Glen Pro" case study, and Michelle has a similar Glen Pro project in
Figma. If it is ever added, make its presentation clearly distinct.

## Design system (as built)
- **Type:** Playfair Display for headings (emphasis is upright Playfair in pink, because Playfair italic is too script-like next to the roman) and Inter for body text at 16px with a 25px line height in #333, matching the original Figma site (buttons stay 18px), from Google Fonts. The home hero must fit above the fold (laptop and phone), so its headline is capped by viewport height. On screens wider than 860px the header and hero together take about 3/4 of the screen height, with the hero content centred vertically (owner's request, 2026-10-03).
- **Heading sizes (reduced at the owner's request, 2026-10-03):** home/About section headings (`.section-head h2`) max 2.9rem; project card titles max 2.4rem; case study section headings max 2.4rem and their subheadings max 1.75rem.
- **Website card titles** ("Websites I've built") use **Playfair** (the newer family, not Playfair Display) at 700, 24px, black, to match the original Figma site. It's loaded on the home page only.
- **Colours:**
  - paper `#fbf8f4`, ink `#17141c`, brand pink `#e8437f` (darker pink `#b8235a` for small text on paper), lime `#dcf2bd` (matches the avatar background);
  - hero sticker trio ("cotton candy", chosen by the owner): Psychology candy pink `#ffd6ec`, Education baby blue `#cde7ff`, Front-end dev lilac `#ebdcff`;
  - per-project colours: Slimming World red `#d3072a`, Flights Direct blue `#0069cc` (from its own design system), Group Search purple `#6a4fc9`.
- **Logo (chosen by the owner, 2026-10-03):** monogram. An "MP" circle (42px, candy pink, Playfair, ink border and `3px 3px 0` ink shadow that presses in on hover) beside "Michelle Percy" in bold Inter and a grey "Product designer" line. On phones only the circle shows. The favicon (`favicon.png`, 96px) and `apple-touch-icon.png` (180px, on paper) are the same MP circle, rendered with Playfair. It replaced "Me, Michelle and I" with the animated hand-sign emoji.
- **Header:** roomy at the top of the page (`--header-pad`, about 2vh above and below the nav), and it shrinks to 76px once you scroll.
- **Navigation:** logo left, with the nav links in a pink pill (`#FF429D` at 20%) centred in the header (inspired by Ana Bolio); the current page is a white pill. No arrow on the Résumé link. The scrolling skills strip was removed at the owner's request.
- **No site footer** (removed at the owner's request, 2026-10-03). The Let's connect section is the end of the home and About pages.
- **Buttons (chosen by the owner):** "sticker" style. Hot pink `#ff8fc7` (secondary button is white) with an ink border and a 4px offset ink shadow; they press into the shadow on hover. No arrows on any buttons.
- **Visual language:** rounded cards, chunky "sticker" elements with a solid ink border and offset shadow, colour-tinted panels, phone mockups with drop shadows.
- **Motion:**
  - fade-up reveals on scroll, a staggered headline rise, floating hero stickers;
  - card lift on hover, a reading progress bar;
  - a scroll-spy table of contents, a lightbox for charts;
  - cross-page view transitions;
  - all of it disabled under `prefers-reduced-motion`.

## Site structure
- `index.html`:
  - hero (avatar, intro);
  - featured case studies (Digital Coaching, Flights Direct, plus Group Search as "coming soon");
  - How I work, Websites I've built (CakeSheds, Developer Portfolio, The Two Dolphins, Reuseabook, At Home with Marvel), Let's connect.
- `about/` (`about/index.html`): "Hey! I'm Michelle" intro using the owner's copy from her old Wix portfolio (https://percytechnology.wixstudio.com/michellepercy/about), with "UX/UI designer" changed to "product designer". It has a line about her current role at Slimming World and a 3-photo sticker collage beside the text (a strip of 3 more photos was removed as too busy), then Let's connect with LinkedIn and Email buttons. The photos (`assets/img/about-*.webp`) come from the old site. "What I bring" was removed because it duplicated How I work on the home page.
- `work/digital-coaching/`: Slimming World research into adding digital/AI coaching (brief, background, support data, cancellation survey, competitor analysis of Simple, BetterMe, Noom and WW, opportunities, concept wireframes, next steps, references).
- `work/flights-direct/`: personal project on the journey from comparison site to booking (objectives, competitor research, feature analysis, literature review, user flow, sketches, UI design system, the 5-step booking journey with upsell rationale, references).

## Content sources
- **Figma Sites file "Portfolio"** (owner's Figma account), with pages Home, /project-1 (Digital Coaching), /project-2 (Flights Direct), /project-3 (Group Search) and /about-me.
  - The Figma MCP connector **cannot read Sites files**.
  - Read the published preview instead: https://dish-panic-41645449.figma.site/ (append the page paths above). Extract the DOM text and download assets from `/_assets/v11/<hash>.png`.
  - Don't edit the Figma Sites file by driving the browser. It's fragile, and an earlier attempt broke layouts.
- **Résumé:** hosted on the site as `assets/docs/michelle-percy-resume.pdf` (it replaced the old Google Drive link on 2026-10-03). To update it, overwrite that file with the new PDF, keeping the same name so the links still work.
- **LinkedIn:** https://www.linkedin.com/in/michelle-percy-developer

## Status and open items

### Ask the owner first
Nothing pending. The decision page answers (logo, LinkedIn arrow, "product designer" wording, About photos, deleting the old avatar) were all applied on 2026-10-03.

- **Group Search (project-3) is shown as "Case study coming soon".** Its Figma content is unfinished: placeholder text copied from Flights Direct, and images and nav copied from Digital Coaching. Build its page once real content exists, using the same template as the other case studies.
- **Waiting on the owner for:**
  - the Flights Direct Figma prototype link, to embed in a Prototype section;
  - design feedback on version 1.
- **Not used:** the Figma About page "hobby" images, which are only colour gradients.

## Decisions log
- **Plain HTML/CSS/JS over React/Vue.** It's a content site, so it loads faster with no build step and is cheaper to iterate on. Native CSS/JS covers the motion we need. GSAP can be added later if needed.
- **Build locally, preview on localhost, push at milestones.** Pages rebuilds take about a minute each, so batching changes is quicker.
- **Images:** the original Figma exports were 52MB; converted to WebP they total about 3.4MB.
