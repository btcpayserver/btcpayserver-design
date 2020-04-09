const sizes = [
  {
    name: 'XS',
    value: '10px',
    variable: '--btcpay-font-size-xs'
  },
  {
    name: 'S',
    value: '12px',
    variable: '--btcpay-font-size-s'
  },
  {
    name: 'M',
    value: '14px',
    variable: '--btcpay-font-size-m'
  },
  {
    name: 'L',
    value: '18px',
    variable: '--btcpay-font-size-l'
  },
  {
    name: 'XL',
    value: '36px',
    variable: '--btcpay-font-size-xl'
  },
  {
    name: 'XXL',
    value: '45px',
    variable: '--btcpay-font-size-xxl'
  }
]

const weights = [
  {
    name: 'Regular',
    value: 400,
    variable: '--btcpay-font-weight-normal'
  },
  {
    name: 'Semibold',
    value: 600,
    variable: '--btcpay-font-weight-semibold'
  },
  {
    name: 'Bold',
    value: 700,
    variable: '--btcpay-font-weight-bold'
  }
]

const families = [
  {
    name: 'Base',
    value: '"Open Sans", "Helvetica Neue", Arial, sans-serif',
    variable: '--btcpay-font-family-base',
    weights
  },
  {
    name: 'Monospace',
    value: 'SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
    variable: '--btcpay-font-family-monospace',
    weights
  }
]

module.exports = {
  sizes,
  weights,
  families
}
