const { readFileSync, writeFileSync } = require('fs')
const { join, relative, resolve } = require('path')
const glob = require('glob')
const svgstore = require('svgstore')

const dir = resolve(__dirname, '../src/icons')
const dstTokens = resolve(__dirname,'../src/design/icons.js')
const dstSprite = resolve(__dirname,'../src/static/svg/icons.svg')
const slugify = str => str.toLowerCase().replace(/\W/gi, '-')

// const c = readFileSync(resolve(__dirname, '../src/icons/input.svg'), 'utf8')
// const matches = Array.from(c.matchAll(/<symbol id="(.*?)" viewBox="0 0 (\d+) (\d+)">(.*?)<\/symbol>/gi))
// matches.forEach(m => writeFileSync(resolve(__dirname, `../src/icons/${m[1]}.svg`), `<svg width="${m[2]}" height="${m[3]}" viewBox="0 0 ${m[2]} ${m[3]}" fill="none" xmlns="http://www.w3.org/2000/svg">
// ${m[4]}
// </svg>
// `))

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
  const id = slugify(rel).replace(/-svg$/gi, '')
  sprite.add(id, readFileSync(svg, 'utf8'))
  tokens.push({
    type: 'icon',
    name: id,
    variable: id,
    value: `<svg role="img"><use href="/svg/icons.svg#${id}"/></svg>`
  })
})

const icons = {
  title: 'Icons',
  tokens
}

writeFileSync(dstSprite, sprite)
writeFileSync(dstTokens, `module.exports = ${JSON.stringify(icons, null, 2)}`)
