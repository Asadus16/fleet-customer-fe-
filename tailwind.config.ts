import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Primary brand colors
        primary: {
          DEFAULT: '#2873AC',
          hover: '#1f5f8f',
          light: '#1a75bc',
        },
        // Dark navy
        navy: {
          DEFAULT: '#141543',
        },
        // Neutral colors
        neutral: {
          border: '#D3D3D3',
          label: '#8D8D8D',
          placeholder: '#141543',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        manrope: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
        kameron: ['var(--font-kameron)', 'Georgia', 'serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '1' }],
      },
      letterSpacing: {
        'tight-2': '-0.02em',
        'tight-3': '-0.03em',
        'wide-12': '0.12em',
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-in-out',
        'slide-in': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
