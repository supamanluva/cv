/* ═══════════════════════════════════════════════════════════
   RETRO TERMINAL CV — Interactive Shell Engine
   ═══════════════════════════════════════════════════════════ */

// ── CV-data — Redigera denna sektion med din riktiga info ─
const CV = {
  name: "Ditt Namn",
  title: "Mjukvaruutvecklare",
  email: "du@example.com",
  location: "Stad, Sverige",
  website: "https://dinsite.dev",
  github: "https://github.com/dittanvändarnamn",
  linkedin: "https://linkedin.com/in/dittanvändarnamn",
  summary: [
    "Passionerad mjukvaruutvecklare med X+ års erfarenhet av att bygga",
    "skalbara system, open source-verktyg och fantastiska användarupplevelser.",
    "Älskar ren kod, terminalbaserade gränssnitt och att lösa svåra problem.",
  ],
  skills: {
    "Språk":       ["Go", "Python", "TypeScript", "Rust", "Bash"],
    "Ramverk":     ["React", "Node.js", "FastAPI", "Gin"],
    "DevOps":      ["Docker", "Kubernetes", "Terraform", "CI/CD"],
    "Databaser":   ["PostgreSQL", "Redis", "MongoDB", "SQLite"],
    "Verktyg":     ["Git", "Neovim", "Linux", "Tmux"],
  },
  experience: [
    {
      role: "Senior Mjukvaruutvecklare",
      company: "Awesome Corp",
      period: "2023 — Nuvarande",
      highlights: [
        "Ledde migrering av monolitisk backend till mikrotjänster (Go + gRPC)",
        "Minskade API-latens med 60% genom caching och frågeoptimering",
        "Mentorerade 4 juniora utvecklare och etablerade code review-kultur",
      ],
    },
    {
      role: "Mjukvaruutvecklare",
      company: "StartupXYZ",
      period: "2020 — 2023",
      highlights: [
        "Byggde realtids-datapipeline som bearbetade 500K händelser/dag",
        "Designade och levererade ett React-komponentbibliotek som används i 3 produkter",
        "Implementerade OAuth2/OIDC-autentiseringssystem från grunden",
      ],
    },
    {
      role: "Junior Utvecklare",
      company: "Tech Agency",
      period: "2018 — 2020",
      highlights: [
        "Utvecklade fullstack-webbapplikationer för 10+ kundprojekt",
        "Introducerade automatiserad testning, ökade kodtäckning till 85%",
        "Byggde interna CLI-verktyg som sparade 15+ timmar/vecka manuellt arbete",
      ],
    },
  ],
  education: [
    {
      degree: "Kandidatexamen i Datavetenskap",
      school: "Tekniska Högskolan",
      year: "2018",
      note: "Examen med utmärkelse — inriktning distribuerade system",
    },
  ],
  projects: [
    {
      name: "retro-cv",
      desc: "Det terminalbaserade interaktiva CV:t du använder just nu",
      tech: "HTML, CSS, JavaScript",
      url: "https://github.com/dittanvändarnamn/retro-cv",
    },
    {
      name: "go-irc-bot",
      desc: "Ett modulärt IRC-botramverk med stöd för plugins",
      tech: "Go, SQLite",
      url: "https://github.com/dittanvändarnamn/go-irc-bot",
    },
    {
      name: "dotfiles",
      desc: "Noggrant utformad konfiguration för utvecklingsmiljö",
      tech: "Bash, Lua, TOML",
      url: "https://github.com/dittanvändarnamn/dotfiles",
    },
  ],
  certifications: [
    "AWS Certified Solutions Architect — Associate (2024)",
    "CKA — Certified Kubernetes Administrator (2023)",
  ],
  interests: [
    "Öppen källkod", "Retrodatorer", "Mekaniska tangentbord",
    "Hemmalabb", "Sci-fi-romaner", "Kaffebryggning",
  ],
};

// ── DOM ──────────────────────────────────────────────────
const output   = document.getElementById("output");
const input    = document.getElementById("input");
const screen   = document.getElementById("screen");
const powerBtn = document.getElementById("power-btn");

