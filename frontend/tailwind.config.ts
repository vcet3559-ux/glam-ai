import type { Config } from 'tailwindcss'
import defaultTheme from 'tailwindcss/defaultTheme'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        primary: '#FF006E',
        secondary: '#FB5607',
        accent: '#FFBE0B',
        dark: '#0A0E27',
        light: '#F8F9FA',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FF006E 0%, #FB5607 100%)',
        'gradient-glass': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05))',
      },
      backdropBlur: {
        glass: '10px',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
}

export default config
