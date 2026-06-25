# Shoaib Murtaza — Portfolio

## Run it

```bash
npm install
npm run dev       # local dev server, http://localhost:5173
npm run build     # production build -> dist/
npm run preview   # preview the production build
```

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
