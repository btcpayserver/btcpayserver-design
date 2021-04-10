const brandPrimary = '#51b13e'
const brandSecondary = '#CEDC21'
const brandTertiary = '#1e7a44'
const brandDark = '#0F3B21'

const white = '#ffffff'
const black = '#000000'
const neutral = ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#8f979e', '#6c757d', '#495057', '#343a40', '#292929']

const dark = ['#F0F6FC', '#C9D1D9', '#B1BAC4', '#8B949E', '#6E7681', '#484F58', '#30363D', '#21262D', '#161B22']

const slugify = str => str.toLowerCase().replace(/\W/, '-')

const scale = (title, values, ref) =>
  values.reduce((res, value, i) => {
    const num = (i + 1) * 100
    return res.concat({
      value,
      category: title,
      name: `${title} ${num}`,
      variable: `--btcpay-${slugify(title)}-${num}`,
      reference: ref ? `${ref} ${num}` : null
    })
  }, [])

module.exports = [
  // Brand
  {
    category: 'Brand',
    name: 'Brand Primary',
    value: brandPrimary,
    variable: '--btcpay-brand-primary'
  },
  {
    category: 'Brand',
    name: 'Brand Secondary',
    value: brandSecondary,
    variable: '--btcpay-brand-secondary'
  },
  {
    category: 'Brand',
    name: 'Brand Tertiary',
    value: brandTertiary,
    variable: '--btcpay-brand-tertiary'
  },
  {
    category: 'Brand',
    name: 'Brand Dark',
    value: brandDark,
    variable: '--btcpay-brand-dark'
  },

  // Neutral
  {
    category: 'Neutral',
    name: 'White',
    value: white,
    variable: '--btcpay-neutral-white'
  },
  ...scale('Neutral', neutral),
  {
    category: 'Neutral',
    name: 'Neutral 950',
    value: '#222',
    variable: '--btcpay-neutral-950'
  },
  {
    category: 'Neutral',
    name: 'Black',
    value: '#000',
    variable: '--btcpay-neutral-black'
  },
  ...scale('Dark', dark),
  {
    category: 'Dark',
    name: 'Dark 950',
    value: '#0D1117',
    variable: '--btcpay-dark-950'
  },

  // Categories
  ...scale('Primary', ['#c7e6c1', '#b5dead', '#9dd392', '#7cc46e', '#44a431', '#389725', '#2e8a1b', '#247d12', '#1c710b']),
  ...scale('Secondary', neutral, 'Neutral'),
  ...scale('Success', ['#b9d6b4', '#a2c89b', '#83b679', '#5a9e4d', '#247e12', '#146404', '#0e5700', '#0c4b00', '#0a3e00']),
  ...scale('Info', ['#b5e1e8', '#9dd7e1', '#7ccad7', '#51b9c9', '#17a2b8', '#03899e', '#007d91', '#007284', '#006778']),
  ...scale('Warning', ['#ffebb0', '#ffe496', '#ffdc73', '#ffd045', '#ffc107', '#e5ac00', '#d8a200', '#cc9900', '#bf8f00']),
  ...scale('Danger', ['#ebbcb6', '#e4a59e', '#dc887e', '#d06053', '#c12c1a', '#a71705', '#9a1000', '#8e0f00', '#810d00']),
]
