/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primario_900: '#1E293B',
        secundario_900: '#4F46E5',
        terciario_900: '#C1CBFD',

        red_primary: '#FF181F',
        alert_primary: '#FF8400',
        success_primary: '#00C851'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'concert-one': ['Concert One', 'cursive']
      },
      screens: {
        tall: { raw: '(min-height: 550px)' }
        // => @media (min-height: 800px) { ... }
      }
    }
  },
  plugins: []
}
