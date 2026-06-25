import "./styles/tokens.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/sections.css";
import "./styles/responsive.css";

import { initLoader, initProgressBar } from "./sections/loader";
import { initNav } from "./sections/nav";
import { initReveals } from "./sections/reveals";
import { initProjectRail } from "./sections/rail";
import { initContactForm } from "./sections/contactForm";

const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
if (reducedMotion) document.documentElement.classList.add("reduced-motion");

initLoader();
initProgressBar();
initNav();
initReveals(reducedMotion);
initProjectRail(reducedMotion);
initContactForm();

// Three.js is only needed for the hero lattice — load it on its own chunk
// so the rest of the page is interactive before that dependency arrives.
import("./sections/heroScene").then(({ initHeroScene }) => initHeroScene(reducedMotion));
