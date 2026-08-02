/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#faf5ef',
          card: '#fcf8f2',
          light: '#fdfbf7',
        },
        brown: {
          DEFAULT: '#3d2826',
          dark: '#3d2826',
          mid: '#4a3531',
          light: '#8c7875',
        },
        pinkAccent: '#ff8eb2',
        purpleAccent: '#9d4edd',
        arch: {
          peach: '#fcece4',
          mint: '#e4f0e5',
          yellow: '#fcf0dc',
          pink: '#fde6e8',
          tan: '#f5ebd9',
        },
        darkBase: '#0a0a0a',
        darkSurface: '#171717',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        display: ['Outfit', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'marquee': 'marquee 25s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
