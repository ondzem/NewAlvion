import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { Badge } from "../../../components/ui/badge";
import { Button } from "../../../components/ui/button";
import { AlvionLogo } from "../../../components/AlvionLogo";
import { Navbar } from "../../../components/Navbar";
import { useScrollTrigger } from "../../../hooks/useScrollTrigger";
import { useResponsiveLayoutMobile } from "../../../hooks/useResponsiveLayoutMobile";
import { useWebsiteImagesMobile } from "../../../hooks/useWebsiteImagesMobile";

export const MobileMyServicePage_Sm = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeService, setActiveService] = useState<number | null>(null);
  const { breakpoint, layout, getResponsiveValue } = useResponsiveLayoutMobile();
  const { backgroundUrl } = useWebsiteImagesMobile();

  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 768
  );
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(() => {
      setWindowWidth(window.innerWidth);
    }, 150);
  }, []);

  useEffect(() => {
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (resizeTimeoutRef.current) {
        clearTimeout(resizeTimeoutRef.current);
      }
    };
  }, [handleResize]);

  const isBelow500 = windowWidth < 500;
  const isBelow801 = windowWidth < 801;
  const gridColumns = isBelow500 ? '1fr' : isBelow801 ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)';
  const gridRowGap = isBelow500 ? '12px' : isBelow801 ? '40px' : '16px';
  const gridColumnGap = isBelow500 ? '12px' : '16px';

  const { isVisible: heroVisible, elementRef: heroRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { isVisible: contactVisible, elementRef: contactRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: true,
  });
  const { isVisible: footerVisible, elementRef: footerRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: true,
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      if (location.state?.serviceIndex !== undefined) {
        const serviceIndex = location.state.serviceIndex;
        const element = document.getElementById(`service-${serviceIndex}`);
        if (element) {
          setTimeout(() => {
            const elementRect = element.getBoundingClientRect();
            const elementTop = elementRect.top + window.pageYOffset;
            const elementHeight = elementRect.height;
            const windowHeight = window.innerHeight;
            const scrollPosition = elementTop - (windowHeight / 2) + (elementHeight / 2);

            window.scrollTo({
              top: scrollPosition,
              behavior: 'smooth'
            });
          }, 100);
        }
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  }, [isLoaded, location.state]);

  const headerLayout = getResponsiveValue(layout.header);
  const navigationLayout = getResponsiveValue(layout.navigation);
  const heroLayout = getResponsiveValue(layout.hero);
  const contactLayout = getResponsiveValue(layout.contact);
  const footerLayout = getResponsiveValue(layout.footer);
  const servicePageHeroLayout = getResponsiveValue(layout.servicePageHero);

  const services = [
    {
      number: "01",
      title: "Webové stránky",
      description: "Navrhuji a vytvářím webové stránky pro malé i velké firmy. Mým cílem je posunout váš byznys blíže k dosažení vašich cílů pomocí profesionálně strukturovaných stránek.",
      image: "/sluzby_web.webp",
      columns: [
        { header: "Jaké nabízím", items: ["Firemní weby", "Osobní weby", "Web na míru"] },
        { items: ["Landing page", "E-shop", "A další..."] },
        { header: "Co ještě?", items: ["SEO Optimalizace", "Pokročilé funkce", "A další..."] },
      ],
    },
    {
      number: "02",
      title: "Aplikace",
      description: "Vytvářím mobilní i webové aplikace dělané na míru vašim potřebám. Každá aplikace je navržena tak, aby zjednodušila vaše procesy a podpořila růst vašeho byznysu.",
      image: "/sluzby_aplikace.webp",
      columns: [
        { header: "Co nabízím", items: ["Mobilní aplikace", "Webové aplikace", "Rezervační systémy"] },
        { items: ["Informační systémy", "Automatizace programů", "Integrace AI"] },
        { items: ["Optimalizace"] },
      ],
    },
    {
      number: "03",
      title: "Design",
      description: "Design není jen vzhled – je to důvěra, emoce i důvod, proč zákazník nakoupí právě u vás. Proto se nespokojuji s průměrem. Každý detail u mě drží nejvyšší úroveň.",
      image: "/sluzby_design.webp",
      columns: [
        { header: "Co nabizím?", items: ["Tvorba loga", "Tvorba značky", "Grafický styl"] },
        { items: ["Vzhled soc. sítí", "Bannery", "Vizitky"] },
        { items: ["Venkovní reklamy", "Katalogy, letáky"] },
      ],
    },
  ];

  const toggleService = (index: number) => {
    setActiveService(activeService === index ? null : index);
  };

  return (
    <div className="w-full min-h-screen bg-white overflow-x-hidden">
      <div
        className={`fixed z-50 transition-all duration-1000 ease-out ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
        style={{
          top: `${headerLayout.top}px`,
          left: headerLayout.left,
          width: `${headerLayout.logoWidth}px`,
          height: `${headerLayout.logoHeight}px`,
        }}
      >
        <AlvionLogo
          size={breakpoint === 'sm' ? 'mobile-sm' : 'mobile-md'}
          className="opacity-90 w-full h-full"
          customLetterOffsets={{
            A: "translate-y-[0px]",
            L: "translate-y-[0px]",
            V: "translate-y-[1px]",
            I: "translate-y-[1px]",
            O: "translate-y-[1px]",
            N: "translate-y-[1px]",
          }}
          customLetterSpacing={{
            A: "-ml-6",
            L: "-ml-2.5",
            V: "-ml-3",
            I: "-ml-3",
            O: "-ml-3",
            N: "-ml-[6px]",
          }}
        />
      </div>

      <nav
        className="fixed flex items-center justify-end z-[100]"
        style={{
          top: `${navigationLayout.top}px`,
          right: navigationLayout.right,
        }}
      >
        <Navbar variant="mobile" />
      </nav>

      {/* Header Section */}
      <section
        ref={heroRef as React.RefObject<HTMLElement>}
        className="relative w-full"
        style={{ height: `${servicePageHeroLayout.height}px` }}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.4)]"
          alt="Hero background"
          src="/home_page_pro_kazdou_sekci.png"
        />

        <div
          className={`absolute [font-family:'Halyard_Display-Regular',Helvetica] font-normal text-[#D2D2D2] transition-all duration-700 ${
            heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            left: `${servicePageHeroLayout.subtitle.left}px`,
            top: `${servicePageHeroLayout.subtitle.top}px`,
            fontSize: `${servicePageHeroLayout.subtitle.fontSize}px`,
            letterSpacing: `${servicePageHeroLayout.subtitle.letterSpacing}px`,
            lineHeight: `${servicePageHeroLayout.subtitle.lineHeight}px`,
          }}
        >
          služby
        </div>

        <div
          className={`absolute [font-family:'Halyard_Display-Light',Helvetica] font-light text-white transition-all duration-700 delay-100 ${
            heroVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
          }`}
          style={{
            left: `${servicePageHeroLayout.title.left}px`,
            top: `${servicePageHeroLayout.title.top}px`,
            width: typeof servicePageHeroLayout.title.width === 'string'
              ? servicePageHeroLayout.title.width
              : `${servicePageHeroLayout.title.width}px`,
            fontSize: servicePageHeroLayout.title.fontSize,
            letterSpacing: `${servicePageHeroLayout.title.letterSpacing}px`,
            lineHeight: `${servicePageHeroLayout.title.lineHeight}px`,
          }}
        >
          Designový partner pro růst vaší firmy
        </div>

        <img
          className="absolute object-cover"
          alt="Arrow"
          src="/white-arrow-alvion-1-6.png"
          style={{
            width: `${servicePageHeroLayout.arrow.width}px`,
            height: `${servicePageHeroLayout.arrow.height}px`,
            right: `${servicePageHeroLayout.arrow.right}px`,
            top: `${servicePageHeroLayout.arrow.top}px`,
          }}
        />
      </section>

      <section className="w-full">
        {services.map((service, idx) => {
          return (
            <div
              key={idx}
              id={`service-${idx}`}
              onClick={() => navigate("/services", { state: { serviceIndex: idx } })}
              style={{
                paddingTop: idx === 0 ? '40px' : '20px',
                paddingBottom: '20px',
                paddingLeft: '10px',
                paddingRight: '10px',
                cursor: 'pointer',
              }}
            >
              <div
                className="relative w-full overflow-hidden rounded-[40px]"
                style={{ height: isBelow500 ? '800px' : '750px' }}
              >
                <img
                  className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.5)]"
                  alt={`${service.title} background`}
                  src={service.image}
                />

                <div
                  className="relative z-10 w-full h-full flex flex-col justify-center"
                  style={{ padding: '30px', paddingLeft: '24px' }}
                >
                  {isBelow500 ? (
                    <>
                      <div className="flex items-start gap-4 mb-4">
                        <div
                          className="rounded-full border-2 border-white flex items-center justify-center flex-shrink-0"
                          style={{ width: '50px', height: '50px' }}
                        >
                          <span
                            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white leading-none"
                            style={{ fontSize: '18px' }}
                          >
                            {service.number}
                          </span>
                        </div>
                      </div>

                      <h2
                        className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white leading-tight"
                        style={{
                          fontSize: '26px',
                          letterSpacing: '0.5px',
                          lineHeight: '1.2',
                          marginBottom: '16px',
                        }}
                      >
                        {service.title}
                      </h2>
                    </>
                  ) : (
                    <div className="flex items-center gap-4 mb-4">
                      <div
                        className="rounded-full border-2 border-white flex items-center justify-center flex-shrink-0"
                        style={{ width: '45px', height: '45px' }}
                      >
                        <span
                          className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white leading-none"
                          style={{ fontSize: '18px' }}
                        >
                          {service.number}
                        </span>
                      </div>

                      <h2
                        className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white leading-tight"
                        style={{
                          fontSize: '26px',
                          letterSpacing: '0.5px',
                          lineHeight: '1.2',
                        }}
                      >
                        {service.title}
                      </h2>
                    </div>
                  )}

                  <p
                    className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white opacity-90 leading-snug"
                    style={{
                      fontSize: '15px',
                      letterSpacing: '0.3px',
                      lineHeight: '1.6',
                      marginBottom: '24px',
                    }}
                  >
                    {service.description}
                  </p>

                  <div
                    className="w-full h-px bg-gradient-to-r from-white/40 via-white/20 to-transparent"
                    style={{ marginBottom: '24px' }}
                  />

                  {isBelow500 ? (
                    <div className="flex flex-col gap-8">
                      {service.columns.map((column, colIdx) => (
                        <div key={colIdx} className="flex flex-col">
                          {column.header && (
                            <h3
                              className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white leading-tight"
                              style={{
                                fontSize: '14px',
                                letterSpacing: '0.3px',
                                lineHeight: '1.4',
                                marginBottom: '12px',
                              }}
                            >
                              {column.header}
                            </h3>
                          )}
                          <div className="flex flex-col gap-2">
                            {column.items.map((item, itemIdx) => (
                              <Badge
                                key={itemIdx}
                                variant="outline"
                                className="w-fit rounded-full border-white/70 bg-white/10"
                                style={{
                                  paddingLeft: '14px',
                                  paddingRight: '14px',
                                  paddingTop: '6px',
                                  paddingBottom: '6px',
                                }}
                              >
                                <span
                                  className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white leading-tight"
                                  style={{
                                    fontSize: '12px',
                                    letterSpacing: '0.2px',
                                    lineHeight: '1.4',
                                  }}
                                >
                                  {item}
                                </span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div
                      className="grid"
                      style={{
                        gridTemplateColumns: gridColumns,
                        rowGap: gridRowGap,
                        columnGap: gridColumnGap,
                      }}
                    >
                      {service.columns.map((column, colIdx) => (
                        <div key={colIdx} className="flex flex-col">
                          <h3
                            className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white leading-tight"
                            style={{
                              fontSize: '14px',
                              letterSpacing: '0.3px',
                              lineHeight: '1.4',
                              marginBottom: '12px',
                              visibility: column.header ? 'visible' : 'hidden',
                            }}
                          >
                            {column.header || '\u00A0'}
                          </h3>
                          <div className="flex flex-col gap-2">
                            {column.items.map((item, itemIdx) => (
                              <Badge
                                key={itemIdx}
                                variant="outline"
                                className="w-fit rounded-full border-white/70 bg-white/10"
                                style={{
                                  paddingLeft: '14px',
                                  paddingRight: '14px',
                                  paddingTop: '6px',
                                  paddingBottom: '6px',
                                }}
                              >
                                <span
                                  className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white leading-tight"
                                  style={{
                                    fontSize: '12px',
                                    letterSpacing: '0.2px',
                                    lineHeight: '1.4',
                                  }}
                                >
                                  {item}
                                </span>
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </section>

     {/* Contact Section 4 */}
      <section
        ref={contactRef as React.RefObject<HTMLElement>}
        className="w-full flex flex-col items-center"
        style={{
          paddingTop: `${contactLayout.paddingY}px`,
          paddingBottom: `${contactLayout.paddingY}px`,
        }}
      >
        <div
          className="w-full px-4"
          style={{
            maxWidth: typeof contactLayout.maxWidth === 'string'
              ? contactLayout.maxWidth
              : `${contactLayout.maxWidth}px`,
          }}
        >
          <div
            className="w-full [font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black text-center tracking-[1.00px] leading-[29.25px]"
            style={{
              fontSize: `${contactLayout.text.fontSize}px`,
              marginBottom: typeof contactLayout.text.marginBottom === 'string'
                ? contactLayout.text.marginBottom
                : `${contactLayout.text.marginBottom}px`,
              lineHeight: contactLayout.text.lineHeight,
            }}
          >
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
            <a
              href="mailto:info@alvion.net"
              className="bg-black rounded-[30px] border border-white hover:bg-gray-800 flex items-center justify-center transition-colors"
              style={{
                width: `${contactLayout.button.width}px`,
                height: `${contactLayout.button.height}px`,
              }}
            >
              <span
                className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white"
                style={{
                  fontSize: `${contactLayout.button.fontSize}px`,
                  letterSpacing: `${contactLayout.button.letterSpacing}em`,
                  lineHeight: contactLayout.button.lineHeight,
                }}
              >
                Kontaktujte mě
              </span>
            </a>
          </div>
        </div>
      </section>

      {/* Final Footer Contact Section - sm version */}
      {breakpoint === 'sm' && (
        <section ref={footerRef as React.RefObject<HTMLElement>} className="w-full box-border p-[10px]">
          <div
            className="relative w-full rounded-[40px] overflow-hidden"
            style={{ minHeight: '100vh' }}
          >

            {/* Black background box */}
            <div className="absolute bg-black rounded-[40px] inset-0" />

            {/* Statické "A" logo – žádná animace */}
            <div
              style={{
                position: 'absolute',
                width: isBelow500 ? '550px' : '600px',
                height: isBelow500 ? '800px' : '850px',
                left: '50%',
                top: isBelow500 ? '80px' : '80px',
                transform: 'translateX(-50%)',
                opacity: 0.32,
                transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1), height 0.5s cubic-bezier(0.4, 0, 0.2, 1), top 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                zIndex: 20,
                pointerEvents: 'none',
              }}
            >
              <img
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
                alt="Side decoration"
                src="https://i.imgur.com/Hz4xcKj.png"
                loading="lazy"
              />
            </div>

            {/* Shadow decoration */}
            <img
              className="absolute object-cover z-20"
              style={{
                width: `${heroLayout.shadow.width}px`,
                height: `${heroLayout.shadow.height}px`,
                left: '50%',
                transform: 'translateX(-50%) rotate(-180deg)',
                top: `${heroLayout.shadow.top}px`,
                opacity: heroLayout.shadow.opacity,
              }}
              alt="Shadow decoration"
              src="/shadow mobile hero section.png"
            />

            <div className="relative z-20 flex flex-col items-center justify-center min-h-[100vh] px-6 py-16">
              <div className="w-full max-w-[340px] flex flex-col items-center">
                {/* Title with animation */}
              <h2
                className="opacity-85 text-center [font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white tracking-[0.04rem] max-w-[320px]"
                style={{
                  fontSize: `${footerLayout.titleFontSize}px`,
                  marginBottom: `${footerLayout.titleMarginBottom}px`,
                  lineHeight: 1.3,
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
                      marginRight: index < 7 ? '0.25em' : '0'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h2>

                {/* Name */}
              <div
                className="opacity-90 text-center [font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white tracking-[0.03rem] z-40"
                style={{
                  fontSize: `${footerLayout.nameFontSize}px`,
                  marginBottom: `${footerLayout.nameMarginBottom}px`,
                }}
              >
                Ondřej Zeman
              </div>

              {/* Phone */}
              <div
                className="opacity-90 text-center [font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.02rem]"
                style={{
                  fontSize: `${footerLayout.contactFontSize}px`,
                  marginBottom: `${footerLayout.contactItemMarginBottom}px`,
                  lineHeight: footerLayout.contactLineHeight,
                }}
              >
                +420 777 538 858
              </div>

              {/* Email */}
              <div
                className="opacity-90 text-center [font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.02rem]"
                style={{
                  fontSize: `${footerLayout.contactFontSize}px`,
                  marginBottom: `${footerLayout.contactSectionMarginBottom}px`,
                  lineHeight: footerLayout.contactLineHeight,
                }}
              >
                info@alvion.net
              </div>

              {/* IČ */}
              <div
                className="opacity-90 text-center [font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.02rem]"
                style={{
                  fontSize: `${footerLayout.contactFontSize}px`,
                  marginBottom: `${footerLayout.icMarginBottom}px`,
                }}
              >
                IČ: 21947546
              </div>

              {/* Social Icons */}
              <div
                className="flex gap-4"
                style={{
                  marginLeft: `${footerLayout.contentLeft}px`,
                  marginBottom: `${footerLayout.socialSectionMarginBottom || 46}px`,
                }}
              >
                {[
                  { src: "https://i.imgur.com/mqIj685.png", alt: "Facebook", href: "https://www.facebook.com/share/17jsovf5QJ/?mibextid=wwXIfr" },
                  { src: "https://i.imgur.com/JjgnQQv.png", alt: "Instagram", href: "https://www.instagram.com/ondrej.zem/" },
                  { src: "https://i.imgur.com/NVmSAfp.png", alt: "LinkedIn", href: "https://www.linkedin.com/in/ondřej-zeman-76b126352/" },
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

              {/* Button "Napište mně" */}
              <a href="mailto:info@alvion.net">
                <Button
                  className="opacity-90 bg-white hover:bg-gray-100 rounded-[40px] transition-all flex items-center justify-center"
                  style={{
                    width: `${footerLayout.buttonWidth}px`,
                    height: `${footerLayout.buttonHeight}px`,
                    marginBottom: `${footerLayout.buttonMarginBottom}px`,
                  }}
                >
                  <span
                    className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.02rem]"
                    style={{
                      fontSize: `${footerLayout.buttonFontSize}px`,
                    }}
                  >
                    Napište mně
                  </span>
                </Button>
              </a>

              {/* Privacy link */}
              <Link
                to="/gdpr"
                className="opacity-90 text-center [font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.02rem] hover:opacity-100 transition-opacity"
                style={{
                  fontSize: `${footerLayout.copyrightFontSize}px`,
                  marginBottom: `${footerLayout.privacyMarginBottom}px`,
                }}
              >
                Ochrana osobních údajů a GDPR
              </Link>

              {/* Copyright */}
              <div
                className="opacity-90 text-center [font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.02rem]"
                style={{
                  fontSize: `${footerLayout.copyrightFontSize}px`,
                }}
              >
                Copyright © {currentYear} – Alvion<br />All rights reserved.
              </div>
            </div>
          </div>
          </div>
        </section>
      )}




      
      {/* Final Footer Contact Section - md version */}
      {breakpoint === 'md' && (
        <section ref={footerRef as React.RefObject<HTMLElement>} className={`w-full box-border flex justify-center items-center p-[15px]`}>
          <div
            className="relative w-full rounded-[40px] overflow-hidden"
            style={{
              height: `${footerLayout.height}px`,
            }}
          >
            <img
              className="absolute w-full h-full object-cover rounded-[40px] [filter:brightness(0.7)]"
              alt="Footer background"
              src={backgroundUrl}
            />

            <img
              src="https://i.imgur.com/Hz4xcKj.png"
              alt="Side decoration"
              className="absolute -translate-y-1/2 object-contain z-10 floating-image"
              style={{
                top: footerLayout.logoTop,
                right: typeof footerLayout.logoRight === 'string' ? footerLayout.logoRight : `${footerLayout.logoRight}px`,
                width: `${heroLayout.floatingImage.width}px`,
                height: `${heroLayout.floatingImage.height}px`,
                opacity: footerLayout.logoOpacity,
              }}
            />

            <div className="relative w-full h-full flex flex-col justify-center py-[clamp(4rem,8vh,6rem)] z-20">
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

              <div
                className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[0.02rem] opacity-90"
                style={{
                  fontSize: `${footerLayout.contactFontSize}px`,
                  marginLeft: `${footerLayout.contentLeft}px`,
                  marginBottom: `${footerLayout.contactItemMarginBottom || 7}px`,
                  lineHeight: footerLayout.contactLineHeight,
                }}
              >
                +420 777 538 858
              </div>

              <a
                className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[0.02rem] opacity-90 hover:opacity-100 transition-opacity"
                href="mailto:info@alvion.net"
                style={{
                  fontSize: `${footerLayout.contactFontSize}px`,
                  marginLeft: `${footerLayout.contentLeft}px`,
                  marginBottom: `${footerLayout.contactSectionMarginBottom || 36}px`,
                  lineHeight: footerLayout.contactLineHeight,
                }}
              >
                info@alvion.net
              </a>

              <div
                className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[0.02rem] opacity-90"
                style={{
                  fontSize: `${footerLayout.icFontSize || footerLayout.contactFontSize}px`,
                  marginLeft: `${footerLayout.contentLeft}px`,
                  marginBottom: `${footerLayout.icMarginBottom || 8}px`,
                  lineHeight: footerLayout.contactLineHeight,
                }}
              >
                IČ: 21947546
              </div>

              <div
                className="flex gap-4"
                style={{
                  marginLeft: `${footerLayout.contentLeft}px`,
                  marginBottom: `${footerLayout.socialSectionMarginBottom || 46}px`,
                }}
              >
                {[
                  { src: "https://i.imgur.com/mqIj685.png", alt: "Facebook", href: "https://www.facebook.com/share/17jsovf5QJ/?mibextid=wwXIfr" },
                  { src: "https://i.imgur.com/JjgnQQv.png", alt: "Instagram", href: "https://www.instagram.com/ondrej.zem/" },
                  { src: "https://i.imgur.com/NVmSAfp.png", alt: "LinkedIn", href: "https://www.linkedin.com/in/ondřej-zeman-76b126352/" },
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

              <div
                className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[0.02rem] opacity-80"
                style={{
                  fontSize: `${footerLayout.copyrightFontSize}px`,
                  marginLeft: `${footerLayout.contentLeft}px`,
                  lineHeight: footerLayout.contactLineHeight,
                }}
              >
                Copyright © {currentYear} – Alvion<br />All rights reserved.
              </div>
            </div>
          </div>
        </section>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
