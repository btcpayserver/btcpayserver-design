const { readFileSync, writeFileSync } = require('fs')
const { join, relative, resolve } = require('path')
const { globSync } = require('glob')
const svgstore = require('svgstore')
const prettier = require('prettier')
const { prettier: prettierOpts } = require('../package.json')

const dir = resolve(__dirname, '../src/supporters')
const dstTokens = resolve(__dirname, '../src/design/supporters.js')
const dstSprite = resolve(__dirname, '../src/static/svg/supporters.svg')
const slugify = str => str.toLowerCase().replace(/\W/gi, '-')

const svgs = globSync(join(dir, '*.svg')).sort()
const tokens = []
const sprite = svgstore({
  renameDefs: true,
  symbolAttrs: {
    fill: 'none'
  }
})

svgs.forEach(svg => {
  const rel = relative(dir, svg)
  const id = slugify(rel).replace(/-svg$/gi, '')
  sprite.add(id, readFileSync(svg, 'utf8'))
  tokens.push({ id })
})

writeFileSync(
  dstSprite,
  sprite
    .toString()
    .replace(/\n/g, '')
    .replace(/<symbol /g, '\n<symbol ')
    .replace('<svg ', '\n<svg ')
    .replace('</svg', '\n</svg')
)
writeFileSync(
  dstTokens,
  prettier.format(`module.exports = ${JSON.stringify(tokens)}`, prettierOpts)
)
