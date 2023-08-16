/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./build/*.html', './build/js/*.js'],
  theme: {
    extend: {
      keyframes:{
        'open-description': {
          '0%': {transform: 'scaleY(0)'},
          '80%': {transform: 'scaleY(1.2)'},
          '100%': {transform: 'scaleY(1)'}
        },
        'close-description': {
          '0%': {transform: 'scaleY(1)'},
          '80%': {transform: 'scaleY(0.6)'},
          '100%': {transform: 'scaleY(0)'}
        }
      },
      animation: {
        'open-description': 'open-description 0.5s ease-in-out backwards',
        'close-description':'close-description 0.5s ease-in-out backwards'
      }
    },
  },
  plugins: [],
}

