/*
 * Replaces the colors in the initial Bootstrap build that needed
 * to be actual color values to work with the modifier functions.
 */
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')
const sass = require('node-sass')

const file = resolve(__dirname, '../src/bootstrap/index.scss')
const outFile = resolve(__dirname, '../dist/styles/btcpayserver-bootstrap-v5.css')
const origFile = resolve(__dirname, '../dist/styles/btcpayserver-bootstrap-v5-original.css')

const output = css => {
  writeFileSync(origFile, css)
  writeFileSync(outFile, patch(css))
}

const CATEGORIES = ['primary', 'secondary', 'success', 'info', 'warning', 'danger', 'light', 'dark']

// grabs the color values we need to replace from the original bootstrap:
// map the value regexp to the variable name key
const extractCategoriesColors = css =>
  CATEGORIES.reduce((res, category) => Object.assign(res, {
    [category]: {
      '': css.match(`--bs-${category}: (.*?);`)[1],
      'bg-hover': css.match(`.btn-${category}:hover \\{[\\S\\s]*?background-color: (.*?);`)[1],
      'border': css.match(`.btn-${category} \\{[\\S\\s]*?border-color: (.*?);`)[1],
      'border-hover': css.match(`.btn-${category}:hover \\{[\\S\\s]*?border-color: (.*?);`)[1],
      'border-active': css.match(`.btn-${category}.active[\\S\\s\\.]*?\\{[\\S\\s]*?border-color: (.*?);`)[1],
      'dim-bg': css.match(`.alert-${category} \\{[\\S\\s]*?background-color: (.*?);`)[1],
      'dim-bg-hover': css.match(`list-group-item-${category}.list-group-item-action:focus \\{[\\S\\s]*?background-color: (.*?);`)[1],
      'dim-bg-active': css.match(`.list-group-item-${category}.list-group-item-action.active \\{[\\S\\s]*?background-color: (.*?);`)[1],
      'dim-border': css.match(`.alert-${category} \\{[\\S\\s]*?border-color: (.*?);`)[1],
      'dim-border-active': css.match(`.list-group-item-${category}.list-group-item-action.active \\{[\\S\\s]*?border-color: (.*?);`)[1],
      'dim-text': css.match(`.list-group-item-${category} \\{[\\S\\s]*?color: (.*?);`)[1],
      'dim-text-active': css.match(`.list-group-item-${category}.list-group-item-action.active \\{[\\S\\s]*?color: (.*?);`)[1],
      'dim-link': css.match(`.alert-${category} .alert-link \\{[\\S\\s]*?color: (.*?);`)[1],
      'shadow': [
        css.match(`.btn-${category}:focus \\{[\\S\\s]*?box-shadow: 0 0 0 0.25rem (.*?);`)[1],
        css.match(`.btn-outline-${category}:focus \\{[\\S\\s]*?box-shadow: 0 0 0 0.25rem (.*?);`)[1]
      ]
    }
  }), {})

// consumes the extracted category values and replaces them with the variable names
String.prototype.replaceCategoryColors = function (map) {
  return Object.entries(map).reduce((res, [category, values]) => res
    .replace(new RegExp(`background-color: ${values['']}`, 'g'), `background-color: var(--btcpay-color-${category})`)
    .replace(new RegExp(`background-color: ${values['bg-hover']}`, 'g'), `background-color: var(--btcpay-color-${category}-bg-hover)`)
    .replace(new RegExp(`border-color: ${values['border']}`, 'g'), `border-color: var(--btcpay-color-${category}-border)`)
    .replace(new RegExp(`border-color: ${values['border-hover']}`, 'g'), `border-color: var(--btcpay-color-${category}-border-hover)`)
    .replace(new RegExp(`border-color: ${values['border-active']}`, 'g'), `border-color: var(--btcpay-color-${category}-border-active)`)
    .replace(new RegExp(`background-color: ${values['dim-bg']}`, 'g'), `background-color: var(--btcpay-color-${category}-dim-bg)`)
    .replace(new RegExp(`background-color: ${values['dim-bg-hover']}`, 'g'), `background-color: var(--btcpay-color-${category}-dim-bg-hover)`)
    .replace(new RegExp(`background-color: ${values['dim-bg-active']}`, 'g'), `background-color: var(--btcpay-color-${category}-dim-bg-active)`)
    .replace(new RegExp(`border-color: ${values['dim-border']}`, 'g'), `border-color: var(--btcpay-color-${category}-dim-border)`)
    .replace(new RegExp(`border-color: ${values['dim-border-active']}`, 'g'), `border-color: var(--btcpay-color-${category}-dim-border-active)`)
    .replace(new RegExp(`color: ${values['dim-text']}`, 'g'), `color: var(--btcpay-color-${category}-dim-text)`)
    .replace(new RegExp(`(-${category}.*?active.*?\\{[\\S\\s]*?)(color: ${values['dim-text-active']};)`, 'g'), `$1color: var(--btcpay-color-${category}-dim-text-active);`)
    .replace(new RegExp(`color: ${values['dim-link']}`, 'g'), `color: inherit`)
    .replace(new RegExp(values['shadow'][0].replace('(', '\\(').replace(')', '\\)'), 'g'), `var(--btcpay-color-${category}-shadow)`)
    .replace(new RegExp(values['shadow'][1].replace('(', '\\(').replace(')', '\\)'), 'g'), `var(--btcpay-color-${category}-shadow)`)
    .replace(new RegExp(`color: ${values['']}`, 'g'), `color: var(--btcpay-color-${category})`)
  , this)
}

