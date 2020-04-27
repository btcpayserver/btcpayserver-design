# CSS

To keep the different apps and websites consistent, we offer these stylesheets you should use to build upon.

You can download the CSS files using the references below and copy them to the styles folder of your project.

Then use this HTML snippet inside the `<head>` section to integrate the stylesheets you want to use:

```html
<link href="/styles/btcpayserver-variables.css" rel="stylesheet">
<link href="/styles/btcpayserver-bootstrap.css" rel="stylesheet">
<link href="/styles/btcpayserver-main.css" rel="stylesheet">
```

## Variables

The codified version of what you find in the design section:
This stylesheet does not do anything on its own, but gives you access to the design variables via [CSS Custom Properties](https://developer.mozilla.org/en-US/docs/Web/CSS/Using_CSS_custom_properties).

This file should be the first to include, as every other of the following resources uses the variables it defines.

📦 [btcpayserver-variables.css](/styles/btcpayserver-variables.css)

## Main styles

The most basic set of CSS styles we can share across the different websites.
They include the font references and setting for the light/dark color themes.

The general approach regarding the themes is:

* Light mode is the default
* If the browser supports the [prefers-color-scheme media query](https://web.dev/prefers-color-scheme/), we use the users preference
* Support an [explicit setting](/components/theme-switch/) saved in the browsers `localStorage`, that the user can change via a switch

📦 [btcpayserver-main.css](/styles/btcpayserver-main.css)

## Bootstrap

This is our forked version of [Bootstrap 4](https://getbootstrap.com/).
Including this is optional and only required if you want to build upon what Bootstrap offers.

📦 [btcpayserver-bootstrap.css](/styles/btcpayserver-bootstrap.css)

### Why do we use a fork?

Bootstrap unfortunately doesn't support CSS Custom Properties ([yet](https://github.com/twbs/bootstrap/commit/ac58c25dc8b65928ac817b8a2bf7c0e46a58de97)), but that is what we need for out themeing approach.
So the idea was to maintain this fork at a central place and use it as our custom version.

This way we have to manually update it, but as there aren't too many updates and we don't have to do this every week or so.
Also we can just merge stuff in when we need new features or fixes.
This isn't ideal, but will hopefully change with Bootstrap 5.
