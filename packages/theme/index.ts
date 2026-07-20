// Colors matching web design (Tailwind color palette)
export const colors = {
  // Stone (primary grayscale)
  stone: {
    50: '#fafaf9',
    100: '#f5f5f4',
    200: '#e7e5e4',
    300: '#d6d3d1',
    400: '#a8a29e',
    500: '#78716b',
    600: '#57534e',
    700: '#44403c',
    800: '#292524',
    900: '#1c1917',
    950: '#0c0a09',
  },
  // Emerald (primary accent)
  emerald: {
    400: '#34d399',
    500: '#10b981',
    600: '#059669',
    700: '#047857',
    900: '#064e3b',
    950: '#022c1d',
  },
  // Sky (secondary accent)
  sky: {
    400: '#38bdf8',
    500: '#0ea5e9',
    600: '#0284c7',
  },
  // Violet (tertiary accent)
  violet: {
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
  },
  // Red (destructive)
  red: {
    500: '#ef4444',
    600: '#dc2626',
  },
  // Blue (primary CTA)
  blue: {
    500: '#3b82f6',
    600: '#2563eb',
  },
};

// Spacing (in pixels, will be converted to React Native units)
export const spacing = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  10: 40,
  12: 48,
  16: 64,
};

// Typography sizes (for web and mobile)
export const typography = {
  // Font sizes
  xs: 12,
  sm: 14,
  base: 16,
  lg: 18,
  xl: 20,
  '2xl': 24,
  '3xl': 30,
  '4xl': 36,
  '5xl': 48,
  // Font weights
  weights: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800',
    black: '900',
  },
  // Line heights
  lineHeights: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.625,
    loose: 2,
  },
};

// Radius (border radius)
export const radius = {
  none: 0,
  sm: 4,
  base: 6,
  md: 8,
  lg: 12,
  xl: 16,
  '2xl': 20,
  '3xl': 24,
  full: 9999,
};

// Shadows (for web)
export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  base: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 30px 80px -50px rgba(28, 25, 23, 0.4)',
};

// Light mode (default)
export const lightTheme = {
  colors: {
    background: colors.stone[50],
    foreground: colors.stone[950],
    card: colors.stone[50],
    cardBorder: colors.stone[200],
    text: colors.stone[950],
    textSecondary: colors.stone[600],
    textTertiary: colors.stone[500],
    primary: colors.emerald[500],
    secondary: colors.sky[500],
    accent: colors.violet[600],
    destructive: colors.red[600],
    input: colors.stone[100],
    inputBorder: colors.stone[200],
  },
};

// Dark mode
export const darkTheme = {
  colors: {
    background: colors.stone[950],
    foreground: colors.stone[50],
    card: colors.stone[900],
    cardBorder: colors.stone[800],
    text: colors.stone[50],
    textSecondary: colors.stone[400],
    textTertiary: colors.stone[500],
    primary: colors.emerald[400],
    secondary: colors.sky[400],
    accent: colors.violet[400],
    destructive: colors.red[500],
    input: colors.stone[800],
    inputBorder: colors.stone[700],
  },
};

export type Theme = typeof lightTheme;
export type Colors = Theme['colors'];
