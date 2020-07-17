const { writeFileSync } = require('fs')
const { resolve } = require('path')

const colors = require('../src/design/colors')

const hexToRgb = hex => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result ? {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16)
  } : null
}

let result = "GIMP Palette\nName: BTCPay Server\n#\n";

for (var i = 0; i < colors.length; ++i) {
    var color = colors[i];
    var rgb = hexToRgb(color.value);
    if (rgb != null)
    result += rgb.r + ' ' + rgb.g + ' ' + rgb.b + ' ' + color.name + '\n';
}

const file = resolve(__dirname, '../pages/resources/design-files/btcpay.gpl')

try {
  writeFileSync(file, result)
  console.error('✅  File written:', file)
} catch (err) {
  console.error('🚨  Could not save file', file, ':', err)
}
