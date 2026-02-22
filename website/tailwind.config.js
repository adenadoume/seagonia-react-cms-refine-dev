/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        navy:     { DEFAULT: '#1A1F3D', light: '#2A3058' },
        gold:     { DEFAULT: '#C9A96E', light: '#E8D5A3', dark: '#A8884D' },
        cream:    { DEFAULT: '#FAF8F3' },
        ivory:    { DEFAULT: '#F5F0E8' },
        charcoal: { DEFAULT: '#2D2D2D' },
      },
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Outfit', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['6rem', { lineHeight: '1.05', letterSpacing: '0.04em' }],
        'hero':    ['4.5rem', { lineHeight: '1.1', letterSpacing: '0.03em' }],
        'heading': ['3.5rem', { lineHeight: '1.15' }],
        'sub':     ['2.5rem', { lineHeight: '1.2' }],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
        '36': '9rem',
      },
      letterSpacing: {
        'eyebrow': '0.2em',
      },
    },
  },
  plugins: [],
}
