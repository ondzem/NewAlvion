import { useState, useEffect, useRef } from 'react';

export const useScrollAnimation = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isScrolled, setIsScrolled] = useState(false);
  const rafIdRef = useRef<number | null>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      if (rafIdRef.current) return;

      rafIdRef.current = requestAnimationFrame(() => {
        const currentScrollY = window.scrollY;
        if (Math.abs(currentScrollY - lastScrollYRef.current) > 5) {
          lastScrollYRef.current = currentScrollY;
          setScrollY(currentScrollY);
          setIsScrolled(currentScrollY > 100);
        }
        rafIdRef.current = null;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, []);

  // Calculate letter visibility based on scroll position
  const getLetterStyle = (letterIndex: number) => {
    const threshold = 50 + (letterIndex * 30); // Each letter disappears at different scroll points
    const opacity = Math.max(0, 1 - (scrollY - threshold) / 100);
    const translateX = Math.min(0, -(scrollY - threshold) / 2);
    
    return {
      opacity: scrollY > threshold ? opacity : 1,
      transform: `translate3d(${translateX}%, 0px, 0px) scale3d(1, 1, 1)`,
      transition: 'all 0.3s ease-out',
    };
  };

  // Calculate logo container scale
  const getLogoScale = () => {
    const scale = Math.max(0.7, 1 - scrollY / 1000);
    return {
      transform: `translate3d(0px, 0px, 0px) scale3d(${scale}, ${scale}, 1)`,
      transition: 'transform 0.3s ease-out',
    };
  };

  return {
    scrollY,
    isScrolled,
    getLetterStyle,
    getLogoScale,
  };
};