/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0A0A0C",
        card: "#0E1015",
        sonyBlue: "#0050FF",
        electricCyan: "#00D6FF",
        mutedGray: "#8E8E93",
        lightGray: "#F5F5F7"
      },
      fontFamily: {
        sans: [
          'SF Pro Display',
          '-apple-system',
          'BlinkMacSystemFont',
          'Inter',
          'Segoe UI',
          'Roboto',
          'sans-serif'
        ],
      },
      backgroundImage: {
        'hero-gradient': 'radial-gradient(circle at center, #0B1124 0%, #050505 70%)',
        'accent-gradient': 'linear-gradient(135deg, #0050FF 0%, #00D6FF 100%)',
        'glass-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
        'text-gradient': 'linear-gradient(180deg, #FFFFFF 0%, #A5C4FF 100%)',
      },
      boxShadow: {
        'glow-blue': '0 0 35px -5px rgba(0, 80, 255, 0.35)',
        'glow-cyan': '0 0 30px -5px rgba(0, 214, 255, 0.35)',
        'hud': '0 8px 32px 0 rgba(0, 0, 0, 0.65)',
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
      }
    },
  },
  plugins: [],
}

