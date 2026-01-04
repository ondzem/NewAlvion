import { useEffect, useRef, useState, useCallback, useMemo } from 'react';

interface UseLockedHorizontalScrollOptions {
  enabled: boolean;
  sections: number;
  gap: number;
}

interface ScrollState {
  currentSection: number;
  progress: number;
  isAtStart: boolean;
  isAtEnd: boolean;
  isLocked: boolean;
}

type ScrollPhase = 'before' | 'locked' | 'after';

export const useLockedHorizontalScroll = ({
  enabled,
  sections,
  gap
}: UseLockedHorizontalScrollOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const [scrollState, setScrollState] = useState<ScrollState>({
    currentSection: 0,
    progress: 0,
    isAtStart: true,
    isAtEnd: false,
    isLocked: false,
  });

  const phaseRef = useRef<ScrollPhase>('before');
  const horizontalProgressRef = useRef(0);
  const isAnimatingRef = useRef(false);
  const lastScrollYRef = useRef(0);
  const accumulatedDeltaRef = useRef(0);
  const lockedScrollYRef = useRef(0);
  const rafIdRef = useRef<number | null>(null);
  const initialWidthRef = useRef(typeof window !== 'undefined' ? window.innerWidth : 1920);

  const padding = 30;
  const sectionWidth = initialWidthRef.current - padding;
  const totalHorizontalScroll = (sections - 1) * (sectionWidth + gap);

  const getTargetScrollY = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return 0;

    const rect = wrapper.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const targetTop = (viewportHeight - wrapper.offsetHeight) / 2;
    return window.scrollY + (rect.top - targetTop);
  }, []);

  const enforceScrollLock = useCallback(() => {
    if (phaseRef.current !== 'locked') return;

    const currentY = window.scrollY;
    const targetY = lockedScrollYRef.current;

    if (Math.abs(currentY - targetY) > 1) {
      window.scrollTo({ top: targetY, behavior: 'instant' as ScrollBehavior });
    }

    rafIdRef.current = requestAnimationFrame(enforceScrollLock);
  }, []);

  const startScrollLock = useCallback(() => {
    lockedScrollYRef.current = getTargetScrollY();
    window.scrollTo({ top: lockedScrollYRef.current, behavior: 'instant' as ScrollBehavior });

    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
    }
    rafIdRef.current = requestAnimationFrame(enforceScrollLock);
  }, [getTargetScrollY, enforceScrollLock]);

  const stopScrollLock = useCallback(() => {
    if (rafIdRef.current) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }
  }, []);

  const getCenteringInfo = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return { isCentered: false, distanceFromCenter: 0, containerTop: 0 };

    const rect = wrapper.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const viewportCenter = viewportHeight / 2;
    const containerCenter = rect.top + rect.height / 2;
    const distanceFromCenter = containerCenter - viewportCenter;

    const tolerance = 5;
    const isCentered = Math.abs(distanceFromCenter) <= tolerance;

    return { isCentered, distanceFromCenter, containerTop: rect.top };
  }, []);

  const scrollToCenter = useCallback(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper || isAnimatingRef.current) return;

    const { distanceFromCenter } = getCenteringInfo();

    if (Math.abs(distanceFromCenter) > 2) {
      isAnimatingRef.current = true;
      window.scrollBy({
        top: distanceFromCenter,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isAnimatingRef.current = false;
        startScrollLock();
      }, 400);
    } else {
      startScrollLock();
    }
  }, [getCenteringInfo, startScrollLock]);

  const updateHorizontalPosition = useCallback((newProgress: number) => {
    const clampedProgress = Math.max(0, Math.min(totalHorizontalScroll, newProgress));
    horizontalProgressRef.current = clampedProgress;

    const currentSection = Math.round(clampedProgress / (sectionWidth + gap));

    setScrollState({
      currentSection,
      progress: clampedProgress,
      isAtStart: clampedProgress <= 0,
      isAtEnd: clampedProgress >= totalHorizontalScroll,
      isLocked: phaseRef.current === 'locked',
    });
  }, [totalHorizontalScroll, sectionWidth, gap]);

  useEffect(() => {
    if (!enabled) return;

    const handleWheel = (e: WheelEvent) => {
      const wrapper = wrapperRef.current;
      if (!wrapper) return;

      const { isCentered, containerTop } = getCenteringInfo();
      const scrollingDown = e.deltaY > 0;
      const scrollingUp = e.deltaY < 0;
      const viewportHeight = window.innerHeight;

      if (phaseRef.current === 'before') {
        if (scrollingDown && containerTop <= viewportHeight && containerTop >= -100) {
          const distanceToCenter = containerTop - (viewportHeight - wrapper.offsetHeight) / 2;

          if (distanceToCenter <= 50 || isCentered) {
            e.preventDefault();
            e.stopPropagation();

            phaseRef.current = 'locked';
            horizontalProgressRef.current = 0;
            updateHorizontalPosition(0);

            scrollToCenter();
            return;
          }
        }
        return;
      }

      if (phaseRef.current === 'locked') {
        e.preventDefault();
        e.stopPropagation();

        if (isAnimatingRef.current) return;

        const sensitivity = 1.2;
        const delta = e.deltaY * sensitivity;

        accumulatedDeltaRef.current += delta;

        const newProgress = horizontalProgressRef.current + accumulatedDeltaRef.current;
        accumulatedDeltaRef.current = 0;

        if (newProgress < 0 && scrollingUp) {
          phaseRef.current = 'before';
          updateHorizontalPosition(0);
          stopScrollLock();

          setTimeout(() => {
            window.scrollBy({ top: -100, behavior: 'smooth' });
          }, 50);
          return;
        }

        if (newProgress > totalHorizontalScroll && scrollingDown) {
          phaseRef.current = 'after';
          updateHorizontalPosition(totalHorizontalScroll);
          stopScrollLock();

          setTimeout(() => {
            window.scrollBy({ top: 100, behavior: 'smooth' });
          }, 50);
          return;
        }

        updateHorizontalPosition(newProgress);
        return;
      }

      if (phaseRef.current === 'after') {
        if (scrollingUp) {
          const wrapperRect = wrapper.getBoundingClientRect();

          if (wrapperRect.bottom >= viewportHeight - 100 && wrapperRect.top <= 100) {
            const distanceFromBottom = viewportHeight - wrapperRect.bottom;

            if (distanceFromBottom <= 50 || isCentered) {
              e.preventDefault();
              e.stopPropagation();

              phaseRef.current = 'locked';
              horizontalProgressRef.current = totalHorizontalScroll;
              updateHorizontalPosition(totalHorizontalScroll);

              scrollToCenter();
              return;
            }
          }
        }
        return;
      }
    };

    const handleScroll = () => {
      lastScrollYRef.current = window.scrollY;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (phaseRef.current !== 'locked') return;

      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].includes(e.key)) {
        e.preventDefault();

        const isDown = ['ArrowDown', 'PageDown', 'Space'].includes(e.key);
        const delta = isDown ? 200 : -200;

        const newProgress = horizontalProgressRef.current + delta;

        if (newProgress < 0) {
          phaseRef.current = 'before';
          updateHorizontalPosition(0);
          stopScrollLock();
          window.scrollBy({ top: -100, behavior: 'smooth' });
        } else if (newProgress > totalHorizontalScroll) {
          phaseRef.current = 'after';
          updateHorizontalPosition(totalHorizontalScroll);
          stopScrollLock();
          window.scrollBy({ top: 100, behavior: 'smooth' });
        } else {
          updateHorizontalPosition(newProgress);
        }
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (phaseRef.current === 'locked') {
        lastScrollYRef.current = e.touches[0].clientY;
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (phaseRef.current !== 'locked') return;

      e.preventDefault();

      const currentY = e.touches[0].clientY;
      const deltaY = lastScrollYRef.current - currentY;
      lastScrollYRef.current = currentY;

      const sensitivity = 2;
      const newProgress = horizontalProgressRef.current + deltaY * sensitivity;

      if (newProgress < 0) {
        phaseRef.current = 'before';
        updateHorizontalPosition(0);
        stopScrollLock();
      } else if (newProgress > totalHorizontalScroll) {
        phaseRef.current = 'after';
        updateHorizontalPosition(totalHorizontalScroll);
        stopScrollLock();
      } else {
        updateHorizontalPosition(newProgress);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      stopScrollLock();
    };
  }, [enabled, sections, gap, totalHorizontalScroll, sectionWidth, getCenteringInfo, scrollToCenter, updateHorizontalPosition, stopScrollLock]);

  const setHorizontalProgress = useCallback((progress: number) => {
    horizontalProgressRef.current = progress;
    updateHorizontalPosition(progress);

    if (phaseRef.current !== 'locked') {
      phaseRef.current = 'locked';
      startScrollLock();
    }
  }, [updateHorizontalPosition, startScrollLock]);

  return {
    containerRef,
    wrapperRef,
    scrollState,
    setHorizontalProgress,
  };
};
