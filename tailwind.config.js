/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        wa: {
          teal: {
            DEFAULT: '#00a884',
            dark: '#00735A', // High contrast for AA compliance (5.2:1 on White)
          },
          green: '#25d366',
          'dark-bg': '#111b21',
          'light-bg': '#f0f2f5',
          panel: '#202c33',
          border: '#d1d7db',
          'text-primary': '#111b21',
          'text-secondary': '#667781',
          'text-muted': '#8696a0',
        },
        indigo: {
          500: '#6366f1',
          600: '#4f46e5',
        },
        blue: {
          500: '#3b82f6',
        }
      },
      fontFamily: {
        sans: ['Inter', "Segoe UI", "Helvetica Neue", "Helvetica", "Arial", "sans-serif"],
      },
      animation: {
        reveal: 'fade-in-up 0.6s ease-out forwards',
        'float-slow': 'wa-float 6s ease-in-out infinite',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'wa-float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        }
      },
    },
  },
  plugins: [],
}
