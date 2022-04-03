/*
 * Replaces the colors in the initial Bootstrap build that needed
 * to be actual color values to work with the modifier functions.
 */
const { readFileSync, writeFileSync } = require('fs')
const { join, resolve } = require('path')
const sass = require('node-sass')
const postcss = require('postcss')
const autoprefixer = require('autoprefixer')

const src = file => resolve(__dirname, join('../src', file))
const file = src('bootstrap/index.scss')
const outFile = src('static/styles/btcpayserver-bootstrap.css')
const getContent = file => {
  const content = '' + readFileSync(src(file))
  return content.trim() + '\n\n'
}
const output = css => {
  // apply custom overrides that cannot be done by replacing strings via the generate-bootstrap script
  let result = patch(css)

  result += getContent('bootstrap/_customizations.css')
  result += getContent('components/pills/pills.css')
  result += getContent('components/status/status.css')
  result += getContent('components/toggle/toggle.css')
  result += getContent('components/responsive-helper/responsive-helper.css')

  writeFileSync(outFile, result.trim() + '\n')
}

const SKIP_COLORS = ['#fff', '#000']
const CATEGORIES = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

// grabs the color values we need to replace from the original bootstrap:
// map the value regexp to the variable name key
const extractCategoriesColors = css =>
  CATEGORIES.reduce((res, category) => Object.assign(res, {
    [category]: {
      '': css.match(`--btcpay-${category}: (.*?);`)[1],
      'rgb': css.match(`--btcpay-${category}-rgb: (.*?);`)[1],
      'text-hover': css.match(`.link-${category}:focus \\{[^{]*?color: (.*?);`)[1],
      'bg-hover': css.match(`.btn-${category}:hover \\{[^{]*?background-color: (.*?);`)[1],
      'border': css.match(`.btn-${category} \\{[^{]*?border-color: (.*?);`)[1],
      'border-hover': css.match(`.btn-${category}:hover \\{[^{]*?border-color: (.*?);`)[1],
      'border-active': css.match(`.btn-${category}.active[^{]*?\\{[^{]*?border-color: (.*?);`)[1],
      'dim-bg': css.match(`.alert-${category} \\{[^{]*?background-color: (.*?);`)[1],
      'dim-bg-hover': css.match(`list-group-item-${category}.list-group-item-action:focus \\{[^{]*?background-color: (.*?);`)[1],
      'dim-bg-active': css.match(`.list-group-item-${category}.list-group-item-action.active \\{[^{]*?background-color: (.*?);`)[1],
      'dim-border': css.match(`.alert-${category} \\{[^{]*?border-color: (.*?);`)[1],
      'dim-border-active': css.match(`.list-group-item-${category}.list-group-item-action.active \\{[^{]*?border-color: (.*?);`)[1],
      'dim-text': css.match(`.list-group-item-${category} \\{[^{]*?color: (.*?);`)[1],
      'dim-text-active': css.match(`.list-group-item-${category}.list-group-item-action.active \\{[^{]*?color: (.*?);`)[1],
      'dim-link': css.match(`.alert-${category} .alert-link \\{[^{]*?color: (.*?);`)[1],
      'shadow': [
        css.match(`.btn-${category}:focus \\{[^{]*?box-shadow: 0 0 0 2px (.*?);`)[1],
        css.match(`.btn-outline-${category}:focus \\{[^{]*?box-shadow: 0 0 0 2px (.*?);`)[1]
      ]
    }
  }), {})

// replace color values in css, but skips white and black as they are too generic
String.prototype.replaceColor = function (colorOrForce, original, replacement) {
  return SKIP_COLORS.includes(colorOrForce)
    ? this
    : this.replace(new RegExp(original, 'g'), replacement)
}

