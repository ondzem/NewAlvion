import React, { useRef } from "react";
import { Link } from "react-router-dom";
import { Badge } from "../../../components/ui/badge";
import { AlvionLogo } from "../../../components/AlvionLogo";
import { Navbar } from "../../../components/Navbar";

interface MobileMyServicePage_MdPlusProps {
  isLoaded: boolean;
  headerLayout: any;
  navigationLayout: any;
  heroLayout: any;
  backgroundUrl: string;
  scrollToService: (serviceIndex: number) => void;
  containerRef: React.RefObject<HTMLDivElement>;
  wrapperRef: React.RefObject<HTMLDivElement>;
  scrollState: any;
  contactLayout: any;
  footerLayout: any;
  contactVisible: boolean;
  footerVisible: boolean;
  contactRef: React.RefObject<HTMLElement>;
  footerRef: React.RefObject<HTMLElement>;
  serviceDescriptions: any[];
  currentYear: number;
}

export const MobileMyServicePage_MdPlus: React.FC<MobileMyServicePage_MdPlusProps> = ({
  isLoaded,
  headerLayout,
  navigationLayout,
  heroLayout,
  backgroundUrl,
  scrollToService,
  containerRef,
  wrapperRef,
  scrollState,
  contactLayout,
  footerLayout,
  contactVisible,
  footerVisible,
  contactRef,
  footerRef,
  serviceDescriptions,
  currentYear,
}) => {
  return (
    <div className="w-full min-h-screen bg-white">
      {/* Logo - same as MobileHomePageUpravena */}
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
          size="mobile-md"
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

      {/* Navigation - same as MobileHomePageUpravena */}
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

      {/* Header Section - Desktop-like for mdPlus (97% of lg) */}
      <section
        className="relative w-full bg-black"
        style={{ minHeight: '743px' }}
      >
        <img
          className="absolute inset-0 w-full h-[738px] object-cover [filter:brightness(0.7)]"
          alt="Background"
          src={backgroundUrl}
        />

        {/* Hero Content */}
        <div
          className="absolute top-[258px]"
          style={{ left: `${heroLayout.left + 15}px` }}
        >
          <div
            className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-[#d2d2d2] tracking-[1.16px] mb-[39px]"
            style={{ fontSize: '23px', lineHeight: '33.6px' }}
          >
            služby
          </div>

          <h1
            className="w-[746px] [font-family:'Halyard_Display-Light',Helvetica] font-light text-white tracking-[2.72px] mb-[34px]"
            style={{ fontSize: '65px', lineHeight: '78px' }}
          >
            Designový partner pro růst vaší firmy
          </h1>

          <div className="flex gap-4">
            <Badge
              className="w-[148px] [filter:brightness(0.9)] h-[32px] bg-white rounded-[40px] flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-colors"
              onClick={() => scrollToService(0)}
            >
              <span
                className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.62px] leading-[14.3px]"
                style={{ fontSize: '13.5px' }}
              >
                Webové stránky
              </span>
            </Badge>
            <Badge
              className="w-[114px] h-[32px] [filter:brightness(0.9)] bg-white rounded-[40px] flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-colors"
              onClick={() => scrollToService(1)}
            >
              <span
                className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.62px] leading-[14.3px]"
                style={{ fontSize: '13.5px' }}
              >
                Aplikace
              </span>
            </Badge>
            <Badge
              className="w-[105px] h-[32px] [filter:brightness(0.9)] bg-white rounded-[40px] flex items-center justify-center hover:bg-gray-300 cursor-pointer transition-colors"
              onClick={() => scrollToService(2)}
            >
              <span
                className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-black tracking-[0.62px] leading-[14.3px]"
                style={{ fontSize: '13.5px' }}
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
          marginTop: '10px',
          marginBottom: '-95px',
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
              gap: '29px',
              transition: 'transform 0.15s ease-out',
            }}
          >
            {serviceDescriptions.map((service, idx) => (
              <section key={idx} className="flex-shrink-0 cursor-pointer" style={{ width: 'calc(100vw - 29px)' }} onClick={() => scrollToService(idx)}>
                <div className="w-full" style={{ height: 'calc(100vh - 29px)' }}>
                  <div className="relative w-full h-full bg-[#333333] rounded-[39px] shadow-[0px_4px_15.4px_7.8px_rgba(0,0,0,0.24)] overflow-hidden flex">
                    {/* Left Content Section */}
                    <div className="flex-1 flex items-center pl-[6%] pr-[4%] py-[48px] relative z-10">
                      {/* Background Image */}
                      <img
                        className="absolute inset-0 w-full h-full object-cover [filter:brightness(0.8)] scale-x-[-1]"
                        alt="Background"
                        src={backgroundUrl}
                      />

                      <div className="w-full relative z-10">
                        {/* Header with number and title */}
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-[45px] h-[45px] rounded-full border-[1px] border-white flex items-center justify-center flex-shrink-0">
                            <span className="[font-family:'Halyard_Display-ExtraLight',Helvetica] font-thin text-white text-[27px] leading-none">
                              {service.number}
                            </span>
                          </div>
                          <h2 className="[font-family:'Halyard_Display-Medium',Helvetica] font-medium text-white text-[clamp(29px,3.7vw,39px)] tracking-[1.46px] leading-[1.1]">
                            {service.title}
                          </h2>
                        </div>

                        {/* Description */}
                        <p className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(12.6px,1.26vw,14.5px)] tracking-[0.19px] leading-[1.6] mb-6 opacity-90">
                          {service.description}
                        </p>

                        {/* Divider */}
                        <div className="w-full h-[1px] mb-10 bg-gradient-to-r from-white/30 via-white/20 to-transparent"></div>

                        {/* Columns */}
                        <div className="flex gap-[clamp(58px,7.8vw,97px)]">
                          {service.columns.map((column: any, colIdx: number) => (
                            <div key={colIdx} className="flex flex-col gap-5">
                              {column.header && (
                                <h3 className="[font-family:'Halyard_Display-Regular',Helvetica] font-normal text-white text-[clamp(16.5px,1.75vw,20.4px)] tracking-[0.39px] leading-[1.2] whitespace-nowrap">
                                  {column.header}
                                </h3>
                              )}
                              {!column.header && <div className="h-[clamp(19.8px,2.1vw,24.5px)]"></div>}
                              <div className="flex flex-col gap-2.5">
                                {column.items.map((item: string, itemIdx: number) => (
                                  <Badge
                                    key={itemIdx}
                                    variant="outline"
                                    className="w-fit px-4 py-1.5 h-auto rounded-full border-[1px] border-white/80 bg-transparent whitespace-nowrap"
                                  >
                                    <span className="[font-family:'Halyard_Display-Light',Helvetica] font-light text-white text-[clamp(10.7px,1.07vw,12.6px)] tracking-[0.19px]">
                                      {item}
                                    </span>
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Image Section */}
                    <div className="w-[38%] relative flex-shrink-0 z-10">
                      <img
                        className="w-full h-full object-cover rounded-r-[39px] grayscale"
                        alt={`${service.title} image`}
                        src={service.image}
                      />
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
      </div>

      {/* Contact Section - same as MobileHomePageUpravena */}
      <section
        ref={contactRef}
        className="w-full flex flex-col items-center"
        style={{
          paddingTop: `${contactLayout.paddingY}px`,
          paddingBottom: `${contactLayout.paddingY}px`,
          marginTop: '95px',
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

      {/* Footer Contact Section - same as MobileHomePageUpravena */}
      <section ref={footerRef} className="w-full box-border p-[15px] flex justify-center items-center">
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
                { src: "/fbfb.png", alt: "Facebook", href: "https://www.facebook.com/share/17jsovf5QJ/?mibextid=wwXIfr" },
                { src: "/igig.png", alt: "Instagram", href: "https://www.instagram.com/ondrej.zem/" },
                { src: "/inin.png", alt: "LinkedIn", href: "https://www.linkedin.com/in/ondrej-zeman-76b126352/" },
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
      </section>
    </div>
  );
};
