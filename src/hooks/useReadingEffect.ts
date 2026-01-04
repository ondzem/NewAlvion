import { useState, useEffect, useRef } from 'react';

export const useReadingEffect = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);
  const rafIdRef = useRef<number | null>(null);
  const lastProgressRef = useRef(0);

  useEffect(() => {
    const calculateProgress = () => {
      if (!sectionRef.current) return 0;

      const rect = sectionRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionTop = rect.top;
      const startPoint = windowHeight * 0.6;
      const endPoint = windowHeight * 0;

      let progress = 0;

      if (sectionTop <= startPoint && sectionTop >= endPoint) {
        progress = (startPoint - sectionTop) / (startPoint - endPoint);
        progress = Math.max(0, Math.min(1, progress));
      } else if (sectionTop < endPoint) {
        progress = 1;
      }

      return progress;
    };

    const handleScroll = () => {
      if (rafIdRef.current) return;

      rafIdRef.current = requestAnimationFrame(() => {
        const progress = calculateProgress();
        if (Math.abs(progress - lastProgressRef.current) > 0.01) {
          lastProgressRef.current = progress;
          setScrollProgress(progress);
        }
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    setScrollProgress(calculateProgress());

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  return { scrollProgress, sectionRef };
};