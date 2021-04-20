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
    name: 'Black',
    value: '#000000',
    variable: '--btcpay-black'
  },

  // Other base colors
  ...scale('Neutral Light', ['#f8f9fa', '#e9ecef', '#dee2e6', '#ced4da', '#8f979e', '#6c757d', '#495057', '#343a40', '#292929']),
  ...scale('Neutral Dark', ['#F0F6FC', '#C9D1D9', '#B1BAC4', '#8B949E', '#6E7681', '#484F58', '#30363D', '#21262D', '#161B22']),

  ...scale('Primary', ['#c7e6c1', '#b5dead', '#9dd392', '#7cc46e', '#44a431', '#389725', '#2e8a1b', '#247d12', '#1c710b']),
  ...scale('Green', ['#b9d6b4', '#a2c89b', '#83b679', '#5a9e4d', '#247e12', '#146404', '#0e5700', '#0c4b00', '#0a3e00']),

  ...scale('Blue', ['#b5e1e8', '#9dd7e1', '#7ccad7', '#51b9c9', '#17a2b8', '#03899e', '#007d91', '#007284', '#006778']),

  ...scale('Yellow', ['#ffebb0', '#ffe496', '#ffdc73', '#ffd045', '#ffc107', '#e5ac00', '#d8a200', '#cc9900', '#bf8f00']),

  ...scale('Red', ['#FFEFED', '#FED7D2', '#F1998E', '#E85C4A', '#E11900', '#AB1300', '#870F00', '#5A0A00', '#420105']),

  ...scale('Purple', ['#F4F1FA', '#E3DDF2', '#C1B5E3', '#957FCE', '#7356BF', '#574191', '#453473', '#2E224C', '#1A1033']),

  ...scale('Orange', ['#FFF3EF', '#FFE1D6', '#FABDA5', '#FA9269', '#FF6937', '#C14F29', '#9A3F21', '#672A16']),

  ...scale('Brown', ['#F6F0EA', '#EBE0DB', '#D2BBB0', '#B18977', '#99644C', '#744C3A', '#5C3C2E', '#3D281E', '#241914']),

  ...scale('Pink', ['#FFEDF9', '#FFCEE5', '#FFACD6', '#FE82C2', '#F162AF', '#BB4183', '#7D2457', '#5E103E']),
]
