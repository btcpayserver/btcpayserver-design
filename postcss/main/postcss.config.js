const autoprefixer = require('autoprefixer')
const extend = require('postcss-extend')
const importer = require('postcss-import')
const nesting = require('postcss-nesting').default
const prettify = require('postcss-prettify')

module.exports = {
  plugins: [
    autoprefixer(),
    importer({
      path: ['src/styles', 'src/components'],
    }),
    extend(),
    nesting(),
    prettify()
  ]
}
