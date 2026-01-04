import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { AlvionLogo } from "../../../components/AlvionLogo";
import { Navbar } from "../../../components/Navbar";
import { Button } from "../../../components/ui/button";
import { useScrollTrigger } from "../../../hooks/useScrollTrigger";
import { useResponsiveLayoutMobile } from "../../../hooks/useResponsiveLayoutMobile";
import { useWebsiteImagesMobile } from "../../../hooks/useWebsiteImagesMobile";

export const MobileGDPRPage = (): JSX.Element => {
  const currentYear = new Date().getFullYear();
  const [isLoaded, setIsLoaded] = useState(false);
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 768
  );
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { breakpoint, layout, getResponsiveValue } = useResponsiveLayoutMobile();
  const { backgroundUrl } = useWebsiteImagesMobile();

  const { isVisible: heroVisible, elementRef: heroRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });
  const { isVisible: contactVisible, elementRef: contactRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });
  const { isVisible: footerVisible, elementRef: footerRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });

  const headerLayout = getResponsiveValue(layout.header);
  const navigationLayout = getResponsiveValue(layout.navigation);
  const heroLayout = getResponsiveValue(layout.hero);
  const contactLayout = getResponsiveValue(layout.contact);
  const footerLayout = getResponsiveValue(layout.footer);
  const servicePageHeroLayout = getResponsiveValue(layout.servicePageHero);

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
          Ochrana osobních údajů a GDPR
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

      {/* Text Content Section */}
      <section
        className="w-full bg-white"
        style={{
          paddingTop: breakpoint === 'sm' ? 'clamp(3rem,6vh,4rem)' : 'clamp(4rem,8vh,6rem)',
          paddingBottom: breakpoint === 'sm' ? 'clamp(3rem,6vh,4rem)' : 'clamp(4rem,8vh,6rem)',
          paddingLeft: breakpoint === 'sm' ? '20px' : '40px',
          paddingRight: breakpoint === 'sm' ? '20px' : '40px',
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: breakpoint === 'mdPlus' ? '800px' : '100%',
          }}
        >
          {/* Obchodni podminky */}
          <h1
            className="[font-family:'Halyard_Display-SemiBold',Helvetica] font-semibold text-black tracking-[0.04rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.8rem,5vw,2.2rem)' : 'clamp(2.2rem,4vw,2.8rem)',
              lineHeight: 1.2,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Obchodní podmínky
          </h1>

          {/* Section 1 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            1. Základní ustanovení
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(0.8rem,1.5vh,1rem)' : 'clamp(1rem,2vh,1.2rem)',
            }}
          >
            Tyto obchodní podmínky upravují smluvní vztah mezi podnikatelem:
          </p>
          <div
            className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(0.8rem,1.5vh,1rem)' : 'clamp(1rem,2vh,1.2rem)',
              paddingLeft: '1rem',
            }}
          >
            Alvion – Ondřej Zeman<br />
            IČO: 21947546<br />
            E-mail: info@alvion.net
          </div>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            (dále jen „poskytovatel")<br /><br />
            a klientem (dále jen „objednatel").<br /><br />
            Poskytovatel nabízí služby v oblasti tvorby webových stránek, designu a vývoje aplikací.
          </p>

          {/* Section 2 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            2. Uzavření smlouvy
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Objednávka služeb probíhá na základě kontaktování poskytovatele prostřednictvím e-mailu. Na základě poptávky je objednateli zaslána cenová nabídka. Smluvní vztah vzniká potvrzením této nabídky objednatelem.
          </p>

          {/* Section 3 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            3. Cena a platební podmínky
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(0.8rem,1.5vh,1rem)' : 'clamp(1rem,2vh,1.2rem)',
            }}
          >
            Cena služeb je stanovena individuálně dle rozsahu projektu a je uvedena v nabídce.
          </p>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(0.5rem,1vh,0.7rem)' : 'clamp(0.6rem,1.2vh,0.8rem)',
            }}
          >
            Možné způsoby úhrady:
          </p>
          <ul
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem] list-disc"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(0.8rem,1.5vh,1rem)' : 'clamp(1rem,2vh,1.2rem)',
              paddingLeft: '2rem',
            }}
          >
            <li>bankovní převod</li>
            <li>hotovost</li>
            <li>jiný převod finančních prostředků</li>
            <li>kryptoměna</li>
          </ul>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Platba probíhá na základě vystavené faktury, pokud není dohodnuto jinak.
          </p>

          {/* Section 4 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            4. Termíny dodání
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Termín dodání je stanoven individuálně dle rozsahu projektu a je uveden v nabídce. Poskytovatel nenese odpovědnost za prodlení způsobené nedodáním podkladů ze strany objednatele.
          </p>

          {/* Section 5 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            5. Autorská práva
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(0.8rem,1.5vh,1rem)' : 'clamp(1rem,2vh,1.2rem)',
            }}
          >
            Poskytovatel je autorem vytvořeného díla. Autorská práva přechází na objednatele až po úplném uhrazení ceny díla, pokud není dohodnuto jinak.
          </p>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Poskytovatel si vyhrazuje právo použít dokončené dílo pro své portfolio.
          </p>

          {/* Section 6 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            6. Odpovědnost
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Poskytovatel nenese odpovědnost za škody vzniklé nevhodným používáním díla, za obsah dodaný objednatelem ani za výpadky služeb třetích stran (hosting, domény apod.).
          </p>

          {/* Section 7 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            7. Závěrečná ustanovení
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(3rem,6vh,4rem)' : 'clamp(4rem,8vh,5rem)',
            }}
          >
            Tyto obchodní podmínky jsou platné od data zveřejnění na webových stránkách poskytovatele.
          </p>

          {/* Divider */}
          <div
            className="w-full h-[1px] bg-gradient-to-r from-black/20 via-black/10 to-transparent"
            style={{
              marginBottom: breakpoint === 'sm' ? 'clamp(3rem,6vh,4rem)' : 'clamp(4rem,8vh,5rem)',
            }}
          />

          {/* Ochrana osobnich udaju */}
          <h1
            className="[font-family:'Halyard_Display-SemiBold',Helvetica] font-semibold text-black tracking-[0.04rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.8rem,5vw,2.2rem)' : 'clamp(2.2rem,4vw,2.8rem)',
              lineHeight: 1.2,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Ochrana osobních údajů
          </h1>

          {/* Privacy Section 1 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            1. Správce osobních údajů
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(0.8rem,1.5vh,1rem)' : 'clamp(1rem,2vh,1.2rem)',
            }}
          >
            Správcem osobních údajů je:
          </p>
          <div
            className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
              paddingLeft: '1rem',
            }}
          >
            Alvion – Ondřej Zeman<br />
            IČO: 21947546<br />
            E-mail: info@alvion.net
          </div>

          {/* Privacy Section 2 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            2. Jaké osobní údaje zpracovávám
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(0.5rem,1vh,0.7rem)' : 'clamp(0.6rem,1.2vh,0.8rem)',
            }}
          >
            Zpracovávám pouze následující osobní údaje:
          </p>
          <ul
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem] list-disc"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
              paddingLeft: '2rem',
            }}
          >
            <li>e-mailovou adresu</li>
          </ul>

          {/* Privacy Section 3 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            3. Jakým způsobem jsou údaje získávány
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Osobní údaje jsou získávány výhradně prostřednictvím e-mailové komunikace.
          </p>

          {/* Privacy Section 4 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            4. Účel zpracování
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(0.5rem,1vh,0.7rem)' : 'clamp(0.6rem,1.2vh,0.8rem)',
            }}
          >
            Osobní údaje jsou zpracovávány výhradně za účelem:
          </p>
          <ul
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem] list-disc"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
              paddingLeft: '2rem',
            }}
          >
            <li>komunikace s klienty</li>
            <li>vyřízení poptávky a realizace služeb</li>
          </ul>

          {/* Privacy Section 5 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            5. Doba uchovávání
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Osobní údaje jsou uchovávány pouze po dobu nezbytně nutnou k vyřízení komunikace nebo plnění smlouvy.
          </p>

          {/* Privacy Section 6 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            6. Předávání osobních údajů
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Osobní údaje nejsou předávány třetím stranám.
          </p>

          {/* Privacy Section 7 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            7. Hosting a zabezpečení
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: breakpoint === 'sm' ? 'clamp(2rem,4vh,2.5rem)' : 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Webové stránky jsou hostovány na serverech umístěných v Evropské unii. Osobní údaje jsou chráněny odpovídajícími technickými a organizačními opatřeními.
          </p>

          {/* Privacy Section 8 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(1.2rem,3.5vw,1.5rem)' : 'clamp(1.4rem,2.5vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: breakpoint === 'sm' ? 'clamp(1rem,2vh,1.3rem)' : 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            8. Práva subjektů údajů
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: breakpoint === 'sm' ? 'clamp(0.95rem,2.8vw,1.1rem)' : 'clamp(1.05rem,1.8vw,1.2rem)',
              lineHeight: 1.7,
            }}
          >
            Máte právo na přístup ke svým osobním údajům, jejich opravu nebo výmaz. V případě dotazů mě můžete kontaktovat na e-mailu info@alvion.net.
          </p>
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
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
                  onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
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
