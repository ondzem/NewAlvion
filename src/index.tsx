import { StrictMode, useEffect, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { HomePageUpravena } from "./screens/HomePageUpravena/HomePageUpravena";
import { MyServicePage } from "./screens/MyServicePage/MyServicePage";
import { PortfolioPage } from "./screens/PortfolioPage/PortfolioPage";
import { ContactPage } from "./screens/ContactPage/ContactPage";
import { FontTestPage } from "./screens/FontTestPage/FontTestPage";
import { GDPRPage } from "./screens/GDPRPage/GDPRPage";
import { ErrorPage } from "./screens/ErrorPage/ErrorPage";

const ScrollRestoration = () => {
  const location = useLocation();
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const lastScrollYRef = useRef(0);

  useEffect(() => {
    if (location.pathname === '/gdpr') {
      window.scrollTo(0, 0);
      sessionStorage.removeItem('scrollPosition_/gdpr');
      return;
    }

    const savedPosition = sessionStorage.getItem(`scrollPosition_${location.pathname}`);

    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo({
          top: parseInt(savedPosition, 10),
          behavior: 'auto'
        });
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname]);

  const saveScrollPosition = useCallback(() => {
    sessionStorage.setItem(`scrollPosition_${location.pathname}`, lastScrollYRef.current.toString());
  }, [location.pathname]);

  useEffect(() => {
    const handleScroll = () => {
      lastScrollYRef.current = window.scrollY;

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }
      saveTimeoutRef.current = setTimeout(saveScrollPosition, 200);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
        saveScrollPosition();
      }
    };
  }, [location.pathname, saveScrollPosition]);

  return null;
};

const App = () => {
  return (
    <Router>
      <ScrollRestoration />
      <Routes>
        <Route path="/" element={<HomePageUpravena />} />
        <Route path="/services" element={<MyServicePage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/font-test" element={<FontTestPage />} />
        <Route path="/gdpr" element={<GDPRPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
};

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
