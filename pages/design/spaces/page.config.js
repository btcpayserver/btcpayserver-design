const importFresh = require('import-fresh')

// transform to uiengine format
// https://uiengine.uix.space/advanced/design-tokens
const spaces = importFresh('../../../src/design/spaces')

const tokens = spaces.map(space => {
  return {
    type: 'size',
    ...space
  }
})

module.exports = { tokens }
