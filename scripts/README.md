# Upload Scripts

## Quick Start

### 1. Upload všech website images

```bash
node scripts/upload-website-images.js
```

**Co to dělá:**
- Vytvoří Supabase Storage bucket `website-images` (pokud neexistuje)
- Nahraje všech 11 obrázků z `/public/`
- Vytvoří metadata záznamy v `website_images` tabulce
- Vygeneruje public URLs

**Output:**
```
🚀 Starting website images upload...

✅ Bucket already exists

📤 Uploading public/Background.webp...
✅ Uploaded: https://your-project.supabase.co/storage/v1/object/public/website-images/backgrounds/Background.webp
💾 Metadata saved to database

...

✅ Upload complete! 11/11 images uploaded successfully.

📊 Summary by category:
   background: 1 images
   film: 2 images
   reference_closed: 4 images
   reference_open: 4 images
```

### Prerekvizity

Ujisti se, že máš v `.env`:
```bash
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
```

### Troubleshooting

**Error: Missing Supabase credentials**
→ Zkontroluj `.env` soubor

**Error: File not found**
→ Ujisti se, že všechny obrázky jsou v `/public/`

**Error: Failed to create bucket**
→ Zkontroluj permissions v Supabase Dashboard
