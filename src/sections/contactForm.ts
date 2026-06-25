export function initContactForm() {
  const form = document.getElementById("contactForm") as HTMLFormElement | null;
  const note = document.getElementById("formNote");
  const copyBtn = document.getElementById("copyEmail");
  const email = "shoaibmurtazawb@gmail.com";

  form?.addEventListener("submit", (e) => {
    e.preventDefault();
    const data = new FormData(form);
    const name = String(data.get("name") || "");
    const from = String(data.get("email") || "");
    const brief = String(data.get("brief") || "");

    const subject = encodeURIComponent(`Project enquiry from ${name}`);
    const body = encodeURIComponent(`${brief}\n\n— ${name} (${from})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;

    if (note) note.textContent = "Opening your email client…";
  });

  copyBtn?.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(email);
      copyBtn.textContent = "Copied";
    } catch {
      copyBtn.textContent = "Copy failed";
    }
    setTimeout(() => (copyBtn.textContent = "Copy"), 1800);
  });
}
