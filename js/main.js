/* =====================================================================
   main.js  —  Turns the data in data.js into HTML.
   ---------------------------------------------------------------------
   Flow:  data.js (window.RESUME)  ->  render*() functions below
          ->  HTML strings injected into the empty containers in index.html
          ->  initArt() paints SVG illustrations into every [data-art]
          ->  initEffects() adds scroll reveal, power meter, mobile menu
   You rarely need to touch this file unless you want a NEW section
   or a different layout.
   ===================================================================== */

(function () {
  const R = window.RESUME;
  const $ = (sel) => document.querySelector(sel);

  // Escape text so characters like < & " in data.js can't break the HTML.
  const esc = (s = "") =>
    String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  /* Layout helper: splits a list into rows of `perRow` comic panels.
     Panels in the same row get slanted vertical gutters between them,
     consecutive rows get slanted horizontal gutters (like deeptech.build). */
  function comicRows(items, perRow, renderPanel) {
    const rows = [];
    for (let i = 0; i < items.length; i += perRow) rows.push(items.slice(i, i + perRow));
    return rows
      .map((row, r) => {
        const isFirst = r === 0;
        const isLast = r === rows.length - 1;
        const rowCls = ["row", isLast ? "" : "slant-b", isFirst ? "" : "slant-t row-after-b"].join(" ");
        const panels = row
          .map((item, c) => {
            const cls = [];
            if (row.length > 1 && c < row.length - 1) cls.push("slant-r");
            if (row.length > 1 && c > 0) cls.push("slant-l");
            return renderPanel(item, cls.join(" "), r * perRow + c);
          })
          .join("");
        return `<div class="${rowCls}">${panels}</div>`;
      })
      .join("");
  }

  /* ---------------- HERO ---------------- */
  function renderHero() {
    const p = R.profile;
    document.title = `${p.name} — ${p.tagline}`;
    $("#hero-name").textContent = p.name;
    $("#hero-tagline").textContent = p.tagline;
    $("#hero-location").textContent = p.location.toUpperCase();
    $("#hero-intro").textContent = p.intro;
    $("#hero-bubble").textContent = p.catchphrase;
    $("#cv-link").href = p.cv;
    $("#footer-name").textContent = p.name;
    $("#year").textContent = new Date().getFullYear();
  }

  /* ---------------- STATS ---------------- */
  function renderStats() {
    $("#stats").innerHTML = R.stats
      .map(
        (s, i) => `
        <div class="burst reveal" style="--tilt:${i % 2 ? 4 : -4}deg; --delay:${i * 90}ms">
          <strong>${esc(s.value)}</strong>
          <span>${esc(s.label)}</span>
        </div>`
      )
      .join("");
  }

  /* ---------------- SKILLS ---------------- */
  function renderSkills() {
    $("#skills-grid").innerHTML = comicRows(R.skills, 3, (s, cls) => `
      <article class="panel ${cls}">
        <div class="art" data-art="${esc(s.art)}"></div>
        <div class="panel-body">
          <h3>${esc(s.title)}</h3>
          <ul class="chips">${s.items.map((it) => `<li>${esc(it)}</li>`).join("")}</ul>
        </div>
      </article>`);
  }

  /* ---------------- EXPERIENCE ---------------- */
  function renderExperience() {
    $("#experience-list").innerHTML = comicRows(R.experience, 1, (job, cls, i) => `
      <article class="panel panel-wide ${cls} ${i % 2 ? "flip" : ""}">
        <div class="wide-art"><div class="art" data-art="${esc(job.art)}"></div>
          ${job.sfx ? `<span class="sfx">${esc(job.sfx)}</span>` : ""}
        </div>
        <div class="wide-body">
          <p class="mono kicker">${esc(job.period)} · ${esc(job.location)}</p>
          <h3>${esc(job.role)}</h3>
          <p class="company">@ ${esc(job.company)}</p>
          <ul class="points">${job.points.map((pt) => `<li>${esc(pt)}</li>`).join("")}</ul>
        </div>
      </article>`);
  }

  /* ---------------- PROJECTS ---------------- */
  function renderProjects() {
    $("#projects-grid").innerHTML = comicRows(R.projects, 3, (pr, cls) => `
      <article class="panel panel-tall ${cls}">
        <div class="art" data-art="${esc(pr.art)}"></div>
        <div class="panel-body">
          <ul class="tags">${pr.tags.map((t) => `<li>${esc(t)}</li>`).join("")}</ul>
          <h3>${esc(pr.name)}</h3>
          <p>${esc(pr.description)}</p>
          ${pr.link
            ? `<a class="mono link" href="${esc(pr.link)}" target="_blank" rel="noopener">VIEW CODE →</a>`
            : `<span class="mono link muted">PRIVATE BUILD</span>`}
        </div>
      </article>`);
  }

  /* ---------------- EDUCATION + COURSES + LANGUAGES ---------------- */
  function renderEducation() {
    const eduPanels = R.education.map((e) => ({ type: "edu", ...e }));
    const extra = { type: "extra" };
    $("#education-grid").innerHTML = comicRows([...eduPanels, extra], 3, (e, cls) => {
      if (e.type === "extra") {
        return `
        <article class="panel paper-panel ${cls}">
          <div class="panel-body static">
            <h3>Side Training</h3>
            <ul class="points">${R.courses.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>
            <h3 class="mt">Languages</h3>
            ${R.languages
              .map(
                (l) => `
              <div class="meter">
                <div class="meter-top"><span>${esc(l.name)}</span><span class="mono">${esc(l.level)}</span></div>
                <div class="meter-bar"><span style="--w:${Number(l.percent) || 0}%"></span></div>
              </div>`
              )
              .join("")}
          </div>
        </article>`;
      }
      return `
        <article class="panel ${cls}">
          <div class="art" data-art="book"></div>
          <div class="panel-body">
            <p class="mono kicker">${esc(e.period)} · ${esc(e.location)}</p>
            <h3>${esc(e.degree)}</h3>
            <p class="company">${esc(e.school)}</p>
            <ul class="tags">${e.details.map((d) => `<li>${esc(d)}</li>`).join("")}</ul>
          </div>
        </article>`;
    });
  }

  /* ---------------- CONTACT ---------------- */
  function renderContact() {
    const p = R.profile;
    const links = [
      p.email && `<a class="btn" href="mailto:${esc(p.email)}">✉ ${esc(p.email)}</a>`,
      p.phone && `<a class="btn btn-ghost" href="tel:${esc(p.phone.replace(/\s/g, ""))}">☎ ${esc(p.phone)}</a>`,
      p.links.github && `<a class="btn btn-ghost" href="${esc(p.links.github)}" target="_blank" rel="noopener">GitHub</a>`,
      p.links.linkedin && `<a class="btn btn-ghost" href="${esc(p.links.linkedin)}" target="_blank" rel="noopener">LinkedIn</a>`,
      p.cv && `<a class="btn btn-ghost" href="${esc(p.cv)}" download>Download CV</a>`,
    ].filter(Boolean);
    $("#contact-links").innerHTML = links.join("");
  }

  /* ---------------- ILLUSTRATIONS ---------------- */
  function initArt() {
    document.querySelectorAll("[data-art]").forEach((el) => {
      el.innerHTML = window.ART(el.dataset.art);
    });
  }

  /* ---------------- EFFECTS ---------------- */
  function initEffects() {
    // 1) Pop panels in when they scroll into view
    document.querySelectorAll(".panel, .chapter-head").forEach((el) => el.classList.add("reveal"));
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.15 }
    );
    document.querySelectorAll(".reveal").forEach((el) => io.observe(el));

    // 2) Scroll progress "power meter"
    const bar = $("#power");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - innerHeight;
      bar.style.width = `${max > 0 ? (scrollY / max) * 100 : 0}%`;
    };
    addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // 3) Mobile menu
    const nav = $("#nav-links");
    $("#burger").addEventListener("click", () => nav.classList.toggle("open"));
    nav.addEventListener("click", (e) => e.target.tagName === "A" && nav.classList.remove("open"));
  }

  renderHero();
  renderStats();
  renderSkills();
  renderExperience();
  renderProjects();
  renderEducation();
  renderContact();
  initArt();
  initEffects();
})();
