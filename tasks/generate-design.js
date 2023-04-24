/*
 * Generates the design.css based on the tokens in the JS files.
 */
const { writeFileSync } = require('fs')
const { resolve } = require('path')
const postcss = require('postcss')

// design tokens meta description
const variables = require('../src/design/variables')
const colors = require('../src/design/colors')
const spaces = require('../src/design/spaces')
const fonts = require('../src/design/fonts')

const outFile = resolve(__dirname, '../generated/design.css')

// converts the meta format to custom property definition
const metaToProp = collection => (res, token) => {
  const { variable, value, reference } = token
  const ref = reference ? collection.find(t => t.name === reference) : null
  const val = ref ? `var(${ref.variable})` : value
  return Object.assign(res, { [variable]: val })
}

const variableProperties = variables.reduce(metaToProp(variables), {})
const colorProperties = colors.reduce(metaToProp(colors), {})
const spaceProperties = spaces.reduce(metaToProp(spaces), {})
const fontFamilyProperties = fonts.families.reduce(
  metaToProp(fonts.families),
  {}
)
const fontSizeProperties = fonts.sizes.reduce(metaToProp(fonts.sizes), {})
const fontWeightProperties = fonts.families.reduce((res, { weights }) => {
  weights.forEach(({ variable, value }) => {
    res[variable] = value
  })
  return res
}, {})

const customProperties = {
  ...variableProperties,
  ...colorProperties,
  ...spaceProperties,
  ...fontFamilyProperties,
  ...fontSizeProperties,
  ...fontWeightProperties
}

const css = `:root {\n${Object.entries(customProperties)
  .map(([key, value]) => `  ${key}: ${value};`)
  .join('\n')}\n}`

postcss()
  .process(css, { from: undefined, o: outFile })
  .then(result => writeFileSync(outFile, result.css.trim() + '\n'))
