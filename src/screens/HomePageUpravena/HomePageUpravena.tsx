import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { SponsorLogos } from "../../components/SponsorLogos";
import { Navbar } from "../../components/Navbar";
import { AlvionLogo } from "../../components/AlvionLogo";
import { MobileHomePageUpravena } from "./MobileHomePageUpravena";
import { ReadingText } from "../../components/ReadingText";
import { useReadingEffect } from "../../hooks/useReadingEffect";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import { useWebsiteImages } from "../../hooks/useWebsiteImages";
import { breakpoints } from "../../config/breakpoints";
import { toStyleValue } from "../../lib/styleUtils";
import "../../styles/responsive-image.css";

export const HomePageUpravena = (): JSX.Element => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
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
  const { isVisible: whyChooseVisible, elementRef: whyChooseRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: false,
  });
  const { isVisible: referencesVisible, elementRef: referencesRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: false,
  });
  const { isVisible: footerVisible, elementRef: footerRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: false,
  });
  const { isVisible: contactVisible, elementRef: contactRef } = useScrollTrigger({
    threshold: 0.2,
    triggerOnce: false,
  });
  const { breakpoint, layout, getResponsiveValue } = useResponsiveLayout();
  const { backgroundUrl, filmDesignUrl, filmCodingUrl, referenceImages } = useWebsiteImages();

  const headerLayout = getResponsiveValue(layout.header);
  const heroLayout = getResponsiveValue(layout.hero);
  const missionLayout = getResponsiveValue(layout.mission);
  const servicesLayout = getResponsiveValue(layout.services);
  const whyChooseLayout = getResponsiveValue(layout.whyChoose);
  const referencesLayout = getResponsiveValue(layout.references);
  const footerLayout = getResponsiveValue(layout.footer);

  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [openReferenceCard, setOpenReferenceCard] = useState<string>("elektrika");
  const [currentCarouselIndex, setCurrentCarouselIndex] = useState(0);
  const [isCarouselAnimating, setIsCarouselAnimating] = useState(false);

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
    setIsCarouselAnimating(true);
    setTimeout(() => {
      setCurrentCarouselIndex((prev) => (prev + 1) % carouselData.length);
      setIsCarouselAnimating(false);
    }, 700);
  };

  const currentCarouselItem = carouselData[currentCarouselIndex];
  const nextCarouselIndex = (currentCarouselIndex + 1) % carouselData.length;
  const nextCarouselItem = carouselData[nextCarouselIndex];

  const handleCardClick = (cardId: string, event: React.MouseEvent<HTMLDivElement>) => {
    const cardElement = event.currentTarget;
    setOpenReferenceCard(cardId);

    setTimeout(() => {
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

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < breakpoints.tablet);
    };
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  if (isMobile) {
    return <MobileHomePageUpravena />;
  }

  return (
    <div className="bg-white flex flex-col items-center w-screen overflow-hidden">
      <div className="bg-white w-full flex flex-col relative">
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
        {/* Hero Section */}
        <section className="relative w-full min-h-[100vh]">
          {/* Navigation */}
          <nav className="fixed top-5 right-[15vw] flex items-center justify-end px-4 py-4 h-[clamp(8rem,10vh,10rem)] z-[100]">
            <div className="flex items-center">
              <Navbar variant="desktop" />
            </div>
          </nav>

          <div className="responsive-image-container">
            <div className="responsive-image-wrapper">
              <img
                className="responsive-image [filter:brightness(0.7)]"
                alt="Background"
                src={backgroundUrl}
              />
              {/* Side Decoration */}
              <img
                src="https://i.imgur.com/Hz4xcKj.png"
                alt="Side decoration"
                className={`absolute -translate-y-1/2 w-auto object-contain z-10 floating-image transition-all duration-1200 ease-out ${
                  isLoaded ? "" : "opacity-0"
                }`}
                style={{
                  top: heroLayout.floatingImage.top,
                  right: `${heroLayout.floatingImage.right}px`,
                  maxHeight: heroLayout.floatingImage.maxHeight,
                  opacity: isLoaded ? heroLayout.floatingImage.opacity : 0,
                }}
              />
              {/* Hero Content */}
              <div
                ref={heroRef}
                className={`absolute -translate-y-1/2 flex flex-col transition-all duration-1000 ease-out ${
                  isLoaded ? "translate-y-[-50%] opacity-100" : "translate-y-[-40%] opacity-0"
                }`}
                style={{
                  top: `${heroLayout.top}px`,
                  left: `${heroLayout.left}px`,
                }}
              >
                <div
                  className="[font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.2rem] mb-0"
                  style={{
                    fontSize: `${heroLayout.title.fontSize}px`,
                    lineHeight: `${heroLayout.title.fontSize * 1.3}px`,
                    maxWidth: toStyleValue(heroLayout.title.width),
                  }}
                >
                  {"Weby, Aplikace a Design".split(' ').map((word, index) => (
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
                  <div
                    className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[0.05rem] -translate-x-[-0.5rem]"
                    style={{
                      fontSize: `${heroLayout.subtitle.fontSize}px`,
                      lineHeight: `${heroLayout.subtitle.fontSize * 1.2}px`,
                      marginTop: `${heroLayout.subtitle.marginTop}px`,
                    }}
                  >
                    {"Designový partner pro růst vaší firmy.".split(' ').map((word, index) => (
                      <span
                        key={index}
                        className="inline-block [font-family:'Halyard_Display-Light',Helvetica] font-light"
                        style={{
                          animation: heroVisible ? 'fadeInUp 0.8s ease-out forwards' : 'none',
                          animationDelay: heroVisible ? `${(index + 4) * 0.15}s` : '0s',
                          opacity: 0,
                          marginRight: index < 5 ? '0.25em' : '0',
                          fontWeight: 300
                        }}
                      >
                        {word}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Mission Section */}
        <section
          ref={sectionRef}
          className="w-full bg-white"
          style={{
            paddingTop: `${missionLayout.paddingY}px`,
            paddingBottom: `${missionLayout.paddingY}px`,
          }}
        >
          <div
            className="text-left"
            style={{
              maxWidth: toStyleValue(missionLayout.maxWidth),
              marginLeft: `${missionLayout.marginLeft}px`,
            }}
          >
            <ReadingText
              text="Mým cílem je pomoci vaší firmě vyniknout nad konkurencí díky profesionálním webovým stránkám a perfektnímu brandingu udělanému na míru."
              progress={scrollProgress}
              className="[font-family:'Halyard_Display-ExtraLight',Helvetica] font-extralight 2xl:font-thin"
              style={{
                fontSize: toStyleValue(missionLayout.text.fontSize),
                lineHeight: toStyleValue(missionLayout.text.lineHeight),
                letterSpacing: `${missionLayout.text.letterSpacing}px`,
                marginBottom: `${missionLayout.text.marginBottom}px`,
                fontWeight: breakpoint === '2xl' ? 100 : undefined,
              }}
            />
            <Button
              className="bg-black rounded-[2rem] hover:bg-gray-800"
              onClick={() => navigate("/services")}
              style={{
                width: `${missionLayout.button.width}px`,
                height: `${missionLayout.button.height}px`,
              }}
            >
              <span
                className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white"
                style={{
                  fontSize: `${missionLayout.button.fontSize}px`,
                  letterSpacing: `${missionLayout.button.letterSpacing}px`,
                  lineHeight: `${missionLayout.button.lineHeight}px`,
                }}
              >
                Moje služby
              </span>
            </Button>
          </div>
        </section>
        {/* Film Design Image */}
        <img
          className="w-full h-[clamp(13rem,15vh,15rem)] object-cover"
          alt="Film design"
          src={filmDesignUrl}
        />
        {/* Services Section */}
        <section
          ref={servicesRef}
          className="relative w-full bg-black overflow-hidden"
          style={{
            minHeight: breakpoint === 'desktop' ? '100vh' : '80vh',
          }}
        >
          <img
            className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.7)]"
            alt="Services background"
            src={backgroundUrl}
          />
          {/* Services Title */}
          <div
            className={`absolute opacity-0 [font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white tracking-[0.1rem] whitespace-nowrap transition-all duration-700 ease-out ${
              servicesVisible ? "translate-x-0 opacity-90" : "translate-x-16 opacity-0"
            }`}
            style={{
              transitionDelay: '100ms',
              left: `${servicesLayout.titleLeft}px`,
              top: '15%',
              fontSize: `${servicesLayout.titleFontSize}px`,
              lineHeight: `${servicesLayout.titleFontSize * 1.3}px`,
            }}
          >
            Moje služby
          </div>
          {/* Service Group 1 - Webové stránky */}
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
            onClick={() => navigate("/services", { state: { serviceIndex: 0 } })}
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
            <div className="absolute left-0 mt-[clamp(1.2rem,2vh,1.5rem)]" style={{ width: typeof servicesLayout.item1.lineWidth === 'string' ? servicesLayout.item1.lineWidth : `${servicesLayout.item1.lineWidth}px` }}>
              <div
                className="w-full h-[1px] border-t border-white"
                style={{
                  opacity: hoveredService === 1 ? 0.6 : 0.4,
                  transition: hoveredService === 1 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
                }}
              />
            </div>
          </div>
          {/* Service Group 2 - Aplikace */}
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
            onClick={() => navigate("/services", { state: { serviceIndex: 1 } })}
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
            <div className="absolute left-0 mt-[clamp(1.2rem,2vh,1.5rem)]" style={{ width: typeof servicesLayout.item2.lineWidth === 'string' ? servicesLayout.item2.lineWidth : `${servicesLayout.item2.lineWidth}px` }}>
              <div
                className="w-full h-[1px] border-t border-white"
                style={{
                  opacity: hoveredService === 2 ? 0.6 : 0.4,
                  transition: hoveredService === 2 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
                }}
              />
            </div>
          </div>
          {/* Service Group 3 - Design */}
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
            onClick={() => navigate("/services", { state: { serviceIndex: 2 } })}
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
            <div className="absolute left-0 mt-[clamp(1.2rem,2vh,1.5rem)]" style={{ width: typeof servicesLayout.item3.lineWidth === 'string' ? servicesLayout.item3.lineWidth : `${servicesLayout.item3.lineWidth}px` }}>
              <div
                className="w-full h-[1px] border-t border-white"
                style={{
                  opacity: hoveredService === 3 ? 0.6 : 0.4,
                  transition: hoveredService === 3 ? 'opacity 1s ease-out' : 'opacity 1.2s ease-out'
                }}
              />
            </div>
          </div>
          {/* Services Button */}
          <Button
            className="absolute bg-white rounded-[2rem] hover:bg-gray-300 opacity-90"
            style={{
              left: `${servicesLayout.button.left}px`,
              top: servicesLayout.button.top,
              width: `${servicesLayout.button.width}px`,
              height: `${servicesLayout.button.height}px`,
            }}
            onClick={() => navigate("/services")}
          >
            <span className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black text-[clamp(0.75rem,1.5vw,0.9rem)] tracking-[0.04rem] leading-[clamp(1rem,2vw,1.2rem)]">
              Moje služby
            </span>
          </Button>
        </section>



        
        {/* References Section */}
<section ref={referencesRef} className="relative w-full py-[clamp(6rem,10vh,10rem)]">
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
          onClick={(e) => handleCardClick(reference.id, e)}
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

        {/* Why Choose My Services Section */}
        <section ref={whyChooseRef} className="relative w-full bg-black" style={{ minHeight: `${whyChooseLayout.height}px`, paddingTop: '80px', paddingBottom: '200px' }}>
          <h2
            className="font-halyard-display font-semibold text-white tracking-wide opacity-90"
            style={{
              fontSize: `${whyChooseLayout.titleFontSize}px`,
              marginLeft: `${whyChooseLayout.titleLeft}px`,
              marginBottom: '100px'
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

          {/* Carousel Content */}
          <div className="relative overflow-hidden" style={{ minHeight: '300px' }}>
            {/* Current Large Number */}
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

            {/* Next Large Number */}
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

            {/* Current Content */}
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

            {/* Next Content */}
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

            {/* Arrow */}
            <button
              onClick={handleCarouselNext}
              disabled={isCarouselAnimating}
              className="absolute group transition-all duration-300 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
              style={{
                right: whyChooseLayout.arrowRight,
                top: '100px',
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

          {/* Sponsor Icons Row */}
          <SponsorLogos />
        </section>
        {/* Film Coding Image 2 */}
        <img
          className="w-full h-[clamp(13rem,15vh,15rem)] object-cover"
          alt="Film coding"
          src={filmCodingUrl}
        />
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
    </div>
  );
};