// consumes the extracted category values and replaces them with the variable names
String.prototype.replaceCategoryColors = function (map) {
  return Object.entries(map).reduce((res, [category, values]) => res
    .replaceColor(values[''], `  --btcpay-${category}: ${values['']};\n[\s\S]*`, '')
    .replaceColor(values[''], `  --btcpay-${category}-rgb: ${values['rgb']};\n[\s\S]*`, '')
    .replaceColor(values[''], `background-color: ${values['']}`, `background-color: var(--btcpay-${category})`)
    .replaceColor(values['rgb'], `${values['rgb']}`, `var(--btcpay-${category}-rgb)`)
    .replaceColor(values['text-hover'], ` color: ${values['text-hover']}`, ` color: var(--btcpay-${category}-text-hover)`)
    .replaceColor(values['bg-hover'], `background-color: ${values['bg-hover']}`, `background-color: var(--btcpay-${category}-bg-hover)`)
    .replaceColor(values['border'], `border-color: ${values['border']}`, `border-color: var(--btcpay-${category}-border)`)
    .replaceColor(values['border-hover'], `border-color: ${values['border-hover']}`, `border-color: var(--btcpay-${category}-border-hover)`)
    .replaceColor(values['border-active'], `border-color: ${values['border-active']}`, `border-color: var(--btcpay-${category}-border-active)`)
    .replaceColor(values['dim-bg'], `background-color: ${values['dim-bg']}`, `background-color: var(--btcpay-${category}-dim-bg)`)
    .replaceColor(values['dim-bg-hover'], `background-color: ${values['dim-bg-hover']}`, `background-color: var(--btcpay-${category}-dim-bg-hover)`)
    .replaceColor(values['dim-bg-active'], `background-color: ${values['dim-bg-active']}`, `background-color: var(--btcpay-${category}-dim-bg-active)`)
    .replaceColor(values['dim-border'], `border-color: ${values['dim-border']}`, `border-color: var(--btcpay-${category}-dim-border)`)
    .replaceColor(values['dim-border-active'], `border-color: ${values['dim-border-active']}`, `border-color: var(--btcpay-${category}-dim-border-active)`)
    .replaceColor(values['dim-text-active'], `(-${category}.*?active.*?\\{[^{]*?)(color: ${values['dim-text-active']};)`, `$1color: var(--btcpay-${category}-dim-text-active);`)
    .replaceColor(values['dim-text'], `color: ${values['dim-text']}`, `color: var(--btcpay-${category}-dim-text)`)
    .replaceColor(values['dim-link'], `color: ${values['dim-link']}`, `color: inherit`)
    .replaceColor(true, values['shadow'][0].replace('(', '\\(').replace(')', '\\)').replace('.', '\\.'), `var(--btcpay-${category}-shadow)`)
    .replaceColor(true, values['shadow'][1].replace('(', '\\(').replace(')', '\\)').replace('.', '\\.'), `var(--btcpay-${category}-shadow)`)
    // alert
    .replaceColor(true, `(\\.alert-${category} \\{[^{]*?)( border-color: (.*?);)`, `$1 border-color: var(--btcpay-${category}-border);`)
    .replaceColor(true, `(\\.alert-${category} \\{[^{]*?)( background-color: (.*?);)`, `$1 background-color: var(--btcpay-${category});`)
    .replaceColor(true, `(\\.alert-${category} \\{[^{]*?)( color: (.*?);)`, `$1 color: var(--btcpay-${category}-text);`)
    // button
    .replaceColor(true, `(\\.btn-${category}(\\.disabled)? \\{[^{]*?) color: (.*?);`, `$1 color: var(--btcpay-${category}-text);`)
    .replaceColor(true, `(\\.btn-${category}.dropdown-toggle \\{[^{]*?) color: (.*?);`, `$1 color: var(--btcpay-${category}-text-active);`)
    .replaceColor(true, `(\\.btn-${category}:(hover|focus) \\{[^{]*?) color: (.*?);`, `$1 color: var(--btcpay-${category}-text-hover);`)
    .replaceColor(true, `(\\.btn-${category}\\.dropdown-toggle \\{[^{]*?) background-color: (.*?);`, `$1 background-color: var(--btcpay-${category}-bg-active);`)
    .replaceColor(true, `(\\.btn-outline-${category} \\{[^{]*?) color: (.*?);`, `$1 color: var(--btcpay-${category});`)
    .replaceColor(true, `(\\.btn-outline-${category}.dropdown-toggle.show \\{[^{]*?) color: (.*?);`, `$1 color: var(--btcpay-${category}-text);`)
    .replaceColor(true, `(\\.btn-outline-${category}:disabled, .btn-outline-${category}.disabled \\{[^{]*?) color: (.*?);`, `$1 color: var(--btcpay-${category});`)
    .replaceColor(true, `(\\.btn-outline-${category}:(hover|focus) \\{[^{]*?) color: (.*?);`, `$1 color: var(--btcpay-${category}-text);`)
    // table
    .replaceColor(true, `(\\.table-${category} \\{[^{]*?)( border-color: (.*?);)`, `$1 border-color: var(--btcpay-${category}-dim-border);`)
    .replaceColor(true, `(\\.table-${category} \\{[^{]*?)( color: (.*?);)`, `$1 color: var(--btcpay-${category}-dim-text);`)
    .replaceColor(true, `(\\.table-${category} \\{[^{]*?)( --btcpay-table-striped-color: (.*?);)`, `$1 --btcpay-table-striped-color: var(--btcpay-${category}-dim-text-striped);`)
    .replaceColor(true, `(\\.table-${category} \\{[^{]*?)( --btcpay-table-hover-color: (.*?);)`, `$1 --btcpay-table-hover-color: var(--btcpay-${category}-dim-text-hover);`)
    .replaceColor(true, `(\\.table-${category} \\{[^{]*?)( --btcpay-table-active-color: (.*?);)`, `$1 --btcpay-table-active-color: var(--btcpay-${category}-dim-text-active);`)
    .replaceColor(true, `(\\.table-${category} \\{[^{]*?)( --btcpay-table-bg: (.*?);)`, `$1 --btcpay-table-bg: var(--btcpay-${category}-dim-bg);`)
    .replaceColor(true, `(\\.table-${category} \\{[^{]*?)( --btcpay-table-striped-bg: (.*?);)`, `$1 --btcpay-table-striped-bg: var(--btcpay-${category}-dim-bg-striped);`)
    .replaceColor(true, `(\\.table-${category} \\{[^{]*?)( --btcpay-table-hover-bg: (.*?);)`, `$1 --btcpay-table-hover-bg: var(--btcpay-${category}-dim-bg-hover);`)
    .replaceColor(true, `(\\.table-${category} \\{[^{]*?)( --btcpay-table-active-bg: (.*?);)`, `$1 --btcpay-table-active-bg: var(--btcpay-${category}-dim-bg-active);`)
    // list group
    .replaceColor(true, `(\\.list-group-item-${category}.list-group-item-action.active \\{[^{]*?)( color: (.*?);)`, `$1 color: var(--btcpay-${category}-dim-text-active);`)
    // general color
    .replaceColor(values[''], `color: ${values['']}`, `color: var(--btcpay-${category})`)
  , this)
}

