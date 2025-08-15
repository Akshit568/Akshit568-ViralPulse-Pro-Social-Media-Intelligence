/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
      colors: {
        'cyber': {
          'purple': '#a855f7',
          'teal': '#14b8a6',
          'blue': '#3b82f6',
          'pink': '#ec4899',
          'green': '#10b981',
        },
        'glass': {
          'light': 'rgba(255, 255, 255, 0.1)',
          'dark': 'rgba(0, 0, 0, 0.2)',
        }
      },
      backgroundImage: {
        'gradient-cyber': 'linear-gradient(135deg, #a855f7 0%, #14b8a6 50%, #3b82f6 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)',
      },
      backdropBlur: {
        'xs': '2px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          'from': { 'box-shadow': '0 0 20px #a855f7' },
          'to': { 'box-shadow': '0 0 30px #14b8a6, 0 0 40px #14b8a6' },
        }
      }
    },
  },
  plugins: [],
}