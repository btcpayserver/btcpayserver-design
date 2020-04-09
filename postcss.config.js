const autoprefixer = require('autoprefixer')
const importer = require('postcss-import')
const nesting = require('postcss-nesting')

// https://github.com/michael-ciniawsky/postcss-load-config
const customProperties = require('postcss-custom-properties')

// design tokens meta description
const variables = require('./src/design/variables')
const colors = require('./src/design/colors')
const spaces = require('./src/design/spaces')
const fonts = require('./src/design/fonts')

// converts the meta format to custom property definition
const metaToProp = (res, { variable, value }) => Object.assign(res, { [variable]: value })

module.exports = {
  plugins: [
    autoprefixer(),
    importer({
      path: ['src/styles', 'src/components'],
    }),
    nesting(),
    customProperties({
      // https://github.com/postcss/postcss-custom-properties#importfrom
      importFrom: [
        () => {
          const variableProperties = variables.reduce(metaToProp, {})
          const colorProperties = colors.reduce(metaToProp, {})
          const spaceProperties = spaces.reduce(metaToProp, {})
          const fontFamilyProperties = fonts.families.reduce(metaToProp, {})
          const fontSizeProperties = fonts.sizes.reduce(metaToProp, {})
          const fontWeightProperties = fonts.families.reduce((res, { weights }) => {
            weights.forEach(({ variable, value }) => {
              res[variable] = value
            })
            return res
          }, {})

          return {
            customProperties: {
              ...variableProperties,
              ...colorProperties,
              ...spaceProperties,
              ...fontFamilyProperties,
              ...fontSizeProperties,
              ...fontWeightProperties
            }
          }
        }
      ],
      exportTo: 'dist/styles/btcpayserver-variables.css'
    })
  ]
}
