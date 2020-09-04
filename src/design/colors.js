const brandPrimary = '#51b13e'
const brandTertiary = '#1e7a44'
const neutral200 = '#e9ecef'
const neutral400 = '#ced4da'
const neutral500 = '#8f979e'
const neutral600 = '#6c757d'
const neutral700 = '#495057'
const neutral800 = '#343a40'
const neutral900 = '#292929'
const white = '#ffffff'
const black = '#000000'
const infoAccent = '#117a8b'

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
    value: '#CEDC21',
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
    value: '#0F3B21',
    variable: '--btcpay-brand-dark'
  },

  // Neutral
  {
    category: 'Neutral',
    name: 'White',
    value: white,
    variable: '--btcpay-color-white'
  },
  {
    category: 'Neutral',
    name: 'Neutral 0',
    value: white,
    variable: '--btcpay-color-neutral-0',
    reference: 'White'
  },
  {
    category: 'Neutral',
    name: 'Neutral 100',
    value: '#f8f9fa',
    variable: '--btcpay-color-neutral-100',
  },
  {
    category: 'Neutral',
    name: 'Neutral 200',
    value: neutral200,
    variable: '--btcpay-color-neutral-200',
  },
  {
    category: 'Neutral',
    name: 'Neutral 300',
    value: '#dee2e6',
    variable: '--btcpay-color-neutral-300'
  },
  {
    category: 'Neutral',
    name: 'Neutral 400',
    value: neutral400,
    variable: '--btcpay-color-neutral-400'
  },
  {
    category: 'Neutral',
    name: 'Neutral 500',
    value: neutral500,
    variable: '--btcpay-color-neutral-500'
  },
  {
    category: 'Neutral',
    name: 'Neutral 600',
    value: neutral600,
    variable: '--btcpay-color-neutral-600',
  },
  {
    category: 'Neutral',
    name: 'Neutral 700',
    value: neutral700,
    variable: '--btcpay-color-neutral-700'
  },
  {
    category: 'Neutral',
    name: 'Neutral 800',
    value: '#343a40',
    variable: '--btcpay-color-neutral-800'
  },
  {
    category: 'Neutral',
    name: 'Neutral 900',
    value: neutral900,
    variable: '--btcpay-color-neutral-900'
  },
  {
    category: 'Neutral',
    name: 'Neutral 950',
    value: '#222',
    variable: '--btcpay-color-neutral-950'
  },
  {
    category: 'Neutral',
    name: 'Neutral 1000',
    value: black,
    variable: '--btcpay-color-neutral-1000',
    reference: 'Black'
  },
  {
    category: 'Neutral',
    name: 'Black',
    value: '#000',
    variable: '--btcpay-color-black'
  },

  // Primary
  {
    category: 'Primary',
    name: 'Primary',
    value: brandPrimary,
    variable: '--btcpay-color-primary',
    reference: 'Brand Primary'
  },
  {
    category: 'Primary',
    name: 'Primary Accent',
    value: brandTertiary,
    variable: '--btcpay-color-primary-accent',
    reference: 'Brand Tertiary'
  },
  {
    category: 'Primary',
    name: 'Primary Backdrop',
    value: '#D2E5CF',
    variable: '--btcpay-color-primary-backdrop'
  },
  {
    category: 'Primary',
    name: 'Primary Text',
    value: neutral900,
    variable: '--btcpay-color-primary-text',
    reference: 'Neutral 900',
    description: 'Text color on primary backdrop'
  },

  // Secondary
  {
    category: 'Secondary',
    name: 'Secondary',
    value: neutral500,
    variable: '--btcpay-color-secondary',
    reference: 'Neutral 500'
  },
  {
    category: 'Secondary',
    name: 'Secondary Accent',
    value: neutral700,
    variable: '--btcpay-color-secondary-accent',
    reference: 'Neutral 700'
  },
  {
    category: 'Secondary',
    name: 'Secondary Backdrop',
    value: neutral400,
    variable: '--btcpay-color-secondary-backdrop',
    reference: 'Neutral 400'
  },
  {
    category: 'Secondary',
    name: 'Secondary Text',
    value: neutral700,
    variable: '--btcpay-color-secondary-text',
    reference: 'Neutral 700',
    description: 'Text color on secondary backdrop'
  },

  // Success
  {
    category: 'Success',
    name: 'Success',
    value: '#247e12',
    variable: '--btcpay-color-success'
  },
  {
    category: 'Success',
    name: 'Success Accent',
    value: brandTertiary,
    variable: '--btcpay-color-success-accent',
    reference: 'Brand Tertiary'
  },
  {
    category: 'Success',
    name: 'Success Backdrop',
    value: '#389725',
    variable: '--btcpay-color-success-backdrop'
  },
  {
    category: 'Success',
    name: 'Success Text',
    value: white,
    variable: '--btcpay-color-success-text',
    reference: 'White',
    description: 'Text color on success backdrop'
  },

  // Info
  {
    category: 'Info',
    name: 'Info',
    value: '#17a2b8',
    variable: '--btcpay-color-info'
  },
  {
    category: 'Info',
    name: 'Info Accent',
    value: infoAccent,
    variable: '--btcpay-color-info-accent'
  },
  {
    category: 'Info',
    name: 'Info Backdrop',
    value: '#C8E7ED',
    variable: '--btcpay-color-info-backdrop'
  },
  {
    category: 'Info',
    name: 'Info Text',
    value: infoAccent,
    variable: '--btcpay-color-info-text',
    reference: 'Info Accent',
    description: 'Text color on info backdrop'
  },

  // Warning
  {
    category: 'Warning',
    name: 'Warning',
    value: '#ffc107',
    variable: '--btcpay-color-warning'
  },
  {
    category: 'Warning',
    name: 'Warning Accent',
    value: '#d39e00',
    variable: '--btcpay-color-warning-accent'
  },
  {
    category: 'Warning',
    name: 'Warning Backdrop',
    value: '#ffc107',
    variable: '--btcpay-color-warning-backdrop'
  },
  {
    category: 'Warning',
    name: 'Warning Text',
    value: neutral900,
    variable: '--btcpay-color-warning-text',
    reference: 'Neutral 900',
    description: 'Text color on warning backdrop'
  },

  // Danger
  {
    category: 'Danger',
    name: 'Danger',
    value: '#c12c1a',
    variable: '--btcpay-color-danger'
  },
  {
    category: 'Danger',
    name: 'Danger Accent',
    value: '#a71705',
    variable: '--btcpay-color-danger-accent'
  },
  {
    category: 'Danger',
    name: 'Danger Backdrop',
    value: '#E85442',
    variable: '--btcpay-color-danger-backdrop'
  },
  {
    category: 'Danger',
    name: 'Danger Text',
    value: white,
    variable: '--btcpay-color-danger-text',
    reference: 'White',
    description: 'Text color on danger backdrop'
  },

  // Light
  {
    category: 'Light',
    name: 'Light',
    value: neutral200,
    variable: '--btcpay-color-light',
    reference: 'Neutral 200'
  },
  {
    category: 'Light',
    name: 'Light Accent',
    value: neutral400,
    variable: '--btcpay-color-light-accent',
    reference: 'Neutral 400'
  },
  {
    category: 'Light',
    name: 'Light Backdrop',
    value: neutral200,
    variable: '--btcpay-color-light-backdrop',
    reference: 'Neutral 200'
  },
  {
    category: 'Light',
    name: 'Light Text',
    value: neutral800,
    variable: '--btcpay-color-light-text',
    reference: 'Neutral 800',
    description: 'Text color on light backdrop'
  },

  // Dark
  {
    category: 'Dark',
    name: 'Dark',
    value: neutral800,
    variable: '--btcpay-color-dark',
    reference: 'Neutral 800'
  },
  {
    category: 'Dark',
    name: 'Dark Accent',
    value: black,
    variable: '--btcpay-color-dark-accent',
    reference: 'Black'
  },
  {
    category: 'Dark',
    name: 'Dark Backdrop',
    value: neutral800,
    variable: '--btcpay-color-dark-backdrop',
    reference: 'Neutral 800'
  },
  {
    category: 'Dark',
    name: 'Dark Text',
    value: neutral200,
    variable: '--btcpay-color-dark-text',
    reference: 'Neutral 200',
    description: 'Text color on light backdrop'
  }
]
