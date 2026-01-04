import { useState, useEffect, useRef, useCallback } from 'react';
import { breakpoints } from '../config/breakpoints';
import { layoutConfigMobile, type ResponsiveValueMobile, type MobileBreakpoint } from '../config/layout-mobile';

const getCurrentMobileBreakpoint = (): MobileBreakpoint => {
  if (typeof window === 'undefined') return 'mdPlus';

  const width = window.innerWidth;

  if (width < breakpoints.md) return 'sm';
  if (width < breakpoints.mdPlus) return 'md';
  return 'mdPlus';
};

export const useResponsiveLayoutMobile = () => {
  const [breakpoint, setBreakpoint] = useState<MobileBreakpoint>(getCurrentMobileBreakpoint());
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(() => {
      const newBreakpoint = getCurrentMobileBreakpoint();
      setBreakpoint(prev => prev !== newBreakpoint ? newBreakpoint : prev);
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

  const getResponsiveValue = <T,>(responsiveValue: ResponsiveValueMobile<T>): T => {
    return responsiveValue[breakpoint];
  };

  return {
    breakpoint,
    layout: layoutConfigMobile,
    getResponsiveValue,
  };
};
