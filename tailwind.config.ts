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
          'linear-gradient(338deg, rgba(242, 242, 242, 0) 0%, rgba(249, 150, 0, 1) 100%);',
        'gradient-secondary':
          'linear-gradient(293deg, rgba(255, 255, 255, 0) 0%, rgba(170, 181, 199, 1) 100%);',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
