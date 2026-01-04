# Alvion Website

Moderní webová prezentace s Supabase backend pro správu obrázků.

## 🚀 Nasazení na web

**Chceš nasadit web na Netlify? Následuj jednoduchý návod v souboru [DEPLOY.md](DEPLOY.md)**

---

## Lokální vývoj

### Požadavky
- [Node.js](https://nodejs.org/) 18 nebo novější
- npm

### Instalace

```bash
npm install
```

### Spuštění vývojového serveru

```bash
npm run dev
```

Aplikace bude dostupná na [http://localhost:5173/](http://localhost:5173/)

### Build

```bash
npm run build
```

## Nasazení na Netlify

### 1. Nahraj projekt na GitHub

```bash
# Inicializuj git repository (pokud ještě není)
git init

# Přidej všechny soubory
git add .

# Vytvoř první commit
git commit -m "Initial commit"

# Přidej remote repository (nahraď USERNAME a REPO svými hodnotami)
git remote add origin https://github.com/USERNAME/REPO.git

# Push na GitHub
git branch -M main
git push -u origin main
```

### 2. Připoj GitHub repository na Netlify

1. Jdi na [https://app.netlify.com/](https://app.netlify.com/)
2. Klikni na **"Add new site"** → **"Import an existing project"**
3. Vyber **"Deploy with GitHub"**
4. Najdi a vyber svůj repository
5. Nastav build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Base directory:** (nech prázdné)

### 3. Přidej Environment Variables

V Netlify v sekci **Site settings → Environment variables** přidej:

```
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

**Kde najdeš tyto hodnoty:**
1. Jdi do [Supabase Dashboard](https://supabase.com/dashboard)
2. Vyber svůj projekt
3. Jdi do **Settings → API**
4. Zkopíruj:
   - **Project URL** → `VITE_SUPABASE_URL`
   - **anon public key** → `VITE_SUPABASE_ANON_KEY`

### 4. Deploy

Netlify automaticky zbuilduje a nasadí tvůj web. Každý push do main větve spustí nový build.

## Struktura projektu

```
project/
├── public/               # Statické soubory (obrázky, fonty)
├── src/
│   ├── components/      # React komponenty
│   ├── screens/         # Stránky aplikace
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility funkce a služby
│   └── styles/          # CSS styly
├── supabase/
│   └── migrations/      # Databázové migrace
└── README.md
```

## Supabase

Projekt používá Supabase pro:
- Správu obrázků (website_images tabulka)
- Storage pro ukládání souborů
- Row Level Security pro zabezpečení

### Upload obrázků

Použij script pro nahrání obrázků:

```bash
node scripts/upload-website-images.js
```

## Troubleshooting

### Fonty se nenačítají

Ujisti se, že:
- Fonty jsou v `public/Fonts/` složce
- Cesty v `tailwind.css` začínají s `/Fonts/`
- Build obsahuje Fonts složku v `dist/`

### Obrázky se nenačítají

1. Zkontroluj, že máš správně nastavené environment variables
2. Otevři konzoli prohlížeče a zkontroluj errory
3. Ověř, že Supabase Storage bucket `website-images` existuje a je public

### Build selhává na Netlify

1. Zkontroluj, že máš nastavené environment variables
2. Podívej se na build log v Netlify
3. Ujisti se, že `package.json` obsahuje všechny dependencies
# NewAlvion
