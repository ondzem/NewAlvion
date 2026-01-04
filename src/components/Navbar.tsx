import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnimatedElement } from "../hooks/useAnimatedElement";
import { useScrollPersistence } from "../hooks/useScrollPersistence";
import { useResponsiveLayout } from "../hooks/useResponsiveLayout";
import { useResponsiveLayoutMobile } from "../hooks/useResponsiveLayoutMobile";

interface NavbarProps {
  variant: "desktop" | "mobile";
}

const ANIM_MS = 1600; // délka "rozlití" (ms) - ještě pomalejší
const ITEM_STAGGER = 200; // ms mezi položkami - víc času mezi itemy
const ITEM_FADE_MS = 700; // delší fade-in pro text

export const Navbar = ({ variant }: NavbarProps): JSX.Element => {
  const navigate = useNavigate();
  const { activeSection, scrollToSection } = useScrollPersistence();
  const desktopLayout = useResponsiveLayout();
  const mobileLayout = useResponsiveLayoutMobile();

  const { layout, getResponsiveValue } = variant === "desktop" ? desktopLayout : mobileLayout;
  const navigationLayout = getResponsiveValue(layout.navigation);

  const hamburgerAnimation = useAnimatedElement({
    animationClass: "animate-fade-in",
    delayClass: "delay-300",
  });

  const [isMenuOpen, setIsMenuOpen] = useState(false); // zdroj pravdy (uživatel klikne)
  const [menuVisible, setMenuVisible] = useState(false); // mount overlay
  const [overlayOpen, setOverlayOpen] = useState(false); // toggluje CSS animaci (clip-path)
  const menuRef = useRef<HTMLDivElement | null>(null);
  const hamburgerRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLDivElement | null>(null);

  // Otevření/zavření - správa mount/unmount a animace
  useEffect(() => {
    if (isMenuOpen) {
      // mountujeme overlay
      setMenuVisible(true);
      // small tick -> spustíme rozlití (clip-path grow)
      requestAnimationFrame(() => {
        // další frame aby se CSS tranzice spustila korektně
        requestAnimationFrame(() => {
          setOverlayOpen(true);
        });
      });
    } else {
      // zavírání: shrink clip-path, poté unmount po konci animace
      setOverlayOpen(false);
      // po animaci unmountneme
      const t = window.setTimeout(() => {
        setMenuVisible(false);
      }, ANIM_MS + 40); // malý safety buffer
      return () => clearTimeout(t);
    }
  }, [isMenuOpen]);

  // blokování scrollu pozadí, když je overlay mountnutý
  useEffect(() => {
    const prev = document.body.style.overflow;
    if (menuVisible) document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev || "";
    };
  }, [menuVisible]);

  // click outside + ESC
  useEffect(() => {
    const onDocDown = (e: MouseEvent) => {
      if (!menuVisible) return;
      const target = e.target as Node;
      if (
        menuRef.current &&
        !menuRef.current.contains(target) &&
        hamburgerRef.current &&
        !hamburgerRef.current.contains(target)
      ) {
        setIsMenuOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuVisible) setIsMenuOpen(false);
    };
    document.addEventListener("mousedown", onDocDown);
    document.addEventListener("touchstart", onDocDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDocDown);
      document.removeEventListener("touchstart", onDocDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [menuVisible]);

  // focus management: po dokončení otevření chceme fokus na první položku
  useEffect(() => {
    if (overlayOpen) {
      const t = window.setTimeout(() => {
        firstItemRef.current?.focus();
      }, ANIM_MS * 0.6); // po většině rozlití
      return () => clearTimeout(t);
    }
  }, [overlayOpen]);

  // Navigace / scroll handlers
  const handleNavigation = (path: string) => {
    setIsMenuOpen(false);
    sessionStorage.removeItem(`scrollPosition_${path}`);
    window.scrollTo(0, 0); // ⬅️ TADY
    navigate(path);
  };
  const handleSectionScroll = (id: string) => {
    setIsMenuOpen(false);
    scrollToSection(id);
  };

  // Stylování - využíváme clip-path circle, start at top-right (100% 0%)
  // overlay element má 15px gap od okrajů => top/right/bottom/left = 15px
  const edgeGapPx = 15;
  const borderRadiusPx = 40;

  // Clip sizes: 0 -> velká hodnota, použití procent pracuje dobře pro různá rozlišení.
  const closedClip = `circle(0% at 100% 0%)`;
  const openClip = `circle(200% at 100% 0%)`; // 200% bezpečně pokryje celý area

  const overlayBase: React.CSSProperties = {
    position: "fixed",
    top: `${edgeGapPx}px`,
    left: `${edgeGapPx}px`,
    right: `${edgeGapPx}px`,
    bottom: `${edgeGapPx}px`,
    borderRadius: `${borderRadiusPx}px`,
    background: "#000", // černé pozadí
    zIndex: 2000,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    // clip-path animace (liquid rozlití)
    clipPath: overlayOpen ? openClip : closedClip,
    WebkitClipPath: overlayOpen ? openClip : closedClip,
    transition: `clip-path ${ANIM_MS}ms cubic-bezier(.19,1,.22,1),
             -webkit-clip-path ${ANIM_MS}ms cubic-bezier(.19,1,.22,1),
             opacity ${ANIM_MS / 2}ms ease`,
    opacity: overlayOpen ? 1 : 0,
    pointerEvents: overlayOpen ? "auto" : "none",
    boxSizing: "border-box",
    padding: "24px",
  };

  // Hamburger visual transform
  const topLineTransform = isMenuOpen ? "rotate(45deg) translate(6px, 6px)" : "none";
  const bottomLineTransform = isMenuOpen ? "rotate(-45deg) translate(6px, -6px)" : "none";

  const currentHamburger = variant === "desktop"
    ? {
        container: {
          width: `${navigationLayout.hamburgerWidth}px`,
          height: `${navigationLayout.hamburgerHeight}px`,
          position: "relative" as const,
          cursor: "pointer",
          zIndex: 2100,
        },
        topLine: {
          position: "absolute" as const,
          top: 0,
          right: 0,
          width: `${navigationLayout.hamburgerWidth * 1.25}px`,
          height: "4px",
          background: "#fff",
          borderRadius: "3px",
          transform: topLineTransform,
          transition: "transform 260ms ease, width 150ms ease",
        },
        bottomLine: {
          position: "absolute" as const,
          bottom: 0,
          right: 0,
          width: `${navigationLayout.hamburgerWidth * 0.875}px`,
          height: "4px",
          background: "#fff",
          borderRadius: "3px",
          transform: bottomLineTransform,
          transition: "transform 260ms ease, width 150ms ease",
        },
      }
    : {
        container: {
          width: `${navigationLayout.hamburgerWidth}px`,
          height: `${navigationLayout.hamburgerHeight}px`,
          position: "relative" as const,
          cursor: "pointer",
          zIndex: 2100,
        },
        topLine: {
          position: "absolute" as const,
          top: "2px",
          right: 0,
          width: `${navigationLayout.hamburgerWidth * 1.14}px`,
          height: "4px",
          background: "#fff",
          borderRadius: "3px",
          transform: topLineTransform,
          transition: "transform 260ms ease, width 150ms ease",
        },
        bottomLine: {
          position: "absolute" as const,
          bottom: "2px",
          right: 0,
          width: `${navigationLayout.hamburgerWidth * 0.857}px`,
          height: "4px",
          background: "#fff",
          borderRadius: "3px",
          transform: bottomLineTransform,
          transition: "transform 260ms ease, width 150ms ease",
        },
      };

  // menu items styling: bílé, centrované, pod sebou; animace opacity+translateY se stagery
  const menuItems = [
    { key: "home", label: "Home", onClick: () => handleNavigation("/") },
    { key: "services", label: "Služby", onClick: () => handleNavigation("/services") },
    { key: "portfolio", label: "Reference", onClick: () => handleNavigation("/portfolio") },
    { key: "contact", label: "Kontakt", onClick: () => handleNavigation("/contact") },
  ];

  const itemBase: React.CSSProperties = {
    color: "#fff",
    cursor: "pointer",
    textAlign: "center" as const,
    userSelect: "none" as const,
    outline: "none",
    border: "none",
    background: "transparent",
  };

  return (
    <>
      {/* Hamburger */}
      <div
        ref={hamburgerRef}
        className={`group ${hamburgerAnimation.className}`}
        style={{
          ...(currentHamburger.container as React.CSSProperties),
          ...hamburgerAnimation.style,
          position: 'absolute',
          top: `${navigationLayout.top}px`,
          right: typeof navigationLayout.right === 'string' ? navigationLayout.right : `${navigationLayout.right}px`,
        }}
        onClick={() => setIsMenuOpen((s) => !s)}
        aria-expanded={isMenuOpen}
        aria-controls="site-menu"
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setIsMenuOpen((s) => !s);
        }}
      >
        <div
          style={currentHamburger.topLine as React.CSSProperties}
          className={isMenuOpen ? "" : "group-hover:opacity-80"}
        />
        <div
          style={currentHamburger.bottomLine as React.CSSProperties}
          className={isMenuOpen ? "" : "group-hover:opacity-80"}
        />
      </div>

      {/* Overlay - mount only when menuVisible true */}
      {menuVisible && (
        <div
          id="site-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          style={overlayBase}
        >
          {/* Vnitřní kontejner pro centrování položek */}
          <div
            style={{
              width: "100%",
              maxWidth: "980px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "16px",
              padding: "12px 28px",
              boxSizing: "border-box",
            }}
          >
            {menuItems.map((it, i) => {
  const appearDelay = overlayOpen
    ? `${200 + i * ITEM_STAGGER}ms`
    : `${(menuItems.length - 1 - i) * ITEM_STAGGER}ms`;

  const transformWhenHidden = "translateY(12px)";
  const style: React.CSSProperties = {
    ...itemBase,
    fontSize: variant === "desktop" ? 28 : 34,
    opacity: overlayOpen ? 1 : 0,
    transform: overlayOpen ? "translateY(0)" : transformWhenHidden,
    transition: `
      opacity ${ITEM_FADE_MS}ms ease ${appearDelay},
      transform ${ITEM_FADE_MS}ms cubic-bezier(.22,.9,.25,1) ${appearDelay}
    `,
    padding: "8px 12px",
    borderRadius: 8,
    width: "100%",
    maxWidth: 760,
    display: "flex",
    justifyContent: "center",
  };

  const activeClass =
    it.key === activeSection ? { color: "#9CA3AF" } : undefined;

  return (
    <div
      key={it.key}
      role="button"
      tabIndex={0}
      ref={i === 0 ? firstItemRef : undefined}
      onClick={() => {
        it.onClick();
        setIsMenuOpen(false);
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          it.onClick();
          setIsMenuOpen(false);
        }
      }}
      style={{ ...style, ...(activeClass || {}) }}
    >
      <span
        style={{
          lineHeight: variant === "desktop" ? "36px" : "44px",
        }}
      >
        {it.label}
      </span>
    </div>
  );
})}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;