// ── Helpers ──────────────────────────────────────────────
function esc(str) {
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function print(html) {
  output.innerHTML += html + "\n";
  scrollBottom();
}

function printLines(lines) {
  lines.forEach(l => print(l));
}

function scrollBottom() {
  screen.scrollTop = screen.scrollHeight;
}

function span(cls, text) {
  return `<span class="${cls}">${text}</span>`;
}

function sep(ch = "─", len = 60) {
  return span("c-separator", ch.repeat(len));
}

function heading(text) {
  return span("c-heading", `  ${text}`);
}

function blank() { return ""; }

// ── Typewriter effect for boot sequence ──────────────────
function typewrite(lines, delay = 30) {
  return new Promise(resolve => {
    let i = 0;
    function next() {
      if (i < lines.length) {
        print(lines[i]);
        i++;
        setTimeout(next, delay);
      } else {
        resolve();
      }
    }
    next();
  });
}

// ── Command registry ────────────────────────────────────
const COMMANDS = {};

function register(name, aliases, desc, fn) {
  const entry = { name, aliases, desc, fn };
  COMMANDS[name] = entry;
  aliases.forEach(a => { COMMANDS[a] = entry; });
}

// ── help ─────────────────────────────────────────────────
register("hjälp", ["h", "?", "help", "kommandon"], "Visa tillgängliga kommandon", () => {
  print(blank());
  print(heading("TILLGÄNGLIGA KOMMANDON"));
  print(sep());
  const seen = new Set();
  Object.values(COMMANDS).forEach(cmd => {
    if (seen.has(cmd.name)) return;
    seen.add(cmd.name);
    const aliases = cmd.aliases.length ? span("c-dim", ` (${cmd.aliases.join(", ")})`) : "";
    const nameCol = `<span class="c-cyan" style="display:inline-block;width:11em">${cmd.name}</span>`;
    print(`  ${nameCol}${span("c-white", cmd.desc)}${aliases}`);
  });
  print(sep());
  print(span("c-dim", "  Tips: använd Tab för autokomplettering, ↑↓ för historik"));
  print(blank());
});

// ── about ────────────────────────────────────────────────
register("om", ["whoami", "bio", "jag"], "Vem är jag?", () => {
  print(blank());
  print(heading(`${CV.name.toUpperCase()}`));
  print(sep());
  print(`  ${span("c-key", "Roll".padEnd(14))}${span("c-value", CV.title)}`);
  print(`  ${span("c-key", "Plats".padEnd(14))}${span("c-value", CV.location)}`);
  print(`  ${span("c-key", "E-post".padEnd(14))}${span("c-link", CV.email)}`);
  print(`  ${span("c-key", "Webbplats".padEnd(14))}<a class="c-link" href="${CV.website}" target="_blank">${CV.website}</a>`);
  print(`  ${span("c-key", "GitHub".padEnd(14))}<a class="c-link" href="${CV.github}" target="_blank">${CV.github}</a>`);
  print(`  ${span("c-key", "LinkedIn".padEnd(14))}<a class="c-link" href="${CV.linkedin}" target="_blank">${CV.linkedin}</a>`);
  print(sep());
  print(blank());
  CV.summary.forEach(line => print(`  ${span("c-white", line)}`));
  print(blank());
});

// ── skills ───────────────────────────────────────────────
register("kompetens", ["skills", "tech", "stack"], "Tekniska kompetenser", () => {
  print(blank());
  print(heading("TEKNISKA KOMPETENSER"));
  print(sep());
  Object.entries(CV.skills).forEach(([cat, items]) => {
    const bar = items.map(s => span("c-green", `[${s}]`)).join(" ");
    print(`  ${span("c-key", cat.padEnd(14))}${bar}`);
  });
  print(sep());
  print(blank());
});

// ── experience ───────────────────────────────────────────
register("erfarenhet", ["exp", "arbete", "jobb"], "Arbetslivserfarenhet", () => {
  print(blank());
  print(heading("ARBETSLIVSERFARENHET"));
  print(sep());
  CV.experience.forEach((job, i) => {
    print(`  ${span("c-cyan c-bold", job.role)}`);
    print(`  ${span("c-amber", job.company)}  ${span("c-dim", "//  " + job.period)}`);
    job.highlights.forEach(h => {
      print(`    ${span("c-dim", "▸")} ${span("c-white", h)}`);
    });
    if (i < CV.experience.length - 1) print(blank());
  });
  print(sep());
  print(blank());
});

// ── education ────────────────────────────────────────────
register("utbildning", ["edu", "skola"], "Utbildningshistorik", () => {
  print(blank());
  print(heading("UTBILDNING"));
  print(sep());
  CV.education.forEach(ed => {
    print(`  ${span("c-cyan c-bold", ed.degree)}`);
    print(`  ${span("c-amber", ed.school)}  ${span("c-dim", "//  " + ed.year)}`);
    if (ed.note) print(`    ${span("c-dim", "▸")} ${span("c-white", ed.note)}`);
  });
  print(sep());
  print(blank());
});

// ── projects ─────────────────────────────────────────────
register("projekt", ["proj", "portfolio"], "Personliga projekt", () => {
  print(blank());
  print(heading("PROJEKT"));
  print(sep());
  CV.projects.forEach((p, i) => {
    print(`  ${span("c-cyan c-bold", p.name)}`);
    print(`    ${span("c-white", p.desc)}`);
    print(`    ${span("c-key", "Teknik:")} ${span("c-green", p.tech)}`);
    print(`    ${span("c-key", "URL:")}    <a class="c-link" href="${p.url}" target="_blank">${p.url}</a>`);
    if (i < CV.projects.length - 1) print(blank());
  });
  print(sep());
  print(blank());
});

// ── certifications ───────────────────────────────────────
register("certifikat", ["certs", "cert"], "Certifieringar", () => {
  print(blank());
  print(heading("CERTIFIERINGAR"));
  print(sep());
  CV.certifications.forEach(c => {
    print(`    ${span("c-dim", "▸")} ${span("c-white", c)}`);
  });
  print(sep());
  print(blank());
});

// ── interests ────────────────────────────────────────────
register("intressen", ["hobbies", "nöjen"], "Intressen & hobbies", () => {
  print(blank());
  print(heading("INTRESSEN"));
  print(sep());
  const tags = CV.interests.map(i => span("c-green", `[${i}]`)).join(" ");
  print(`  ${tags}`);
  print(sep());
  print(blank());
});

// ── all ──────────────────────────────────────────────────
register("allt", ["cv", "resume", "hela"], "Visa hela CV:t", () => {
  COMMANDS["om"].fn();
  COMMANDS["kompetens"].fn();
  COMMANDS["erfarenhet"].fn();
  COMMANDS["utbildning"].fn();
  COMMANDS["projekt"].fn();
  COMMANDS["certifikat"].fn();
  COMMANDS["intressen"].fn();
});

// ── clear ────────────────────────────────────────────────
register("rensa", ["clear", "cls", "reset"], "Rensa terminalen", () => {
  output.innerHTML = "";
});

// ── neofetch — fun ───────────────────────────────────────
register("neofetch", ["fetch", "sysinfo"], "Visa systeminfo (bara för kul)", () => {
  const art = [
    `      ${span("c-cyan", "╔══════════════════╗")}    ${span("c-key", "besökare")}${span("c-white", "@")}${span("c-cyan", "cv-terminal")}`,
    `      ${span("c-cyan", "║")}  ${span("c-green", "▄▄▄▄▄  ▄▄▄▄▄")}  ${span("c-cyan", "║")}    ${span("c-separator", "──────────────────")}`,
    `      ${span("c-cyan", "║")}  ${span("c-green", "█   █  █   █")}  ${span("c-cyan", "║")}    ${span("c-key", "OS:".padEnd(12))}${span("c-white", "TerminalCV 1.0")}`,
    `      ${span("c-cyan", "║")}  ${span("c-green", "█   █  █   █")}  ${span("c-cyan", "║")}    ${span("c-key", "Värd:".padEnd(12))}${span("c-white", CV.name)}`,
    `      ${span("c-cyan", "║")}  ${span("c-green", "█▄▄▄█  █▄▄▄█")}  ${span("c-cyan", "║")}    ${span("c-key", "Kärna:".padEnd(12))}${span("c-white", "HTML5/CSS3/JS")}`,
    `      ${span("c-cyan", "║")}  ${span("c-green", "█   █  █   █")}  ${span("c-cyan", "║")}    ${span("c-key", "Drifttid:".padEnd(12))}${span("c-white", CV.experience[0]?.period || "N/A")}`,
    `      ${span("c-cyan", "║")}  ${span("c-green", "█   █  █   █")}  ${span("c-cyan", "║")}    ${span("c-key", "Skal:".padEnd(12))}${span("c-white", "cv-bash 4.2")}`,
    `      ${span("c-cyan", "║")}  ${span("c-green", "▀   ▀  ▀   ▀")}  ${span("c-cyan", "║")}    ${span("c-key", "Terminal:".padEnd(12))}${span("c-white", "CRT-Fosfor-Grön")}`,
    `      ${span("c-cyan", "╚══════════════════╝")}    ${span("c-key", "CPU:".padEnd(12))}${span("c-white", "Koffeindriven Hjärna")}`,
    `                              ${span("c-key", "Minne:".padEnd(12))}${span("c-white", "∞ / ∞ idéer")}`,
    ``,
    `                              ${span("c-red", "███")}${span("c-amber", "███")}${span("c-green", "███")}${span("c-cyan", "███")}${span("c-magenta", "███")}${span("c-white", "███")}`,
  ];
  print(blank());
  art.forEach(l => print(l));
  print(blank());
});

// ── date ─────────────────────────────────────────────────
register("datum", ["tid", "date"], "Visa aktuellt datum/tid", () => {
  print(`  ${span("c-white", new Date().toString())}`);
});

// ── echo ─────────────────────────────────────────────────
register("echo", [], "Eka tillbaka text", (args) => {
  print(`  ${span("c-white", esc(args.join(" ")))}`);
});

// ── print / skriv ut ─────────────────────────────────────
register("utskrift", ["print", "pdf", "export", "skriv"], "Öppna utskriftsvänlig version (PDF)", () => {
  // Build a clean HTML document for printing
  const printWin = window.open("", "_blank");
  if (!printWin) {
    print(`  ${span("c-red", "Popup blockerad — tillåt popups för denna sida")}`);
    return;
  }

  const skillsHtml = Object.entries(CV.skills).map(([cat, items]) =>
    `<tr><td class="label">${cat}</td><td>${items.join(" · ")}</td></tr>`
  ).join("");

  const expHtml = CV.experience.map(job => `
    <div class="job">
      <div class="job-header">
        <strong>${job.role}</strong> — ${job.company}
        <span class="period">${job.period}</span>
      </div>
      <ul>${job.highlights.map(h => `<li>${h}</li>`).join("")}</ul>
    </div>
  `).join("");

  const eduHtml = CV.education.map(ed => `
    <div class="edu">
      <strong>${ed.degree}</strong> — ${ed.school}
      <span class="period">${ed.year}</span>
      ${ed.note ? `<div class="note">${ed.note}</div>` : ""}
    </div>
  `).join("");

  const projHtml = CV.projects.map(p => `
    <div class="project">
      <strong>${p.name}</strong> — ${p.desc}
      <div class="tech">${p.tech} · <a href="${p.url}">${p.url}</a></div>
    </div>
  `).join("");

  const certsHtml = CV.certifications.map(c => `<li>${c}</li>`).join("");

  const interestsHtml = CV.interests.join(" · ");

  printWin.document.write(`<!DOCTYPE html>
<html lang="sv">
<head>
<meta charset="UTF-8" />
<title>CV — ${CV.name}</title>
<style>
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700&display=swap');
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body {
    font-family: 'Inter', -apple-system, sans-serif;
    font-size: 10.5pt;
    line-height: 1.5;
    color: #1a1a1a;
    max-width: 800px;
    margin: 0 auto;
    padding: 30px 40px;
  }
  a { color: #2563eb; text-decoration: none; }
  a:hover { text-decoration: underline; }

  /* Header */
  .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #1a1a1a; padding-bottom: 15px; }
  .header h1 { font-size: 22pt; font-weight: 700; letter-spacing: 1px; margin-bottom: 4px; }
  .header .title { font-size: 12pt; color: #555; margin-bottom: 8px; }
  .header .contact { font-size: 9pt; color: #666; }
  .header .contact span { margin: 0 6px; }

  /* Sections */
  h2 {
    font-size: 11pt;
    text-transform: uppercase;
    letter-spacing: 2px;
    color: #1a1a1a;
    border-bottom: 1px solid #ccc;
    padding-bottom: 3px;
    margin: 18px 0 10px;
  }

  /* Summary */
  .summary { color: #333; margin-bottom: 5px; font-style: italic; }

  /* Skills table */
  .skills-table { width: 100%; border-collapse: collapse; }
  .skills-table td { padding: 3px 0; vertical-align: top; }
  .skills-table .label { font-weight: 600; width: 110px; color: #333; }

  /* Experience */
  .job { margin-bottom: 12px; }
  .job-header { display: flex; justify-content: space-between; align-items: baseline; }
  .period { color: #888; font-size: 9pt; white-space: nowrap; }
  .job ul { margin: 4px 0 0 18px; color: #444; }
  .job li { margin-bottom: 2px; }

  /* Education */
  .edu { margin-bottom: 8px; }
  .edu .note { color: #666; font-size: 9.5pt; margin-top: 2px; }

  /* Projects */
  .project { margin-bottom: 8px; }
  .project .tech { color: #888; font-size: 9pt; }

  /* Certs & interests */
  ul.plain { list-style: none; padding: 0; }
  ul.plain li::before { content: "▸ "; color: #999; }

  .interests { color: #444; }

  /* Print */
  @media print {
    body { padding: 0; }
    @page { margin: 15mm 18mm; size: A4; }
  }

  /* Auto-print button */
  .print-btn {
    display: block;
    margin: 25px auto 0;
    padding: 10px 30px;
    background: #1a1a1a;
    color: #fff;
    border: none;
    border-radius: 6px;
    font-size: 11pt;
    cursor: pointer;
  }
  .print-btn:hover { background: #333; }
  @media print { .print-btn { display: none; } }
</style>
</head>
<body>

<div class="header">
  <h1>${CV.name}</h1>
  <div class="title">${CV.title}</div>
  <div class="contact">
    ${CV.location}<span>·</span>
    <a href="mailto:${CV.email}">${CV.email}</a><span>·</span>
    <a href="${CV.website}">${CV.website}</a><span>·</span>
    <a href="${CV.github}">GitHub</a><span>·</span>
    <a href="${CV.linkedin}">LinkedIn</a>
  </div>
</div>

<h2>Profil</h2>
<p class="summary">${CV.summary.join(" ")}</p>

<h2>Kompetenser</h2>
<table class="skills-table">${skillsHtml}</table>

<h2>Erfarenhet</h2>
${expHtml}

<h2>Utbildning</h2>
${eduHtml}

<h2>Projekt</h2>
${projHtml}

<h2>Certifieringar</h2>
<ul class="plain">${certsHtml}</ul>

<h2>Intressen</h2>
<p class="interests">${interestsHtml}</p>

<button class="print-btn" onclick="window.print()">🖨️ Skriv ut / Spara som PDF</button>

</body>
</html>`);
  printWin.document.close();
  print(`  ${span("c-green", "Utskriftsvänlig version öppnad i nytt fönster")}`);
});

// ── snake ────────────────────────────────────────────────
let snakeActive = false;

register("snake", ["spel", "game", "spela"], "Spela Snake (Nokia 3310-stil)", () => {
  if (snakeActive) return;
  snakeActive = true;

  // Hide terminal input
  const inputLine = document.getElementById("input-line");
  inputLine.style.display = "none";

  // Game config
  const COLS = 35;
  const ROWS = 15;
  const WALL_H = "═";
  const WALL_V = "║";
  const CORNER = { tl: "╔", tr: "╗", bl: "╚", br: "╝" };
  const SNAKE_BODY = "█";
  const SNAKE_HEAD = "▓";
  const FOOD = "◆";
  const EMPTY = " ";
  const TICK_MS = 120;

  let snake = [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }];
  let dir = { x: 1, y: 0 };
  let nextDir = { x: 1, y: 0 };
  let food = null;
  let score = 0;
  let highScore = parseInt(localStorage.getItem("snake-hiscore") || "0");
  let gameOver = false;
  let intervalId = null;

  function placeFood() {
    let pos;
    do {
      pos = { x: Math.floor(Math.random() * COLS), y: Math.floor(Math.random() * ROWS) };
    } while (snake.some(s => s.x === pos.x && s.y === pos.y));
    food = pos;
  }

  function renderBoard() {
    const grid = Array.from({ length: ROWS }, () => Array(COLS).fill(EMPTY));

    // Place snake
    snake.forEach((s, i) => {
      if (s.x >= 0 && s.x < COLS && s.y >= 0 && s.y < ROWS) {
        grid[s.y][s.x] = i === 0 ? SNAKE_HEAD : SNAKE_BODY;
      }
    });

    // Place food
    if (food && food.x >= 0 && food.x < COLS && food.y >= 0 && food.y < ROWS) {
      grid[food.y][food.x] = FOOD;
    }

    // Build frame
    let lines = [];
    lines.push("");
    lines.push(`  ${span("c-amber c-bold", `  🐍 SNAKE — Poäng: ${score}  |  Rekord: ${highScore}`)}`);
    lines.push("");

    // Top wall
    lines.push(`  ${span("c-cyan", CORNER.tl + WALL_H.repeat(COLS) + CORNER.tr)}`);

    // Rows
    for (let y = 0; y < ROWS; y++) {
      let row = "";
      for (let x = 0; x < COLS; x++) {
        const cell = grid[y][x];
        if (cell === SNAKE_HEAD) {
          row += span("c-bright", SNAKE_HEAD);
        } else if (cell === SNAKE_BODY) {
          row += span("c-green", SNAKE_BODY);
        } else if (cell === FOOD) {
          row += span("c-red", FOOD);
        } else {
          row += EMPTY;
        }
      }
      lines.push(`  ${span("c-cyan", WALL_V)}${row}${span("c-cyan", WALL_V)}`);
    }

    // Bottom wall
    lines.push(`  ${span("c-cyan", CORNER.bl + WALL_H.repeat(COLS) + CORNER.br)}`);
    lines.push("");
    lines.push(`  ${span("c-dim", "Piltangenter/WASD = styr  |  Q/ESC = avsluta")}`);
    lines.push("");

    return lines;
  }

  function renderGameOver() {
    let lines = renderBoard();
    lines.push(`  ${span("c-red c-bold", "  ══════ GAME OVER ══════")}`);
    lines.push(`  ${span("c-amber", `  Slutpoäng: ${score}`)}${score >= highScore ? span("c-bright", "  ★ NYTT REKORD!") : ""}`);
    lines.push(`  ${span("c-dim", "  Tryck ENTER för att spela igen, eller Q för att avsluta")}`);
    lines.push("");
    return lines;
  }

  // Game display element — replace all output
  const savedOutput = output.innerHTML;
  output.innerHTML = "";
  const gameDiv = document.createElement("div");
  gameDiv.id = "snake-game";
  gameDiv.style.whiteSpace = "pre";
  gameDiv.style.fontFamily = "'Fira Code', 'Fira Mono', 'Courier New', monospace";
  gameDiv.style.fontSize = "0.85em";
  gameDiv.style.lineHeight = "1.1";
  output.appendChild(gameDiv);

  function drawGame() {
    const lines = gameOver ? renderGameOver() : renderBoard();
    gameDiv.innerHTML = lines.join("\n");
    screen.scrollTop = 0;
  }

  function tick() {
    if (gameOver) return;

    dir = { ...nextDir };
    const head = { x: snake[0].x + dir.x, y: snake[0].y + dir.y };

    // Wall collision
    if (head.x < 0 || head.x >= COLS || head.y < 0 || head.y >= ROWS) {
      endGame();
      return;
    }

    // Self collision
    if (snake.some(s => s.x === head.x && s.y === head.y)) {
      endGame();
      return;
    }

    snake.unshift(head);

    // Eat food
    if (food && head.x === food.x && head.y === food.y) {
      score += 10;
      placeFood();
    } else {
      snake.pop();
    }

    drawGame();
  }

  function endGame() {
    gameOver = true;
    clearInterval(intervalId);
    if (score > highScore) {
      highScore = score;
      localStorage.setItem("snake-hiscore", String(highScore));
    }
    drawGame();
  }

  function resetGame() {
    snake = [{ x: Math.floor(COLS / 2), y: Math.floor(ROWS / 2) }];
    dir = { x: 1, y: 0 };
    nextDir = { x: 1, y: 0 };
    food = null;
    score = 0;
    gameOver = false;
    placeFood();
    intervalId = setInterval(tick, TICK_MS);
    drawGame();
  }

  function exitGame() {
    snakeActive = false;
    clearInterval(intervalId);
    document.removeEventListener("keydown", gameKeyHandler, true);
    gameDiv.remove();
    output.innerHTML = savedOutput;
    inputLine.style.display = "flex";
    print(span("c-dim", `  Snake avslutad. Slutpoäng: ${score}`));
    input.focus();
  }

  function gameKeyHandler(e) {
    if (!snakeActive) return;
    e.preventDefault();
    e.stopPropagation();

    const key = e.key.toLowerCase();

    if (key === "q" || key === "escape") {
      exitGame();
      return;
    }

    if (gameOver && key === "enter") {
      resetGame();
      return;
    }

    // Direction controls — prevent 180° turns
    if ((key === "arrowup" || key === "w") && dir.y !== 1) {
      nextDir = { x: 0, y: -1 };
    } else if ((key === "arrowdown" || key === "s") && dir.y !== -1) {
      nextDir = { x: 0, y: 1 };
    } else if ((key === "arrowleft" || key === "a") && dir.x !== 1) {
      nextDir = { x: -1, y: 0 };
    } else if ((key === "arrowright" || key === "d") && dir.x !== -1) {
      nextDir = { x: 1, y: 0 };
    }
  }

  // Capture keys for game (capture phase so it fires before input)
  document.addEventListener("keydown", gameKeyHandler, true);

  // Blur input so it doesn't steal keypresses
  input.blur();

  // Boot the game
  placeFood();
  intervalId = setInterval(tick, TICK_MS);
  drawGame();
});

