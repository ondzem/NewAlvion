import { useState, useEffect, useRef, useCallback } from 'react';
import { useLocation } from 'react-router-dom';

const SCROLL_POSITION_KEY = 'scrollPosition';
const ACTIVE_SECTION_KEY = 'activeSection';

export const useScrollPersistence = () => {
  const location = useLocation();
  const [activeSection, setActiveSection] = useState(() => {
    return sessionStorage.getItem(ACTIVE_SECTION_KEY) || 'home';
  });
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
      sessionStorage.setItem(ACTIVE_SECTION_KEY, sectionId);
    }
  };

  useEffect(() => {
    const savedPosition = sessionStorage.getItem(`${SCROLL_POSITION_KEY}_${location.pathname}`);

    if (savedPosition) {
      const position = parseInt(savedPosition, 10);
      window.scrollTo({
        top: position,
        behavior: 'auto'
      });
    }
  }, [location.pathname]);

  const saveScrollData = useCallback(() => {
    const currentPath = window.location.pathname;
    sessionStorage.setItem(`${SCROLL_POSITION_KEY}_${currentPath}`, lastScrollYRef.current.toString());

    const sections = ['home', 'services', 'portfolio', 'contact'];
    const scrollPosition = lastScrollYRef.current + 100;

    for (const section of sections) {
      const element = document.getElementById(section);
      if (element) {
        const { offsetTop, offsetHeight } = element;
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(prev => prev !== section ? section : prev);
          sessionStorage.setItem(ACTIVE_SECTION_KEY, section);
          break;
        }
      }
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollYRef.current = window.scrollY;

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
      }
      scrollTimeoutRef.current = setTimeout(saveScrollData, 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current);
        saveScrollData();
      }
    };
  }, [saveScrollData]);

  return { activeSection, scrollToSection };
};