const patch = css => {
  const categoryColors = extractCategoriesColors(css)

  return css
    // body
    .replaceColor(true, `(body \\{[^{]*?) background-color: #fff;`, `$1 background-color: var(--btcpay-body-bg);`)
    .replaceColor(true, ` color: #212529;`, ` color: var(--btcpay-body-text);`)
    .replaceColor(true, `(\\.bg-body \\{[^{]*?) background-color: #fff !important;`, `$1 background-color: var(--btcpay-body-bg) !important;`)
    .replaceColor(true, `(\\.bg-white \\{[^{]*?) background-color: #fff !important;`, `$1 background-color: var(--btcpay-white) !important;`)
    .replaceColor(true, `(:root \\{[^{]*?) --btcpay-body-color: .*?;`, `$1 --btcpay-body-color: var(--btcpay-body-text);`)

    // popover
    .replaceColor(true, `(\\.popover \\{[^{]*?)( background-color: (#.*?);)`, `$1 background-color: var(--btcpay-bg-tile);`)
    .replaceColor(true, `(\\.popover-header \\{[^{]*?)( background-color: (#.*?);)`, `$1 background-color: var(--btcpay-bg-tile);`)

    // form
    .replaceColor(true, `(\\.form-range::(.*?):active \\{[^{]*?)( background-color: (#.*?);)`, `$1 background-color: var(--btcpay-form-border-active);`)
    .replaceColor(true, `(\\.form-floating > label \\{[^{]*?)( position: absolute;)`, `$1 position: absolute; color: var(--btcpay-form-text-addon);`)
    .replaceColor(true, `(\\.form-control::(.*?) \\{[^{]*?)( background-color: #e9ecef;)`, `$1 background-color: var(--btcpay-form-bg-addon);`)
    .replaceColor(true, `box-shadow: 0 0 0 0\\.25rem rgba\\(25, 135, 84, 0\\.25\\);`, `box-shadow: 0 0 0 var(--btcpay-form-shadow-size) var(--btcpay-form-shadow-valid);`)
    .replaceColor(true, `box-shadow: 0 0 0 0\\.25rem rgba\\(220, 53, 69, 0\\.25\\);`, `box-shadow: 0 0 0 var(--btcpay-form-shadow-size) var(--btcpay-form-shadow-invalid);`)
    .replaceColor(true, `box-shadow: 0 0 0 0\\.25rem rgba\\(13, 110, 253, 0\\.25\\);`, `box-shadow: 0 0 0 var(--btcpay-form-shadow-size) var(--btcpay-form-shadow-focus);`)

    // border
    .replace(/(border(-.*?)?): 1px solid rgba\(0,\s?0,\s?0,\s?0\.1\d*?\)/gi, '$1: 1px solid var(--btcpay-body-border-light)')
    .replace(/(border(-.*?)?): 1px solid #dee2e6/gi, '$1: 1px solid var(--btcpay-body-border-light)')
    .replace(/(border(-.*?)?): #dee2e6/gi, '$1: var(--btcpay-body-border-light)')
    .replace(/(border(-.*?)?): 1px solid rgba\(0,\s?0,\s?0,\s?0\.2\d*?\)/gi, '$1: 1px solid var(--btcpay-body-border-medium)')
    .replace(/(border(-.*?)?): currentColor/gi, '$1: var(--btcpay-body-border-medium)')

    // categories
    .replaceCategoryColors(categoryColors)

    // neutral
    .replace(/#f8f9fa/gi, 'var(--btcpay-neutral-100)')
    .replace(/#e9ecef/gi, 'var(--btcpay-neutral-200)')
    .replace(/#dee2e6/gi, 'var(--btcpay-neutral-300)')
    .replace(/#ced4da/gi, 'var(--btcpay-neutral-400)')
    .replace(/#adb5bd/gi, 'var(--btcpay-neutral-500)')
    .replace(/#6c757d/gi, 'var(--btcpay-neutral-600)')
    .replace(/#495057/gi, 'var(--btcpay-neutral-700)')
    .replace(/#343a40/gi, 'var(--btcpay-neutral-800)')
    .replace(/#212529/gi, 'var(--btcpay-neutral-900)')

    // code
    .replace(/#d63384/gi, 'var(--btcpay-code-text)')

    // generic
    .replace(/#000;/gi, 'var(--btcpay-black);')
    .replace(/#000 !important;/gi, 'var(--btcpay-black);')
    .replace(/rgba\(0,\s?0,\s?0,\s?0\)/gi, 'var(--btcpay-black)')
    .replace(/#fff;/gi, 'var(--btcpay-white);')
    .replace(/#fff !important;/gi, 'var(--btcpay-white);')

    // removals
    .replaceColor(true, `  --btcpay-white-rgb: (.*?);\n[\s\S]*`, '')
    .replaceColor(true, `  --btcpay-black-rgb: (.*?);\n[\s\S]*`, '')
    .replaceColor(true, `  --btcpay-body-color-rgb: (.*?);\n[\s\S]*`, '')
    .replaceColor(true, `  --btcpay-body-bg-rgb: (.*?);\n[\s\S]*`, '')
    .replaceColor(true, '--btcpay-body-color-rgb', '--btcpay-body-text-rgb')
}

sass.render({ file, outFile, outputStyle: 'expanded' }, (error, result) =>
  error
    ? console.error(error.formatted)
    : postcss([autoprefixer])
        .process(result.css.toString('utf8'), { from: file, to: outFile })
        .then(result => output(result.css))
)
