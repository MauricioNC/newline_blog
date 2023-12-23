const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    screens: {
      'xs': '320px',
      ...defaultTheme.screens
    },
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
        montserrat: 'Montserrat'
      },
      height: {
        'bannerH': '450px'
      },
      boxShadow: {
        'tagsShadow': '#076678'
      },
      colors: {
        'gv-red-orange': '#FB4934',
        'gv-dark': '#1D2021',
        'gv-oasis': '#FBF1C7',
        'gv-smalt-blue': '#458588',
        'gv-tulip-pink': '#B16286',
        'gv-grey-green': '#689D6A',
        'gv-dark-aqua': '#076678',
        'gv-pistachio': '#8EC07C',
        'gv-bamboo': '#D65D0E',
        'gv-fire': '#AF3A03',
      },
      boxShadow: {
        'hard': '4px 4px 0 0 #000'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}
