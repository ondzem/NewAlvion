# Website Images Storage System

Kompletní systém pro správu obrázků v projektu pomocí Supabase Storage a Database.

## 📋 Přehled

Systém nahrazuje statické obrázky z `/public/` dynamickým načítáním z Supabase:

- ✅ **Supabase Storage** - ukládání obrázků v bucketu `website-images`
- ✅ **Database Table** - metadata obrázků v tabulce `website_images`
- ✅ **Automatické fallbacky** - pokud Supabase není dostupný, použijí se lokální soubory
- ✅ **React Hook** - `useWebsiteImages()` pro snadné použití v komponentách

## 🗂️ Struktura

### Database Schema

Tabulka `website_images`:
```sql
- id (uuid, PK)
- storage_path (text) - cesta v Storage
- public_url (text) - veřejná URL
- category (text) - typ: background | reference_open | reference_closed | film
- reference_id (text, nullable) - ID reference (elektrika, storek, raska, spilar)
- alt_text (text) - alt text pro accessibility
- display_order (integer) - pořadí zobrazení
- created_at (timestamptz)
- updated_at (timestamptz)
```

### Storage Bucket

Bucket `website-images`:
- Public read access
- 5MB file size limit
- Struktura:
  - `/backgrounds/` - background obrázky
  - `/films/` - film design/coding obrázky
  - `/references/` - reference obrázky (open/closed)

## 🚀 Použití

### 1. Nahrání obrázků do Supabase

```bash
# Ujisti se, že máš .env s VITE_SUPABASE_URL a VITE_SUPABASE_ANON_KEY
node scripts/upload-website-images.js
```

Script nahraje všechny obrázky a vytvoří záznamy v DB:
- ✅ Background.webp
- ✅ film design.webp
- ✅ film coding.webp
- ✅ 4x reference images (closed)
- ✅ 4x reference images (open)

### 2. Použití v React komponentách

```tsx
import { useWebsiteImages } from '../../hooks/useWebsiteImages';

export const MyComponent = () => {
  const {
    backgroundUrl,
    filmDesignUrl,
    filmCodingUrl,
    referenceImages,
    isLoading,
    error
  } = useWebsiteImages();

  // Reference images
  const elektrikaOpen = referenceImages.elektrika.open;
  const elektrikaClosed = referenceImages.elektrika.closed;

  return (
    <img src={backgroundUrl} alt="Background" />
  );
};
```

### 3. Fallback systém

Pokud Supabase není dostupný (network error, missing credentials), automaticky se použijí lokální soubory z `/public/`:

```typescript
const fallbackUrls = {
  background: '/Background.webp',
  filmDesign: '/film design.webp',
  filmCoding: '/film coding.webp',
  references: {
    elektrika: {
      open: '/rozbalene - Elektrika bez rizika .webp',
      closed: '/nerozbalene - Elektrika.webp',
    },
    // ...
  },
};
```

## 📁 Soubory

### Scripts
- `scripts/upload-website-images.js` - upload script pro migraci obrázků

### Hooks
- `src/hooks/useWebsiteImages.ts` - React hook pro načítání obrázků

### Services
- `src/lib/imageService.ts` - API pro práci s obrázky (fetch, fallbacks)

### Database
- `supabase/migrations/*_create_website_images_system.sql` - DB schema

## 🔐 Security

### RLS Policies

```sql
-- Public read
"Anyone can view website images" - SELECT pro public

-- Authenticated write
"Authenticated users can insert images" - INSERT pro authenticated
"Authenticated users can update images" - UPDATE pro authenticated
"Authenticated users can delete images" - DELETE pro authenticated
```

## 🎯 Použité obrázky

### Background (1x)
- Background.webp → `/backgrounds/Background.webp`

### Films (2x)
- film design.webp → `/films/film-design.webp`
- film coding.webp → `/films/film-coding.webp`

### References - Elektrika (2x)
- nerozbalene - Elektrika.webp → `/references/elektrika-closed.webp`
- rozbalene - Elektrika bez rizika .webp → `/references/elektrika-open.webp`

### References - Štorek (2x)
- nerozbalene - Storek.webp → `/references/storek-closed.webp`
- rozbalene - mudrstorek.webp → `/references/storek-open.webp`

### References - Raška (2x)
- nerozbalene - Raska.webp → `/references/raska-closed.webp`
- rozbalene - fotoraska.webp → `/references/raska-open.webp`

### References - Špilar (2x)
- nerozbalene - Spilar.webp → `/references/spilar-closed.webp`
- rozbalene - jiri spilar.webp → `/references/spilar-open.webp`

**Celkem: 11 obrázků**

## 🛠️ Maintenance

### Přidání nového obrázku

1. Přidej obrázek do `/public/`
2. Přidej definici do `scripts/upload-website-images.js`:
```javascript
{
  localPath: 'public/novy-obrazek.webp',
  storagePath: 'backgrounds/novy-obrazek.webp',
  category: 'background',
  altText: 'Nový obrázek',
  displayOrder: 2,
}
```
3. Spusť upload script: `node scripts/upload-website-images.js`
4. Přidej do fallbacků v `src/lib/imageService.ts`
5. Přidej do hooku `src/hooks/useWebsiteImages.ts`

### Update existujícího obrázku

Upload script používá `upsert: true`, takže stačí:
1. Nahradit soubor v `/public/`
2. Spustit script znovu

## ✅ Výhody systému

- ✅ **CDN delivery** - rychlejší načítání přes Supabase CDN
- ✅ **Centralizovaná správa** - všechny obrázky na jednom místě
- ✅ **Metadata** - alt texty, kategorie, pořadí
- ✅ **Fallback** - funguje i offline s lokálními soubory
- ✅ **Type-safe** - TypeScript interface pro všechny obrázky
- ✅ **Easy updates** - změna obrázku bez rebuildu aplikace

## 🔍 Troubleshooting

### Obrázky se nenačítají

1. Zkontroluj `.env`:
```bash
VITE_SUPABASE_URL=your-url
VITE_SUPABASE_ANON_KEY=your-key
```

2. Zkontroluj console pro errors

3. Ověř, že bucket existuje:
```javascript
const { data } = await supabase.storage.listBuckets();
console.log(data); // měl by obsahovat 'website-images'
```

4. Ověř RLS policies v Supabase Dashboard

### Upload script failuje

- Ujisti se, že máš všechny obrázky v `/public/`
- Zkontroluj názvy souborů (jsou case-sensitive)
- Ověř, že máš správné credentials v `.env`

## 📊 Stats

- **Build velikost**: +180KB (Supabase JS client)
- **Runtime overhead**: ~100ms initial load (s cache negligible)
- **Storage**: ~11 images × ~500KB = ~5.5MB
