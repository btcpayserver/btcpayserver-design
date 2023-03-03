const importFresh = require('import-fresh')

// transform to uiengine format
// https://uiengine.uix.space/advanced/design-tokens
const supporters = importFresh('../../../src/design/supporters')

const tokens = supporters.map(({ id }) => ({
  type: 'icon',
  name: id,
  variable: id,
  value: `<svg role="img"><use href="/svg/supporters.svg#${id}"/></svg>`
}))

module.exports = {
  title: 'Supporters',
  tokens
}
