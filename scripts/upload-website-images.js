#!/usr/bin/env node

/**
 * Upload Website Images Script
 *
 * Nahraje všechny website images do Supabase Storage a vytvoří záznamy v DB.
 *
 * Usage: node scripts/upload-website-images.js
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Supabase client
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env file');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

// Image definitions
const images = [
  {
    localPath: 'public/background.webp',
    storagePath: 'backgrounds/Background.webp',
    category: 'background',
    altText: 'Background image',
    displayOrder: 1,
  },
  {
    localPath: 'public/film_design.webp',
    storagePath: 'films/film-design.webp',
    category: 'film',
    altText: 'Film design',
    displayOrder: 1,
  },
  {
    localPath: 'public/film_coding.webp',
    storagePath: 'films/film-coding.webp',
    category: 'film',
    altText: 'Film coding',
    displayOrder: 2,
  },
  {
    localPath: 'public/nerozbalene - Elektrika.webp',
    storagePath: 'references/elektrika-closed.webp',
    category: 'reference_closed',
    referenceId: 'elektrika',
    altText: 'Elektrika Bez Rizika - zavřený stav',
    displayOrder: 1,
  },
  {
    localPath: 'public/rozbalene - Elektrika bez rizika .webp',
    storagePath: 'references/elektrika-open.webp',
    category: 'reference_open',
    referenceId: 'elektrika',
    altText: 'Elektrika Bez Rizika - otevřený stav',
    displayOrder: 1,
  },
  {
    localPath: 'public/nerozbalene - Storek.webp',
    storagePath: 'references/storek-closed.webp',
    category: 'reference_closed',
    referenceId: 'storek',
    altText: 'Mudr. Ludvík Štorek - zavřený stav',
    displayOrder: 2,
  },
  {
    localPath: 'public/rozbalene - mudrstorek.webp',
    storagePath: 'references/storek-open.webp',
    category: 'reference_open',
    referenceId: 'storek',
    altText: 'Mudr. Ludvík Štorek - otevřený stav',
    displayOrder: 2,
  },
  {
    localPath: 'public/nerozbalene - Raska.webp',
    storagePath: 'references/raska-closed.webp',
    category: 'reference_closed',
    referenceId: 'raska',
    altText: 'Fotograf Vlastimil Raška - zavřený stav',
    displayOrder: 3,
  },
  {
    localPath: 'public/rozbalene - fotoraska.webp',
    storagePath: 'references/raska-open.webp',
    category: 'reference_open',
    referenceId: 'raska',
    altText: 'Fotograf Vlastimil Raška - otevřený stav',
    displayOrder: 3,
  },
  {
    localPath: 'public/nerozbalene - Spilar.webp',
    storagePath: 'references/spilar-closed.webp',
    category: 'reference_closed',
    referenceId: 'spilar',
    altText: 'Jiří Špilar - zavřený stav',
    displayOrder: 4,
  },
  {
    localPath: 'public/rozbalene - jiri spilar.webp',
    storagePath: 'references/spilar-open.webp',
    category: 'reference_open',
    referenceId: 'spilar',
    altText: 'Jiří Špilar - otevřený stav',
    displayOrder: 4,
  },
  {
    localPath: 'public/film_smaller_design.webp',
    storagePath: 'films/film-smaller-design.webp',
    category: 'film_smaller',
    altText: 'Film smaller design',
    displayOrder: 1,
  },
  {
    localPath: 'public/film_smaller_coding.webp',
    storagePath: 'films/film-smaller-coding.webp',
    category: 'film_smaller',
    altText: 'Film smaller coding',
    displayOrder: 2,
  },
  {
    localPath: 'public/sluzby_page_web_sluzby_obrazek.webp',
    storagePath: 'services/sluzby-page-web.webp',
    category: 'service',
    altText: 'Web services image',
    displayOrder: 1,
  },
  {
    localPath: 'public/sluzby_page_aplikace_sluzby_obrazek.webp',
    storagePath: 'services/sluzby-page-aplikace.webp',
    category: 'service',
    altText: 'Application services image',
    displayOrder: 2,
  },
  {
    localPath: 'public/sluzby_page_design_sluzby_obrazek.webp',
    storagePath: 'services/sluzby-page-design.webp',
    category: 'service',
    altText: 'Design services image',
    displayOrder: 3,
  },
  {
    localPath: 'public/home_page_pro_kazdou_sekci.png',
    storagePath: 'misc/home-page-sections.png',
    category: 'misc',
    altText: 'Home page sections background',
    displayOrder: 1,
  },
  {
    localPath: 'public/fbfb.png',
    storagePath: 'social/facebook.png',
    category: 'social',
    altText: 'Facebook icon',
    displayOrder: 1,
  },
  {
    localPath: 'public/igig.png',
    storagePath: 'social/instagram.png',
    category: 'social',
    altText: 'Instagram icon',
    displayOrder: 2,
  },
  {
    localPath: 'public/inin.png',
    storagePath: 'social/linkedin.png',
    category: 'social',
    altText: 'LinkedIn icon',
    displayOrder: 3,
  },
  {
    localPath: 'public/Sponsor - Elektrika.png',
    storagePath: 'sponsors/elektrika.png',
    category: 'sponsor',
    altText: 'Elektrika Bez Rizika - Sponsor logo',
    displayOrder: 1,
  },
  {
    localPath: 'public/Sponsor - Pinterest.png',
    storagePath: 'sponsors/pinterest.png',
    category: 'sponsor',
    altText: 'Pinterest - Sponsor logo',
    displayOrder: 2,
  },
  {
    localPath: 'public/Sponsor - Raska.png',
    storagePath: 'sponsors/raska.png',
    category: 'sponsor',
    altText: 'Fotograf Vlastimil Raška - Sponsor logo',
    displayOrder: 3,
  },
  {
    localPath: 'public/Sponsor - Spilar.png',
    storagePath: 'sponsors/spilar.png',
    category: 'sponsor',
    altText: 'Jiří Špilar - Sponsor logo',
    displayOrder: 4,
  },
  {
    localPath: 'public/Sponsor - Storek.png',
    storagePath: 'sponsors/storek.png',
    category: 'sponsor',
    altText: 'Mudr. Ludvík Štorek - Sponsor logo',
    displayOrder: 5,
  },
  {
    localPath: 'public/Sponsor - Supabase.png',
    storagePath: 'sponsors/supabase.png',
    category: 'sponsor',
    altText: 'Supabase - Sponsor logo',
    displayOrder: 6,
  },
];

async function uploadImage(imageConfig) {
  const { localPath, storagePath, category, referenceId, altText, displayOrder } = imageConfig;

  const fullPath = path.join(__dirname, '..', localPath);

  console.log(`📤 Uploading ${localPath}...`);

  // Check if file exists
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ File not found: ${fullPath}`);
    return null;
  }

  // Read file
  const fileBuffer = fs.readFileSync(fullPath);

  // Determine content type based on file extension
  const ext = path.extname(localPath).toLowerCase();
  const contentType = ext === '.png' ? 'image/png' : 'image/webp';

  // Upload to Supabase Storage
  const { data: uploadData, error: uploadError } = await supabase.storage
    .from('website-images')
    .upload(storagePath, fileBuffer, {
      contentType,
      upsert: true, // Overwrite if exists
    });

  if (uploadError) {
    console.error(`❌ Upload failed for ${localPath}:`, uploadError.message);
    return null;
  }

  // Get public URL
  const { data: urlData } = supabase.storage
    .from('website-images')
    .getPublicUrl(storagePath);

  const publicUrl = urlData.publicUrl;

  console.log(`✅ Uploaded: ${publicUrl}`);

  // Insert metadata into database
  const { data: dbData, error: dbError } = await supabase
    .from('website_images')
    .upsert({
      storage_path: storagePath,
      public_url: publicUrl,
      category,
      reference_id: referenceId || null,
      alt_text: altText,
      display_order: displayOrder,
    }, {
      onConflict: 'storage_path',
    });

  if (dbError) {
    console.error(`❌ Database insert failed for ${localPath}:`, dbError.message);
    return null;
  }

  console.log(`💾 Metadata saved to database`);

  return {
    storagePath,
    publicUrl,
    category,
    referenceId,
  };
}

async function main() {
  console.log('🚀 Starting website images upload...\n');
  console.log('✅ Using existing bucket\n');

  // Upload all images
  const results = [];
  for (const imageConfig of images) {
    const result = await uploadImage(imageConfig);
    if (result) {
      results.push(result);
    }
    console.log(''); // Empty line
  }

  console.log(`\n✅ Upload complete! ${results.length}/${images.length} images uploaded successfully.`);

  // Print summary
  console.log('\n📊 Summary by category:');
  const byCategory = results.reduce((acc, r) => {
    acc[r.category] = (acc[r.category] || 0) + 1;
    return acc;
  }, {});

  Object.entries(byCategory).forEach(([category, count]) => {
    console.log(`   ${category}: ${count} images`);
  });
}

main().catch(console.error);
