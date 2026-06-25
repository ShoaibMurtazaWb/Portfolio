import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Earlier versions of this section combined CSS `position: sticky` with
 * `overflow: hidden` on an ancestor — sticky positioning breaks the moment
 * any ancestor clips overflow, so the rail un-stuck itself and drifted out
 * of the viewport instead of staying pinned while it scrolled sideways.
 *
 * Fix: let GSAP own the pin. `ScrollTrigger`'s `pin: true` switches the
 * stage to `position: fixed` internally and builds its own spacer, so it no
 * longer depends on sticky-positioning rules at all. Below ~760px this is
 * skipped entirely and responsive.css takes over with a native swipeable,
 * snap-scrolling row instead.
 */
export function initProjectRail(reducedMotion: boolean) {
  const stage = document.getElementById("railStage");
  const track = document.getElementById("railTrack");
  if (!stage || !track || reducedMotion) return;

  const mm = gsap.matchMedia();

  mm.add("(min-width: 761px)", () => {
    const getDistance = () => Math.max(0, track.scrollWidth - stage.clientWidth);

    const tween = gsap.to(track, {
      x: () => -getDistance(),
      ease: "none",
      scrollTrigger: {
        trigger: stage,
        start: "top top",
        end: () => "+=" + getDistance(),
        scrub: 1,
        pin: true,
        anticipatePin: 1,
        invalidateOnRefresh: true,
      },
    });

    // subtle depth: cards ease into full focus as they near centre stage
    const plates = Array.from(track.querySelectorAll<HTMLElement>(".plate"));
    plates.forEach((plate) => {
      gsap.fromTo(
        plate,
        { opacity: 0.45, scale: 0.94 },
        {
          opacity: 1,
          scale: 1,
          ease: "none",
          scrollTrigger: {
            trigger: plate,
            start: "left 85%",
            end: "left 35%",
            scrub: true,
            horizontal: false,
          },
        }
      );
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  });
}
