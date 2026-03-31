/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        wa: {
          teal: '#00a884',
          green: '#25d366',
          'dark-bg': '#111b21',
          'light-bg': '#f0f2f5',
          panel: '#202c33',
          border: '#d1d7db',
          'text-primary': '#111b21',
          'text-secondary': '#667781',
          'text-muted': '#8696a0',
        },
      },
      fontFamily: {
        sans: ["Segoe UI", "Helvetica Neue", "Helvetica", "Lucida Grande", "Arial", "Ubuntu", "Cantarell", "Fira Sans", "sans-serif"],
      },
      animation: {
        reveal: 'fade-in-up 0.6s ease-out forwards',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
