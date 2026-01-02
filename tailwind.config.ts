import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        golden: {
          50: '#fdfcf9',
          100: '#f9f6ed',
          200: '#f2ead1',
          300: '#e8d9a8',
          400: '#d9bf7a',
          500: '#c9a961',
          600: '#b38f4d',
          700: '#967640',
          800: '#7a5f37',
          900: '#644f2f',
          950: '#3a2d1a',
        },
        dark: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d5dae2',
          300: '#b0bac9',
          400: '#8695ab',
          500: '#677890',
          600: '#526077',
          700: '#434e61',
          800: '#3a4252',
          900: '#343a46',
          950: '#1a1d24',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
};
export default config;
