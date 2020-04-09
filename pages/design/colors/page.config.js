const importFresh = require('import-fresh')

// transform to uiengine format
// https://uiengine.uix.space/advanced/design-tokens/#color
const colors = importFresh('../../../src/design/colors')

const byCategory = colors.reduce((res, color) => {
  res[color.category] = res[color.category] || []
  res[color.category].push(color)
  return res
}, {})

const tokens = Object.keys(byCategory).map(categoryName => ({
  type: 'category',
  name: categoryName,
  tokens: byCategory[categoryName].map(color => Object.assign({}, color, { type: 'color' }))
}))

module.exports = { tokens }
