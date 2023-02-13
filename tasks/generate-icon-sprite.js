const { readFileSync, writeFileSync } = require('fs')
const { dirname, join, relative, resolve } = require('path')
const glob = require('glob')
const svgstore = require('svgstore')

const dir = resolve(__dirname, '../src/icons')
const dstTokens = resolve(__dirname,'../src/design/icons.js')
const dstSprite = resolve(__dirname,'../src/static/svg/icons.svg')
const slugify = str => str.toLowerCase().replace(/\W/gi, '-')

// Script to generate SVGs from existing icon sprite:
// Array.from(readFileSync(resolve(__dirname, '../src/icons.svg'), 'utf8')
//   .matchAll(/<symbol id="(.*?)" viewBox="0 0 (\d+) (\d+)" fill="none">(.*?)<\/symbol>/gi))
//   .forEach(m => writeFileSync(resolve(__dirname, `../src/icons/${m[1]}.svg`), `<svg width="${m[2]}" height="${m[3]}" viewBox="0 0 ${m[2]} ${m[3]}" fill="none" xmlns="http://www.w3.org/2000/svg">\n${m[4]}\n</svg>\n`))

const svgs = glob.sync(join(dir, '**/*.svg'))
const tokens = []
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
  const category = dirname(rel) !== '.' ? dirname(rel) : 'general'
  const id = slugify(rel).replace(/-svg$/gi, '')
  sprite.add(id, readFileSync(svg, 'utf8'))
  tokens.push({ id, category })
})

writeFileSync(dstSprite, sprite.toString().replace(/\n/g, '').replace(/<symbol /g, '\n<symbol ').replace('<svg ', '\n<svg ').replace('</svg', '\n</svg'))
writeFileSync(dstTokens, `module.exports = ${JSON.stringify(tokens, null, 2)}`)
