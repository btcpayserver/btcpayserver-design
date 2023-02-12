const importFresh = require('import-fresh')

// transform to uiengine format
// https://uiengine.uix.space/advanced/design-tokens
const icons = importFresh('../../../src/design/icons')

const byCategory = icons.reduce((res, { id, category }) => {
  res[category] = res[category] || []
  res[category].push({
    type: 'icon',
    name: id,
    variable: id,
    value: `<svg role="img"><use href="/svg/icons.svg#${id}"/></svg>`
  })
  return res
}, {})

const tokens = Object.keys(byCategory).map(categoryName => ({
  type: 'category',
  name: categoryName,
  tokens: byCategory[categoryName]
}))

module.exports = {
  title: 'Icons',
  tokens
}
