import { useState, useEffect } from 'react';
import {
  getBackgroundImage,
  getFilmImages,
  getReferenceImages,
  fallbackUrls,
  type WebsiteImage,
} from '../lib/imageService';

interface UseWebsiteImagesReturn {
  backgroundUrl: string;
  filmDesignUrl: string;
  filmCodingUrl: string;
  referenceImages: {
    elektrika: { open: string; closed: string };
    storek: { open: string; closed: string };
    raska: { open: string; closed: string };
    spilar: { open: string; closed: string };
  };
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook pro načtení všech website images z Supabase
 * S fallbackem na lokální soubory pokud Supabase není dostupný
 */
export function useWebsiteImages(): UseWebsiteImagesReturn {
  const [backgroundUrl, setBackgroundUrl] = useState(fallbackUrls.background);
  const [filmDesignUrl, setFilmDesignUrl] = useState(fallbackUrls.filmDesign);
  const [filmCodingUrl, setFilmCodingUrl] = useState(fallbackUrls.filmCoding);
  const [referenceImages, setReferenceImages] = useState(fallbackUrls.references);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    async function loadImages() {
      try {
        setIsLoading(true);

        // Load background
        const bg = await getBackgroundImage();
        console.log('Background loaded:', bg?.public_url || 'null');
        if (bg) {
          setBackgroundUrl(bg.public_url);
        }

        // Load film images
        const films = await getFilmImages();
        console.log('Films loaded:', films.length, films.map(f => f.storage_path));
        if (films.length > 0) {
          const design = films.find(f => f.storage_path.includes('design'));
          const coding = films.find(f => f.storage_path.includes('coding'));

          console.log('Design film:', design?.public_url || 'null');
          console.log('Coding film:', coding?.public_url || 'null');

          if (design) setFilmDesignUrl(design.public_url);
          if (coding) setFilmCodingUrl(coding.public_url);
        }

        // Load reference images
        const refs = await getReferenceImages();
        console.log('References loaded:', Object.keys(refs));

        const newReferenceImages = {
          elektrika: {
            open: refs.elektrika?.open?.public_url || fallbackUrls.references.elektrika.open,
            closed: refs.elektrika?.closed?.public_url || fallbackUrls.references.elektrika.closed,
          },
          storek: {
            open: refs.storek?.open?.public_url || fallbackUrls.references.storek.open,
            closed: refs.storek?.closed?.public_url || fallbackUrls.references.storek.closed,
          },
          raska: {
            open: refs.raska?.open?.public_url || fallbackUrls.references.raska.open,
            closed: refs.raska?.closed?.public_url || fallbackUrls.references.raska.closed,
          },
          spilar: {
            open: refs.spilar?.open?.public_url || fallbackUrls.references.spilar.open,
            closed: refs.spilar?.closed?.public_url || fallbackUrls.references.spilar.closed,
          },
        };

        setReferenceImages(newReferenceImages);
      } catch (err) {
        console.error('Error loading images:', err);
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    }

    loadImages();
  }, []);

  return {
    backgroundUrl,
    filmDesignUrl,
    filmCodingUrl,
    referenceImages,
    isLoading,
    error,
  };
}