// ── theme ────────────────────────────────────────────────
register("tema", ["theme", "färg"], "Byt färgtema (green/amber/cyan/white)", (args) => {
  const themes = {
    green: { main: "#33ff33", dim: "#20c020", bright: "#66ff66", glow: "rgba(51,255,51,0.45)" },
    amber: { main: "#ffb000", dim: "#cc8800", bright: "#ffd060", glow: "rgba(255,176,0,0.45)" },
    cyan:  { main: "#00ffff", dim: "#00aaaa", bright: "#66ffff", glow: "rgba(0,255,255,0.45)" },
    white: { main: "#cccccc", dim: "#888888", bright: "#ffffff", glow: "rgba(200,200,200,0.3)" },
  };
  const t = (args[0] || "").toLowerCase();
  if (!themes[t]) {
    print(`  ${span("c-red", "Usage: theme <green|amber|cyan|white>")}`);
    return;
  }
  const th = themes[t];
  document.documentElement.style.setProperty("--green", th.main);
  document.documentElement.style.setProperty("--green-dim", th.dim);
  document.documentElement.style.setProperty("--green-bright", th.bright);
  document.documentElement.style.setProperty("--green-glow", th.glow);
  print(`  ${span("c-green", `Tema bytt till ${t}`)}`);
});

