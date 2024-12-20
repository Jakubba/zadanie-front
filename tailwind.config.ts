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
        primary: '#1d1d1d',
        secondary: '#1d1d1d',
        tertiary: '#1d1d1d',
      },
      backgroundColor: {
        primary: '#F99600',
      },
      backgroundImage: {
        'gradient-primary':
          ' linear-gradient(98deg, rgba(238, 223, 201, 1) 10%, rgba(41, 53, 86, 0) 100%);',
        'gradient-secondary':
          'linear-gradient(98deg, rgba(170, 181, 199, 1) 10%, rgba(255, 255, 255, 0 ) 100%);',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      boxShadow: {
        'custom-shadow': '36px 26px 52px -25px rgba(66, 68, 90, 1)',
      },
    },
  },
  plugins: [],
};
export default config;
