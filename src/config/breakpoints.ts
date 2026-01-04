export type Breakpoint = 'sm' | 'md' | 'lg' | 'lgPlus' | 'xl' | '2xl';

export const breakpoints = {
  mobile: 640,
  tablet: 1024,
  sm: 640,
  md: 768,
  mdPlus: 900,
  lg: 1024,
  lgPlus: 1150,
  xl: 1280,
  '2xl': 1536,
} as const;

export const getCurrentBreakpoint = (): Breakpoint => {
  if (typeof window === 'undefined') return '2xl';

  const width = window.innerWidth;

  if (width < breakpoints.sm) return 'sm';
  if (width < breakpoints.md) return 'md';
  if (width < breakpoints.lg) return 'lg';
  if (width < breakpoints.lgPlus) return 'lgPlus';
  if (width < breakpoints.xl) return 'xl';
  return '2xl';
};
