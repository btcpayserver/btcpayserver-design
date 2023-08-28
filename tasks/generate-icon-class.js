const { readFileSync, writeFileSync } = require('fs')
const { dirname, join, relative, resolve } = require('path')
const { globSync } = require('glob')
const { optimize } = require('svgo')

const dir = resolve(__dirname, '../src/icons')
const dstClass = resolve(__dirname, '../generated/Icons.cs')
const svgOpts = { multipass: true, plugins: ['removeXMLNS'] }

const svgs = globSync(join(dir, '**/*.svg')).sort()
const icons = []

svgs.forEach(path => {
  const rel = relative(dir, path)
  const id = rel.toLowerCase()
    .replace(/\W/gi, '-')
    .replace(/-svg$/gi, '')
    .replace(/(?:^|[\s-/])\w/g, m => m.toUpperCase())
    .replace(/-/gi, '')
  const svg = readFileSync(path, 'utf8')
  const optimized = optimize(svg, { path, ...svgOpts });
  icons.push({ id, svg: optimized.data })
})

const output = `namespace BTCPayApp.UI;\n\npublic static class BTCPayIcons\n{
${icons.map(i => `    public const string ${i.id} = """${i.svg}""";`).join('\n')}
}
`

writeFileSync(dstClass, output)
