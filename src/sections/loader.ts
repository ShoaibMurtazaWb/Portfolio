export function initLoader() {
  const loader = document.getElementById("loader");
  const fill = document.getElementById("loaderFill");
  const pct = document.getElementById("loaderPct");
  if (!loader || !fill || !pct) return;

  let progress = 0;
  const tick = () => {
    progress = Math.min(100, progress + (100 - progress) * 0.18 + 1.2);
    fill.style.width = progress + "%";
    pct.textContent = Math.round(progress) + "%";
    if (progress < 100) {
      requestAnimationFrame(tick);
    } else {
      setTimeout(() => loader.classList.add("is-done"), 200);
    }
  };

  if (document.readyState === "complete") {
    requestAnimationFrame(tick);
  } else {
    window.addEventListener("load", () => requestAnimationFrame(tick));
  }
}

export function initProgressBar() {
  const bar = document.getElementById("progressBar");
  if (!bar) return;
  const update = () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = pct + "%";
  };
  window.addEventListener("scroll", update, { passive: true });
  window.addEventListener("resize", update);
  update();
}
