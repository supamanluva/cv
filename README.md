# 🖥️ Retro Terminal CV

> Ett interaktivt CV presenterat som en retro CRT-terminal — komplett med scanlines, fosfor-glow och ett inbyggt Snake-spel.

**[🔴 Live Demo → supamanluva.github.io/cv](https://supamanluva.github.io/cv/)**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=flat&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=flat&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black)

---

## ✨ Funktioner

- **CRT-effekter** — scanlines, skärmflimmer, fosfor-glow och rundad monitor-bezel
- **Interaktiv terminal** — skriv kommandon precis som i en riktig shell
- **Tab-komplettering** — tryck Tab för att autokomplettera kommandon
- **Kommandohistorik** — ↑↓ piltangenter för att bläddra bland tidigare kommandon
- **Färgteman** — byt mellan grön, amber, cyan och vit fosfor
- **🐍 Snake-spel** — Nokia 3310-inspirerat Snake direkt i terminalen
- **Responsiv** — fungerar på både desktop och mobil
- **Inga beroenden** — ren HTML, CSS och vanilla JavaScript

---

## 📟 Kommandon

| Kommando | Alias | Beskrivning |
|---|---|---|
| `hjälp` | `help`, `h`, `?` | Visa tillgängliga kommandon |
| `om` | `whoami`, `bio`, `jag` | Personlig info & sammanfattning |
| `kompetens` | `skills`, `tech`, `stack` | Tekniska kompetenser |
| `erfarenhet` | `exp`, `arbete`, `jobb` | Arbetslivserfarenhet |
| `utbildning` | `edu`, `skola` | Utbildningshistorik |
| `projekt` | `proj`, `portfolio` | Personliga projekt |
| `certifikat` | `certs`, `cert` | Certifieringar |
| `intressen` | `hobbies`, `nöjen` | Intressen & hobbies |
| `allt` | `cv`, `resume`, `hela` | Visa hela CV:t |
| `snake` | `spel`, `game`, `spela` | 🐍 Spela Snake |
| `neofetch` | `fetch`, `sysinfo` | Kul systeminfo-display |
| `tema` | `theme`, `färg` | Byt färgtema (green/amber/cyan/white) |
| `rensa` | `clear`, `cls` | Rensa terminalen |
| `datum` | `tid`, `date` | Visa datum/tid |
| `historik` | `hist`, `history` | Visa kommandohistorik |
| `echo` | — | Eka tillbaka text |

---

## 🚀 Kom igång

### 1. Forka eller klona

```bash
git clone https://github.com/supamanluva/cv.git
cd cv
```

### 2. Fyll i dina uppgifter

Öppna `terminal.js` och redigera `CV`-objektet längst upp i filen:

```javascript
const CV = {
  name: "Ditt Namn",
  title: "Din Titel",
  email: "din@email.se",
  location: "Stad, Sverige",
  // ...
};
```

Alla sektioner (`summary`, `skills`, `experience`, `education`, `projects`, `certifications`, `interests`) finns i samma objekt. Ingen annan fil behöver ändras.

### 3. Förhandsgranska lokalt

```bash
python3 -m http.server 8080
# Öppna http://localhost:8080
```

### 4. Deploya

Sidan är ren statisk HTML — den kan hostas var som helst:

- **GitHub Pages** — pusha till `main`, aktivera Pages i repo-inställningar
- **Netlify / Vercel** — koppla repot, klar
- **Egen server** — kopiera filerna till valfri webbserver

---

## 📁 Projektstruktur

```
cv/
├── index.html          ← HTML-struktur (monitor, skärm, input)
├── style.css           ← CRT-effekter, färger, scanlines, layout
├── terminal.js         ← Terminalmotor, kommandon, CV-data, Snake
└── .github/
    └── workflows/
        └── deploy.yml  ← GitHub Pages auto-deploy
```

---

## 🎮 Snake

Skriv `snake` i terminalen för att starta spelet.

- **Piltangenter / WASD** — styra ormen
- **Q / ESC** — avsluta spelet
- **Enter** — spela igen efter game over
- Poäng sparas lokalt som rekord via `localStorage`

---

## 🎨 Teman

Byt utseende med `tema`-kommandot:

| Tema | Beskrivning |
|---|---|
| `tema green` | Klassisk grön fosfor (standard) |
| `tema amber` | Varm amber — som en gammal IBM-terminal |
| `tema cyan` | Kall cyan/turkos |
| `tema white` | Neutral vit |

---

## 📄 Licens

MIT — använd fritt, gör den till din egen!
