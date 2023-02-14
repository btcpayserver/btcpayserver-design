const { readFileSync, writeFileSync } = require('fs')
const { join, relative, resolve } = require('path')
const glob = require('glob')
const svgstore = require('svgstore')

const dir = resolve(__dirname, '../src/supporters')
const dstSprite = resolve(__dirname,'../src/static/svg/supporters.svg')
const slugify = str => str.toLowerCase().replace(/\W/gi, '-')

const svgs = glob.sync(join(dir, '**/*.svg'))
const sprite = svgstore({
  cleanDefs: true,
  cleanSymbols: true,
  renameDefs: true,
  symbolAttrs: {
    fill: 'none'
  }
})

svgs.forEach(svg => {
  const rel = relative(dir, svg)
  const category = 'supporters'
  const id = slugify(rel).replace(/-svg$/gi, '')
  sprite.add(id, readFileSync(svg, 'utf8'))
})

writeFileSync(dstSprite, sprite.toString().replace(/\n/g, '').replace(/<symbol /g, '\n<symbol ').replace('<svg ', '\n<svg ').replace('</svg', '\n</svg'))
