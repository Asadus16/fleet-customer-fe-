/**
 * Centralized theme configuration
 * All colors, fonts, and design tokens should be defined here
 */

export const colors = {
  // Primary brand colors
  primary: {
    DEFAULT: '#2873AC',
    hover: '#1f5f8f',
    light: '#1a75bc',
  },

  // Dark navy (used for footer, testimonials, announcement bar)
  navy: {
    DEFAULT: '#141543',
  },

  // Neutral/Gray colors
  neutral: {
    border: '#D3D3D3',
    label: '#8D8D8D',
    placeholder: '#141543',
  },

  // Text colors
  text: {
    primary: '#1e293b', // slate-800
    secondary: '#475569', // slate-600
    muted: '#94a3b8', // slate-400
  },
} as const;

export const fonts = {
  // Primary font for body text
  sans: ['Inter', 'system-ui', 'sans-serif'],
  // Font for form labels and specific UI elements
  manrope: ['Manrope', 'system-ui', 'sans-serif'],
} as const;

export const fontSizes = {
  xs: '10px',
  sm: '12px',
  base: '14px',
  lg: '16px',
  xl: '18px',
  '2xl': '24px',
  '3xl': '30px',
  '4xl': '36px',
} as const;
