export function initNav() {
  const header = document.getElementById("siteHeader");
  const toggle = document.getElementById("navToggle");
  const mobileNav = document.getElementById("mobileNav");
  const navLinks = Array.from(document.querySelectorAll<HTMLAnchorElement>("[data-nav]"));
  const sections = Array.from(document.querySelectorAll<HTMLElement>("main section[id]"));

  const onScroll = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);

    let activeId = "";
    const probe = window.scrollY + window.innerHeight * 0.3;
    sections.forEach((s) => {
      if (probe >= s.offsetTop) activeId = s.id;
    });
    navLinks.forEach((a) => a.classList.toggle("is-active", a.getAttribute("href") === "#" + activeId));
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toggle?.addEventListener("click", () => {
    const expanded = toggle.getAttribute("aria-expanded") === "true";
    toggle.setAttribute("aria-expanded", String(!expanded));
    mobileNav?.classList.toggle("is-open", !expanded);
  });

  navLinks.forEach((a) =>
    a.addEventListener("click", () => {
      mobileNav?.classList.remove("is-open");
      toggle?.setAttribute("aria-expanded", "false");
    })
  );
}
