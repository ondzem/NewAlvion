import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

const supabaseEnabled = supabaseUrl && supabaseKey;

if (!supabaseEnabled) {
  console.warn('Supabase credentials not found, using fallback images only');
}

const supabase = supabaseEnabled ? createClient(supabaseUrl, supabaseKey) : null;

export interface WebsiteImage {
  id: string;
  storage_path: string;
  public_url: string;
  category: 'background' | 'reference_open' | 'reference_closed' | 'film' | 'sponsor' | 'logo' | 'arrow' | 'shadow' | 'film_smaller' | 'line' | 'misc' | 'service' | 'social';
  reference_id?: string;
  alt_text: string;
  display_order: number;
  created_at: string;
  updated_at: string;
}

/**
 * Get all images by category
 */
export async function getImagesByCategory(category: WebsiteImage['category']): Promise<WebsiteImage[]> {
  if (!supabase) return [];

  const { data, error } = await supabase
    .from('website_images')
    .select('*')
    .eq('category', category)
    .order('display_order', { ascending: true });

  if (error) {
    console.error('Error fetching images:', error);
    return [];
  }

  return data || [];
}

/**
 * Get image by category and reference ID
 */
export async function getImageByReference(
  category: 'reference_open' | 'reference_closed',
  referenceId: string
): Promise<WebsiteImage | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('website_images')
    .select('*')
    .eq('category', category)
    .eq('reference_id', referenceId)
    .maybeSingle();

  if (error) {
    console.error('Error fetching image:', error);
    return null;
  }

  return data;
}

/**
 * Get background image
 */
export async function getBackgroundImage(): Promise<WebsiteImage | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('website_images')
    .select('*')
    .eq('category', 'background')
    .order('display_order', { ascending: true })
    .limit(1)
    .maybeSingle();

  if (error) {
    console.error('[imageService] Error fetching background image:', error);
    return null;
  }

  console.log('[imageService] Background data:', data);
  return data;
}

/**
 * Get film images (design, coding)
 */
export async function getFilmImages(): Promise<WebsiteImage[]> {
  const result = await getImagesByCategory('film');
  console.log('[imageService] Film images:', result);
  return result;
}

/**
 * Get all reference images grouped by reference_id
 */
export async function getReferenceImages(): Promise<Record<string, { open: WebsiteImage | null; closed: WebsiteImage | null }>> {
  if (!supabase) return {};

  const { data, error } = await supabase
    .from('website_images')
    .select('*')
    .in('category', ['reference_open', 'reference_closed'])
    .order('display_order', { ascending: true });

  if (error) {
    console.error('[imageService] Error fetching reference images:', error);
    return {};
  }

  const grouped: Record<string, { open: WebsiteImage | null; closed: WebsiteImage | null }> = {};

  data?.forEach((img) => {
    if (!img.reference_id) return;

    if (!grouped[img.reference_id]) {
      grouped[img.reference_id] = { open: null, closed: null };
    }

    if (img.category === 'reference_open') {
      grouped[img.reference_id].open = img;
    } else if (img.category === 'reference_closed') {
      grouped[img.reference_id].closed = img;
    }
  });

  console.log('[imageService] Reference images:', grouped);
  return grouped;
}

/**
 * Get sponsor logos
 */
export async function getSponsorLogos(): Promise<WebsiteImage[]> {
  return getImagesByCategory('sponsor');
}

/**
 * Get logo parts (A, L, V, I, O, N)
 */
export async function getLogoParts(): Promise<WebsiteImage[]> {
  return getImagesByCategory('logo');
}

/**
 * Get arrow images
 */
export async function getArrows(): Promise<WebsiteImage[]> {
  return getImagesByCategory('arrow');
}

/**
 * Get line graphics
 */
export async function getLines(): Promise<WebsiteImage[]> {
  return getImagesByCategory('line');
}

/**
 * Get shadow overlay
 */
export async function getShadow(): Promise<WebsiteImage | null> {
  if (!supabase) return null;

  const { data, error } = await supabase
    .from('website_images')
    .select('*')
    .eq('category', 'shadow')
    .maybeSingle();

  if (error) {
    console.error('Error fetching shadow image:', error);
    return null;
  }

  return data;
}

/**
 * Get film smaller images (mobile versions)
 */
export async function getFilmSmallerImages(): Promise<WebsiteImage[]> {
  const result = await getImagesByCategory('film_smaller');
  console.log('[imageService] Film smaller images:', result);
  return result;
}

/**
 * Fallback URLs pro development (pokud Supabase není dostupný)
 */
export const fallbackUrls = {
  background: '/background.webp',
  filmDesign: '/film_design.webp',
  filmCoding: '/film_coding.webp',
  filmSmallerDesign: '/film_smaller_design.webp',
  filmSmallerCoding: '/film_smaller_coding.webp',
  references: {
    elektrika: {
      open: '/rozbalene - Elektrika bez rizika .webp',
      closed: '/nerozbalene - Elektrika.webp',
    },
    storek: {
      open: '/rozbalene - mudrstorek.webp',
      closed: '/nerozbalene - Storek.webp',
    },
    raska: {
      open: '/rozbalene - fotoraska.webp',
      closed: '/nerozbalene - Raska.webp',
    },
    spilar: {
      open: '/rozbalene - jiri spilar.webp',
      closed: '/nerozbalene - Spilar.webp',
    },
  },
  sponsors: {
    elektrika: '/Sponsor - Elektrika.png',
    pinterest: '/Sponsor - Pinterest.png',
    raska: '/Sponsor - Raska.png',
    spilar: '/Sponsor - Spilar.png',
    storek: '/Sponsor - Storek.png',
    supabase: '/Sponsor - Supabase.png',
  },
  logos: {
    A: '/A - Alvion Logo.svg',
    L: '/L - Alvion Logo.svg',
    V: '/V - Alvion Logo.svg',
    I: '/I - Alvion Logo copy.svg',
    O: '/O - Alvion Logo.svg',
    N: '/N - Alvion Logo copy.svg',
  },
  arrows: {
    dark: '/arrow-alvion-2.png',
    white: '/white-arrow-alvion-1-6.png',
  },
  shadow: '/shadow mobile hero section.png',
  lines: {
    line12: '/line-12.svg',
    line15: '/line-15.svg',
  },
  misc: {
    aIcon: 'https://i.imgur.com/Hz4xcKj.png',
    homeSections: '/home_page_pro_kazdou_sekci.png',
    socialFacebook: '/fbfb.png',
    socialInstagram: '/igig.png',
    socialLinkedin: '/inin.png',
  },
};
