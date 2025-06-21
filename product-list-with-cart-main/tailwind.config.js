/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"], // Asegúrate de incluir todos los archivos relevantes
  theme: {
    extend: {
      colors: {
        'orangestyle': 'hsl(14, 86%, 42%)',
        'greenstyle': 'hsl(159, 69%, 38%)',
        'rose-50': 'hsl(20, 50%, 98%)',
        'rose-100': 'hsl(13, 31%, 94%)',
        'rose-300': 'hsl(14, 25%, 72%)',
        'rose-400': 'hsl(7, 20%, 60%)',
        'rose-500': 'hsl(12, 20%, 44%)',
        'rose-900': 'hsl(14, 65%, 9%)',
      },
      fontFamily: {
        'redhattext': ['Red Hat Text', 'sans-serif'],
      },
    },
  },

  plugins: [],
}

