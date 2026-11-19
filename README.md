# RAJAN.ai — Comic × Futuristic Portfolio

A personal resume website styled like a sci-fi comic book: slanted comic panels, speech bubbles,
"sound-effect" stickers, halftone dots and synthwave AI illustrations.
The style is inspired by [deeptech.build](https://www.deeptech.build/).

> **What is deeptech.build built with?**
> It is made with **[Framer](https://www.framer.com/)**, a visual no-code website builder (the page has
> `<meta name="generator" content="Framer …">` and loads its scripts from `framerusercontent.com`).
> The fonts are **Onest** (text) and **Fragment Mono** (small labels). The illustrations are
> AI-generated synthwave images laid out in slanted comic panels with white gutters.
>
> This project recreates the *style* without Framer, using plain **HTML + CSS + JavaScript**, with no
> framework, no build step and no dependencies. All illustrations are hand-coded SVG, so they are
> tiny and sharp at any size.

---

## 1. Run it locally

You only need a browser. Either double-click `index.html`, or (better) start a tiny local server:

```bash
cd resume_website
python3 -m http.server 8080
```

Then open <http://localhost:8080>.

---

## 2. Project structure

```
resume_website/
├── index.html          ← page skeleton: nav, section headers, EMPTY containers
├── css/
│   └── style.css       ← the whole look: colours, comic panels, slants, animations
├── js/
│   ├── data.js         ← ⭐ YOUR CONTENT (skills, jobs, projects, education…)
│   ├── art.js          ← SVG comic illustrations (city, brain, robot, bank, …)
│   └── main.js         ← reads data.js and builds the HTML for each section
├── assets/
│   └── Rajan_Puri_CV.pdf   ← downloadable CV (linked from the nav "CV ↓" button)
└── README.md
```

---

## 3. How the code flows

```
 index.html loads ─┬─> js/data.js   defines  window.RESUME = { profile, skills, experience, … }
                   ├─> js/art.js    defines  window.ART("brain") -> "<svg>…</svg>"
                   └─> js/main.js   runs:
                         renderHero()        fills name / tagline / bubble in the hero
                         renderStats()       builds the 4 starburst stickers
                         renderSkills()      ┐
                         renderExperience()  │  each turns an array from data.js into
                         renderProjects()    │  comic panels and puts them into the
                         renderEducation()   │  matching empty <div id="…"> in index.html
                         renderContact()     ┘
                         initArt()           finds every <div data-art="xyz"> and draws ART("xyz") in it
                         initEffects()       scroll-reveal animation, top progress bar, mobile menu
```

**Key idea:** `index.html` contains no resume text. It only has empty containers like
`<div id="skills-grid">`. All text lives in `data.js`, so you update the site by editing
**one file**.

### The comic layout (how the slanted panels work)

`main.js` has a helper `comicRows(items, perRow, renderPanel)` that arranges items into rows:

| CSS class | What it does |
|-----------|--------------|
| `.page`   | The cream "paper" sheet. Its background shows through the gaps, which makes the white gutters. |
| `.row`    | A horizontal strip of panels. `slant-b` slants its bottom edge, `slant-t` its top edge, so the gutters between strips run diagonally. |
| `.panel`  | One comic frame. `slant-r` / `slant-l` slant its right / left edge, so gutters between panels in a row are diagonal. |

The slants are just `clip-path: polygon(...)` with a negative margin so neighbouring panels tuck
into each other. Change how strong the slant is with `--s`, and the gutter width with `--g`, at the
top of `style.css`.

On phones (under 760px) panels stack vertically and the side slants are switched off.

---

## 4. How to make changes (cookbook)

Everything below happens in **`js/data.js`**. Save, then refresh the browser.

### ➕ Add a skill
Find the category and add a string:
```js
{ title: "AI / ML", art: "brain", items: ["TensorFlow", "Keras", "PyTorch" /* ← new */] },
```

### ➕ Add a new skill category
Add an object to the `skills` array. The grid shows 3 per row automatically:
```js
{ title: "Cloud", art: "signal", items: ["AWS", "Docker", "Kubernetes"] },
```

### ➕ Add a job / experience
Add an object to the **top** of `experience` (newest first):
```js
{
  role: "ML Engineer",
  company: "Cool AI Startup",
  location: "Berlin, Germany",
  period: "Jan 2027 — Present",
  art: "brain",          // which illustration (see list below)
  sfx: "LEVEL UP!",      // the comic sound-effect word (optional, "" to hide)
  points: [
    "Built X that did Y.",
    "Improved Z by 30%.",
  ],
},
```
Panels automatically alternate left and right.

### ➕ Add a project
```js
{
  name: "My New Agent",
  art: "robot",
  tags: ["LLM", "Agents", "Python"],
  description: "One or two sentences about what it does and the result.",
  link: "https://github.com/rjn01/my-new-agent",   // "" shows "PRIVATE BUILD"
},
```

### ➕ Add education, a course or a language
```js
education: [ { school: "…", degree: "…", location: "…", period: "…", details: ["GPA …"] }, … ]
courses:   [ "Generative AI with LLMs — DeepLearning.AI", … ]
languages: [ { name: "German", level: "A2", percent: 35 }, … ]   // percent = bar length
```

### ✏️ Change the hero text, contact info or big numbers
Edit `profile` (name, tagline, catchphrase, intro, email, phone, links) and `stats`.
- **LinkedIn:** replace the placeholder `https://www.linkedin.com/in/YOUR-LINKEDIN-HANDLE`.
- **Phone** is empty on purpose, so it isn't public. Add it if you want it shown.

### 📄 Update the downloadable CV
Replace `assets/Rajan_Puri_CV.pdf` with the new file (same name), or change `profile.cv`.

### 🎨 Available illustrations (`art:` values)
`city` · `brain` · `robot` · `bank` · `signal` · `eye` · `palette` · `heart` · `book`

**Add your own:** in `js/art.js`, add a new entry to the `ART` object:
```js
rocket: () => svg((id) => `
  ${sunAndGrid(id)}
  <path d="…" fill="#ff4fa3" stroke="#000" stroke-width="4"/>
`),
```
Then use `art: "rocket"` in `data.js`. `sunAndGrid()` and `skyline()` are ready-made backgrounds.

**Use a real image instead** (e.g. AI-generated art like deeptech.build uses): put `my.jpg` in
`assets/`. Then in `main.js` → `initArt()`, render `<img src="assets/my.jpg">` when the `art` value
ends in `.jpg`:
```js
el.innerHTML = /\.(jpe?g|png|webp)$/.test(el.dataset.art)
  ? `<img src="${el.dataset.art}" alt="" style="width:100%;height:100%;object-fit:cover">`
  : window.ART(el.dataset.art);
```
and write `art: "assets/my.jpg"` in `data.js`.

### 🎨 Change colours / fonts / slant
Top of `css/style.css`:
```css
:root {
  --pink: #ff4fa3;  --cyan: #3cf2ff;  --yellow: #ffe66b;  --violet: #8a5cff;
  --paper: #f6f1e7;            /* gutter / border colour */
  --font-comic: "Bangers";     /* big comic headings */
  --s: 34px;                   /* slant amount: 0px = straight panels */
}
```

### ➕ Add a completely new section
1. In `index.html`, copy a `<section class="chapter">` block, give it a new `id` and an empty
   container, e.g. `<div class="page" id="awards-grid"></div>`. Add a nav link `<a href="#awards">`.
2. In `data.js`, add the data: `awards: [ { title: "Pinnacle Award", art: "bank", year: "2023" } ]`.
3. In `main.js`, add a render function and call it before `initArt()`:
```js
function renderAwards() {
  $("#awards-grid").innerHTML = comicRows(R.awards, 3, (a, cls) => `
    <article class="panel ${cls}">
      <div class="art" data-art="${esc(a.art)}"></div>
      <div class="panel-body"><p class="mono kicker">${esc(a.year)}</p><h3>${esc(a.title)}</h3></div>
    </article>`);
}
```

---

## 5. Deploy it (free)

It's a static site, so any static host works:

- **GitHub Pages:** push this folder to a repo, then Settings → Pages → deploy from `main` / root.
  Your site will be at `https://rjn01.github.io/<repo>`.
- **Netlify / Vercel:** drag and drop the folder onto <https://app.netlify.com/drop>, or import the repo.

---

## 6. Accessibility and performance notes

- Animations turn off automatically for users with *reduce motion* enabled.
- All text is real HTML, so it's selectable and readable by search engines and screen readers.
- No images to download (illustrations are inline SVG), so the page is very light.