const patch = css => {
  const categoryColors = extractCategoriesColors(css)
  console.log(categoryColors)
  return css
    .replaceCategoryColors(categoryColors)

    // neutral
    .replace(/#f8f9fa/gi, 'var(--btcpay-color-neutral-100)')
    .replace(/#e9ecef/gi, 'var(--btcpay-color-neutral-200)')
    .replace(/#dee2e6/gi, 'var(--btcpay-color-neutral-300)')
    .replace(/#ced4da/gi, 'var(--btcpay-color-neutral-400)')
    .replace(/#adb5bd/gi, 'var(--btcpay-color-neutral-500)')
    .replace(/#6c757d/gi, 'var(--btcpay-color-neutral-600)')
    .replace(/#495057/gi, 'var(--btcpay-color-neutral-700)')
    .replace(/#343a40/gi, 'var(--btcpay-color-neutral-800)')
    .replace(/#212529/gi, 'var(--btcpay-color-neutral-900)')

    // // simple colors
    // .replace(/#d63384/gi, 'var(--btcpay-color-pink, #d63384)') // -> code color

    // .replace(/#86b7fe/gi, 'var(--btcpay-color-primary-border, var(--btcpay-color-primary-backdrop))') // -> form control focus border color
    // .replace(/rgba\(13,\s?110,\s?253,\s?0\.25\)/gi, 'var(--btcpay-color-primary-border, var(--btcpay-color-primary-backdrop))') // -> form control focus bopx shadow

    // .replace(/#6610f2/gi, 'var(--btcpay-color-indigo, #6610f2)') // unused
    // .replace(/#6f42c1/gi, 'var(--btcpay-color-purple, #6f42c1)') // unused
    // .replace(/#fd7e14/gi, 'var(--btcpay-color-orange, #fd7e14)') // unused
    // .replace(/#20c997/gi, 'var(--btcpay-color-teal, #20c997)') // unused

    // generic
    .replace(/#000;/gi, 'var(--btcpay-color-black);')
    .replace(/#000 !important;/gi, 'var(--btcpay-color-black);')
    .replace(/rgba\(0,\s?0,\s?0,\s?0\)/gi, 'var(--btcpay-color-black)')
    .replace(/#fff;/gi, 'var(--btcpay-color-white);')
    .replace(/#fff !important;/gi, 'var(--btcpay-color-white);')

    // TODO:
    // border: 1px solid rgba(0, 0, 0, 0.1 -> light
    .replace(/border: 1px solid rgba\(0,\s?0,\s?0,\s?0\.1\d*?\)/gi, 'border: 1px solid var(--btcpay-border-color-light)')
    .replace(/border: 1px solid rgba\(0,\s?0,\s?0,\s?0\.2\d*?\)/gi, 'border: 1px solid var(--btcpay-border-color-medium)')
}

sass.render({ file, outFile }, (error, result) =>
  error
    ? console.error(error.formatted)
    : output(result.css.toString('utf8'))
)
