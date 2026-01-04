# Jak nasadit web na Netlify

## Krok 1: Nahraj projekt na GitHub (10 minut)

### 1.1 Vytvoř nový repository na GitHubu
1. Jdi na https://github.com/new
2. Pojmenuj ho (např. `alvion-website`)
3. Nech ho **Public** nebo **Private** (jedno)
4. **NEVYTVÁŘEJ** README, .gitignore ani licenci (už je máš)
5. Klikni **Create repository**

### 1.2 Nahraj projekt z tvého počítače
Otevři terminál/příkazový řádek **v této projektové složce** a zadej:

```bash
git init
git add .
git commit -m "První verze webu"
git branch -M main
git remote add origin https://github.com/TVOJE-JMENO/alvion-website.git
git push -u origin main
```

**Pozor:** Změň `TVOJE-JMENO/alvion-website` na to, co ti GitHub ukáže po vytvoření repository.

---

## Krok 2: Nasaď na Netlify (5 minut)

### 2.1 Připoj GitHub
1. Jdi na https://app.netlify.com/
2. Klikni **Add new site**
3. Klikni **Import an existing project**
4. Klikni **Deploy with GitHub**
5. Najdi a klikni na svůj repository (`alvion-website`)

### 2.2 Nastav build
Netlify automaticky vyplní správné hodnoty, ale zkontroluj:
- **Build command:** `npm run build`
- **Publish directory:** `dist`

Klikni **Deploy**

---

## Krok 3: Přidej Supabase klíče (2 minuty)

### 3.1 Získej klíče ze Supabase
1. Jdi na https://supabase.com/dashboard
2. Vyber svůj projekt
3. V levém menu klikni **Settings** (ozubené kolečko dole)
4. Klikni **API**
5. Zkopíruj si:
   - **Project URL** (začíná `https://...supabase.co`)
   - **anon public** klíč (dlouhý řetězec)

### 3.2 Přidej je do Netlify
1. V Netlify jdi na svůj web
2. Klikni **Site settings** (nahoře)
3. V levém menu klikni **Environment variables**
4. Klikni **Add a variable**
5. Přidej první proměnnou:
   - Key: `VITE_SUPABASE_URL`
   - Value: `https://tvuj-projekt.supabase.co` (to, cos zkopíroval)
6. Klikni **Create variable**
7. Znovu klikni **Add a variable** a přidej druhou:
   - Key: `VITE_SUPABASE_ANON_KEY`
   - Value: (ten dlouhý klíč, cos zkopíroval)
8. Klikni **Create variable**

### 3.3 Znovu nasaď web
1. Jdi na **Deploys** (v horní liště)
2. Klikni **Trigger deploy** → **Clear cache and deploy site**
3. Počkej 2-3 minuty

---

## Hotovo!

Tvůj web bude dostupný na adrese typu `https://nazev-123abc.netlify.app`

### Co teď funguje:
✅ Všechny stránky
✅ Obrázky z Supabase
✅ Fonty
✅ Responzivní design

### Jak aktualizovat web:
Stačí nahrát změny na GitHub:
```bash
git add .
git commit -m "Popis změny"
git push
```
Netlify automaticky nasadí novou verzi.
