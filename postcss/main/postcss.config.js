const autoprefixer = require('autoprefixer')
const mixins = require("postcss-mixins");
const importer = require('postcss-import')
const nesting = require('postcss-nesting')
const prettify = require('postcss-prettify')

module.exports = {
  plugins: [
    mixins(),
    autoprefixer(),
    importer({
      path: ["src/styles", "src/components"],
    }),
    nesting(),
    prettify(),
  ],
};
