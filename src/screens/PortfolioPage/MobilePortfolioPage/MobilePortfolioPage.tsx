import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { AlvionLogo } from "../../../components/AlvionLogo";
import { Navbar } from "../../../components/Navbar";
import { Button } from "../../../components/ui/button";
import { useScrollTrigger } from "../../../hooks/useScrollTrigger";
import { useResponsiveLayoutMobile } from "../../../hooks/useResponsiveLayoutMobile";
import { useWebsiteImagesMobile } from "../../../hooks/useWebsiteImagesMobile";

export const MobilePortfolioPage = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoaded, setIsLoaded] = useState(false);
  const [openReferenceCard, setOpenReferenceCard] = useState<string>("elektrika");
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 768
  );
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { breakpoint, layout, getResponsiveValue } = useResponsiveLayoutMobile();
  const { backgroundUrl, referenceImages } = useWebsiteImagesMobile();

  const { isVisible: heroVisible, elementRef: heroRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });
  const { isVisible: referencesVisible, elementRef: referencesRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });
  const { isVisible: contactVisible, elementRef: contactRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });
  const { isVisible: footerVisible, elementRef: footerRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });

  const headerLayout = getResponsiveValue(layout.header);
  const navigationLayout = getResponsiveValue(layout.navigation);
  const heroLayout = getResponsiveValue(layout.hero);
  const contactLayout = getResponsiveValue(layout.contact);
  const footerLayout = getResponsiveValue(layout.footer);
  const servicePageHeroLayout = getResponsiveValue(layout.servicePageHero);
  const referencesLayout = getResponsiveValue(layout.references);

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

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

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

  const handleCardClick = (id: string) => {
    setOpenReferenceCard(id);
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
        <AlvionLogo size="mobile-sm" className="opacity-90 w-full h-full" />
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
        className="relative w-full bg-black"
        style={{ minHeight: `${servicePageHeroLayout.height}px` }}
      >
        <img
          className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.7)]"
          alt="Background"
          src={backgroundUrl}
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
          reference
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

      {/* References Section */}
      <section
        ref={referencesRef as React.RefObject<HTMLElement>}
        className="relative w-full"
        style={{
          paddingTop: breakpoint === 'sm' ? 'clamp(6rem,10vh,8rem)' : 'clamp(9rem,12vh,12rem)',
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

      {/* Footer Contact Section - responsive for sm, md, mdPlus */}
      {(breakpoint === 'sm' || breakpoint === 'md' || breakpoint === 'mdPlus') && (
        <section ref={footerRef as React.RefObject<HTMLElement>} className={`w-full box-border flex justify-center items-center ${breakpoint === 'sm' ? 'p-[10px]' : 'p-[15px]'}`}>
          <div
            className={`relative w-full rounded-[40px] overflow-hidden ${(breakpoint === 'sm' || breakpoint === 'md') ? 'bg-black' : ''}`}
            style={{ height: breakpoint === 'sm' ? 'auto' : `${footerLayout.height}px`, minHeight: breakpoint === 'sm' ? '100vh' : 'auto' }}
          >
            {breakpoint === 'mdPlus' && (
              <img
                className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.7)]"
                alt="Footer background"
                src={backgroundUrl}
              />
            )}

            {breakpoint === 'sm' && (
              <>
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
              </>
            )}

            {(breakpoint === 'md' || breakpoint === 'mdPlus') && (
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
            )}

            {breakpoint === 'sm' ? (
              <div className="relative z-40 w-full max-w-[340px] flex flex-col items-center py-[clamp(4rem,8vh,6rem)] mx-auto">
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

                <div
                  className="opacity-90 text-center [font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white tracking-[0.03rem]"
                  style={{
                    fontSize: `${footerLayout.nameFontSize}px`,
                    marginBottom: `${footerLayout.nameMarginBottom}px`,
                  }}
                >
                  Ondřej Zeman
                </div>

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

                <div
                  className="opacity-90 text-center [font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.02rem]"
                  style={{
                    fontSize: `${footerLayout.contactFontSize}px`,
                    marginBottom: `${footerLayout.icMarginBottom}px`,
                  }}
                >
                  IČ: 21947546
                </div>

                <div
                  className="flex gap-4 justify-center relative z-30"
                  style={{
                    marginBottom: `${footerLayout.socialSectionMarginBottom || 46}px`,
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
                      className="cursor-pointer hover:opacity-80 transition-opacity relative z-30"
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

                <a href="mailto:info@alvion.net" className="w-full flex justify-center">
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

                <div
                  className="opacity-90 text-center [font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.02rem]"
                  style={{
                    fontSize: `${footerLayout.copyrightFontSize}px`,
                  }}
                >
                  Copyright © {currentYear} – Alvion<br />All rights reserved.
                </div>
              </div>
            ) : (
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
                  className="flex gap-4 relative z-30"
                  style={{
                    marginLeft: `${footerLayout.contentLeft}px`,
                    marginBottom: `${footerLayout.socialSectionMarginBottom || 46}px`,
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
                      className="cursor-pointer hover:opacity-80 transition-opacity relative z-30"
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
            )}
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
