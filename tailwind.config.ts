import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],

  theme: {
    extend: {
      fontFamily: {
        sans: ['Pretendard', 'system-ui', 'sans-serif'],
      },

      colors: {
        black: 'hsl(var(--black) / <alpha-value>)',
        white: 'hsl(var(--white) / <alpha-value>)',
        gray: {
          100: 'hsl(var(--gray-100) / <alpha-value>)',
          300: 'hsl(var(--gray-300) / <alpha-value>)',
          600: 'hsl(var(--gray-600) / <alpha-value>)',
          800: 'hsl(var(--gray-800) / <alpha-value>)',
        },
        error: 'hsl(var(--error) / <alpha-value>)',
      },

      fontSize: {
        'title-hero': ['32px', { lineHeight: '46px' }],
        'title-page-md': ['40px', { lineHeight: '52px' }],
        'title-page-sm': ['32px', { lineHeight: '46px' }],

        'heading-lg': ['24px', { lineHeight: '32px' }],
        'heading-md': ['20px', { lineHeight: '30px' }],
        'heading-sm': ['18px', { lineHeight: '30px' }],

        'body-lg': ['18px', { lineHeight: '26px' }],
        'body-md': ['16px', { lineHeight: '24px' }],
        'body-sm': ['14px', { lineHeight: '20px' }],

        caption: ['12px', { lineHeight: '16px' }],

        'component-notes-md': ['12px', { lineHeight: '16px' }],
        'component-notes-sm': ['10px', { lineHeight: '14px' }],

        'button-md': ['16px', { lineHeight: '20px' }],
        'button-sm': ['14px', { lineHeight: '18px' }],
      },
    },
  },
  plugins: [],
};

export default config;
