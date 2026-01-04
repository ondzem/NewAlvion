import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useScrollTrigger } from "../../../hooks/useScrollTrigger";
import { useResponsiveLayoutMobile } from "../../../hooks/useResponsiveLayoutMobile";
import { useWebsiteImagesMobile } from "../../../hooks/useWebsiteImagesMobile";
import { useLockedHorizontalScroll } from "../../../hooks/useLockedHorizontalScroll";
import { MobileMyServicePage_MdPlus } from "./MobileMyServicePage_MdPlus";
import { MobileMyServicePage_Sm } from "./MobileMyServicePage_Sm";
import { breakpoints } from "../../../config/breakpoints";

export const MobileMyServicePage = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSmallMobile, setIsSmallMobile] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallMobile(window.innerWidth < breakpoints.mdPlus);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const { isVisible: contactVisible, elementRef: contactRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { isVisible: footerVisible, elementRef: footerRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { layout, getResponsiveValue } = useResponsiveLayoutMobile();
  const { backgroundUrl } = useWebsiteImagesMobile();

  const { containerRef, wrapperRef, scrollState, setHorizontalProgress } = useLockedHorizontalScroll({
    enabled: !isSmallMobile,
    sections: 3,
    gap: 29,
  });

  const scrollToService = (serviceIndex: number) => {
    if (isSmallMobile) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const targetY = wrapper.getBoundingClientRect().top + window.scrollY - (window.innerHeight - wrapper.offsetHeight) / 2;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });

    setTimeout(() => {
      const sectionWidth = window.innerWidth - 29;
      const gap = 29;
      const targetProgress = serviceIndex * (sectionWidth + gap);

      const container = containerRef.current;
      const scrollContent = container?.querySelector('.flex') as HTMLElement;

      if (scrollContent) {
        const duration = 1500;
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = Math.min(elapsed / duration, 1);

          const easeInOutCubic = progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

          const currentProgress = targetProgress * easeInOutCubic;
          scrollContent.style.transform = `translateX(-${currentProgress}px)`;

          if (progress < 1) {
            requestAnimationFrame(animate);
          } else {
            setHorizontalProgress(targetProgress);
          }
        };

        animate();
      }
    }, 600);
  };

  useEffect(() => {
    const state = location.state as { serviceIndex?: number } | null;
    if (state?.serviceIndex !== undefined && isLoaded && !isSmallMobile) {
      const timer = setTimeout(() => {
        scrollToService(state.serviceIndex);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, location.state, isSmallMobile]);

  if (isSmallMobile) {
    return <MobileMyServicePage_Sm />;
  }

  const headerLayout = getResponsiveValue(layout.header);
  const navigationLayout = getResponsiveValue(layout.navigation);
  const contactLayout = getResponsiveValue(layout.contact);
  const footerLayout = getResponsiveValue(layout.footer);
  const heroLayout = getResponsiveValue(layout.hero);

  const serviceDescriptions = [
    {
      number: "1",
      title: "Webové stránky",
      description: "Navrhuji a vytvářím webové stránky pro malé i velké firmy. Mým cílem je posunout váš byznys blíže k dosažení vašich cílů pomocí profesionálně strukturovaných stránek.",
      image: "/sluzby_web.webp",
      columns: [
        {
          header: "Jaké nabízím?",
          items: ["Firemní weby", "Osobní web", "Web na míru"]
        },
        {
          header: null,
          items: ["Landing page", "E-shop", "A další..."]
        },
        {
          header: "Co ještě?",
          items: ["SEO Optimalizace", "Pokročilé funkce", "A mnohem víc..."]
        }
      ]
    },
    {
      number: "2",
      title: "Aplikace",
      description: "Vytvářím mobilní i webové aplikace dělané na míru vašim potřebám. Každá aplikace je navržena tak, aby zjednodušila vaše procesy a podpořila růst vašeho byznysu.",
      image: "/sluzby_aplikace.webp",
      columns: [
        {
          header: "Co nabízím?",
          items: ["Mobilní aplikace", "Webové aplikace", "Rezervační systémy"]
        },
        {
          header: null,
          items: ["Informační systemy", "Automatizace procesu", "Integrace AI"]
        },
        {
          header: null,
          items: ["Optimalizace"]
        }
      ]
    },
    {
      number: "3",
      title: "Design",
      description: "Design není jen vzhled – je to důvěra, emoce i důvod, proč zákazník nakoupí právě u vás. Proto se nespokojuji s průměrem. Každý detail u mě drží nejvyšší úroveň.",
      image: "/sluzby_design.webp",
      columns: [
        {
          header: "Co nabizim?",
          items: ["Tvorba loga", "Tvorba znacky", "Graficky styl"]
        },
        {
          header: null,
          items: ["Vzhled soc. siti", "Bannery", "Vizitky"]
        },
        {
          header: null,
          items: ["Venkovni reklamy", "Katalogy, letaky"]
        }
      ]
    }
  ];

  return (
    <MobileMyServicePage_MdPlus
      isLoaded={isLoaded}
      headerLayout={headerLayout}
      navigationLayout={navigationLayout}
      heroLayout={heroLayout}
      backgroundUrl={backgroundUrl}
      scrollToService={scrollToService}
      containerRef={containerRef}
      wrapperRef={wrapperRef}
      scrollState={scrollState}
      contactLayout={contactLayout}
      footerLayout={footerLayout}
      contactVisible={contactVisible}
      footerVisible={footerVisible}
      contactRef={contactRef}
      footerRef={footerRef}
      serviceDescriptions={serviceDescriptions}
      currentYear={currentYear}
    />
  );
};
