const importFresh = require('import-fresh')

// transform to uiengine format
// https://uiengine.uix.space/advanced/design-tokens/#
const fonts = importFresh('../../../src/design/fonts')

const sizes = fonts.sizes.map(size => size.value)

const sizeTokens = fonts.sizes

const weightTokens = fonts.weights

const familyTokens = fonts.families.map(family => {
  const fontFaces = family.weights.map(weight => ({
    type: 'font',
    fontweight: `${weight.name} / ${weight.value}`,
    description: family.value,
    value: `font-family: ${family.value}; font-weight: ${weight.value}; ${family.cssProperties || ''}`,
    variable: family.variable,
    sizes,
    text: 'Chancellor on Brink of Second Bailout for Banks'
  }))

  return {
    type: 'category',
    name: family.name,
    tokens: [].concat(...fontFaces)
  }
})

module.exports = {
  tokens: [
    {
      type: 'category',
      name: 'Font sizes',
      tokens: sizeTokens
    },
    {
      type: 'category',
      name: 'Font weights',
      tokens: weightTokens
    },
    {
      type: 'category',
      name: 'Font families',
      tokens: familyTokens
    }
  ]
}
