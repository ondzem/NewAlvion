import React from "react";
import { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { AlvionLogo } from "../../components/AlvionLogo";
import { Button } from "../../components/ui/button";
import { MobilePortfolioPage } from "./MobilePortfolioPage";
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";
import { useWebsiteImages } from "../../hooks/useWebsiteImages";
import { breakpoints } from "../../config/breakpoints";

export const PortfolioPage = (): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [openReferenceCard, setOpenReferenceCard] = useState<string>("elektrika");
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { breakpoint, layout, getResponsiveValue } = useResponsiveLayout();
  const { backgroundUrl, referenceImages } = useWebsiteImages();

  const { isVisible: heroVisible, elementRef: heroRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });
  const { isVisible: referencesVisible, elementRef: referencesRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });
  const { isVisible: contactVisible, elementRef: contactRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });
  const { isVisible: footerVisible, elementRef: footerRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });

  const headerLayout = getResponsiveValue(layout.header);
  const heroLayout = getResponsiveValue(layout.hero);
  const servicePageHeroLayout = getResponsiveValue(layout.servicePageHero);
  const referencesLayout = getResponsiveValue(layout.references);
  const footerLayout = getResponsiveValue(layout.footer);

  const references = [
    {
      id: "elektrika",
      title: "Elektrika Bez Rizika",
      gradient: "bg-gradient-to-r from-black via-[#5C5300] to-[#D9C401]",
      tvorbaText: "Moderní web pro elektrikářskou firmu, sloužící k prezentaci služeb.",
      jakText: "Silný důraz na prezentaci služeb, které zvýrazní to, co klient nabízí v jednoduchém a moderním designu.",
      tags: ["Webové stránky", "Správa webu", "Doména"],
      openImage: referenceImages.elektrika.open,
      closedImage: referenceImages.elektrika.closed,
      url: "https://elektrikabezrizika.cz",
    },
    {
      id: "storek",
      title: "Mudr. Ludvík Štorek",
      gradient: "bg-gradient-to-r from-[#003D5C] via-[#006B8F] to-[#00A3CC]",
      tvorbaText: "Profesionální web pro ordinaci praktického lékaře s propracovaným objednávkovým systémem.",
      jakText: "S klientem jsme zvolili jednoduchý a čistý vzhled s důrazem na snadnou orientaci. Web doplňuje propracovaný objednávkový systém, který výrazně zjednodušuje práci v ordinaci.",
      tags: ["Webové stránky", "Objednávkový systém", "Aktuality", "Správa webu", "Doména"],
      openImage: referenceImages.storek.open,
      closedImage: referenceImages.storek.closed,
      url: "https://mudrstorek.cz",
    },
    {
      id: "raska",
      title: "Fotograf Vlastimil Raška",
      gradient: "bg-gradient-to-r from-[#2C2C2C] via-[#4A4A4A] to-[#6B6B6B]",
      tvorbaText: "Elegantní portfolio pro profesionálního fotografa s ukázkou klientovi práce",
      jakText: "Společně s klientem jsme zvolili jednoduchý a čistý vzhled, jehož hlavním cílem je přehledně představit jeho práci.",
      tags: ["Webové stránky", "Správa webu", "Doména"],
      openImage: referenceImages.raska.open,
      closedImage: referenceImages.raska.closed,
      url: "https://fotoraska.cz",
    },
    {
      id: "spilar",
      title: "Jiří Špilar",
      gradient: "bg-gradient-to-r from-[#5C1A00] via-[#8F3D00] to-[#CC6600]",
      tvorbaText: "Na míru vytvořený web pro kadeřnický salon v Pardubicích.",
      jakText: "Klient měl jasný požadavek – vytvořit webové stránky, které budou jeho kadeřnický salon důstojně reprezentovat. Připravil jsem proto jednoduchý, ale propracovaný design, který přesně splňuje jeho představu.",
      tags: ["Webové stránky", "Na míru", "Správa webu"],
      openImage: referenceImages.spilar.open,
      closedImage: referenceImages.spilar.closed,
      url: "https://spilar-hair.cz",
    },
  ];

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

  const handleCardClick = (id: string) => {
    setOpenReferenceCard(id);

    setTimeout(() => {
      const cardElements = document.querySelectorAll('[data-reference-id]');
      let cardElement: HTMLElement | null = null;
      for (let el of cardElements) {
        if (el.getAttribute('data-reference-id') === id) {
          cardElement = el as HTMLElement;
          break;
        }
      }

      if (cardElement) {
        const cardRect = cardElement.getBoundingClientRect();
        const absoluteCardTop = cardRect.top + window.pageYOffset;
        const expandedCardHeight = window.innerHeight * 0.7;
        const cardCenterAbsolute = absoluteCardTop + (expandedCardHeight / 2);
        const viewportCenter = window.innerHeight / 2;
        const targetScrollPosition = cardCenterAbsolute - viewportCenter;

        window.scrollTo({
          top: targetScrollPosition,
          behavior: 'smooth'
        });
      }
    }, 750);
  };

  if (isMobile) {
    return <MobilePortfolioPage />;
  }

  const socialIcons = [
    {
      src: "/fbfb.png",
      alt: "Facebook",
      href: "https://www.facebook.com/share/1CEiu7ZmGN/?mibextid=wwXIfr",
    },
    {
      src: "/igig.png",
      alt: "Instagram",
      href: "https://www.instagram.com/ondrej.zem/?hl=cz",
    },
    {
      src: "/inin.png",
      alt: "LinkedIn",
      href: "https://www.linkedin.com/in/ond%C5%99ej-zeman-2631ab398",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white">
      {/* Header Section */}
      <section
        className="relative w-full bg-black"
        style={{
          minHeight: breakpoint === 'desktop' ? '566px' : '600px',
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
            reference
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
        </div>

        <img
          className="absolute bottom-[0px] right-[170px] w-[85px] h-[85px] object-cover"
          alt="White arrow"
          src="/white-arrow-alvion-1-6.png"
        />
      </section>

      {/* References Section */}
      <section ref={referencesRef} className="relative w-full pt-[clamp(18rem,15vh,24rem)] pb-[clamp(1rem,10vh,1rem)]">
  {/* Nadpis sekce */}
  <div
    className="mb-[clamp(5rem,10vh,8rem)] opacity-90 whitespace-nowrap"
    style={{ marginLeft: `${referencesLayout.titleLeft}px` }}
  >
    {"Výběr z mých referencí".split(' ').map((word, index) => (
      <span
        key={index}
        className="[font-family:'Halyard_Display-SemiBold',Helvetica] font-semibold text-[clamp(1.5rem,3.5vw,3rem)] tracking-[0.08rem] leading-[clamp(2rem,3.5vw,2.5rem)] inline-block"
        style={{
          color: index < 3 ? '#000000' : '#4E4E4E',
          animation: referencesVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
          animationDelay: referencesVisible ? `${index * 0.15}s` : '0s',
          opacity: 0,
          marginRight: index < 3 ? '0.25em' : '0'
        }}
      >
        {word}
      </span>
    ))}
  </div>

  {/* Reference Accordion */}
  <div className="w-[calc(100%-30px)] mx-auto px-[15px] space-y-[clamp(2rem,3vh,2.5rem)]">
    {references.map((reference) => {
      const isOpen = openReferenceCard === reference.id;

      return (
        <div
          key={reference.id}
          onClick={() => handleCardClick(reference.id)}
          data-reference-id={reference.id}
          className={`
            w-full bg-white rounded-[1.5rem] shadow-[0px_0px_12.1px_2px_rgba(0,0,0,0.25)]
            overflow-hidden cursor-pointer relative
            transition-all duration-700 ease-in-out
            ${isOpen ? 'h-[clamp(35rem,70vh,50rem)]' : 'h-[clamp(13rem,19vh,16rem)]'}
          `}
        >
          {isOpen ? (
            <div className="w-full h-full flex">
              <div
                className="flex-1 pr-[clamp(2rem,5vw,5rem)] py-[clamp(2rem,5vw,5rem)] flex flex-col justify-center"
                style={{
                  paddingLeft: typeof referencesLayout.openCardLeftPadding === 'string'
                    ? referencesLayout.openCardLeftPadding
                    : `${referencesLayout.openCardLeftPadding}px`
                }}
              >
                <div>
                  <h3
                    className={`
                      ${reference.gradient} bg-clip-text text-transparent
                      [font-family:'Halyard_Display-SemiBold',Helvetica] font-semibold
                      text-[clamp(1.8rem,3vw,2.5rem)] tracking-[0.05rem]
                      leading-[clamp(2.2rem,4vw,3rem)]
                      mb-[clamp(1.5rem,3vh,2rem)]
                    `}
                  >
                    {reference.title}
                  </h3>

                  <div className="space-y-[clamp(1.5rem,2.5vh,2rem)]">
                    <div>
                      <h4
                        className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-[clamp(1rem,1.8vw,1.4rem)] tracking-[0.05rem] leading-[clamp(1.5rem,2.5vw,2rem)] mb-[clamp(0.6rem,1.2vh,0.9rem)]"
                        style={{
                          color: reference.gradient.includes('5C5300') ? '#D9C401' :
                                 reference.gradient.includes('003D5C') ? '#00A3CC' :
                                 reference.gradient.includes('2C2C2C') ? '#6B6B6B' : '#CC6600',
                        }}
                      >
                        Tvorba
                      </h4>
                      <p className="max-w-[clamp(20rem,35vw,30rem)] [font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black text-[clamp(1rem,1.5vw,1.3rem)] tracking-[0.03rem] leading-[clamp(1.3rem,2vw,1.6rem)]">
                        {reference.tvorbaText}
                      </p>
                    </div>

                    <div>
                      <h4
                        className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-[clamp(1rem,1.8vw,1.4rem)] tracking-[0.05rem] leading-[clamp(1.5rem,2.5vw,2rem)] mb-[clamp(0.6rem,1.2vh,0.9rem)]"
                        style={{
                          color: reference.gradient.includes('5C5300') ? '#D9C401' :
                                 reference.gradient.includes('003D5C') ? '#00A3CC' :
                                 reference.gradient.includes('2C2C2C') ? '#6B6B6B' : '#CC6600',
                        }}
                      >
                        Jak?
                      </h4>
                      <p className="max-w-[clamp(20rem,35vw,30rem)] [font-family:'Halyard_Display-Regular',Helvetica] font-normal text-black text-[clamp(0.95rem,1.4vw,1.2rem)] tracking-[0.03rem] leading-[clamp(1.2rem,1.8vw,1.5rem)]">
                        {reference.jakText}
                      </p>
                    </div>
                  </div>

                  {/* TAGS - use layout value */}
                  <div
                    className="flex gap-[clamp(0.6rem,1vw,1rem)] flex-wrap"
                    style={{ marginTop: `${referencesLayout[reference.id]?.tagMarginTop || 120}px` }}
                  >
                    {reference.tags.map((tag, index) => (
                      <div
                        key={index}
                        className="h-[clamp(1.8rem,2.2vw,2.2rem)] px-[clamp(1rem,1.5vw,1.5rem)] bg-white rounded-[1.5rem] border border-black flex items-center justify-center"
                      >
                        <span className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black text-[clamp(0.75rem,1vw,0.9rem)] tracking-[0.03rem] whitespace-nowrap">
                          {tag}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <a
                href={reference.url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-[45%] h-full relative block hover:opacity-90 transition-opacity"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  className="w-full h-full object-cover rounded-[0_1.2rem_1.2rem_0]"
                  alt={reference.title}
                  src={reference.openImage}
                />
                <img
                  className="w-[clamp(2.5rem,4vw,3.5rem)] h-[clamp(2.5rem,4vw,3.5rem)] absolute right-[clamp(1.5rem,3vw,2.5rem)] bottom-[clamp(1.5rem,3vw,2.5rem)] object-cover transform rotate-[-125deg]"
                  alt="Arrow"
                  src="/white-arrow-alvion-1-6.png"
                />
              </a>
            </div>
          ) : (
            <div
              className="w-full h-full relative flex items-center justify-between"
              style={{
                gap: `${referencesLayout.closedCard.gap}px`,
                paddingLeft: typeof referencesLayout.closedCardLeftPadding === 'string'
                  ? referencesLayout.closedCardLeftPadding
                  : `${referencesLayout.closedCardLeftPadding}px`,
                paddingRight: typeof referencesLayout.closedCardLeftPadding === 'string'
                  ? referencesLayout.closedCardLeftPadding
                  : `${referencesLayout.closedCardLeftPadding}px`
              }}
            >
              <img
                className="absolute inset-0 w-full h-full object-cover rounded-[1.5rem]"
                alt={reference.title}
                src={reference.closedImage}
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-transparent rounded-[1.5rem]" />
              <div className="relative z-10">
                <h3 className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white text-[clamp(1.5rem,2.5vw,2rem)] tracking-[0.05rem] leading-[clamp(1.8rem,3vw,2.4rem)]">
                  {reference.title}
                </h3>
              </div>
              <div
                className="relative z-10 bg-white rounded-[1.5rem] flex items-center justify-center"
                style={{
                  width: `${referencesLayout.button.width}px`,
                  height: `${referencesLayout.button.height}px`,
                }}
              >
                <span
                  className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black whitespace-nowrap"
                  style={{
                    fontSize: `${referencesLayout.button.fontSize}px`,
                    letterSpacing: `${referencesLayout.button.letterSpacing}px`,
                    lineHeight: `${referencesLayout.button.lineHeight}px`,
                  }}
                >
                  Zjistit více
                </span>
              </div>
            </div>
          )}
        </div>
      );
    })}
  </div>
</section>



      
      {/* Contact Section */}
        <section ref={contactRef} className="w-full flex flex-col items-center py-[clamp(12rem,8vh,18rem)]">
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