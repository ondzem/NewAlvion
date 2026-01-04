import React, { useEffect, useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

interface AlvionLogoProps {
  className?: string;
  size?: "small" | "medium" | "large" | "mobile-sm" | "mobile-md" | "desktop";
  href?: string;
  alt?: string;
  fallbackSrc?: string;
  inlineOnClient?: boolean;
  animateOnHover?: boolean;
  isCurrent?: boolean;
  customSpacing?: string;
  customLetterOffsets?: {
    A?: string;
    L?: string;
    V?: string;
    I?: string;
    O?: string;
    N?: string;
  };
  customLetterSpacing?: {
    A?: string;
    L?: string;
    V?: string;
    I?: string;
    O?: string;
    N?: string;
  };
}

const svgLetters = [
  { letter: "A", src: "/A - Alvion Logo.svg", offset: "translate-y-0" },
  { letter: "L", src: "/L - Alvion Logo.svg", offset: "translate-y-0" },
  { letter: "V", src: "/V - Alvion Logo.svg", offset: "translate-y-[1px]" },
  { letter: "I", src: "/I - Alvion Logo copy.svg", offset: "translate-y-[1px]" },
  { letter: "O", src: "/O - Alvion Logo.svg", offset: "translate-y-[1px]" },
  { letter: "N", src: "/N - Alvion Logo copy.svg", offset: "translate-y-[1px]", spacing: "ml-[-18px]" },
];

export const AlvionLogo = ({
  className = "",
  size = "medium",
  href = "/",
  alt = "Alvion",
  fallbackSrc = "/alvion-logo.svg",
  inlineOnClient = true,
  animateOnHover = true,
  isCurrent,
  customSpacing,
  customLetterOffsets,
  customLetterSpacing,
}: AlvionLogoProps): JSX.Element => {
  const { getLetterStyle } = useScrollAnimation();

  const sizeClasses: Record<NonNullable<AlvionLogoProps["size"]>, string> = {
    small: "h-6 w-auto",
    medium: "h-8 w-auto",
    large: "h-[46px] w-auto",
    "mobile-sm": "h-[40px] w-auto",
    "mobile-md": "h-[45px] w-auto",
    desktop: "h-[46px] w-auto",
  };

  const [inlineSvgs, setInlineSvgs] = useState<Record<number, string | null>>({});
  const [enhanced, setEnhanced] = useState(false);
  const [current, setCurrent] = useState<boolean>(() => Boolean(isCurrent));
  const [collapsed, setCollapsed] = useState(false); // jen "A"

  useEffect(() => {
    setEnhanced(true);
    if (typeof isCurrent === "undefined" && typeof window !== "undefined") {
      try {
        setCurrent(window.location.pathname === href);
      } catch {}
    } else if (typeof isCurrent !== "undefined") {
      setCurrent(Boolean(isCurrent));
    }
  }, [href, isCurrent]);

  useEffect(() => {
    if (!inlineOnClient) return;
    let mounted = true;
    Promise.all(
      svgLetters.map((l) =>
        fetch(encodeURI(l.src))
          .then((r) => (r.ok ? r.text() : Promise.resolve("")))
          .then((text) => text.replace(/^\s*<\?xml[^>]*>\s*/i, ""))
          .catch(() => "")
      )
    ).then((results) => {
      if (!mounted) return;
      const map: Record<number, string | null> = {};
      results.forEach((r, i) => (map[i] = r || null));
      setInlineSvgs(map);
    });
    return () => {
      mounted = false;
    };
  }, [inlineOnClient]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const newY = window.scrollY;
      if (newY > lastScrollY + 5) {
        setCollapsed(true); // scroll dolů
      } else if (newY < lastScrollY - 5) {
        setCollapsed(false); // scroll nahoru
      }
      lastScrollY = newY;
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <a
      href={href}
      aria-label={`${alt} homepage`}
      {...(current ? { "aria-current": "page" } : {})}
      className={`menu-logo-link-wrapper inline-block group ${className}`}
      style={{ opacity: 0.9 }} // Set logo to semi-transparent
    >
      <div className={`flex items-center relative ${sizeClasses[size]}`}>
        {svgLetters.map((letter, index) => {
          const inlineSvg = inlineSvgs[index];
          const haveInline = Boolean(inlineSvg);
          const delay = (svgLetters.length - index - 1) * 80;
          const letterStyle = getLetterStyle(index);

          const customOffset = customLetterOffsets?.[letter.letter as keyof typeof customLetterOffsets];
          const customLetterSpacingValue = customLetterSpacing?.[letter.letter as keyof typeof customLetterSpacing];
          const finalSpacing = customLetterSpacingValue || customSpacing || (letter.spacing || "-ml-6");

          const baseTransform = customOffset || letter.offset;
          const collapsedTransform = collapsed && index !== 0 ? "translateY(-10px)" : "";

          const transformValue = baseTransform.includes('translate-y')
            ? baseTransform.replace('translate-y-', '').replace('[', '').replace(']', '')
            : '0';

          const yOffset = transformValue === '0' ? 0 : parseInt(transformValue.replace('px', ''));
          const finalYTransform = collapsed && index !== 0 ? -10 : yOffset;

          return (
            <span
              key={index}
              className={`letter-wrapper relative inline-block ${finalSpacing}`}
              data-letter={letter.letter}
              aria-hidden={false}
              style={{
                ...letterStyle,
                transition: "all 0.4s ease",
                transitionDelay: `${delay}ms`,
                opacity: collapsed && index !== 0 ? 0 : 1,
                visibility: collapsed && index !== 0 ? "hidden" : "visible",
                transform: `translateY(${finalYTransform}px)`,
                display: "inline-block",
                width: "auto",
              }}
            >
              <img
                src={letter.src}
                alt={letter.letter}
                loading="lazy"
                className={`block ${sizeClasses[size]} object-contain ${
                  haveInline ? "opacity-0" : "opacity-100"
                }`}
                aria-hidden={haveInline}
              />
              {haveInline && (
                <span
                  className={`inline-svg absolute left-0 top-0 h-full w-auto pointer-events-none ${
                    enhanced ? "opacity-100" : "opacity-0"
                  }`}
                  aria-hidden="true"
                  dangerouslySetInnerHTML={{ __html: inlineSvg as string }}
                />
              )}
            </span>
          );
        })}
      </div>
      <style>{`
        .letter-wrapper { display: inline-block; }
        ${
          animateOnHover
            ? `.menu-logo-link-wrapper.group:hover .letter-wrapper,
               .menu-logo-link-wrapper:focus .letter-wrapper { transform: translateY(-2px); }`
            : ""
        }
        .inline-svg > svg { height: 100%; width: auto; display: block; }
      `}</style>
    </a>
  );
};

export default AlvionLogo;