import React, { useState, useEffect, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { useResponsiveLayout } from "../../hooks/useResponsiveLayout";
import { useResponsiveLayoutMobile } from "../../hooks/useResponsiveLayoutMobile";
import { useScrollTrigger } from "../../hooks/useScrollTrigger";
import { useWebsiteImages } from "../../hooks/useWebsiteImages";
import { useWebsiteImagesMobile } from "../../hooks/useWebsiteImagesMobile";
import { Button } from "../../components/ui/button";
import { AlvionLogo } from "../../components/AlvionLogo";
import { Navbar } from "../../components/Navbar";

export const ContactPage = (): JSX.Element => {
  const [windowWidth, setWindowWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 768
  );
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const desktopLayout = useResponsiveLayout();
  const mobileLayout = useResponsiveLayoutMobile();
  const desktopImages = useWebsiteImages();
  const mobileImages = useWebsiteImagesMobile();

  const { isVisible: footerVisible, elementRef: footerRef } = useScrollTrigger({ threshold: 0.2, triggerOnce: false });
  const [isLoaded, setIsLoaded] = useState(false);

  const isMobileBreakpoint = mobileLayout.breakpoint === 'sm' || mobileLayout.breakpoint === 'md';
  const currentLayout = isMobileBreakpoint ? mobileLayout : desktopLayout;
  const currentImages = isMobileBreakpoint ? mobileImages : desktopImages;
  const footerLayout = currentLayout.getResponsiveValue(currentLayout.layout.footer);
  const heroLayout = currentLayout.getResponsiveValue(currentLayout.layout.hero);
  const headerLayout = currentLayout.getResponsiveValue(currentLayout.layout.header);
  const navigationLayout = isMobileBreakpoint ? currentLayout.getResponsiveValue(currentLayout.layout.navigation) : null;
  const { breakpoint } = currentLayout;
  const { backgroundUrl } = currentImages;

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
      {/* Logo */}
      <div
        className={`fixed z-50 transition-all duration-1000 ease-out ${
          isLoaded ? "translate-y-0 opacity-100" : "-translate-y-8 opacity-0"
        }`}
        style={{
          top: `${headerLayout.top}px`,
          left: isMobileBreakpoint ? headerLayout.left : `${headerLayout.left}px`,
          width: `${headerLayout.logoWidth}px`,
          height: `${headerLayout.logoHeight}px`,
        }}
      >
        <AlvionLogo
          size={isMobileBreakpoint ? (breakpoint === 'sm' ? 'mobile-sm' : 'mobile-md') : 'large'}
          className="opacity-90 w-full h-full"
          customLetterOffsets={isMobileBreakpoint ? {
            A: "translate-y-[0px]",
            L: "translate-y-[0px]",
            V: "translate-y-[1px]",
            I: "translate-y-[1px]",
            O: "translate-y-[1px]",
            N: "translate-y-[1px]",
          } : undefined}
          customLetterSpacing={isMobileBreakpoint ? {
            A: "-ml-6",
            L: "-ml-2.5",
            V: "-ml-3",
            I: "-ml-3",
            O: "-ml-3",
            N: "-ml-[6px]",
          } : undefined}
        />
      </div>

      {/* Navigation */}
      {isMobileBreakpoint ? (
        <nav
          className="fixed flex items-center justify-end z-[100]"
          style={{
            top: `${navigationLayout?.top}px`,
            right: navigationLayout?.right,
          }}
        >
          <Navbar variant="mobile" />
        </nav>
      ) : (
        <nav className="fixed top-5 right-[15vw] flex items-center justify-end px-4 py-4 h-[clamp(8rem,10vh,10rem)] z-[100]">
          <div className="flex items-center">
            <Navbar variant="desktop" />
          </div>
        </nav>
      )}

      {isMobileBreakpoint ? (
        <section ref={footerRef as React.RefObject<HTMLElement>} className="w-full box-border flex justify-center items-center p-[10px]">
          <div
            className="relative w-full rounded-[40px] overflow-hidden"
            style={{ height: mobileLayout.breakpoint === 'sm' ? 'auto' : `${heroLayout.height}px`, minHeight: mobileLayout.breakpoint === 'sm' ? '100vh' : 'auto' }}
          >
            {mobileLayout.breakpoint === 'sm' ? (
              <div className="absolute inset-0 w-full h-full bg-black" />
            ) : (
              <img
                className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.7)]"
                alt="Footer background"
                src={backgroundUrl}
              />
            )}

            {mobileLayout.breakpoint === 'sm' && (
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
                  className="absolute object-contain z-10"
                  style={{
                    position: 'absolute',
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

            {(mobileLayout.breakpoint === 'md' || mobileLayout.breakpoint === 'mdPlus') && (
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

            {mobileLayout.breakpoint === 'sm' ? (
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

                <div
                  className="opacity-90 text-center [font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.02rem]"
                  style={{
                    fontSize: `${footerLayout.copyrightFontSize}px`,
                    marginBottom: `${footerLayout.privacyMarginBottom}px`,
                  }}
                >
                  Obchodní podmínky a GDPR
                </div>

                <div
                  className="opacity-90 text-center [font-family:'Halyard_Display-Book',Helvetica] font-normal text-white tracking-[0.02rem]"
                  style={{
                    fontSize: `${footerLayout.copyrightFontSize}px`,
                  }}
                >
                  Copyright © 2025 – Alvion<br />All rights reserved.
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
                  Copyright © 2025 – Alvion<br />All rights reserved.
                </div>
              </div>
            )}
          </div>
        </section>
      ) : (
        <section ref={footerRef as React.RefObject<HTMLElement>} className="w-full box-border p-[15px] flex justify-center items-center min-h-[100vh]">
          <div className="relative w-[calc(100vw-30px)] h-[calc(100vh-30px)] rounded-[40px] overflow-hidden">
            <img
              className="absolute w-full h-full min-h-[calc(100vh-30px)] object-cover rounded-[40px] [filter:brightness(0.7)]"
              alt="Footer background"
              src={backgroundUrl}
            />

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
                  marginBottom: `${footerLayout.contactItemMarginBottom}px`,
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
                  marginBottom: `${footerLayout.contactSectionMarginBottom}px`,
                  lineHeight: footerLayout.contactLineHeight,
                }}
              >
                info@alvion.net
              </a>

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

              <div
                className="flex gap-4 relative z-30"
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
                Copyright © 2025 – Alvion<br />All rights reserved.
              </div>
            </div>
          </div>
        </section>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};
