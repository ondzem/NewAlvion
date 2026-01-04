import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import { Navbar } from "../../components/Navbar";
import { MobileErrorPage } from "./MobileErrorPage";

export const ErrorPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    setTimeout(() => setIsVisible(true), 100);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (isMobile) {
    return <MobileErrorPage />;
  }

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0a0a]">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />

      <div className="flex items-center justify-center min-h-screen px-8">
        <div
          className={`
            text-center max-w-4xl mx-auto
            transition-all duration-1000 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className="mb-8">
            <h1
              className="
                text-[180px] lg:text-[240px] xl:text-[280px]
                font-['Halyard_Display-Bold']
                text-white
                leading-none
                tracking-tight
                mb-0
              "
              style={{
                background: 'linear-gradient(180deg, #ffffff 0%, #666666 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text'
              }}
            >
              404
            </h1>
          </div>

          <h2
            className="
              text-3xl md:text-4xl lg:text-5xl
              font-['Halyard_Display-SemiBold']
              text-white
              mb-6
              tracking-tight
            "
          >
            Stránka nenalezena
          </h2>

          <p
            className="
              text-base md:text-lg lg:text-xl
              font-['Halyard_Display-Regular']
              text-gray-400
              mb-12
              max-w-2xl mx-auto
              leading-relaxed
            "
          >
            Omlouváme se, ale stránka, kterou hledáte, neexistuje nebo byla přesunuta.
          </p>

          <Button
            onClick={() => navigate("/")}
            className="
              bg-white
              text-black
              hover:bg-gray-200
              font-['Halyard_Display-Medium']
              text-base md:text-lg
              px-8 md:px-12
              py-6 md:py-7
              rounded-full
              transition-all
              duration-300
              hover:scale-105
              shadow-lg
              hover:shadow-2xl
            "
          >
            Zpět na hlavní stránku
          </Button>

          <div className="mt-16 flex justify-center gap-8 text-sm text-gray-600">
            <button
              onClick={() => navigate("/services")}
              className="
                hover:text-white
                transition-colors
                duration-300
                font-['Halyard_Display-Regular']
              "
            >
              Služby
            </button>
            <span className="text-gray-800">|</span>
            <button
              onClick={() => navigate("/portfolio")}
              className="
                hover:text-white
                transition-colors
                duration-300
                font-['Halyard_Display-Regular']
              "
            >
              Portfolio
            </button>
            <span className="text-gray-800">|</span>
            <button
              onClick={() => navigate("/contact")}
              className="
                hover:text-white
                transition-colors
                duration-300
                font-['Halyard_Display-Regular']
              "
            >
              Kontakt
            </button>
          </div>
        </div>
      </div>

      <div
        className="
          absolute
          top-1/2
          left-1/2
          -translate-x-1/2
          -translate-y-1/2
          w-[600px]
          h-[600px]
          bg-white
          rounded-full
          opacity-[0.02]
          blur-[100px]
          pointer-events-none
          z-0
        "
      />
    </div>
  );
};
