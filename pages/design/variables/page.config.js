const importFresh = require('import-fresh')

// transform to uiengine format
// https://uiengine.uix.space/advanced/design-tokens
const variables = importFresh('../../../src/design/variables')

const byCategory = variables.reduce((res, variable) => {
  res[variable.category] = res[variable.category] || []
  res[variable.category].push(variable)
  return res
}, {})

const tokens = Object.keys(byCategory).map(categoryName => ({
  type: 'category',
  name: categoryName,
  tokens: byCategory[categoryName]
}))

module.exports = { tokens }
