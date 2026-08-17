/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#050505',
        paper: '#F5F5F5',
        electric: '#2457FF',
        ash: '#858585',
        hair: 'rgba(255,255,255,0.15)',
      },
      fontFamily: {
        display: ['"Space Grotesk Variable"', 'Space Grotesk', 'sans-serif'],
        sans: ['"Inter Variable"', 'Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        tightest: '-0.055em',
        meta: '0.22em',
      },
      transitionTimingFunction: {
        editorial: 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
