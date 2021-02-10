/*
 * Replaces the colors in the initial Bootstrap build that needed
 * to be actual color values to work with the modifier functions.
 */
const { readFileSync, writeFileSync } = require('fs')
const { resolve } = require('path')
const sass = require('node-sass')

const file = resolve(__dirname, '../src/bootstrap/custom.scss')
const outFile = resolve(__dirname, '../dist/styles/btcpayserver-bootstrap-v5.css')

const patch = css => css
  .replace(/#000;/gi, 'var(--btcpay-color-black);')
  .replace(/#000 !important;/gi, 'var(--btcpay-color-black);')
  .replace(/#fff;/gi, 'var(--btcpay-color-white);')
  .replace(/#fff !important;/gi, 'var(--btcpay-color-white);')

sass.render({ file, outFile }, (error, result) =>
  error
    ? console.error(error.formatted)
    : writeFileSync(outFile, patch(result.css.toString('utf8')))
)
