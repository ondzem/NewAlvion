import { useEffect, useRef, useState } from 'react';

interface UseHorizontalScrollOptions {
  enabled: boolean;
  sections: number;
  gap: number;
}

export const useHorizontalScroll = ({ enabled, sections, gap }: UseHorizontalScrollOptions) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const accumulatedScroll = useRef(0);
  const isHorizontalActive = useRef(false);
  const isSnapping = useRef(false);
  const entryDirection = useRef<'from-top' | 'from-bottom' | null>(null);
  const hasInitialized = useRef(false);

  const maxScroll = (sections - 1) * (window.innerWidth + gap);

  useEffect(() => {
    if (!enabled) return;

    const isContainerInViewport = () => {
      const container = containerRef.current;
      if (!container) return { inView: false, isCentered: false, position: 'outside' as const };

      const rect = container.getBoundingClientRect();
      const viewportMiddle = window.innerHeight / 2;
      const containerMiddle = rect.top + rect.height / 2;
      const distanceFromCenter = Math.abs(containerMiddle - viewportMiddle);

      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      const isCentered = distanceFromCenter < 100;

      let position: 'above' | 'centered' | 'below' | 'outside' = 'outside';
      if (rect.bottom < 0) position = 'above';
      else if (rect.top > window.innerHeight) position = 'below';
      else if (isCentered) position = 'centered';

      return { inView, isCentered, position, distanceFromCenter };
    };

    const snapToCenter = () => {
      const container = containerRef.current;
      if (!container || isSnapping.current || isHorizontalActive.current) return;

      const rect = container.getBoundingClientRect();
      const viewportMiddle = window.innerHeight / 2;
      const containerMiddle = rect.top + rect.height / 2;
      const distanceFromCenter = containerMiddle - viewportMiddle;

      if (Math.abs(distanceFromCenter) > 10 && Math.abs(distanceFromCenter) < 250) {
        isSnapping.current = true;
        window.scrollBy({
          top: distanceFromCenter,
          behavior: 'smooth',
        });

        setTimeout(() => {
          isSnapping.current = false;
        }, 600);
      }
    };

    const handleWheel = (e: WheelEvent) => {
      const container = containerRef.current;
      if (!container) return;

      const { isCentered, position } = isContainerInViewport();
      const scrollDirection = e.deltaY > 0 ? 'down' : 'up';

      if (!isCentered && !isHorizontalActive.current) {
        if (position === 'above' && scrollDirection === 'down') {
          entryDirection.current = 'from-top';
        } else if (position === 'below' && scrollDirection === 'up') {
          entryDirection.current = 'from-bottom';
        }
        hasInitialized.current = false;
        return;
      }

      if (isCentered && !isHorizontalActive.current && !isSnapping.current) {
        if (!hasInitialized.current) {
          e.preventDefault();
          e.stopPropagation();

          isHorizontalActive.current = true;
          hasInitialized.current = true;

          if (entryDirection.current === 'from-top' || (entryDirection.current === null && scrollDirection === 'down')) {
            accumulatedScroll.current = 0;
            setScrollProgress(0);
            entryDirection.current = 'from-top';
          } else if (entryDirection.current === 'from-bottom' || scrollDirection === 'up') {
            accumulatedScroll.current = maxScroll;
            setScrollProgress(maxScroll);
            entryDirection.current = 'from-bottom';
          }
          return;
        }
      }

      if (isHorizontalActive.current) {
        if (!isCentered) {
          isHorizontalActive.current = false;
          hasInitialized.current = false;
          entryDirection.current = null;
          return;
        }

        e.preventDefault();
        e.stopPropagation();

        const scrollSpeed = 2;
        const delta = e.deltaY * scrollSpeed;

        accumulatedScroll.current += delta;

        if (accumulatedScroll.current < 0) {
          accumulatedScroll.current = 0;
          setScrollProgress(0);
          isHorizontalActive.current = false;
          hasInitialized.current = false;
          entryDirection.current = 'from-top';
          setTimeout(() => {
            window.scrollBy({ top: -200, behavior: 'smooth' });
          }, 50);
          return;
        }

        if (accumulatedScroll.current > maxScroll) {
          accumulatedScroll.current = maxScroll;
          setScrollProgress(maxScroll);
          isHorizontalActive.current = false;
          hasInitialized.current = false;
          entryDirection.current = 'from-bottom';
          setTimeout(() => {
            window.scrollBy({ top: 200, behavior: 'smooth' });
          }, 50);
          return;
        }

        setScrollProgress(accumulatedScroll.current);
      }
    };

    const handleScroll = () => {
      const container = containerRef.current;
      if (!container) return;

      const { isCentered, position } = isContainerInViewport();

      if (!isHorizontalActive.current && !isSnapping.current && isCentered) {
        snapToCenter();
      }

      if (position === 'outside' || position === 'above' || position === 'below') {
        if (!isHorizontalActive.current) {
          hasInitialized.current = false;
          if (position === 'outside') {
            entryDirection.current = null;
          }
        }
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enabled, sections, gap, maxScroll]);

  return {
    containerRef,
    scrollProgress,
  };
};
