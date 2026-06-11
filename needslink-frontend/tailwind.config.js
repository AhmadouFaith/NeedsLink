/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Inspired by the Cameroonian flag (green, red, yellow) and the warmth of community
        forest:  { DEFAULT: '#1B5E20', 50:'#E8F5E9', 100:'#C8E6C9', 200:'#A5D6A7', 300:'#81C784', 400:'#66BB6A', 500:'#4CAF50', 600:'#2E7D32', 700:'#1B5E20', 800:'#144d19', 900:'#0d3a12' },
        ember:   { DEFAULT: '#B71C1C', 50:'#FFEBEE', 100:'#FFCDD2', 200:'#EF9A9A', 300:'#E57373', 400:'#EF5350', 500:'#F44336', 600:'#E53935', 700:'#D32F2F', 800:'#C62828', 900:'#B71C1C' },
        gold:    { DEFAULT: '#F57F17', 50:'#FFFDE7', 100:'#FFF9C4', 200:'#FFF59D', 300:'#FFF176', 400:'#FFEE58', 500:'#FFEB3B', 600:'#FDD835', 700:'#F9A825', 800:'#F57F17', 900:'#E65100' },
        earth:   { DEFAULT: '#5D4037', 50:'#EFEBE9', 100:'#D7CCC8', 200:'#BCAAA4', 300:'#A1887F', 400:'#8D6E63', 500:'#795548', 600:'#6D4C41', 700:'#5D4037', 800:'#4E342E', 900:'#3E2723' },
        ivory:   { DEFAULT: '#FAFAF7', light:'#FFFFFF', dark:'#F0EFE9' },
        ink:     { DEFAULT: '#1A1A18', muted:'#4A4A45', light:'#8A8A82' },
      },
      fontFamily: {
        display: ['"Playfair Display"', 'Georgia', 'serif'],
        body:    ['"Inter"', 'system-ui', 'sans-serif'],
        mono:    ['"JetBrains Mono"', 'monospace'],
      },
      borderRadius: { xl:'1rem', '2xl':'1.5rem', '3xl':'2rem' },
      boxShadow: {
        card:  '0 2px 16px 0 rgba(27,94,32,0.08)',
        hover: '0 8px 32px 0 rgba(27,94,32,0.16)',
        glow:  '0 0 32px 0 rgba(27,94,32,0.24)',
      },
      animation: {
        'fade-up':   'fadeUp 0.6s ease both',
        'fade-in':   'fadeIn 0.4s ease both',
        'pulse-slow':'pulse 3s cubic-bezier(0.4,0,0.6,1) infinite',
      },
      keyframes: {
        fadeUp: { '0%':{ opacity:0, transform:'translateY(24px)' }, '100%':{ opacity:1, transform:'translateY(0)' } },
        fadeIn: { '0%':{ opacity:0 }, '100%':{ opacity:1 } },
      },
    },
  },
  plugins: [],
}