// ── history ──────────────────────────────────────────────
const cmdHistory = [];
let historyIdx = -1;

register("historik", ["hist", "history"], "Visa kommandohistorik", () => {
  print(blank());
  cmdHistory.forEach((c, i) => {
    print(`  ${span("c-dim", String(i + 1).padStart(4))}  ${span("c-white", c)}`);
  });
  print(blank());
});

// ── Process command ──────────────────────────────────────
function processCommand(raw) {
  const trimmed = raw.trim();
  if (!trimmed) return;

  // Visa det inmatade kommandot i utdata
  print(`${span("c-bright", "besökare@cv:~$")} ${esc(trimmed)}`);

  cmdHistory.push(trimmed);
  historyIdx = cmdHistory.length;

  const parts = trimmed.split(/\s+/);
  const cmd = parts[0].toLowerCase();
  const args = parts.slice(1);

  if (COMMANDS[cmd]) {
    COMMANDS[cmd].fn(args);
  } else {
    print(`  ${span("c-red", `kommando hittades inte: ${esc(cmd)}`)}`);
    print(`  ${span("c-dim", 'Skriv "hjälp" för att se tillgängliga kommandon')}`);
  }
}

// ── Tab completion ───────────────────────────────────────
function tabComplete(partial) {
  const names = [...new Set(Object.values(COMMANDS).map(c => c.name))];
  const matches = names.filter(n => n.startsWith(partial.toLowerCase()));
  if (matches.length === 1) return matches[0];
  if (matches.length > 1) {
    print(`${span("c-bright", "besökare@cv:~$")} ${esc(partial)}`);
    print(`  ${matches.map(m => span("c-cyan", m)).join("  ")}`);
  }
  return null;
}

