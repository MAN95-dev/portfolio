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
- a first-person intro with a face (her illustrated avatar);
- featured case studies first;
- one colour per project;
- skimmable, sectioned case studies;
- simple navigation (Work, About, Résumé).

Note: Jane Noh also has a "Glen Pro" case study, and Michelle has a similar Glen Pro project in
Figma. If it is ever added, make its presentation clearly distinct.

## Design system (as built)
- **Type:** Fraunces (display serif, italic used for emphasis) and Inter (body), from Google Fonts.
- **Colours:**
  - paper `#fbf8f4`, ink `#17141c`, brand pink `#e8437f` (darker pink `#b8235a` for small text on paper), lime `#dcf2bd` (matches the avatar background);
  - per-project colours: Slimming World red `#d3072a`, Flights Direct blue `#0069cc` (from its own design system), Group Search purple `#6a4fc9`.
- **Visual language:** rounded cards, chunky "sticker" elements with a solid ink border and offset shadow, colour-tinted panels, phone mockups with drop shadows.
- **Motion:**
  - fade-up reveals on scroll, a staggered headline rise, floating hero stickers;
  - a scrolling skills strip, card lift on hover, a reading progress bar;
  - a scroll-spy table of contents, a lightbox for charts;
  - cross-page view transitions;
  - all of it disabled under `prefers-reduced-motion`.

## Site structure
- `index.html`:
  - hero (avatar, intro), scrolling skills strip;
  - featured case studies (Digital Coaching, Flights Direct, plus Group Search as "coming soon");
  - How I work, Websites I've built (CakeSheds, Developer Portfolio, The Two Dolphins, Reuseabook, At Home with Marvel), Let's connect.
- `about.html`: portrait, intro and "What I bring". **The copy is a draft** written from the homepage intro, because the Figma About page was still template placeholder text. It shows a visible "draft copy" note that should be removed once the owner supplies or approves the text.
- `work/digital-coaching.html`: Slimming World research into adding digital/AI coaching (brief, background, support data, cancellation survey, competitor analysis of Simple, BetterMe, Noom and WW, opportunities, concept wireframes, next steps, references).
- `work/flights-direct.html`: personal project on the journey from comparison site to booking (objectives, competitor research, feature analysis, literature review, user flow, sketches, UI design system, the 5-step booking journey with upsell rationale, references).

## Content sources
- **Figma Sites file "Portfolio"** (owner's Figma account), with pages Home, /project-1 (Digital Coaching), /project-2 (Flights Direct), /project-3 (Group Search) and /about-me.
  - The Figma MCP connector **cannot read Sites files**.
  - Read the published preview instead: https://dish-panic-41645449.figma.site/ (append the page paths above). Extract the DOM text and download assets from `/_assets/v11/<hash>.png`.
  - Don't edit the Figma Sites file by driving the browser. It's fragile, and an earlier attempt broke layouts.
- **Résumé:** linked to Google Drive (see the nav links).
- **LinkedIn:** https://www.linkedin.com/in/michelle-percy-developer

## Status and open items
- **Group Search (project-3) is shown as "Case study coming soon".** Its Figma content is unfinished: placeholder text copied from Flights Direct, and images and nav copied from Digital Coaching. Build its page once real content exists, using the same template as the other case studies.
- **Waiting on the owner for:**
  - an email address for the contact section (only LinkedIn and the résumé are linked now);
  - final About copy;
  - the Flights Direct Figma prototype link, to embed in a Prototype section;
  - design feedback on version 1.
- **Not used:** the Figma About page "hobby" images, which are only colour gradients.

## Decisions log
- **Plain HTML/CSS/JS over React/Vue.** It's a content site, so it loads faster with no build step and is cheaper to iterate on. Native CSS/JS covers the motion we need. GSAP can be added later if needed.
- **Build locally, preview on localhost, push at milestones.** Pages rebuilds take about a minute each, so batching changes is quicker.
- **Images:** the original Figma exports were 52MB; converted to WebP they total about 3.4MB.
