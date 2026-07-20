// Design tokens mirroring the web app's Tailwind stone/emerald/teal palette
// (see components/home/HomePage.tsx). Kept local to the mobile app rather
// than in packages/theme because Metro failed to resolve that cross-workspace
// package during dev (see apps/mobile/metro.config.js history).
export const colors = {
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    150: '#efefed',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716b',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    850: '#1f1b19',
    900: '#1c1917',
    950: '#0c0a09',
  },
  emerald: {
    50: '#ecfdf5',
    100: '#d1fae5',
    200: '#a7f3d0',
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
  },
  teal: {
    400: '#2dd4bf',
    500: '#14b8a6',
  },
  red: { 500: '#ef4444', 600: '#dc2626', vnRed: '#DA251D', vnYellow: '#FFCD00' },
  white: '#ffffff',
};

export const spacing = { 0: 0, 1: 4, 2: 8, 3: 12, 4: 16, 5: 20, 6: 24, 8: 32, 10: 40 };

export const radius = { sm: 6, md: 8, lg: 12, xl: 16, '2xl': 20, '3xl': 24, full: 999 };

export const typography = {
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  weights: {
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
    black: '900' as const,
  },
};
