(() => {
  const root = document.documentElement;

  // ---- Theme toggle (persists choice; otherwise follows the OS) ----
  const toggle = document.querySelector(".theme-toggle");
  toggle?.addEventListener("click", () => {
    const current =
      root.getAttribute("data-theme") ||
      (matchMedia("(prefers-color-scheme: light)").matches ? "light" : "dark");
    const next = current === "light" ? "dark" : "light";
    root.setAttribute("data-theme", next);
    try { localStorage.setItem("theme", next); } catch (e) {}
  });

  // ---- Cursor spotlight (pointer devices only) ----
  if (matchMedia("(pointer: fine)").matches) {
    window.addEventListener("pointermove", (e) => {
      root.style.setProperty("--x", e.clientX + "px");
      root.style.setProperty("--y", e.clientY + "px");
    }, { passive: true });
  }

  // ---- Active nav link while scrolling ----
  const links = [...document.querySelectorAll(".nav a")];
  const byId = new Map(links.map((a) => [a.getAttribute("href").slice(1), a]));
  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      links.forEach((a) => a.classList.remove("is-active"));
      byId.get(entry.target.id)?.classList.add("is-active");
    });
  }, { rootMargin: "-45% 0px -50% 0px" });
  document.querySelectorAll("main .section").forEach((s) => navObserver.observe(s));

  // ---- Reveal-on-scroll ----
  const revealables = document.querySelectorAll(".card, .project, .achievements li, .skills > div, .stats div");
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealables.forEach((el) => {
    el.classList.add("reveal");
    revealObserver.observe(el);
  });

  // ---- Project filters ----
  const chips = document.querySelectorAll(".chip");
  const projects = document.querySelectorAll(".project");
  chips.forEach((chip) => {
    chip.addEventListener("click", () => {
      const f = chip.dataset.filter;
      chips.forEach((c) => c.classList.toggle("is-active", c === chip));
      projects.forEach((p) => {
        p.hidden = f !== "all" && !p.dataset.cat.split(" ").includes(f);
      });
    });
  });

  // ---- Copy email ----
  document.querySelectorAll("[data-copy]").forEach((btn) => {
    btn.addEventListener("click", async () => {
      const label = btn.querySelector(".copy-label");
      try {
        await navigator.clipboard.writeText(btn.dataset.copy);
        label.textContent = "Copied ✓";
      } catch (e) {
        label.textContent = btn.dataset.copy;
      }
      setTimeout(() => (label.textContent = "Copy email"), 2000);
    });
  });
})();
