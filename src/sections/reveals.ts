import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function initReveals(reducedMotion: boolean) {
  const items = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
  if (reducedMotion) {
    items.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  items.forEach((el, i) => {
    gsap.fromTo(
      el,
      { opacity: 0, y: 28 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        delay: (i % 4) * 0.05,
        scrollTrigger: {
          trigger: el,
          start: "top 88%",
          toggleActions: "play none none none",
        },
        onStart: () => el.classList.add("is-visible"),
      }
    );
  });

  // Hero entrance, independent of scroll position
  const heroEls = document.querySelectorAll<HTMLElement>(
    ".eyebrow, .hero-title, .hero-lede, .hero-actions, .hero-stats, .hero-scene-wrap"
  );
  gsap.fromTo(
    heroEls,
    { opacity: 0, y: 22 },
    { opacity: 1, y: 0, duration: 0.9, ease: "power3.out", stagger: 0.08, delay: 0.2 }
  );
}
