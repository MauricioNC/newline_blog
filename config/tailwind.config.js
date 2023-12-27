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
        'gv-baltic-sea': '#282828',
        'gv-red-orange': '#FB4934',
        'gv-dark-jungle': '#1D2021',
        'gv-oasis': '#FBF1C7',
        'gv-oasis-400': 'rgba(251, 241, 199, 0.4)',
        'gv-cornsilk': '#FBF5D7',
        'gv-smalt-blue': '#458588',
        'gv-morning-blue': '#83A598',
        'gv-tulip-pink': '#B16286',
        'gv-grey-green': '#689D6A',
        'gv-dark-aqua': '#076678',
        'gv-pistachio': '#8EC07C',
        'gv-bamboo': '#D65D0E',
        'gv-fire': '#AF3A03',
      },
      boxShadow: {
        'hard': '4px 6px 0 0 #000',
      }
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}
