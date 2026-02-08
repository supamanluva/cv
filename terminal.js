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
    print(`  ${span("c-cyan", cmd.name.padEnd(16))}${span("c-white", cmd.desc)}${aliases}`);
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
  if (e.key === "Enter") {
    e.preventDefault();
    const cmd = input.textContent.trim();
    input.textContent = "";
    processCommand(cmd);
    scrollBottom();
  } else if (e.key === "Tab") {
    e.preventDefault();
    const partial = input.textContent.trim();
    if (partial) {
      const completed = tabComplete(partial);
      if (completed) input.textContent = completed;
    }
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    if (historyIdx > 0) {
      historyIdx--;
      input.textContent = cmdHistory[historyIdx];
      // Move caret to end
      placeCaretEnd(input);
    }
  } else if (e.key === "ArrowDown") {
    e.preventDefault();
    if (historyIdx < cmdHistory.length - 1) {
      historyIdx++;
      input.textContent = cmdHistory[historyIdx];
      placeCaretEnd(input);
    } else {
      historyIdx = cmdHistory.length;
      input.textContent = "";
    }
  } else if (e.key === "l" && e.ctrlKey) {
    e.preventDefault();
    COMMANDS["rensa"].fn();
  }
});

function placeCaretEnd(el) {
  const range = document.createRange();
  range.selectNodeContents(el);
  range.collapse(false);
  const sel = window.getSelection();
  sel.removeAllRanges();
  sel.addRange(range);
}

// Click anywhere → focus input
document.addEventListener("click", () => {
  input.focus();
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