// ── Input handling ───────────────────────────────────────
input.addEventListener("keydown", (e) => {
  // Don't handle terminal input while snake is active
  if (snakeActive) { e.preventDefault(); return; }
  if (e.key === "Enter") {
    e.preventDefault();
    const cmd = input.value.trim();
    input.value = "";
    processCommand(cmd);
    scrollBottom();
  } else if (e.key === "Tab") {
    e.preventDefault();
    const partial = input.value.trim();
    if (partial) {
      const completed = tabComplete(partial);
      if (completed) input.value = completed;
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIdx > 0) {
      historyIdx--;
      input.value = cmdHistory[historyIdx];
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIdx < cmdHistory.length - 1) {
      historyIdx++;
      input.value = cmdHistory[historyIdx];
    } else {
      historyIdx = cmdHistory.length;
      input.value = "";
    }
  } else if (e.key === "l" && e.ctrlKey) {
    e.preventDefault();
    COMMANDS["rensa"].fn();
  }
});

// Click anywhere → focus input (but not during snake)
document.addEventListener("click", () => {
  if (!snakeActive) input.focus();
});

// ── Power button (toggle CRT effects) ───────────────────
powerBtn.addEventListener("click", () => {
  document.body.classList.toggle("no-crt");
  powerBtn.classList.toggle("off");
});

