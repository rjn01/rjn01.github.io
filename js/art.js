/* =====================================================================
   art.js  —  Hand-coded SVG "comic illustrations".
   ---------------------------------------------------------------------
   Every function returns an SVG string. data.js picks one by name via
   the `art` field (e.g. art: "brain"). To add a new illustration:
     1. Add a new function to ART below, e.g.  rocket: () => svg(`...`)
     2. Use art: "rocket" in data.js
   All illustrations share the same synthwave palette defined in `defs`.
   ===================================================================== */

(function () {
  let uid = 0;

  // Shared gradients + halftone pattern. ids are made unique per SVG.
  function defs(id) {
    return `
    <defs>
      <linearGradient id="sky${id}" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#1a0b3d"/>
        <stop offset=".55" stop-color="#5b1fa8"/>
        <stop offset="1" stop-color="#ff4fa3"/>
      </linearGradient>
      <linearGradient id="neon${id}" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#3cf2ff"/>
        <stop offset="1" stop-color="#b14bff"/>
      </linearGradient>
      <radialGradient id="sun${id}" cx=".5" cy=".5" r=".5">
        <stop offset="0" stop-color="#ffe66b"/>
        <stop offset="1" stop-color="#ff4fa3"/>
      </radialGradient>
      <pattern id="dots${id}" width="8" height="8" patternUnits="userSpaceOnUse">
        <circle cx="4" cy="4" r="1.4" fill="#000" opacity=".35"/>
      </pattern>
    </defs>`;
  }

  const svg = (body, vb = "0 0 400 260") => {
    const id = ++uid;
    return `<svg viewBox="${vb}" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${defs(id)}
      <rect width="100%" height="100%" fill="url(#sky${id})"/>
      ${body(id)}
      <rect width="100%" height="100%" fill="url(#dots${id})"/>
    </svg>`;
  };

  // Retro sun with horizontal stripes + perspective grid floor.
  const sunAndGrid = (id, cx = 200, cy = 150, r = 70) => `
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="url(#sun${id})"/>
    ${[0, 1, 2, 3, 4]
      .map((i) => `<rect x="${cx - r}" y="${cy + 10 + i * 12}" width="${r * 2}" height="${3 + i}" fill="#5b1fa8"/>`)
      .join("")}
    <rect y="190" width="400" height="70" fill="#12062b"/>
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${200 + (i - 6) * 12}" y1="190" x2="${200 + (i - 6) * 80}" y2="260" stroke="#3cf2ff" stroke-width="1" opacity=".55"/>`).join("")}
    ${[195, 203, 215, 232, 255].map((y) => `<line x1="0" y1="${y}" x2="400" y2="${y}" stroke="#3cf2ff" stroke-width="1" opacity=".5"/>`).join("")}
  `;

  const skyline = (fill = "#0b0420") => {
    const b = [
      [0, 120], [30, 90], [60, 140], [85, 70], [120, 110], [150, 60], [185, 130],
      [215, 80], [250, 115], [280, 50], [315, 100], [345, 75], [375, 125],
    ];
    return b
      .map(([x, h], i) => {
        const win = Array.from({ length: Math.floor(h / 18) }, (_, k) =>
          `<rect x="${x + 7}" y="${190 - h + 10 + k * 18}" width="4" height="6" fill="${i % 2 ? "#3cf2ff" : "#ff4fa3"}" opacity=".85"/>
           <rect x="${x + 16}" y="${190 - h + 10 + k * 18}" width="4" height="6" fill="#ffe66b" opacity="${k % 2 ? 0.9 : 0.25}"/>`
        ).join("");
        return `<rect x="${x}" y="${190 - h}" width="28" height="${h}" fill="${fill}" stroke="#000" stroke-width="2"/>${win}`;
      })
      .join("");
  };

  const ART = {
    // Neon AI city with a neural network in the sky — used in the hero.
    city: () =>
      svg((id) => {
        const nodes = [[60, 40], [130, 25], [210, 50], [290, 20], [350, 55], [100, 80], [250, 85], [330, 95]];
        const edges = [[0, 1], [1, 2], [2, 3], [3, 4], [0, 5], [5, 2], [2, 6], [6, 4], [6, 7], [1, 5], [3, 6]];
        return `
          ${sunAndGrid(id, 200, 150, 75)}
          ${edges.map(([a, b]) => `<line class="pulse" x1="${nodes[a][0]}" y1="${nodes[a][1]}" x2="${nodes[b][0]}" y2="${nodes[b][1]}" stroke="url(#neon${id})" stroke-width="2"/>`).join("")}
          ${nodes.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="5" fill="#3cf2ff" stroke="#000" stroke-width="2"/>`).join("")}
          ${skyline()}
        `;
      }),

    // Glowing brain made of circuits.
    brain: () =>
      svg((id) => `
        ${sunAndGrid(id, 200, 160, 60)}
        <g stroke="#000" stroke-width="4" fill="#ff8fd0">
          <path d="M200 60c-30-25-85-10-85 30-25 10-25 55 5 65 0 30 45 40 65 20 5 10 25 10 15-5V60z"/>
          <path d="M200 60c30-25 85-10 85 30 25 10 25 55-5 65 0 30-45 40-65 20-5 10-25 10-15-5V60z" fill="#c77dff"/>
        </g>
        <g stroke="#3cf2ff" stroke-width="3" fill="none" class="pulse">
          <path d="M140 100h30l10 20h20M150 140h25l10-15M260 95h-30l-10 25h-20M255 140h-30l-10-15"/>
        </g>
        ${[[170, 100], [180, 120], [185, 125], [230, 95], [220, 120], [215, 125]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="4" fill="#ffe66b" stroke="#000" stroke-width="1.5"/>`).join("")}
      `),

    // Friendly retro robot.
    robot: () =>
      svg((id) => `
        ${sunAndGrid(id, 290, 120, 55)}
        <g stroke="#000" stroke-width="4">
          <line x1="200" y1="45" x2="200" y2="70"/><circle cx="200" cy="40" r="8" fill="#ff4fa3"/>
          <rect x="145" y="70" width="110" height="80" rx="14" fill="#c9d6ff"/>
          <rect x="160" y="88" width="80" height="40" rx="8" fill="#12062b"/>
          <circle cx="182" cy="108" r="9" fill="#3cf2ff" class="blink"/><circle cx="218" cy="108" r="9" fill="#3cf2ff" class="blink"/>
          <rect x="155" y="150" width="90" height="70" rx="10" fill="#8a7dff"/>
          <rect x="175" y="165" width="50" height="30" rx="4" fill="#12062b"/>
          <path d="M155 165l-40 30M245 165l40-30" stroke-width="10" stroke-linecap="round"/>
        </g>
        <text x="200" y="186" text-anchor="middle" font-family="monospace" font-size="14" fill="#3cf2ff">&lt;/&gt;</text>
      `),

    // A bank with coins — fintech work.
    bank: () =>
      svg((id) => `
        ${sunAndGrid(id, 90, 110, 50)}
        <g stroke="#000" stroke-width="4">
          <path d="M120 95 220 45 320 95z" fill="#ffe66b"/>
          <rect x="125" y="95" width="190" height="14" fill="#c9d6ff"/>
          ${[140, 180, 220, 260, 290].map((x) => `<rect x="${x}" y="109" width="16" height="70" fill="#c9d6ff"/>`).join("")}
          <rect x="115" y="179" width="210" height="16" fill="#8a7dff"/>
        </g>
        ${[[60, 210], [90, 225], [340, 215], [365, 200]].map(([x, y]) => `<g stroke="#000" stroke-width="3"><ellipse cx="${x}" cy="${y}" rx="16" ry="8" fill="#ffe66b"/></g>`).join("")}
        <text x="220" y="85" text-anchor="middle" font-family="Bangers, sans-serif" font-size="22" fill="#000">$</text>
      `),

    // Radio tower with 5G waves.
    signal: () =>
      svg((id) => `
        ${sunAndGrid(id, 110, 120, 50)}
        <g stroke="#000" stroke-width="4" fill="none">
          <path d="M240 200 270 60 300 200M250 150h40M258 110h24" stroke="#c9d6ff" stroke-width="6"/>
        </g>
        <circle cx="270" cy="55" r="9" fill="#ff4fa3" stroke="#000" stroke-width="3"/>
        ${[25, 45, 65].map((r, i) => `<path class="pulse" style="animation-delay:${i * 0.3}s" d="M${270 - r} ${55 - r * 0.4}a${r} ${r} 0 0 1 ${r * 2} 0" stroke="#3cf2ff" stroke-width="4" fill="none"/>`).join("")}
        <text x="330" y="70" font-family="Bangers, sans-serif" font-size="34" fill="#ffe66b" stroke="#000" stroke-width="1.5">5G</text>
      `),

    // Scanning eye / camera — computer vision.
    eye: () =>
      svg((id) => `
        ${sunAndGrid(id, 200, 160, 60)}
        <g stroke="#000" stroke-width="4">
          <path d="M80 110q120-90 240 0-120 90-240 0z" fill="#fff"/>
          <circle cx="200" cy="110" r="38" fill="url(#neon${id})"/>
          <circle cx="200" cy="110" r="16" fill="#000"/>
        </g>
        <circle cx="190" cy="100" r="6" fill="#fff"/>
        <rect class="scan" x="70" y="60" width="260" height="4" fill="#3cf2ff" opacity=".8"/>
        <g stroke="#ffe66b" stroke-width="3" fill="none"><path d="M60 50h25M60 50v25M340 50h-25M340 50v25M60 175h25M60 175v-25M340 175h-25M340 175v-25"/></g>
        <rect x="150" y="205" width="100" height="26" fill="#ffe66b" stroke="#000" stroke-width="3"/>
        <text x="200" y="224" text-anchor="middle" font-family="monospace" font-weight="700" font-size="15">DL·4821·B</text>
      `),

    // Painter's palette + brush — style transfer.
    palette: () =>
      svg((id) => `
        ${sunAndGrid(id, 300, 110, 50)}
        <g stroke="#000" stroke-width="4">
          <path d="M120 70c80-40 170 0 160 60-5 30-45 20-55 40-12 25 10 45-30 50-90 10-150-100-75-150z" fill="#f4e1c1"/>
          <circle cx="150" cy="105" r="13" fill="#ff4fa3"/><circle cx="190" cy="85" r="13" fill="#3cf2ff"/>
          <circle cx="235" cy="95" r="13" fill="#ffe66b"/><circle cx="145" cy="150" r="13" fill="#8a7dff"/>
          <circle cx="245" cy="140" r="11" fill="#12062b"/>
          <path d="M300 40 220 150" stroke-width="8" stroke-linecap="round"/>
        </g>
      `),

    // Glowing heart with a pulse line — mental health / soft skills.
    heart: () =>
      svg((id) => `
        ${sunAndGrid(id, 200, 160, 60)}
        <path d="M200 205C110 145 95 70 150 60c25-5 45 10 50 30 5-20 25-35 50-30 55 10 40 85-50 145z" fill="#ff4fa3" stroke="#000" stroke-width="4"/>
        <path class="pulse" d="M60 130h80l15-30 20 60 20-45 12 15h133" stroke="#3cf2ff" stroke-width="4" fill="none"/>
      `),

    // Stack of books with graduation cap — education.
    book: () =>
      svg((id) => `
        ${sunAndGrid(id, 110, 120, 50)}
        <g stroke="#000" stroke-width="4">
          <rect x="170" y="160" width="160" height="28" fill="#3cf2ff"/>
          <rect x="180" y="132" width="140" height="28" fill="#ff4fa3"/>
          <rect x="165" y="104" width="150" height="28" fill="#ffe66b"/>
          <path d="M240 50 310 75 240 100 170 75z" fill="#12062b"/>
          <path d="M200 87v20q40 15 80 0V87" fill="#12062b"/>
          <path d="M310 75v35" /><circle cx="310" cy="112" r="5" fill="#ffe66b"/>
        </g>
      `),
  };

  window.ART = (name) => (ART[name] || ART.city)();
})();
