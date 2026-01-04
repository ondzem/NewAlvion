import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { useLocation, Link } from "react-router-dom";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Navbar } from "../../components/Navbar";
import { AlvionLogo } from "../../components/AlvionLogo";
import { MobileMyServicePage } from "./MobileMyServicePage";
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import { useWebsiteImages } from "../../hooks/useWebsiteImages";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";
import { useLockedHorizontalScroll } from "../../hooks/useLockedHorizontalScroll";
import { breakpoints } from "../../config/breakpoints";

export const MyServicePage = (): JSX.Element => {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { isVisible: contactVisible, elementRef: contactRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { isVisible: footerVisible, elementRef: footerRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { breakpoint, layout, getResponsiveValue } = useResponsiveLayout();
  const { backgroundUrl } = useWebsiteImages();
  const { containerRef, wrapperRef, scrollState, setHorizontalProgress } = useLockedHorizontalScroll({
    enabled: !isMobile,
    sections: 3,
    gap: 30,
  });

  const scrollToService = (serviceIndex: number) => {
    if (isMobile) return;

    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const targetY = wrapper.getBoundingClientRect().top + window.scrollY - (window.innerHeight - wrapper.offsetHeight) / 2;

    window.scrollTo({
      top: targetY,
      behavior: 'smooth'
    });

    setTimeout(() => {
      const sectionWidth = window.innerWidth - 30;
      const gap = 30;
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

  const headerLayout = getResponsiveValue(layout.header);
  const heroLayout = getResponsiveValue(layout.hero);
  const servicesLayout = getResponsiveValue(layout.services);
  const footerLayout = getResponsiveValue(layout.footer);
  const servicePageHeroLayout = getResponsiveValue(layout.servicePageHero);

  const checkScreenSize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(() => {
      setIsMobile(prev => {
        const newValue = window.innerWidth < breakpoints.tablet;
        return prev !== newValue ? newValue : prev;
      });
    }, 150);
  }, []);

  useEffect(() => {
    setIsMobile(window.innerWidth < breakpoints.tablet);
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [checkScreenSize]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const state = location.state as { serviceIndex?: number } | null;
    if (state?.serviceIndex !== undefined && isLoaded && !isMobile) {
      const timer = setTimeout(() => {
        scrollToService(state.serviceIndex);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [isLoaded, isMobile, location.state]);

  if (isMobile) {
    return <MobileMyServicePage />;
  }

  const webServiceTags = [
    { text: "Firemní weby", position: "left-[82px] top-[362px]" },
    { text: "Landing page", position: "left-[286px] top-[362px]" },
    { text: "SEO Optimalizace", position: "left-[486px] top-[362px]" },
    { text: "Osobní web", position: "left-[82px] top-[394px]" },
    { text: "E-shop", position: "left-[286px] top-[394px]" },
    { text: "Pokročilé funkce", position: "left-[486px] top-[394px]" },
    { text: "Web na míru", position: "left-[82px] top-[426px]" },
    { text: "A další..", position: "left-[286px] top-[426px]" },
    { text: "A mnohem víc..", position: "left-[486px] top-[426px]" },
  ];

  const applicationServiceTags = [
    { text: "Mobilní aplikace", position: "left-[80px] top-[363px]" },
    { text: "Informační systémy", position: "left-[280px] top-[363px]" },
    { text: "Optimalizace", position: "left-[496px] top-[363px]" },
    { text: "Webové aplikace", position: "left-[80px] top-[395px]" },
    { text: "Automatizace procesů", position: "left-[280px] top-[395px]" },
    { text: "Rezervační systémy", position: "left-[80px] top-[427px]" },
    { text: "Integrace AI", position: "left-[280px] top-[427px]" },
  ];

  const designServiceTags = [
    { text: "Tvorba loga", position: "left-[82px] top-[362px]" },
    { text: "Vzhled soc. sítí", position: "left-[281px] top-[362px]" },
    { text: "Venkovní reklamy", position: "left-[476px] top-[362px]" },
    { text: "Tvorba značky", position: "left-[82px] top-[394px]" },
    { text: "Bannery", position: "left-[281px] top-[394px]" },
    { text: "Katalogy, letáky", position: "left-[476px] top-[394px]" },
    { text: "Grafický styl", position: "left-[82px] top-[426px]" },
    { text: "Vizitky", position: "left-[281px] top-[426px]" },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Section */}
      <section
        className="relative w-full bg-black"
        style={{
          minHeight: breakpoint === 'desktop' ? '766px' : '600px',
        }}
      >
        <img
          className="absolute inset-0 w-full h-[760px] object-cover [filter:brightness(0.7)]"
          alt="Background"
          src={backgroundUrl}
        />

        {/* Logo */}
        <div
          className={`fixed z-50 transition-all duration-1000 ease-out ${
            isLoaded ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
          }`}
          style={{
            top: `${headerLayout.top}px`,
            left: `${headerLayout.left}px`,
            width: `${headerLayout.logoWidth}px`,
            height: `${headerLayout.logoHeight}px`,
          }}
        >
          <AlvionLogo size="large" className="opacity-90 w-full h-full" />
        </div>

        {/* Navigation */}
        <nav className="fixed top-5 right-[15vw] flex items-center justify-end px-4 py-4 h-[clamp(8rem,10vh,10rem)] z-[100]">
          <div className="flex items-center">
            <Navbar variant="desktop" />
          </div>
        </nav>

        {/* Hero Content */}
        <div
          className="absolute top-[266px]"
          style={{ left: `${heroLayout.left + 15}px` }}
        >
          <div
            className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-[#d2d2d2] tracking-[1.20px] mb-[40px]"
            style={{
              fontSize: `${servicePageHeroLayout.subtitle.fontSize}px`,
              lineHeight: `${servicePageHeroLayout.subtitle.fontSize * 1.46}px`,
            }}
          >
            služby
          </div>

          <h1
            className="w-[769px] [font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[2.80px] mb-[35px]"
            style={{
              fontSize: `${servicePageHeroLayout.title.fontSize}px`,
              lineHeight: `${servicePageHeroLayout.title.fontSize * 1.20}px`,
            }}
          >
            Designový partner pro růst vaší firmy
          </h1>

          <div className="flex gap-4">
            <Badge
              className="w-[153px] [filter:brightness(0.9)] h-[33px] bg-white rounded-[40px] flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-colors"
              onClick={() => scrollToService(0)}
            >
              <span
                className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.64px] leading-[14.72px]"
                style={{ fontSize: `${servicePageHeroLayout.badge.fontSize}px` }}
              >
                Webové stránky
              </span>
            </Badge>
            <Badge
              className="w-[118px] h-[33px] [filter:brightness(0.9)] bg-white rounded-[40px] flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-colors"
              onClick={() => scrollToService(1)}
            >
              <span
                className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.64px] leading-[14.72px]"
                style={{ fontSize: `${servicePageHeroLayout.badge.fontSize}px` }}
              >
                Aplikace
              </span>
            </Badge>
            <Badge
              className="w-[108px] h-[33px] [filter:brightness(0.9)] bg-white rounded-[40px] flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-colors"
              onClick={() => scrollToService(2)}
            >
              <span
                className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.64px] leading-[14.72px]"
                style={{ fontSize: `${servicePageHeroLayout.badge.fontSize}px` }}
              >
                Design
              </span>
            </Badge>
          </div>
        </div>

        <img
          className="absolute bottom-[0px] right-[170px] w-[85px] h-[85px] object-cover"
          alt="White arrow"
          src="/white-arrow-alvion-1-6.png"
        />
      </section>

      {/* Horizontal Scroll Wrapper */}
      <div
        ref={wrapperRef}
        className="w-full"
        style={{
          marginTop: '180px',
          marginBottom: '-180px',
          height: '100vh',
        }}
      >
        <div
          ref={containerRef}
          className="w-full overflow-hidden sticky top-0 box-border"
          style={{
            height: '100vh',
            padding: '15px',
          }}
        >
          <div
            className="flex h-full items-center"
            style={{
              transform: `translateX(-${scrollState.progress}px)`,
              gap: '30px',
              transition: 'transform 0.15s ease-out',
            }}
          >
          {/* Web Services Section */}
          <section className="flex-shrink-0" style={{ width: 'calc(100vw - 30px)' }}>
            <div className="w-full" style={{ height: 'calc(100vh - 30px)' }}>
          <div className="relative w-full h-full bg-[#333333] rounded-[40px] shadow-[0px_4px_15.9px_8px_rgba(0,0,0,0.25)] overflow-hidden flex">

            {/* Left Content Section */}
            <div className="flex-1 flex items-center pl-[6%] pr-[4%] py-[50px] relative z-10">
              {/* Background Image - only for left section, mirrored */}
              <img
                className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.8)] scale-x-[-1]"
                alt="Background"
                src={backgroundUrl}
              />

              <div className="w-full relative z-10">
                {/* Header with number and title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-[46px] h-[46px] rounded-full border-[1px] border-white flex items-center justify-center flex-shrink-0">
                    <span className="[font-family:'Halyard_Display-ExtraLight',Helvetica] font-thin text-white text-[28px] leading-none">
                      1
                    </span>
                  </div>
                  <h2 className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white text-[clamp(30px,3.8vw,40px)] tracking-[1.5px] leading-[1.1]">
                    Webové stránky
                  </h2>
                </div>

                {/* Description */}
                <p className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(13px,1.3vw,15px)] tracking-[0.2px] leading-[1.6] mb-6 opacity-90">
                  Navrhuji a vytvářím webové stránky pro malé i velké firmy. Mým cílem je posunout váš byznys blíže k dosažení vašich cílů pomocí profesionálně strukturovaných stránek.
                </p>

                {/* Divider line with fade effect */}
                <div className="w-full h-[1px] mb-10 bg-gradient-to-r from-white/30 via-white/20 to-transparent"></div>

                {/* Three Columns with Headers */}
                <div className="flex gap-[clamp(60px,8vw,100px)]">
                  {/* Column 1 with Header */}
                  <div className="flex flex-col gap-5">
                    <h3 className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white text-[clamp(17px,1.8vw,21px)] tracking-[0.4px] leading-[1.2] whitespace-nowrap">
                      Jaké nabízím?
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Firemní weby
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Osobní web
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Web na míru
                        </span>
                      </Badge>
                    </div>
                  </div>

                  {/* Column 2 - No Header */}
                  <div className="flex flex-col gap-5">
                    <div className="h-[clamp(20.4px,2.16vw,25.2px)]"></div>
                    <div className="flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Landing page
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          E-shop
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          A další...
                        </span>
                      </Badge>
                    </div>
                  </div>

                  {/* Column 3 with Header */}
                  <div className="flex flex-col gap-5">
                    <h3 className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white text-[clamp(17px,1.8vw,21px)] tracking-[0.4px] leading-[1.2]">
                      Co ještě?
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          SEO Optimalizace
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Pokročilé funkce
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          A mnohem víc...
                        </span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="w-[38%] relative flex-shrink-0 z-10">
              <img
                className="w-full h-full object-cover rounded-r-[40px] grayscale"
                alt="Web services image"
                src="/sluzby_page_web_sluzby_obrazek.webp"
              />
            </div>
          </div>
        </div>
      </section>

          {/* Application Services Section */}
          <section className="flex-shrink-0" style={{ width: 'calc(100vw - 30px)' }}>
            <div className="w-full" style={{ height: 'calc(100vh - 30px)' }}>
          <div className="relative w-full h-full bg-[#333333] rounded-[40px] shadow-[0px_4px_15.9px_8px_rgba(0,0,0,0.25)] overflow-hidden flex">

            {/* Left Content Section */}
            <div className="flex-1 flex items-center pl-[6%] pr-[4%] py-[50px] relative z-10">
              {/* Background Image - only for left section, mirrored */}
              <img
                className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.8)] scale-x-[-1]"
                alt="Background"
                src={backgroundUrl}
              />

              <div className="w-full relative z-10">
                {/* Header with number and title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-[46px] h-[46px] rounded-full border-[1px] border-white flex items-center justify-center flex-shrink-0">
                    <span className="[font-family:'Halyard_Display-ExtraLight',Helvetica] font-thin text-white text-[28px] leading-none">
                      2
                    </span>
                  </div>
                  <h2 className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white text-[clamp(30px,3.8vw,40px)] tracking-[1.5px] leading-[1.1]">
                    Aplikace
                  </h2>
                </div>

                {/* Description */}
                <p className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(13px,1.3vw,15px)] tracking-[0.2px] leading-[1.6] mb-6 opacity-90">
                  Vytvářím mobilní i webové aplikace dělané na míru vašim potřebám. Každá aplikace je navržena tak, aby zjednodušila vaše procesy a podpořila růst vašeho byznysu.
                </p>

                {/* Divider line with fade effect */}
                <div className="w-full h-[1px] mb-10 bg-gradient-to-r from-white/30 via-white/20 to-transparent"></div>

                {/* Three Columns with Headers */}
                <div className="flex gap-[clamp(60px,8vw,100px)]">
                  {/* Column 1 with Header */}
                  <div className="flex flex-col gap-5">
                    <h3 className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white text-[clamp(17px,1.8vw,21px)] tracking-[0.4px] leading-[1.2] whitespace-nowrap">
                      Co nabízím?
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Mobilní aplikace
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Webové aplikace
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Rezervační systémy
                        </span>
                      </Badge>
                    </div>
                  </div>

                  {/* Column 2 - No Header */}
                  <div className="flex flex-col gap-5">
                    <div className="h-[clamp(20.4px,2.16vw,25.2px)]"></div>
                    <div className="flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Informační systémy
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Automatizace procesů
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Integrace AI
                        </span>
                      </Badge>
                    </div>
                  </div>

                  {/* Column 3 - No Header */}
                  <div className="flex flex-col gap-5">
                    <div className="h-[clamp(20.4px,2.16vw,25.2px)]"></div>
                    <div className="flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Optimalizace
                        </span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="w-[38%] relative flex-shrink-0 z-10">
              <img
                className="w-full h-full object-cover rounded-r-[40px] grayscale"
                alt="Application services image"
                src="/sluzby_page_aplikace_sluzby_obrazek.webp"
              />
            </div>
          </div>
        </div>
      </section>

          {/* Design Services Section */}
          <section className="flex-shrink-0" style={{ width: 'calc(100vw - 30px)' }}>
            <div className="w-full" style={{ height: 'calc(100vh - 30px)' }}>
          <div className="relative w-full h-full bg-[#333333] rounded-[40px] shadow-[0px_4px_15.9px_8px_rgba(0,0,0,0.25)] overflow-hidden flex">

            {/* Left Content Section */}
            <div className="flex-1 flex items-center pl-[6%] pr-[4%] py-[50px] relative z-10">
              {/* Background Image - only for left section, mirrored */}
              <img
                className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.8)] scale-x-[-1]"
                alt="Background"
                src={backgroundUrl}
              />

              <div className="w-full relative z-10">
                {/* Header with number and title */}
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-[46px] h-[46px] rounded-full border-[1px] border-white flex items-center justify-center flex-shrink-0">
                    <span className="[font-family:'Halyard_Display-ExtraLight',Helvetica] font-thin text-white text-[28px] leading-none">
                      3
                    </span>
                  </div>
                  <h2 className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white text-[clamp(30px,3.8vw,40px)] tracking-[1.5px] leading-[1.1]">
                    Design
                  </h2>
                </div>

                {/* Description */}
                <p className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(13px,1.3vw,15px)] tracking-[0.2px] leading-[1.6] mb-6 opacity-90">
                  Design není jen vzhled – je to důvěra, emoce i důvod, proč zákazník nakoupí právě u vás. Proto se neuspokojuji s průměrem. Každý detail u mě drží nejvyšší úroveň.
                </p>

                {/* Divider line with fade effect */}
                <div className="w-full h-[1px] mb-10 bg-gradient-to-r from-white/30 via-white/20 to-transparent"></div>

                {/* Three Columns with Headers */}
                <div className="flex gap-[clamp(60px,8vw,100px)]">
                  {/* Column 1 with Header */}
                  <div className="flex flex-col gap-5">
                    <h3 className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white text-[clamp(17px,1.8vw,21px)] tracking-[0.4px] leading-[1.2] whitespace-nowrap">
                      Co nabízím?
                    </h3>
                    <div className="flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Tvorba loga
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Tvorba značky
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Grafický styl
                        </span>
                      </Badge>
                    </div>
                  </div>

                  {/* Column 2 - No Header */}
                  <div className="flex flex-col gap-5">
                    <div className="h-[clamp(20.4px,2.16vw,25.2px)]"></div>
                    <div className="flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Vzhled soc. sítí
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Bannery
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Vizitky
                        </span>
                      </Badge>
                    </div>
                  </div>

                  {/* Column 3 - No Header */}
                  <div className="flex flex-col gap-5">
                    <div className="h-[clamp(20.4px,2.16vw,25.2px)]"></div>
                    <div className="flex flex-col gap-2.5">
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Venkovní reklamy
                        </span>
                      </Badge>
                      <Badge variant="outline" className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap">
                        <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(11px,1.1vw,13px)] tracking-[0.2px]">
                          Katalogy, letáky
                        </span>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Image Section */}
            <div className="w-[38%] relative flex-shrink-0 z-10">
              <img
                className="w-full h-full object-cover rounded-r-[40px] grayscale"
                alt="Design services image"
                src="/sluzby_page_design_sluzby_obrazek.webp"
              />
            </div>
          </div>
        </div>
      </section>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <section ref={contactRef} className="w-full flex flex-col items-center py-[clamp(12rem,8vh,18rem)]" style={{ marginTop: '180px' }}>
        <div className="w-full max-w-[clamp(30rem,50vw,40rem)] px-[clamp(1rem,2vw,2rem)]">
          <div className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-black text-[clamp(1.5rem,3vw,2rem)] text-center tracking-[0.07rem] leading-[clamp(2rem,4vw,2.5rem)] mb-8">
            {"Hledáte designového partnera pro růst vašeho byznysu?".split(' ').map((word, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  animation: contactVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                  animationDelay: contactVisible ? `${index * 0.15}s` : '0s',
                  opacity: 0,
                  marginRight: index < 6 ? '0.25em' : '0'
                }}
              >
                {word}
              </span>
            ))}
          </div>
          <div className="flex justify-center">
            <a href="mailto:info@alvion.net" className="w-[clamp(10rem,15vw,13rem)] h-[clamp(2rem,3vw,2.5rem)] bg-black rounded-[2rem] hover:bg-gray-800 flex items-center justify-center transition-colors">
              <span className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white text-[clamp(0.6rem,2vw,0.9rem)] tracking-[0.04rem] leading-[clamp(0.9rem,1.5vw,1.2rem)]">
                Kontaktujte mě
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer Contact Section */}
      <section ref={footerRef} className="w-full box-border p-[15px] flex justify-center items-center min-h-[100vh]">
        <div className="relative w-[calc(100vw-30px)] h-[calc(100vh-30px)] rounded-[40px] overflow-hidden">
          {/* Background Image - same as hero */}
          <img
            className="absolute w-full h-full min-h-[calc(100vh-30px)] object-cover rounded-[40px] [filter:brightness(0.7)]"
            alt="Footer background"
            src={backgroundUrl}
          />

          {/* Background Logo - same as hero side decoration */}
          <img
            src="https://i.imgur.com/Hz4xcKj.png"
            alt="Side decoration"
            className="absolute -translate-y-1/2 w-auto object-contain z-10 floating-image"
            style={{
              top: heroLayout.floatingImage.top,
              right: `${heroLayout.floatingImage.right}px`,
              maxHeight: heroLayout.floatingImage.maxHeight,
              opacity: heroLayout.floatingImage.opacity,
            }}
          />

          {/* Footer Content */}
          <div className="relative w-full h-full flex flex-col justify-center py-[clamp(4rem,8vh,6rem)] z-20">
            {/* Title */}
            <h2
              className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white tracking-[0.04rem] opacity-90"
              style={{
                fontSize: `${footerLayout.titleFontSize}px`,
                marginLeft: `${footerLayout.titleLeft}px`,
                marginBottom: `${footerLayout.titleMarginBottom}px`,
                lineHeight: 1.3,
                maxWidth: '600px',
              }}
            >
              {"Hledáte spolehlivého partnera pro váš branding?".split(' ').map((word, index) => (
                <span
                  key={index}
                  className="inline-block"
                  style={{
                    animation: footerVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                    animationDelay: footerVisible ? `${index * 0.15}s` : '0s',
                    opacity: 0,
                    marginRight: index < 5 ? '0.25em' : '0'
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>

            {/* Name */}
            <div
              className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white tracking-[0.03rem] opacity-90"
              style={{
                fontSize: `${footerLayout.nameFontSize}px`,
                marginLeft: `${footerLayout.contentLeft}px`,
                marginBottom: `${footerLayout.nameMarginBottom}px`,
              }}
            >
              Ondřej Zeman
            </div>

            {/* Phone */}
            <div
              className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[0.02rem] opacity-90"
              style={{
                fontSize: `${footerLayout.contactFontSize}px`,
                marginLeft: `${footerLayout.contentLeft}px`,
                marginBottom: `${footerLayout.contactItemMarginBottom}px`,
                lineHeight: footerLayout.contactLineHeight,
              }}
            >
              +420 777 538 858
            </div>

            {/* Email */}
            <a
              className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[0.02rem] opacity-90 hover:opacity-100 transition-opacity"
              href="mailto:info@alvion.net"
              style={{
                fontSize: `${footerLayout.contactFontSize}px`,
                marginLeft: `${footerLayout.contentLeft}px`,
                marginBottom: `${footerLayout.contactSectionMarginBottom}px`,
                lineHeight: footerLayout.contactLineHeight,
              }}
            >
              info@alvion.net
            </a>

            {/* IČ */}
            <div
              className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[0.02rem] opacity-90"
              style={{
                fontSize: `${footerLayout.icFontSize}px`,
                marginLeft: `${footerLayout.contentLeft}px`,
                marginBottom: `${footerLayout.icMarginBottom}px`,
                lineHeight: footerLayout.contactLineHeight,
              }}
            >
              IČ: 21947546
            </div>

            {/* Social Icons */}
            <div
              className="flex gap-4"
              style={{
                marginLeft: `${footerLayout.contentLeft}px`,
                marginBottom: `${footerLayout.socialSectionMarginBottom}px`,
              }}
            >
              {[
                { src: "/fbfb.png", alt: "Facebook", href: "https://www.facebook.com/share/1CEiu7ZmGN/?mibextid=wwXIfr" },
                { src: "/igig.png", alt: "Instagram", href: "https://www.instagram.com/ondrej.zem/?hl=cz" },
                { src: "/inin.png", alt: "LinkedIn", href: "https://www.linkedin.com/in/ond%C5%99ej-zeman-2631ab398" },
              ].map((icon, index) => (
                <a
                  key={index}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <img
                    className="rounded-full object-cover"
                    alt={icon.alt}
                    src={icon.src}
                    style={{
                      width: `${footerLayout.socialIconSize}px`,
                      height: `${footerLayout.socialIconSize}px`,
                    }}
                  />
                </a>
              ))}
            </div>

            {/* Privacy Link */}
            <Link
              to="/gdpr"
              className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[0.02rem] opacity-90 cursor-pointer hover:opacity-100 transition-opacity"
              style={{
                fontSize: `${footerLayout.contactFontSize}px`,
                marginLeft: `${footerLayout.contentLeft}px`,
                marginBottom: `${footerLayout.privacyMarginBottom}px`,
                lineHeight: footerLayout.contactLineHeight,
              }}
            >
              Ochrana osobních údajů a GDPR
            </Link>

            {/* Copyright */}
            <div
              className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[0.02rem] opacity-80"
              style={{
                fontSize: `${footerLayout.copyrightFontSize}px`,
                marginLeft: `${footerLayout.contentLeft}px`,
                lineHeight: footerLayout.contactLineHeight,
              }}
            >
              Copyright © 2025 – Alvion<br />All rights reserved.
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};