// ── Boot sequence ────────────────────────────────────────
async function boot() {
  const bootLines = [
    span("c-dim", "BIOS v3.14 — POST-kontroll .. ") + span("c-green", "OK"),
    span("c-dim", "Minnestest .................. ") + span("c-green", "∞ KB OK"),
    span("c-dim", "Laddar CV-kärna ............. ") + span("c-green", "OK"),
    span("c-dim", "Monterar /dev/karriär ....... ") + span("c-green", "OK"),
    span("c-dim", "Startar bildskärmsserver .... ") + span("c-green", "OK"),
    blank(),
  ];

  await typewrite(bootLines, 80);

  const banner = [
    span("c-ascii", " ██████╗ ██╗   ██╗   ████████╗███████╗██████╗ ███╗   ███╗██╗███╗   ██╗ █████╗ ██╗      "),
    span("c-ascii", "██╔════╝ ██║   ██║   ╚══██╔══╝██╔════╝██╔══██╗████╗ ████║██║████╗  ██║██╔══██╗██║      "),
    span("c-ascii", "██║      ██║   ██║      ██║   █████╗  ██████╔╝██╔████╔██║██║██╔██╗ ██║███████║██║      "),
    span("c-ascii", "██║      ╚██╗ ██╔╝      ██║   ██╔══╝  ██╔══██╗██║╚██╔╝██║██║██║╚██╗██║██╔══██║██║      "),
    span("c-ascii", "╚██████╗  ╚████╔╝       ██║   ███████╗██║  ██║██║ ╚═╝ ██║██║██║ ╚████║██║  ██║███████╗ "),
    span("c-ascii", " ╚═════╝   ╚═══╝        ╚═╝   ╚══════╝╚═╝  ╚═╝╚═╝     ╚═╝╚═╝╚═╝  ╚═══╝╚═╝  ╚═╝╚══════╝ "),
    blank(),
    sep("═", 68),
    `  ${span("c-amber", "Välkommen till")} ${span("c-bright c-bold", CV.name + "s")} ${span("c-amber", "interaktiva CV")}`,
    `  ${span("c-white", CV.title)} ${span("c-dim", "—")} ${span("c-white", CV.location)}`,
    sep("═", 68),
    blank(),
    `  ${span("c-dim", "Skriv")} ${span("c-cyan", "hjälp")} ${span("c-dim", "för att se kommandon, eller")} ${span("c-cyan", "allt")} ${span("c-dim", "för hela CV:t.")}`,
    blank(),
  ];

  await typewrite(banner, 25);
  input.focus();
}

// ── Launch ───────────────────────────────────────────────
boot();
