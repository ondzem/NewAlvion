import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Badge } from "../../../components/ui/badge";
import { Navbar } from "../../../components/Navbar";
import { AlvionLogo } from "../../../components/AlvionLogo";
import { ReadingText } from "../../../components/ReadingText";
import { SponsorLogos } from "../../../components/SponsorLogos";
import { useWebsiteImagesMobile } from "../../../hooks/useWebsiteImagesMobile";
import { useResponsiveLayoutMobile } from "../../../hooks/useResponsiveLayoutMobile";
import { toStyleValue } from "../../../lib/styleUtils";
import { useReadingEffect } from "../../../hooks/useReadingEffect";
import { useScrollTrigger } from "../../../hooks/useScrollTrigger";

export const MobileHomePageUpravena = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const { backgroundUrl, filmDesignUrl, filmCodingUrl, referenceImages } = useWebsiteImagesMobile();
  const { breakpoint, layout, getResponsiveValue } = useResponsiveLayoutMobile();
  const { scrollProgress, sectionRef } = useReadingEffect();
  const { isVisible: heroVisible, elementRef: heroRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: false,
  });
  const { isVisible: servicesVisible, elementRef: servicesRef } = useScrollTrigger({
    threshold: 0.01,
    rootMargin: '0px 0px -100px 0px',
    triggerOnce: false,
  });
  const { isVisible: service1Visible, elementRef: service1Ref } = useScrollTrigger({
    threshold: 0.5,
    triggerOnce: false,
  });
  const { isVisible: service2Visible, elementRef: service2Ref } = useScrollTrigger({
    threshold: 0.5,
    triggerOnce: false,
  });
  const { isVisible: service3Visible, elementRef: service3Ref } = useScrollTrigger({
    threshold: 0.5,
    triggerOnce: false,
  });
  const { isVisible: referencesVisible, elementRef: referencesRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: false,
  });
  const { isVisible: whyChooseVisible, elementRef: whyChooseRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: false,
  });
  const { isVisible: contactVisible, elementRef: contactRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: false,
  });
  const { isVisible: footerVisible, elementRef: footerRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: false,
  });

  const headerLayout = getResponsiveValue(layout.header);
  const heroLayout = getResponsiveValue(layout.hero);
  const navigationLayout = getResponsiveValue(layout.navigation);
  const missionLayout = getResponsiveValue(layout.mission);
  const contactLayout = getResponsiveValue(layout.contact);
  const servicesLayout = getResponsiveValue(layout.services);
  const whyChooseLayout = getResponsiveValue(layout.whyChoose);
  const referencesLayout = getResponsiveValue(layout.references);
  const footerLayout = getResponsiveValue(layout.footer);

  const [isLoaded, setIsLoaded] = useState(false);
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [openReferenceCard, setOpenReferenceCard] = useState<string>("elektrika");
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isCarouselAnimating, setIsCarouselAnimating] = useState(false);
  const [carouselDirection, setCarouselDirection] = useState<'next' | 'prev'>('next');

  const carouselData = [
    {
      number: "01",
      title: "Spokojenost",
      description: "Nikdy nekončím projekt, dokud není klient na 100% spokojen. Vždy se snažím vše dotáhnout k dokonalosti a hlavně k jeho spokojenosti.",
    },
    {
      number: "02",
      title: "Zkušenosti",
      description: "Webovým stránkám a designu se věnuji už mnoho let. Za tu dobu jsem leccos zažil, takže se nových výzev nebojím.",
    },
    {
      number: "03",
      title: "Lidský přístup",
      description: "Spojuji selský rozum s odžitými zkušenostmi a ke každému klientovi přistupuji individuálně, abych zajistil maximální výsledek.",
    },
    {
      number: "04",
      title: "Pečlivost",
      description: "Každý projekt zpracovávám s maximální pečlivostí a vždy se vracím k detailům, abych měl jistotu, že je vše perfektní.",
    },
  ];

  const handleCarouselNext = () => {
    if (isCarouselAnimating) return;
    setCarouselDirection('next');
    setIsCarouselAnimating(true);
    setTimeout(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselData.length);
      setIsCarouselAnimating(false);
    }, 700);
  };

  const handleCarouselPrev = () => {
    if (isCarouselAnimating) return;
    setCarouselDirection('prev');
    setIsCarouselAnimating(true);
    setTimeout(() => {
      setCurrentCarouselIndex((prev) => (prev - 1 + carouselData.length) % carouselData.length);
      setIsCarouselAnimating(false);
    }, 700);
  };

  const currentCarouselItem = carouselData[currentCarouselIndex];
  const nextCarouselIndex = carouselDirection === 'next'
    ? (currentCarouselIndex + 1) % carouselData.length
    : (currentCarouselIndex - 1 + carouselData.length) % carouselData.length;
  const nextCarouselItem = carouselData[nextCarouselIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  const handleCardClick = (cardId: string, event: React.MouseEvent<HTMLDivElement>) => {
    const cardElement = event.currentTarget;
    setOpenReferenceCard(cardId);

    setTimeout(() => {
      const cardRect = cardElement.getBoundingClientRect();
      const absoluteCardTop = cardRect.top + window.pageYOffset;
      const expandedCardHeight = breakpoint === 'sm' ? window.innerHeight * 0.75 : window.innerHeight * 0.8;
      const cardCenterAbsolute = absoluteCardTop + (expandedCardHeight / 2);
      const viewportCenter = window.innerHeight / 2;
      const targetScrollPosition = cardCenterAbsolute - viewportCenter;

      window.scrollTo({
        top: targetScrollPosition,
        behavior: 'smooth'
      });
    }, 750);
  };

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

  const socialIcons = [
    {
      src: "/fbfb.png",
      alt: "Facebook",
    },
    {
      src: "/igig.png",
      alt: "Instagram",
    },
    {
      src: "/inin.png",
      alt: "LinkedIn",
    },
  ];

  return (
    <div className="w-full min-h-screen bg-white overflow-hidden">
      {/* Logo */}
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

      {/* Hero Section */}
      <section
        className="relative w-full"
        style={{
          paddingTop: '10px',
          paddingBottom: '10px',
          paddingLeft: '10px',
          paddingRight: '10px',
        }}
      >
        <div className="relative w-full" style={{ height: `${heroLayout.height}px` }}>
          <div
            className="absolute bg-black rounded-[40px] inset-0"
          />

      <img
          className="absolute object-cover z-30"
          style={{
            width: `${heroLayout.shadow.width}px`,
            height: `${heroLayout.shadow.height}px`,
            ...(heroLayout.shadow.left !== undefined && {
              left: typeof heroLayout.shadow.left === 'number'
                ? `${heroLayout.shadow.left}px`
                : heroLayout.shadow.left,
              transform: 'translateX(-50%) rotate(-180deg)',
            }),
            ...(heroLayout.shadow.right !== undefined && {
              right: typeof heroLayout.shadow.right === 'number'
                ? `${heroLayout.shadow.right}px`
                : heroLayout.shadow.right,
              transform: 'rotate(-180deg)',
            }),
            top: `${heroLayout.shadow.top}px`,
            opacity: heroLayout.shadow.opacity,
          }}
          alt="Shadow decoration"
          src="/shadow mobile hero section.png"
        />

    <img
          className={`absolute z-20 ${
            breakpoint === 'sm' ? 'floating-image-mobile-sm' : 'floating-image-mobile'
          }`}
          style={{
            width: `${heroLayout.floatingImage.width}px`,
            height: `${heroLayout.floatingImage.height}px`,
            ...(heroLayout.floatingImage.left !== undefined && {
              left: typeof heroLayout.floatingImage.left === 'number'
                ? `${heroLayout.floatingImage.left}px`
                : heroLayout.floatingImage.left,
            }),
            ...(heroLayout.floatingImage.right !== undefined && {
              right: typeof heroLayout.floatingImage.right === 'number'
                ? `${heroLayout.floatingImage.right}px`
                : heroLayout.floatingImage.right,
            }),
            top: `${heroLayout.floatingImage.top}px`,
            maxWidth: `${heroLayout.floatingImage.width}px`,
            maxHeight: `${heroLayout.floatingImage.height}px`,
            flexShrink: 0,
            opacity: heroLayout.floatingImage.opacity !== undefined ? heroLayout.floatingImage.opacity : 0.3,
          }}
          alt="Floating image"
          src="https://i.imgur.com/1yE9y9S.png"
        />

        {/* Navigation */}
        <nav
          className="fixed flex items-center justify-end z-[100]"
          style={{
            top: `${navigationLayout.top}px`,
            right: navigationLayout.right,
          }}
        >
          <div>
            <Navbar variant="mobile" />
          </div>
        </nav>

        {/* Hero Content */}
        <div
          ref={heroRef as React.RefObject<HTMLDivElement>}
          className="absolute opacity-85 z-40"
          style={{
            width: `${heroLayout.title.width}px`,
            left: heroLayout.title.left !== undefined
              ? `${heroLayout.title.left}px`
              : (typeof heroLayout.left === 'number' ? `${heroLayout.left}px` : heroLayout.left),
            top: `${heroLayout.top}px`,
            textAlign: heroLayout.title.textAlign,
            ...(heroLayout.title.left === undefined && { transform: 'translateX(-50%)' }),
          }}
        >
          <h1
            className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal opacity-100 text-white tracking-[2.20px] leading-[1.15]"
            style={{
              fontSize: `${heroLayout.title.fontSize}px`,
              marginTop: `${heroLayout.title.marginTop}px`,
            }}
          >
            {"Weby Aplikace a Design".split(' ').map((word, index) => (
              <span
                key={index}
                className="inline-block"
                style={{
                  animation: heroVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                  animationDelay: heroVisible ? `${index * 0.15}s` : '0s',
                  opacity: 0,
                  marginRight: index < 3 ? '0.25em' : '0'
                }}
              >
                {word}
              </span>
            ))}
          </h1>
        </div>

        <div
          className="absolute z-40"
          style={{
            width: `${heroLayout.subtitle.width}px`,
            left: heroLayout.subtitle.left !== undefined
              ? `${heroLayout.subtitle.left}px`
              : (typeof heroLayout.left === 'number' ? `${heroLayout.left}px` : heroLayout.left),
            top: `${heroLayout.top + 180}px`,
            textAlign: heroLayout.subtitle.textAlign,
            ...(heroLayout.subtitle.left === undefined && { transform: 'translateX(-50%)' }),
          }}
        >
          <p
            className="[font-family:'Halyard_Display-ExtraLight',Helvetica] font-extralight text-white tracking-[0.72px] leading-[1.22]"
            style={{
              fontSize: `${heroLayout.subtitle.fontSize}px`,
              marginTop: `${heroLayout.subtitle.marginTop}px`,
              fontWeight: 100,
              WebkitFontSmoothing: 'antialiased',
              MozOsxFontSmoothing: 'grayscale',
            }}
          >
            {"Designový partner pro růst vaší firmy.".split(' ').map((word, index) => (
              <span
                key={index}
                className="inline-block [font-family:'Halyard_Display-ExtraLight',Helvetica] font-extralight"
                style={{
                  animation: heroVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                  animationDelay: heroVisible ? `${(index + 3) * 0.15}s` : '0s',
                  opacity: 0,
                  marginRight: index < 5 ? '0.25em' : '0',
                  fontWeight: 100
                }}
              >
                {word}
              </span>
            ))}
          </p>
        </div>

        <img
          className="absolute object-cover z-30"
          style={{
            width: `${heroLayout.arrow.width}px`,
            height: `${heroLayout.arrow.height}px`,
            ...(heroLayout.arrow.left !== undefined && {
              left: typeof heroLayout.arrow.left === 'number'
                ? `${heroLayout.arrow.left}px`
                : heroLayout.arrow.left,
              transform: 'translateX(-50%)',
            }),
            ...(heroLayout.arrow.right !== undefined && {
              right: typeof heroLayout.arrow.right === 'number'
                ? `${heroLayout.arrow.right}px`
                : heroLayout.arrow.right,
            }),
            ...(heroLayout.arrow.bottom !== undefined && { bottom: `${heroLayout.arrow.bottom}px` }),
            ...(heroLayout.arrow.top !== undefined && { top: `${heroLayout.arrow.top}px` }),
          }}
          alt="Arrow"
          src="/white-arrow-alvion-1-6.png"
        />
        </div>
      </section>

      {/* Mission Section */}
      <section
        ref={sectionRef}
        className="w-full bg-white"
        style={{
          marginTop: '60px',
          paddingTop: '80px',
          paddingBottom: '159px',
          paddingLeft: `${missionLayout.marginLeft}px`,
          paddingRight: `${missionLayout.marginLeft}px`,
        }}
      >
        <ReadingText
          text="Mým cílem je pomoci vaší firmě vyniknout nad konkurencí díky profesionálním webovým stránkám a perfektnímu brandingu udělanému na míru."
          progress={scrollProgress}
          className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal"
          style={{
            fontSize: `${missionLayout.text.fontSize}px`,
            lineHeight: missionLayout.text.lineHeight,
            letterSpacing: `${missionLayout.text.letterSpacing}em`,
            marginBottom: `${missionLayout.text.marginBottom}px`,
          }}
        />

        <Button
          className="bg-black rounded-[40px]"
          style={{
            width: `${missionLayout.button.width}px`,
            height: `${missionLayout.button.height}px`,
          }}
          onClick={() => {
            navigate('/services');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white"
            style={{
              fontSize: `${missionLayout.button.fontSize}px`,
              letterSpacing: `${missionLayout.button.letterSpacing}em`,
              lineHeight: missionLayout.button.lineHeight,
            }}
          >
            Moje služby
          </span>
        </Button>
      </section>

      {/* Film Design Image */}
      <img
        className="w-full h-[215px] object-cover"
        alt="Film design"
        src={filmDesignUrl}
      />

      {/* Services Section */}
      <section
        ref={servicesRef as React.RefObject<HTMLElement>}
        className="relative w-full bg-black overflow-hidden"
        style={{
          height: breakpoint === 'sm' ? `${servicesLayout.height}px` : '100vh',
          minHeight: breakpoint === 'sm' ? `${servicesLayout.height}px` : '80vh',
        }}
      >
        {/* Background Image */}
        <img
          className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.4)]"
          alt="Services background"
          src="/home_page_pro_kazdou_sekci.png"
        />

        {breakpoint === 'sm' ? (
          <>
            <h2
              className={`absolute text-center z-10 [font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white tracking-[1.00px] transition-all duration-700 ease-out ${
                servicesVisible ? "translate-x-0 opacity-85" : "translate-x-16 opacity-0"
              }`}
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                top: servicesLayout.titleTop,
                fontSize: `${servicesLayout.titleFontSize}px`,
                width: typeof servicesLayout.titleWidth === 'string' ? servicesLayout.titleWidth : `${servicesLayout.titleWidth}px`,
              }}
            >
              Co vám můžu nabídnout?
            </h2>

            <div
              ref={service1Ref as React.RefObject<HTMLDivElement>}
              className={`absolute text-center z-10 cursor-pointer transition-all duration-[1200ms] ease-out ${
                service1Visible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
              }`}
              style={{
                left: '50%',
                transform: 'translateX(-50%)',
                top: servicesLayout.item1.top,
                ...(servicesLayout.item1.width && { width: `${servicesLayout.item1.width}px` }),
              }}
              onMouseEnter={() => setHoveredService(1)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => navigate('/services', { state: { serviceIndex: 0 } })}
        >
          <div
            className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.48px]"
            style={{
              fontSize: `${servicesLayout.item1.numberFontSize}px`,
              opacity: hoveredService === 1 ? 1 : 0.4,
              transition: hoveredService === 1 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
            }}
          >
            01
          </div>
          <div
            className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[1.04px]"
            style={{
              fontSize: `${servicesLayout.item1.titleFontSize}px`,
              ...(servicesLayout.item1.spacing !== undefined && { marginTop: `${servicesLayout.item1.spacing}px` }),
              opacity: hoveredService === 1 ? 1 : 0.4,
              transition: hoveredService === 1 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
            }}
          >
            {servicesLayout.item1.title}
          </div>
        </div>

        {/* Service Item 2 */}
        <div
          ref={service2Ref as React.RefObject<HTMLDivElement>}
          className={`absolute text-center z-10 cursor-pointer transition-all duration-[1200ms] ease-out ${
            service2Visible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
          }`}
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            top: servicesLayout.item2.top,
          }}
          onMouseEnter={() => setHoveredService(2)}
          onMouseLeave={() => setHoveredService(null)}
          onClick={() => navigate('/services', { state: { serviceIndex: 1 } })}
        >
          <div
            className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.48px]"
            style={{
              fontSize: `${servicesLayout.item2.numberFontSize}px`,
              opacity: hoveredService === 2 ? 1 : 0.4,
              transition: hoveredService === 2 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
            }}
          >
            02
          </div>
          <div
            className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[1.04px]"
            style={{
              fontSize: `${servicesLayout.item2.titleFontSize}px`,
              ...(servicesLayout.item2.spacing !== undefined && { marginTop: `${servicesLayout.item2.spacing}px` }),
              opacity: hoveredService === 2 ? 1 : 0.4,
              transition: hoveredService === 2 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
            }}
          >
            {servicesLayout.item2.title}
          </div>
        </div>

        {/* Service Item 3 */}
        <div
          ref={service3Ref as React.RefObject<HTMLDivElement>}
          className={`absolute text-center z-10 cursor-pointer transition-all duration-[1200ms] ease-out ${
            service3Visible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
          }`}
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            top: servicesLayout.item3.top,
          }}
          onMouseEnter={() => setHoveredService(3)}
          onMouseLeave={() => setHoveredService(null)}
          onClick={() => navigate('/services', { state: { serviceIndex: 2 } })}
        >
          <div
            className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.48px]"
            style={{
              fontSize: `${servicesLayout.item3.numberFontSize}px`,
              opacity: hoveredService === 3 ? 1 : 0.4,
              transition: hoveredService === 3 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
            }}
          >
            03
          </div>
          <div
            className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[1.04px]"
            style={{
              fontSize: `${servicesLayout.item3.titleFontSize}px`,
              ...(servicesLayout.item3.spacing !== undefined && { marginTop: `${servicesLayout.item3.spacing}px` }),
              opacity: hoveredService === 3 ? 1 : 0.4,
              transition: hoveredService === 3 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
            }}
          >
            {servicesLayout.item3.title}
          </div>
        </div>

        {/* Services Button */}
        <Button
          className="absolute bg-white rounded-[40px] hover:bg-gray-300 opacity-85 flex items-center justify-center z-10"
          style={{
            left: '50%',
            transform: 'translateX(-50%)',
            top: servicesLayout.button.top,
            width: `${servicesLayout.button.width}px`,
            height: `${servicesLayout.button.height}px`,
          }}
          onClick={() => {
            navigate("/services");
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
        >
          <span
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black"
            style={{
              fontSize: `${missionLayout.button.fontSize}px`,
              letterSpacing: `${missionLayout.button.letterSpacing}em`,
              lineHeight: missionLayout.button.lineHeight,
            }}
          >
            Moje služby
          </span>
        </Button>
          </>
        ) : (
          <>
            <div
              className={`absolute opacity-0 [font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white tracking-[0.1rem] whitespace-nowrap transition-all duration-700 ease-out ${
                servicesVisible ? "translate-x-0 opacity-90" : "translate-x-16 opacity-0"
              }`}
              style={{
                transitionDelay: '100ms',
                left: `${servicesLayout.titleLeft}px`,
                top: servicesLayout.titleTop,
                fontSize: `${servicesLayout.titleFontSize}px`,
                lineHeight: `${servicesLayout.titleFontSize * 1.3}px`,
              }}
            >
              Moje služby
            </div>

            <div
              ref={service1Ref as React.RefObject<HTMLDivElement>}
              className={`absolute cursor-pointer transition-all duration-[1200ms] ease-out ${
                service1Visible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
              }`}
              style={{
                left: `${servicesLayout.item1.left}px`,
                top: servicesLayout.item1.top,
              }}
              onMouseEnter={() => setHoveredService(1)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => navigate('/services', { state: { serviceIndex: 0 } })}
            >
              <div className="flex items-center gap-[clamp(1rem,2vw,2rem)]">
                <div
                  className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.03rem]"
                  style={{
                    fontSize: `${servicesLayout.item1.numberFontSize}px`,
                    opacity: hoveredService === 1 ? 1 : 0.4,
                    transition: hoveredService === 1 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
                  }}
                >
                  01
                </div>
                <div
                  className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.07rem] whitespace-nowrap"
                  style={{
                    fontSize: `${servicesLayout.item1.titleFontSize}px`,
                    opacity: hoveredService === 1 ? 1 : 0.4,
                    transform: hoveredService === 1 ? 'translateX(8px)' : 'translateX(0)',
                    transition: hoveredService === 1 ? 'all 1s ease-out' : 'all 1.2s ease-out'
                  }}
                >
                  {servicesLayout.item1.title}
                </div>
              </div>
              {servicesLayout.item1.lineWidth && (
                <div className="absolute left-0 mt-[clamp(1.2rem,2vh,1.5rem)]" style={{ width: typeof servicesLayout.item1.lineWidth === 'string' ? servicesLayout.item1.lineWidth : `${servicesLayout.item1.lineWidth}px` }}>
                  <div
                    className="w-full h-[1px] border-t border-white"
                    style={{
                      opacity: hoveredService === 1 ? 0.6 : 0.4,
                      transition: hoveredService === 1 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
                    }}
                  />
                </div>
              )}
            </div>

            <div
              ref={service2Ref as React.RefObject<HTMLDivElement>}
              className={`absolute cursor-pointer transition-all duration-[1200ms] ease-out ${
                service2Visible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
              }`}
              style={{
                left: `${servicesLayout.item2.left}px`,
                top: servicesLayout.item2.top,
              }}
              onMouseEnter={() => setHoveredService(2)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => navigate('/services', { state: { serviceIndex: 1 } })}
            >
              <div className="flex items-center gap-[clamp(1rem,2vw,2rem)]">
                <div
                  className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.03rem]"
                  style={{
                    fontSize: `${servicesLayout.item2.numberFontSize}px`,
                    opacity: hoveredService === 2 ? 1 : 0.4,
                    transition: hoveredService === 2 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
                  }}
                >
                  02
                </div>
                <div
                  className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.07rem]"
                  style={{
                    fontSize: `${servicesLayout.item2.titleFontSize}px`,
                    opacity: hoveredService === 2 ? 1 : 0.4,
                    transform: hoveredService === 2 ? 'translateX(8px)' : 'translateX(0)',
                    transition: hoveredService === 2 ? 'all 1s ease-out' : 'all 1.2s ease-out'
                  }}
                >
                  {servicesLayout.item2.title}
                </div>
              </div>
              {servicesLayout.item2.lineWidth && (
                <div className="absolute left-0 mt-[clamp(1.2rem,2vh,1.5rem)]" style={{ width: typeof servicesLayout.item2.lineWidth === 'string' ? servicesLayout.item2.lineWidth : `${servicesLayout.item2.lineWidth}px` }}>
                  <div
                    className="w-full h-[1px] border-t border-white"
                    style={{
                      opacity: hoveredService === 2 ? 0.6 : 0.4,
                      transition: hoveredService === 2 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
                    }}
                  />
                </div>
              )}
            </div>

            <div
              ref={service3Ref as React.RefObject<HTMLDivElement>}
              className={`absolute cursor-pointer transition-all duration-[1200ms] ease-out ${
                service3Visible ? "translate-x-0 opacity-100" : "translate-x-16 opacity-0"
              }`}
              style={{
                left: `${servicesLayout.item3.left}px`,
                top: servicesLayout.item3.top,
              }}
              onMouseEnter={() => setHoveredService(3)}
              onMouseLeave={() => setHoveredService(null)}
              onClick={() => navigate('/services', { state: { serviceIndex: 2 } })}
            >
              <div className="flex items-center gap-[clamp(1rem,2vw,2rem)]">
                <div
                  className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.03rem]"
                  style={{
                    fontSize: `${servicesLayout.item3.numberFontSize}px`,
                    opacity: hoveredService === 3 ? 1 : 0.4,
                    transition: hoveredService === 3 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
                  }}
                >
                  03
                </div>
                <div
                  className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.07rem]"
                  style={{
                    fontSize: `${servicesLayout.item3.titleFontSize}px`,
                    opacity: hoveredService === 3 ? 1 : 0.4,
                    transform: hoveredService === 3 ? 'translateX(8px)' : 'translateX(0)',
                    transition: hoveredService === 3 ? 'all 1s ease-out' : 'all 1.2s ease-out'
                  }}
                >
                  {servicesLayout.item3.title}
                </div>
              </div>
              {servicesLayout.item3.lineWidth && (
                <div className="absolute left-0 mt-[clamp(1.2rem,2vh,1.5rem)]" style={{ width: typeof servicesLayout.item3.lineWidth === 'string' ? servicesLayout.item3.lineWidth : `${servicesLayout.item3.lineWidth}px` }}>
                  <div
                    className="w-full h-[1px] border-t border-white"
                    style={{
                      opacity: hoveredService === 3 ? 0.6 : 0.4,
                      transition: hoveredService === 3 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
                    }}
                  />
                </div>
              )}
            </div>

            <Button
              className="absolute bg-white rounded-[2rem] hover:bg-gray-300 opacity-90"
              style={{
                left: `${servicesLayout.button.left}px`,
                top: servicesLayout.button.top,
                width: `${servicesLayout.button.width}px`,
                height: `${servicesLayout.button.height}px`,
              }}
              onClick={() => {
                navigate("/services");
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            >
              <span
                className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.04rem]"
                style={{
                  fontSize: 'clamp(0.75rem,1.5vw,0.9rem)',
                  lineHeight: 'clamp(1rem,2vw,1.2rem)',
                }}
              >
                Moje služby
              </span>
            </Button>
          </>
        )}
      </section>

      {/* References Section */}
      <section
        ref={referencesRef as React.RefObject<HTMLElement>}
        className="relative w-full"
        style={{
          paddingTop: breakpoint === 'sm' ? 'clamp(7rem,10vh,9rem)' : 'clamp(9rem,12vh,12rem)',
          paddingBottom: breakpoint === 'sm' ? 'clamp(7rem,10vh,9rem)' : 'clamp(9rem,12vh,12rem)',
        }}
      >
        <div
          className="opacity-90 w-full text-center"
          style={{
            marginBottom: `${referencesLayout.titleMarginBottom}px`,
            paddingLeft: '20px',
            paddingRight: '20px',
          }}
        >
          {"Výběr z mých referencí".split(' ').map((word, index) => (
            <span
              key={index}
              className="[font-family:'Halyard_Display-SemiBold',Helvetica] font-semibold tracking-[0.08rem] inline-block"
              style={{
                fontSize: `${referencesLayout.titleFontSize}px`,
                lineHeight: `${typeof referencesLayout.titleFontSize === 'number' ? referencesLayout.titleFontSize * 1.2 : '1.2em'}px`,
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

        <div
          className="w-full space-y-[clamp(2rem,3vh,2.5rem)]"
          style={{
            paddingLeft: breakpoint === 'sm' ? '20px' : '40px',
            paddingRight: breakpoint === 'sm' ? '20px' : '40px',
          }}
        >
          {references.map((reference) => {
            const isOpen = openReferenceCard === reference.id;

            return (
              <div
                key={reference.id}
                onClick={(e) => handleCardClick(reference.id, e)}
                className={`
                  w-full bg-white rounded-[1.5rem] shadow-[0px_0px_12.1px_2px_rgba(0,0,0,0.25)]
                  overflow-hidden cursor-pointer relative
                  transition-all duration-700 ease-in-out
                  ${isOpen
                    ? (breakpoint === 'sm' ? 'h-[clamp(50rem,75vh,60rem)]' : 'h-[clamp(45rem,80vh,55rem)]')
                    : (breakpoint === 'sm' ? 'h-[clamp(10rem,16vh,13rem)]' : 'h-[clamp(12rem,18vh,15rem)]')
                  }
                `}
              >
                {isOpen ? (
                  <div className={`w-full h-full flex ${breakpoint === 'mdPlus' ? 'flex-row' : 'flex-col'}`}>
                    <div
                      className="flex-1 flex flex-col justify-center"
                      style={{
                        paddingTop: breakpoint === 'mdPlus' ? 'clamp(2rem,5vw,5rem)' : (breakpoint === 'sm' ? 'clamp(2.5rem,5vh,3rem)' : 'clamp(3rem,5.5vh,3.8rem)'),
                        paddingLeft: typeof referencesLayout.openCardLeftPadding === 'string'
                          ? referencesLayout.openCardLeftPadding
                          : `${referencesLayout.openCardLeftPadding}px`,
                        paddingRight: breakpoint === 'mdPlus' ? 'clamp(2rem,5vw,5rem)' : (typeof referencesLayout.openCardLeftPadding === 'string'
                          ? referencesLayout.openCardLeftPadding
                          : `${referencesLayout.openCardLeftPadding}px`),
                        paddingBottom: breakpoint === 'mdPlus' ? 'clamp(2rem,5vw,5rem)' : (breakpoint === 'sm' ? 'clamp(1.8rem,3.5vh,2.3rem)' : 'clamp(2rem,4vh,2.8rem)'),
                      }}
                    >
                      <div className="w-full">
                        <h3
                          className={`
                            ${reference.gradient} bg-clip-text text-transparent
                            [font-family:'Halyard_Display-SemiBold',Helvetica] font-semibold
                            tracking-[0.05rem]
                          `}
                          style={{
                            fontSize: breakpoint === 'sm' ? 'clamp(1.6rem,4.5vw,2rem)' : 'clamp(1.9rem,3.8vw,2.3rem)',
                            lineHeight: breakpoint === 'sm' ? 'clamp(2rem,5.5vw,2.5rem)' : 'clamp(2.3rem,4.6vw,2.8rem)',
                            marginBottom: breakpoint === 'sm' ? 'clamp(1.8rem,3.5vh,2.3rem)' : 'clamp(2.2rem,4vh,2.8rem)',
                          }}
                        >
                          {reference.title}
                        </h3>

                        <div>
                          <div
                            style={{
                              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,4.5vh,3.2rem)',
                            }}
                          >
                            <h4
                              className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium tracking-[0.05rem]"
                              style={{
                                fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.5vw,1.15rem)' : 'clamp(1.05rem,2vw,1.25rem)',
                                lineHeight: breakpoint === 'sm' ? 'clamp(1.3rem,3.2vw,1.5rem)' : 'clamp(1.4rem,2.6vw,1.7rem)',
                                marginBottom: breakpoint === 'sm' ? 'clamp(0.7rem,1.5vh,1rem)' : 'clamp(0.9rem,1.8vh,1.2rem)',
                                color: reference.gradient.includes('5C5300') ? '#D9C401' :
                                       reference.gradient.includes('003D5C') ? '#00A3CC' :
                                       reference.gradient.includes('2C2C2C') ? '#6B6B6B' : '#CC6600',
                              }}
                            >
                              Tvorba
                            </h4>
                            <p
                              className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
                              style={{
                                fontSize: breakpoint === 'sm' ? 'clamp(1.1rem,3vw,1.4rem)' : 'clamp(1.25rem,2.4vw,1.55rem)',
                                lineHeight: breakpoint === 'sm' ? 'clamp(1.55rem,4vw,1.95rem)' : 'clamp(1.75rem,3.2vw,2.15rem)',
                              }}
                            >
                              {reference.tvorbaText}
                            </p>
                          </div>

                          <div
                            style={{
                              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,4.5vh,3.2rem)',
                            }}
                          >
                            <h4
                              className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium tracking-[0.05rem]"
                              style={{
                                fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.5vw,1.15rem)' : 'clamp(1.05rem,2vw,1.25rem)',
                                lineHeight: breakpoint === 'sm' ? 'clamp(1.3rem,3.2vw,1.5rem)' : 'clamp(1.4rem,2.6vw,1.7rem)',
                                marginBottom: breakpoint === 'sm' ? 'clamp(0.7rem,1.5vh,1rem)' : 'clamp(0.9rem,1.8vh,1.2rem)',
                                color: reference.gradient.includes('5C5300') ? '#D9C401' :
                                       reference.gradient.includes('003D5C') ? '#00A3CC' :
                                       reference.gradient.includes('2C2C2C') ? '#6B6B6B' : '#CC6600',
                              }}
                            >
                              Jak?
                            </h4>
                            <p
                              className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-black tracking-[0.03rem]"
                              style={{
                                fontSize: breakpoint === 'sm' ? 'clamp(1.05rem,2.8vw,1.3rem)' : 'clamp(1.15rem,2.2vw,1.4rem)',
                                lineHeight: breakpoint === 'sm' ? 'clamp(1.5rem,3.8vw,1.85rem)' : 'clamp(1.65rem,3vw,2rem)',
                              }}
                            >
                              {reference.jakText}
                            </p>
                          </div>
                        </div>

                        <div
                          className="flex gap-[clamp(0.5rem,1.3vw,0.8rem)] flex-wrap"
                          style={{
                            marginTop: `${referencesLayout[reference.id]?.tagMarginTop || (breakpoint === 'sm' ? 22 : 28)}px`
                          }}
                        >
                          {reference.tags.map((tag, index) => (
                            <div
                              key={index}
                              className="px-[clamp(1rem,1.5vw,1.4rem)] bg-white rounded-[1.5rem] border border-black flex items-center justify-center"
                              style={{
                                height: breakpoint === 'sm' ? 'clamp(1.8rem,2.3vw,2.1rem)' : 'clamp(2rem,2.5vw,2.3rem)',
                              }}
                            >
                              <span
                                className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem] whitespace-nowrap"
                                style={{
                                  fontSize: breakpoint === 'sm' ? 'clamp(0.75rem,1.05vw,0.9rem)' : 'clamp(0.85rem,1.15vw,0.95rem)',
                                }}
                              >
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
                      className={`relative block hover:opacity-90 transition-opacity ${breakpoint === 'mdPlus' ? 'w-[45%]' : 'w-full'}`}
                      style={{
                        height: breakpoint === 'mdPlus' ? '100%' : (breakpoint === 'sm' ? '45%' : '48%'),
                      }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <img
                        className={`w-full h-full object-cover ${breakpoint === 'mdPlus' ? 'rounded-[0_1.2rem_1.2rem_0]' : 'rounded-[0_0_1.2rem_1.2rem]'}`}
                        alt={reference.title}
                        src={reference.openImage}
                      />
                      <img
                        className="absolute object-cover transform rotate-[-125deg]"
                        style={{
                          width: breakpoint === 'sm' ? 'clamp(2rem,3.5vw,2.8rem)' : 'clamp(2.5rem,4vw,3.2rem)',
                          height: breakpoint === 'sm' ? 'clamp(2rem,3.5vw,2.8rem)' : 'clamp(2.5rem,4vw,3.2rem)',
                          right: breakpoint === 'sm' ? 'clamp(1rem,2.5vw,2rem)' : 'clamp(1.5rem,3vw,2.3rem)',
                          bottom: breakpoint === 'sm' ? 'clamp(1rem,2.5vw,2rem)' : 'clamp(1.5rem,3vw,2.3rem)',
                        }}
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
                      <h3
                        className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white tracking-[0.05rem]"
                        style={{
                          fontSize: breakpoint === 'sm' ? 'clamp(0.9rem,2.2vw,1.3rem)' : 'clamp(1.4rem,2.3vw,1.8rem)',
                          lineHeight: breakpoint === 'sm' ? 'clamp(1.4rem,2.6vw,1.9rem)' : 'clamp(1.7rem,2.8vw,2.2rem)',
                        }}
                      >
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

      {/* Why Choose Section */}
      <section ref={whyChooseRef as React.RefObject<HTMLElement>} className="relative w-full bg-black" style={{ minHeight: `${whyChooseLayout.height}px`, paddingTop: toStyleValue(whyChooseLayout.paddingTop), paddingBottom: toStyleValue(whyChooseLayout.paddingBottom) }}>
        {breakpoint !== 'sm' ? (
          <>
            {/* Desktop-style layout for md and mdPlus */}
            <h2
              className="font-halyard-display font-semibold text-white tracking-wide opacity-90"
              style={{
                fontSize: `${whyChooseLayout.titleFontSize}px`,
                marginLeft: `${whyChooseLayout.titleLeft}px`,
                marginBottom: toStyleValue(whyChooseLayout.titleMarginBottom)
              }}
            >
              {"Proč si vybrat moje služby?".split(' ').map((word, index) => (
                <span
                  key={index}
                  className="inline-block"
                  style={{
                    animation: whyChooseVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                    animationDelay: whyChooseVisible ? `${index * 0.15}s` : '0s',
                    opacity: 0,
                    marginRight: index < 4 ? '0.25em' : '0'
                  }}
                >
                  {word}
                </span>
              ))}
            </h2>

            <div className="relative overflow-hidden" style={{ minHeight: toStyleValue(whyChooseLayout.containerMinHeight) }}>
              <div
                key={`number-${currentCarouselIndex}`}
                className="absolute font-halyard-display font-bold text-white/20"
                style={{
                  fontSize: toStyleValue(whyChooseLayout.numberFontSize),
                  left: `${whyChooseLayout.numberLeft}px`,
                  top: toStyleValue(whyChooseLayout.numberTop),
                  lineHeight: '1',
                  transition: 'transform 700ms ease-in-out',
                  transform: isCarouselAnimating ? 'translateX(-150%)' : 'translateX(0)',
                }}
              >
                {currentCarouselItem.number}
              </div>

              {isCarouselAnimating && (
                <div
                  key={`number-${nextCarouselIndex}`}
                  className="absolute font-halyard-display font-bold text-white/20"
                  style={{
                    fontSize: toStyleValue(whyChooseLayout.numberFontSize),
                    left: `${whyChooseLayout.numberLeft}px`,
                    top: toStyleValue(whyChooseLayout.numberTop),
                    lineHeight: '1',
                    transform: 'translateX(150%)',
                    animation: 'slideInFromRight 700ms ease-in-out forwards',
                  }}
                >
                  {nextCarouselItem.number}
                </div>
              )}

              <div
                key={`content-${currentCarouselIndex}`}
                className="absolute"
                style={{
                  left: toStyleValue(whyChooseLayout.contentLeft),
                  top: toStyleValue(whyChooseLayout.contentTop),
                  right: `calc(${whyChooseLayout.arrowRight} + ${whyChooseLayout.arrowSize}px + 40px)`,
                  transition: 'transform 700ms ease-in-out',
                  transform: isCarouselAnimating ? 'translateX(-150%)' : 'translateX(0)',
                }}
              >
                <h3
                  className="font-halyard-display font-semibold text-white tracking-wide"
                  style={{
                    fontSize: `${whyChooseLayout.contentTitleFontSize}px`,
                    marginBottom: `${whyChooseLayout.contentTitleMarginBottom}px`,
                  }}
                >
                  {currentCarouselItem.title}
                </h3>
                <p
                  className="font-halyard-display font-light text-white/80 tracking-wide"
                  style={{
                    fontSize: toStyleValue(whyChooseLayout.contentDescFontSize),
                    lineHeight: whyChooseLayout.contentLineHeight,
                    maxWidth: '600px',
                  }}
                >
                  {currentCarouselItem.description}
                </p>
              </div>

              {isCarouselAnimating && (
                <div
                  key={`content-${nextCarouselIndex}`}
                  className="absolute"
                  style={{
                    left: toStyleValue(whyChooseLayout.contentLeft),
                    top: toStyleValue(whyChooseLayout.contentTop),
                    right: `calc(${whyChooseLayout.arrowRight} + ${whyChooseLayout.arrowSize}px + 40px)`,
                    transform: 'translateX(150%)',
                    animation: 'slideInFromRight 700ms ease-in-out forwards',
                  }}
                >
                  <h3
                    className="font-halyard-display font-semibold text-white tracking-wide"
                    style={{
                      fontSize: `${whyChooseLayout.contentTitleFontSize}px`,
                      marginBottom: `${whyChooseLayout.contentTitleMarginBottom}px`,
                    }}
                  >
                    {nextCarouselItem.title}
                  </h3>
                  <p
                    className="font-halyard-display font-light text-white/80 tracking-wide"
                    style={{
                      fontSize: toStyleValue(whyChooseLayout.contentDescFontSize),
                      lineHeight: whyChooseLayout.contentLineHeight,
                      maxWidth: '600px',
                    }}
                  >
                    {nextCarouselItem.description}
                  </p>
                </div>
              )}

              <button
                onClick={handleCarouselNext}
                disabled={isCarouselAnimating}
                className="absolute group transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                style={{
                  right: whyChooseLayout.arrowRight,
                  top: toStyleValue(whyChooseLayout.arrowTop),
                  width: `${whyChooseLayout.arrowSize}px`,
                  height: `${whyChooseLayout.arrowSize}px`,
                }}
                aria-label="Next item"
              >
                <svg
                  width="100%"
                  height="100%"
                  viewBox="0 0 26 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="transition-all duration-300 group-hover:translate-x-2"
                >
                  <path
                    d="M4 12H22M22 12L14 5M22 12L14 19"
                    stroke="white"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            <SponsorLogos />
          </>
        ) : (
          <>
            {/* Mobile-centered layout for sm */}
            <div className="relative w-full bg-black flex flex-col items-center justify-between" style={{ minHeight: `${whyChooseLayout.height}px` }}>
              <h2
                className="[font-family:'Halyard_Display-SemiBold',Helvetica] font-semibold text-white tracking-[1.20px] opacity-90 text-center"
                style={{
                  fontSize: `${whyChooseLayout.titleFontSize}px`,
                  lineHeight: `${whyChooseLayout.titleFontSize}px`,
                  marginBottom: toStyleValue(whyChooseLayout.titleMarginBottom),
                  maxWidth: toStyleValue(whyChooseLayout.titleMaxWidth),
                }}
              >
                {"Proč si vybrat moje služby?".split(' ').map((word, index) => (
                  <span
                    key={index}
                    className="inline-block"
                    style={{
                      animation: whyChooseVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                      animationDelay: whyChooseVisible ? `${index * 0.15}s` : '0s',
                      opacity: 0,
                      color: index < 3 ? '#FFFFFF' : '#AEAEAE',
                      marginRight: index < 4 ? '0.25em' : '0'
                    }}
                  >
                    {word}
                  </span>
                ))}
              </h2>

              <div
                className="relative w-full flex flex-col items-center overflow-hidden"
                style={{
                  maxWidth: toStyleValue(whyChooseLayout.containerMaxWidth),
                  paddingLeft: '20px',
                  paddingRight: '20px',
                  marginBottom: breakpoint === 'sm' ? '40px' : '50px',
                  minHeight: toStyleValue(whyChooseLayout.containerMinHeight),
                }}
              >
                <div
                  key={`number-${currentCarouselIndex}`}
                  className="absolute text-center [font-family:'Halyard_Display-Book',Helvetica] font-normal text-white"
                  style={{
                    fontSize: `${whyChooseLayout.numberFontSize}px`,
                    letterSpacing: '0.92px',
                    lineHeight: '24.15px',
                    top: toStyleValue(whyChooseLayout.numberTop),
                    left: '50%',
                    opacity: 0.72,
                    transition: 'transform 700ms ease-in-out',
                    transform: isCarouselAnimating
                      ? (carouselDirection === 'next' ? 'translateX(-200%)' : 'translateX(200%)')
                      : 'translateX(-50%)',
                  }}
                >
                  {currentCarouselItem.number}
                </div>

                {isCarouselAnimating && (
                  <div
                    key={`number-${nextCarouselIndex}`}
                    className="absolute text-center [font-family:'Halyard_Display-Book',Helvetica] font-normal text-white"
                    style={{
                      fontSize: `${whyChooseLayout.numberFontSize}px`,
                      letterSpacing: '0.92px',
                      lineHeight: '24.15px',
                      top: toStyleValue(whyChooseLayout.numberTop),
                      left: '50%',
                      opacity: 0.72,
                      transform: carouselDirection === 'next' ? 'translateX(200%)' : 'translateX(-200%)',
                      animation: carouselDirection === 'next'
                        ? 'slideInFromRightMobileNumber 700ms ease-in-out forwards'
                        : 'slideInFromLeftMobileNumber 700ms ease-in-out forwards',
                    }}
                  >
                    {nextCarouselItem.number}
                  </div>
                )}

                <div
                  key={`content-${currentCarouselIndex}`}
                  className="absolute text-center w-full"
                  style={{
                    top: toStyleValue(whyChooseLayout.contentTop),
                    left: '0',
                    padding: '0 20px',
                    transition: 'transform 700ms ease-in-out',
                    transform: isCarouselAnimating
                      ? (carouselDirection === 'next' ? 'translateX(-200%)' : 'translateX(200%)')
                      : 'translateX(0)',
                  }}
                >
                  <h3
                    className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white"
                    style={{
                      fontSize: `${whyChooseLayout.contentTitleFontSize}px`,
                      letterSpacing: '1.20px',
                      lineHeight: '35.10px',
                      marginBottom: `${whyChooseLayout.contentTitleMarginBottom}px`,
                      opacity: 0.85,
                    }}
                  >
                    {currentCarouselItem.title}
                  </h3>

                  <p
                    className="[font-family:'Halyard_Display-Book',Helvetica] text-white"
                    style={{
                      fontSize: `${whyChooseLayout.contentDescFontSize}px`,
                      letterSpacing: '0.80px',
                      lineHeight: `${whyChooseLayout.contentLineHeight}`,
                      maxWidth: '100%',
                      fontWeight: 300,
                      opacity: 0.8,
                    }}
                  >
                    {currentCarouselItem.description}
                  </p>
                </div>

                {isCarouselAnimating && (
                  <div
                    key={`content-${nextCarouselIndex}`}
                    className="absolute text-center w-full"
                    style={{
                      top: toStyleValue(whyChooseLayout.contentTop),
                      left: '0',
                      padding: '0 20px',
                      transform: carouselDirection === 'next' ? 'translateX(200%)' : 'translateX(-200%)',
                      animation: carouselDirection === 'next'
                        ? 'slideInFromRightMobile 700ms ease-in-out forwards'
                        : 'slideInFromLeftMobile 700ms ease-in-out forwards',
                    }}
                  >
                    <h3
                      className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white"
                      style={{
                        fontSize: `${whyChooseLayout.contentTitleFontSize}px`,
                        letterSpacing: '1.20px',
                        lineHeight: '35.10px',
                        marginBottom: `${whyChooseLayout.contentTitleMarginBottom}px`,
                        opacity: 0.85,
                      }}
                    >
                      {nextCarouselItem.title}
                    </h3>

                    <p
                      className="[font-family:'Halyard_Display-Book',Helvetica] text-white"
                      style={{
                        fontSize: `${whyChooseLayout.contentDescFontSize}px`,
                        letterSpacing: '0.80px',
                        lineHeight: `${whyChooseLayout.contentLineHeight}`,
                        maxWidth: '100%',
                        fontWeight: 300,
                        opacity: 0.8,
                      }}
                    >
                      {nextCarouselItem.description}
                    </p>
                  </div>
                )}

                <div
                  className="absolute flex gap-8 items-center justify-center"
                  style={{
                    bottom: '0',
                    left: '50%',
                    transform: 'translateX(-50%)',
                  }}
                >
                  <button
                    onClick={handleCarouselPrev}
                    disabled={isCarouselAnimating}
                    className="group transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      width: `${whyChooseLayout.arrowSize}px`,
                      height: `${whyChooseLayout.arrowSize}px`,
                    }}
                    aria-label="Previous item"
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 26 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-all duration-300 group-hover:-translate-x-2"
                    >
                      <path
                        d="M22 12H4M4 12L12 19M4 12L12 5"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>

                  <button
                    onClick={handleCarouselNext}
                    disabled={isCarouselAnimating}
                    className="group transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                    style={{
                      width: `${whyChooseLayout.arrowSize}px`,
                      height: `${whyChooseLayout.arrowSize}px`,
                    }}
                    aria-label="Next item"
                  >
                    <svg
                      width="100%"
                      height="100%"
                      viewBox="0 0 26 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="transition-all duration-300 group-hover:translate-x-2"
                    >
                      <path
                        d="M4 12H22M22 12L14 5M22 12L14 19"
                        stroke="white"
                        strokeWidth="1"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div
                className="w-full relative"
                style={{
                  height: breakpoint === 'sm' ? '130px' : '150px',
                  overflow: 'hidden',
                }}
              >
                <div className="absolute left-0 w-full" style={{ bottom: '0px' }}>
                  <div
                    className="relative flex items-center"
                    style={{
                      height: breakpoint === 'sm' ? '130px' : '150px',
                    }}
                  >
                    <div className="flex animate-scroll-left">
                      {[...Array(3)].map((_, groupIndex) => (
                        <div key={groupIndex} className="flex">
                          {[
                            { name: "Pinterest", src: "/Sponsor - Pinterest.png" },
                            { name: "Supabase", src: "/Sponsor - Supabase.png" },
                            { name: "Elektrika", src: "/Sponsor - Elektrika.png" },
                            { name: "Raška", src: "/Sponsor - Raska.png" },
                            { name: "Spilar", src: "/Sponsor - Spilar.png" },
                            { name: "Štorek", src: "/Sponsor - Storek.png" },
                          ].map((logo, index) => (
                            <div
                              key={`${groupIndex}-${index}`}
                              className="flex items-center justify-center opacity-100 transition-opacity duration-300 flex-shrink-0"
                              style={{
                                width: breakpoint === 'sm' ? '150px' : '170px',
                                height: breakpoint === 'sm' ? '90px' : '105px',
                                marginLeft: breakpoint === 'sm' ? '-5px' : '-3px',
                                marginRight: breakpoint === 'sm' ? '-5px' : '-3px',
                              }}
                            >
                              <img
                                src={logo.src}
                                alt={logo.name}
                                className="max-h-full max-w-full object-contain"
                              />
                            </div>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </section>

      {/* Film Coding Image */}
      <img
        className="w-full object-cover"
        style={{ height: '215px' }}
        alt="Film coding"
        src={filmCodingUrl}
      />

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

      {/* Final Footer Contact Section */}
      <section ref={footerRef as React.RefObject<HTMLElement>} className={`w-full box-border flex justify-center items-center ${breakpoint === 'sm' ? 'p-[10px] h-[100vh]' : 'p-[15px]'}`}>
        {breakpoint === 'sm' ? (
          /* New centered sm layout - similar to hero section */
          <div className="relative w-full h-full">
            {/* Black background box */}
            <div className="absolute bg-black rounded-[40px] inset-0" />

            {/* Shadow decoration */}
            <img
              className="absolute object-cover z-30"
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

            {/* Floating image */}
            <img
              className="absolute z-20 floating-image-mobile-sm"
              style={{
                width: `${heroLayout.floatingImage.width}px`,
                height: `${heroLayout.floatingImage.height}px`,
                left: '50%',
                transform: 'translateX(-50%)',
                top: `${heroLayout.floatingImage.top}px`,
                maxWidth: `${heroLayout.floatingImage.width}px`,
                maxHeight: `${heroLayout.floatingImage.height}px`,
                flexShrink: 0,
                opacity: heroLayout.floatingImage.opacity,
              }}
              alt="Side decoration"
              src="https://i.imgur.com/Hz4xcKj.png"
            />

            {/* Content container - centered */}
            <div className="relative z-40 flex flex-col items-center justify-start h-full pt-[60px]">
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
                className="opacity-90 text-center [font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white tracking-[0.03rem]"
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
        ) : (
          /* Desktop-style layout for md and mdPlus */
          <div
            className="relative w-full rounded-[40px] overflow-hidden"
            style={{
              height: `${footerLayout.height}px`,
            }}
          >
            {/* Background Image */}
            <img
              className="absolute w-full h-full object-cover rounded-[40px] [filter:brightness(0.7)]"
              alt="Footer background"
              src={backgroundUrl}
            />

            {/* Background Logo */}
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
                  marginBottom: `${footerLayout.contactItemMarginBottom || 7}px`,
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
                  marginBottom: `${footerLayout.contactSectionMarginBottom || 36}px`,
                  lineHeight: footerLayout.contactLineHeight,
                }}
              >
                info@alvion.net
              </a>

              {/* IČ */}
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
                Copyright © {currentYear} – Alvion<br />All rights reserved.
              </div>
            </div>
          </div>
        )}
      </section>
      </div>
  );
};