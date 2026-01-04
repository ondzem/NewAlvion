import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "../../components/Navbar";
import { AlvionLogo } from "../../components/AlvionLogo";
import { MobileGDPRPage } from "./MobileGDPRPage";
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";
import { useWebsiteImages } from "../../hooks/useWebsiteImages";
import { breakpoints } from "../../config/breakpoints";

export const GDPRPage = (): JSX.Element => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { breakpoint, layout, getResponsiveValue } = useResponsiveLayout();
  const { backgroundUrl } = useWebsiteImages();

  const { isVisible: contactVisible, elementRef: contactRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });
  const { isVisible: footerVisible, elementRef: footerRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });

  const headerLayout = getResponsiveValue(layout.header);
  const heroLayout = getResponsiveValue(layout.hero);
  const servicePageHeroLayout = getResponsiveValue(layout.servicePageHero);
  const footerLayout = getResponsiveValue(layout.footer);

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


  if (isMobile) {
    return <MobileGDPRPage />;
  }

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
            Ochrana osobních údajů a GDPR
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

      {/* Text Content Section */}
      <section
        className="w-full bg-white"
        style={{
          paddingTop: 'clamp(14rem,12vh,20rem)',
          paddingLeft: 'clamp(60px,8vw,120px)',
          paddingRight: 'clamp(60px,8vw,120px)',
        }}
      >
        <div
          className="mx-auto"
          style={{
            maxWidth: '900px',
          }}
        >
          {/* Obchodni podminky */}
          <h1
            className="[font-family:'Halyard_Display-SemiBold',Helvetica] font-semibold text-black tracking-[0.04rem]"
            style={{
              fontSize: 'clamp(2.2rem,3.5vw,3rem)',
              lineHeight: 1.2,
              marginBottom: 'clamp(2.5rem,5vh,3.5rem)',
            }}
          >
            Obchodní podmínky
          </h1>

          {/* Section 1 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            1. Základní ustanovení
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(1rem,2vh,1.2rem)',
            }}
          >
            Tyto obchodní podmínky upravují smluvní vztah mezi podnikatelem:
          </p>
          <div
            className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(1rem,2vh,1.2rem)',
              paddingLeft: '1.5rem',
            }}
          >
            Alvion – Ondřej Zeman<br />
            IČO: 21947546<br />
            E-mail: info@alvion.net
          </div>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
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
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            2. Uzavření smlouvy
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Objednávka služeb probíhá na základě kontaktování poskytovatele prostřednictvím e-mailu. Na základě poptávky je objednateli zaslána cenová nabídka. Smluvní vztah vzniká potvrzením této nabídky objednatelem.
          </p>

          {/* Section 3 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            3. Cena a platební podmínky
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(0.8rem,1.5vh,1rem)',
            }}
          >
            Cena služeb je stanovena individuálně dle rozsahu projektu a je uvedena v nabídce.
          </p>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(0.5rem,1vh,0.7rem)',
            }}
          >
            Možné způsoby úhrady:
          </p>
          <ul
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem] list-disc"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(1rem,2vh,1.2rem)',
              paddingLeft: '2.5rem',
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
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Platba probíhá na základě vystavené faktury, pokud není dohodnuto jinak.
          </p>

          {/* Section 4 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            4. Termíny dodání
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Termín dodání je stanoven individuálně dle rozsahu projektu a je uveden v nabídce. Poskytovatel nenese odpovědnost za prodlení způsobené nedodáním podkladů ze strany objednatele.
          </p>

          {/* Section 5 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            5. Autorská práva
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(1rem,2vh,1.2rem)',
            }}
          >
            Poskytovatel je autorem vytvořeného díla. Autorská práva přechází na objednatele až po úplném uhrazení ceny díla, pokud není dohodnuto jinak.
          </p>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Poskytovatel si vyhrazuje právo použít dokončené dílo pro své portfolio.
          </p>

          {/* Section 6 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            6. Odpovědnost
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Poskytovatel nenese odpovědnost za škody vzniklé nevhodným používáním díla, za obsah dodaný objednatelem ani za výpadky služeb třetích stran (hosting, domény apod.).
          </p>

          {/* Section 7 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            7. Závěrečná ustanovení
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(4rem,8vh,5rem)',
            }}
          >
            Tyto obchodní podmínky jsou platné od data zveřejnění na webových stránkách poskytovatele.
          </p>

          {/* Divider */}
          <div
            className="w-full h-[1px] bg-gradient-to-r from-black/20 via-black/10 to-transparent"
            style={{
              marginBottom: 'clamp(4rem,8vh,5rem)',
            }}
          />

          {/* Ochrana osobnich udaju */}
          <h1
            className="[font-family:'Halyard_Display-SemiBold',Helvetica] font-semibold text-black tracking-[0.04rem]"
            style={{
              fontSize: 'clamp(2.2rem,3.5vw,3rem)',
              lineHeight: 1.2,
              marginBottom: 'clamp(2.5rem,5vh,3.5rem)',
            }}
          >
            Ochrana osobních údajů
          </h1>

          {/* Privacy Section 1 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            1. Správce osobních údajů
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(1rem,2vh,1.2rem)',
            }}
          >
            Správcem osobních údajů je:
          </p>
          <div
            className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
              paddingLeft: '1.5rem',
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
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            2. Jaké osobní údaje zpracovávám
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(0.5rem,1vh,0.7rem)',
            }}
          >
            Zpracovávám pouze následující osobní údaje:
          </p>
          <ul
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem] list-disc"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
              paddingLeft: '2.5rem',
            }}
          >
            <li>e-mailovou adresu</li>
          </ul>

          {/* Privacy Section 3 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            3. Jakým způsobem jsou údaje získávány
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Osobní údaje jsou získávány výhradně prostřednictvím e-mailové komunikace.
          </p>

          {/* Privacy Section 4 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            4. Účel zpracování
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(0.5rem,1vh,0.7rem)',
            }}
          >
            Osobní údaje jsou zpracovávány výhradně za účelem:
          </p>
          <ul
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem] list-disc"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
              paddingLeft: '2.5rem',
            }}
          >
            <li>komunikace s klienty</li>
            <li>vyřízení poptávky a realizace služeb</li>
          </ul>

          {/* Privacy Section 5 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            5. Doba uchovávání
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Osobní údaje jsou uchovávány pouze po dobu nezbytně nutnou k vyřízení komunikace nebo plnění smlouvy.
          </p>

          {/* Privacy Section 6 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            6. Předávání osobních údajů
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Osobní údaje nejsou předávány třetím stranám.
          </p>

          {/* Privacy Section 7 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            7. Hosting a zabezpečení
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
              marginBottom: 'clamp(2.5rem,5vh,3rem)',
            }}
          >
            Webové stránky jsou hostovány na serverech umístěných v Evropské unii. Osobní údaje jsou chráněny odpovídajícími technickými a organizačními opatřeními.
          </p>

          {/* Privacy Section 8 */}
          <h2
            className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.03rem]"
            style={{
              fontSize: 'clamp(1.4rem,2vw,1.8rem)',
              lineHeight: 1.3,
              marginBottom: 'clamp(1.2rem,2.5vh,1.5rem)',
            }}
          >
            8. Práva subjektů údajů
          </h2>
          <p
            className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-black tracking-[0.02rem]"
            style={{
              fontSize: 'clamp(1.05rem,1.5vw,1.2rem)',
              lineHeight: 1.7,
            }}
          >
            Máte právo na přístup ke svým osobním údajům, jejich opravu nebo výmaz. V případě dotazů mě můžete kontaktovat na e-mailu info@alvion.net.
          </p>
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
          {/* Background Image */}
          <img
            className="absolute w-full h-full min-h-[calc(100vh-30px)] object-cover rounded-[40px] [filter:brightness(0.7)]"
            alt="Footer background"
            src={backgroundUrl}
          />

          {/* Background Logo */}
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

            {/* IC */}
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
