# Shoaib Murtaza — Portfolio

A from-scratch rebuild of the portfolio, structured as a real project
(Vite + TypeScript) instead of one giant HTML file, so it's easy to keep
editing.

## Run it

```bash
npm install
npm run dev       # local dev server, http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

Deploys as-is to Vercel, Netlify, or any static host: build command
`npm run build`, output directory `dist`.

## Project structure

```
index.html                 all markup/content lives here
src/
  main.ts                  entry point — imports styles, wires up modules
  styles/
    tokens.css              colors, type, spacing variables (the design system)
    base.css                reset + global element styles
    layout.css              header, nav, footer, loader, progress bar
    components.css           buttons, tags, sheet labels, .reveal helper
    sections.css            hero / about / work rail / process / contact
    responsive.css          breakpoints + reduced-motion fallbacks
  sections/
    loader.ts               boot loader + scroll progress bar
    nav.ts                  header scroll state, active link, mobile menu
    reveals.ts              GSAP ScrollTrigger fade-up reveals
    rail.ts                 the horizontal project showcase (see below)
    heroScene.ts             Three.js wireframe lattice in the hero
    contactForm.ts          contact form -> mailto, copy-email button
public/
  images/                   project cover screenshots
```

## About the horizontal project rail

The older versions of this site pinned the project section with CSS
`position: sticky` while a parent had `overflow: hidden`. Those two rules
fight each other — the moment any ancestor clips overflow, the sticky
element stops sticking, so the section "got up" and scrolled out of the
viewport instead of staying put while the cards moved sideways.

`src/sections/rail.ts` fixes this by handing the pin to GSAP's
`ScrollTrigger` (`pin: true`) instead of CSS, which switches the section to
`position: fixed` internally and builds its own spacer — no dependency on
sticky positioning at all. Below 760px (and whenever
`prefers-reduced-motion` is set) the pin is skipped entirely and
`responsive.css` turns the row into a normal swipeable, snap-scrolling list.

## Notes for further upgrades

- Project cover images are in `public/images`; add more `.plate` entries
  in `index.html` and they'll automatically join the horizontal rail.
- The contact form currently opens the visitor's email client via a
  `mailto:` link (no backend). Swap `contactForm.ts` for a real endpoint
  (Formspree, Resend, your own API route) when you have one.
- Color/type tokens are centralized in `src/styles/tokens.css` — change
  `--signal` / `--data` there to re-theme the whole site.
