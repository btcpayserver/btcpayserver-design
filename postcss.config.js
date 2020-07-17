const autoprefixer = require('autoprefixer')
const importer = require('postcss-import')
const nesting = require('postcss-nesting')
const prettify = require('postcss-prettify')

// https://github.com/michael-ciniawsky/postcss-load-config
const customProperties = require('postcss-custom-properties')

// design tokens meta description
const variables = require('./src/design/variables')
const colors = require('./src/design/colors')
const spaces = require('./src/design/spaces')
const fonts = require('./src/design/fonts')

// converts the meta format to custom property definition
const metaToProp = collection =>
  (res, token) => {
    const { variable, value, reference } = token
    const ref = reference ? collection.find(t => t.name === reference) : null
    const val = ref ? `var(${ref.variable})` : value
    return Object.assign(res, { [variable]: val })
  }

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
          const variableProperties = variables.reduce(metaToProp(variables), {})
          const colorProperties = colors.reduce(metaToProp(colors), {})
          const spaceProperties = spaces.reduce(metaToProp(spaces), {})
          const fontFamilyProperties = fonts.families.reduce(metaToProp(fonts.families), {})
          const fontSizeProperties = fonts.sizes.reduce(metaToProp(fonts.sizes), {})
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
      exportTo: 'src/styles/variables/design.css'
    }),
    prettify()
  ]
}
