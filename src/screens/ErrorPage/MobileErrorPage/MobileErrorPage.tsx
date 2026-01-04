import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../components/ui/button";
import { Navbar } from "../../../components/Navbar";

export const MobileErrorPage = (): JSX.Element => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setTimeout(() => setIsVisible(true), 100);
  }, []);

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-[#0a0a0a]">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />

      <div className="flex items-center justify-center min-h-screen px-6 sm:px-8">
        <div
          className={`
            text-center max-w-lg mx-auto
            transition-all duration-1000 ease-out
            ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}
        >
          <div className="mb-6">
            <h1
              className="
                text-[120px] sm:text-[150px] md:text-[180px]
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
              text-2xl sm:text-3xl md:text-4xl
              font-['Halyard_Display-SemiBold']
              text-white
              mb-4
              tracking-tight
              px-4
            "
          >
            Stránka nenalezena
          </h2>

          <p
            className="
              text-sm sm:text-base md:text-lg
              font-['Halyard_Display-Regular']
              text-gray-400
              mb-8
              leading-relaxed
              px-4
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
              text-sm sm:text-base
              px-8 sm:px-10
              py-5 sm:py-6
              rounded-full
              transition-all
              duration-300
              hover:scale-105
              shadow-lg
              hover:shadow-2xl
              mx-auto
            "
          >
            Zpět na hlavní stránku
          </Button>

          <div className="mt-12 flex justify-center gap-6 text-xs sm:text-sm text-gray-600 px-4">
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
          w-[400px] sm:w-[500px]
          h-[400px] sm:h-[500px]
          bg-white
          rounded-full
          opacity-[0.02]
          blur-[80px] sm:blur-[100px]
          pointer-events-none
          z-0
        "
      />
    </div>
  );
};
