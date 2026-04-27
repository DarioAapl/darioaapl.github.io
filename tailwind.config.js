/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html'],
  theme: {
    extend: {
      colors: {
        ice:      '#e8f4ff',
        sky:      '#b8dcff',
        cyan:     '#7fdfff',
        cobalt:   '#2a7cd8',
        navy:     '#0a3d8f',
        midnight: '#0a2a5f',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
