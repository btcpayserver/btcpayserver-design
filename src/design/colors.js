const Color = require('color')
const slugify = str => str.toLowerCase().replace(/\W/, '-')

const scale = (title, values, ref) =>
  values
    .reduce((res, value, i) => {
      const num = (i + 1) * 100
      return res.concat({
        value,
        category: title,
        name: `${title} ${num}`,
        variable: `--btcpay-${slugify(title)}-${num}`,
        reference: ref ? `${ref} ${num}` : null
      },
      {
        value: Color(value).rgb().array().join(','),
        category: title,
        name: `${title} ${num}`,
        variable: `--btcpay-${slugify(title)}-${num}-rgb`,
        reference: ref ? `${ref} ${num}` : null
      })
    }, [])
    .concat({
      value: Color(values[4]).rgb().array().join(','),
      category: title,
      name: `${title} RGB`,
      variable: `--btcpay-${slugify(title)}-rgb`
    })

module.exports = [
  // Brand
  {
    category: 'Brand',
    name: 'Brand Primary',
    value: '#51b13e',
    variable: '--btcpay-brand-primary'
  },
  {
    category: 'Brand',
    name: 'Brand Secondary',
    value: '#CEDC21',
    variable: '--btcpay-brand-secondary'
  },
  {
    category: 'Brand',
    name: 'Brand Tertiary',
    value: '#1e7a44',
    variable: '--btcpay-brand-tertiary'
  },
  {
    category: 'Brand',
    name: 'Brand Dark',
    value: '#0F3B21',
    variable: '--btcpay-brand-dark'
  },

  // Primitives
  {
    category: 'Primitives',
    name: 'White',
    value: '#ffffff',
    variable: '--btcpay-white'
  },
  {
    category: 'Primitives',
    name: 'White RGB',
    value: '255, 255, 255',
    variable: '--btcpay-white-rgb'
  },
  {
    category: 'Primitives',
    name: 'Black',
    value: '#000000',
    variable: '--btcpay-black'
  },
  {
    category: 'Primitives',
    name: 'Black RGB',
    value: '0, 0, 0',
    variable: '--btcpay-black-rgb'
  },

  // Other base colors
  ...scale('Neutral Light', ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#8f979e', '#6c757d', '#495057', '#343a40', '#292929']),
  ...scale('Neutral Dark', ['#F0F6FC', '#C9D1D9', '#B1BAC4', '#8B949E', '#6E7681', '#484F58', '#30363D', '#21262D', '#161B22']),
  ...scale('Primary', ['#c7e6c1', '#b5dead', '#9dd392', '#7cc46e', '#44a431', '#389725', '#2e8a1b', '#247d12', '#1c710b']),
  ...scale('Green', ['#EEFAEB', '#C7E8C0', '#A0D695', '#78C369', '#51B13E', '#419437', '#307630', '#205928', '#0F3B21']),
  ...scale('Blue', ['#b5e1e8', '#9dd7e1', '#7ccad7', '#51b9c9', '#17a2b8', '#03899e', '#007d91', '#007284', '#006778']),
  ...scale('Yellow', ['#FFFAF0', '#FFF2D9', '#FFE3AC', '#FFCF70', '#FFC043', '#BC8B2C', '#997328', '#674D1B', '#543D10']),
  ...scale('Red', ['#FFEFED', '#FED7D2', '#F1998E', '#E85C4A', '#E11900', '#AB1300', '#870F00', '#5A0A00', '#420105'])
]
