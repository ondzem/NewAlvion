import { useState, useEffect, useRef, useCallback } from 'react';
import { getCurrentBreakpoint, type Breakpoint } from '../config/breakpoints';
import { layoutConfig, type ResponsiveValue } from '../config/layout';

export const useResponsiveLayout = () => {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>(getCurrentBreakpoint());
  const resizeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleResize = useCallback(() => {
    if (resizeTimeoutRef.current) {
      clearTimeout(resizeTimeoutRef.current);
    }
    resizeTimeoutRef.current = setTimeout(() => {
      const newBreakpoint = getCurrentBreakpoint();
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

  const getResponsiveValue = <T,>(responsiveValue: ResponsiveValue<T>): T => {
    const effectiveBreakpoint = (breakpoint === 'sm' || breakpoint === 'md') ? 'lg' : breakpoint;
    return responsiveValue[effectiveBreakpoint];
  };

  return {
    breakpoint,
    layout: layoutConfig,
    getResponsiveValue,
  };
};
