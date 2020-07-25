module.exports = {
  // Project config: Defaults to name and version from package.json.
  // Here you can overwrite it and add more custom properties.
  // For a detailed documentation of all the options in here see
  // https://uiengine.uix.space/basics/config/
  name: 'BTCPay Server Design System',
  logo: '/resources/design-files/btcpay-logo.svg',

  // Base directories for the input, your raw source files:
  // - components is the root of the directory containing the components
  // - templates contains the variant preview and application templates
  // - pages is the directory of the UIengine's site structure and page markdown files
  source: {
    components: ['./src/components', './src/views'],
    templates: './src/templates',
    pages: './pages',
    additionalWatches: ['./src/design']
  },

  // Destination paths for the generated output.
  target: './dist',

  // Adapters are used for templating/rendering. Each adapter is a module that gets required
  // and needs to provide functions for setup and rendering. For details see the adapters docs.
  adapters: {
    html: {
      module: '@uiengine/adapter-html',
      options: {
        basedir: './src/components',
        skipScaffold: false
      }
    }
  },

  // Here you can configure the template that the variant preview gets embeded in.
  template: 'patternlib.html',

  themes: [
    {
      id: 'light',
      title: 'Light'
    },
    {
      id: 'dark',
      title: 'Dark'
    }
  ],

  ui: {
    lang: 'en',
    customStylesFile: '/styles/patternlib-overrides.css',
    repoBaseUrl: 'https://github.com/btcpayserver/btcpayserver-design/blob/master/',
    viewports: {
      Phone: {
        width: 320
      },
      Tablet: {
        width: 768
      },
      Desktop: {
        width: 1280
      }
    },
    breakpoints: {
      XS: 320,
      S: 560,
      M: 768,
      L: 960,
      XL: 1280
    }
  },

  browserSync: {
    open: false
  }
}
