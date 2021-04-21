# [BTCPay Server Design System](https://design.btcpayserver.org/)

> Developers on brink of new UI for BTCPay Server

![Node CI](https://github.com/btcpayserver/btcpayserver-design/workflows/Node%20CI/badge.svg)

## 🛠 Development

Dependencies are managed via npm.
Once you have cloned this repo, you can setup the packages:

```bash
npm install
```

Create a build and rebuild on file change:

```bash
npm start
```

This will bring up the dev server and pattern library on [localhost:3000](http://localhost:3000).

### 🛼 Bootstrap Customizations

To generate a custom version of Bootstrap v5 that supports our light/dark themeing, we take a three step approach:

1. Where possible we [customize the variables](./src/bootstrap/_variables.scss) offered by Bootstrap.
   The general variable definitions can be looked up in the component files in `node_modules/bootstrap/scss/` after locally installing Bootstrap as a dependency.
2. We then [generate the bootstrap css](./tasks/generate-bootstrap.js) and replace some of the generated HEX values with our color variables.
   This is done for the cases in which we cannot use our variables directly in step 1, because Bootstrap passes them through modifier functions (lighten/darken), which require actual color values.
3. Hard [CSS overrides](./src/bootstrap/_customizations.css) are used for extensions and customizations of the final `bootstrap.css`.
   These are appended to the generated file, so that we can override things and maintain the ability to easily upgrade.
