#!/bin/bash -e

if [ -d "$BTCPAY_SERVER_WWWROOT" ]; then
  cp dist/styles/btcpayserver-bootstrap.css "$BTCPAY_SERVER_WWWROOT/main/bootstrap/bootstrap.css"
  cp dist/scripts/bootstrap/* "$BTCPAY_SERVER_WWWROOT/vendor/bootstrap/"
  cp dist/svg/icons.svg "$BTCPAY_SERVER_WWWROOT/img/icon-sprite.svg"
  cp dist/svg/supporters.svg "$BTCPAY_SERVER_WWWROOT/img/supporter-sprite.svg"

  # Update default.css
  rootSelector=":root {[\s\S]*?}\n"
  defaultCSS="$BTCPAY_SERVER_WWWROOT/main/themes/default.css"
  defaultRoot=$(cat dist/styles/btcpayserver-variables.css | grep -oPz "$rootSelector")
  perl -0777 -i -pe "s/$rootSelector//" $defaultCSS
  echo -e "$defaultRoot\n$(cat $defaultCSS)" > $defaultCSS

  # Update default-dark.css
  rootDarkSelector=":root\[data-btcpay-theme='dark'\] {[\s\S]*?}\n"
  defaultDarkCSS="$BTCPAY_SERVER_WWWROOT/main/themes/default-dark.css"
  defaultDarkRoot=$(cat dist/styles/btcpayserver-variables.css | grep -oPz "$rootDarkSelector" | sed "s/\[data-btcpay-theme='dark'\]//g")
  perl -0777 -i -pe "s/$rootSelector//" $defaultDarkCSS
  echo -e "$defaultDarkRoot$(cat $defaultDarkCSS)" > $defaultDarkCSS

  echo "Copied assets to $BTCPAY_SERVER_WWWROOT"
fi

if [ -d "$BTCPAY_APP_SERVER_WWWROOT" ]; then
  cp dist/styles/btcpayserver-bootstrap.css "$BTCPAY_APP_SERVER_WWWROOT/main/bootstrap/bootstrap.css"
  cp dist/scripts/bootstrap/* "$BTCPAY_APP_SERVER_WWWROOT/vendor/bootstrap/"
  cp dist/svg/icons.svg "$BTCPAY_APP_SERVER_WWWROOT/img/icon-sprite.svg"
  cp dist/svg/supporters.svg "$BTCPAY_APP_SERVER_WWWROOT/img/supporter-sprite.svg"

  # Update default.css
  rootSelector=":root {[\s\S]*?}\n"
  defaultCSS="$BTCPAY_APP_SERVER_WWWROOT/main/themes/default.css"
  defaultRoot=$(cat dist/styles/btcpayserver-variables.css | grep -oPz "$rootSelector")
  perl -0777 -i -pe "s/$rootSelector//" $defaultCSS
  echo -e "$defaultRoot\n$(cat $defaultCSS)" > $defaultCSS

  # Update default-dark.css
  rootDarkSelector=":root\[data-btcpay-theme='dark'\] {[\s\S]*?}\n"
  defaultDarkCSS="$BTCPAY_APP_SERVER_WWWROOT/main/themes/default-dark.css"
  defaultDarkRoot=$(cat dist/styles/btcpayserver-variables.css | grep -oPz "$rootDarkSelector" | sed "s/\[data-btcpay-theme='dark'\]//g")
  perl -0777 -i -pe "s/$rootSelector//" $defaultDarkCSS
  echo -e "$defaultDarkRoot$(cat $defaultDarkCSS)" > $defaultDarkCSS

  echo "Copied assets to $BTCPAY_APP_SERVER_WWWROOT"
fi

if [ -d "$BTCPAY_APP_WWWROOT" ]; then
  cp dist/styles/btcpayserver-bootstrap.css "$BTCPAY_APP_WWWROOT/bootstrap/bootstrap.css"
  cp dist/scripts/bootstrap/* "$BTCPAY_APP_WWWROOT/bootstrap/"
  cp dist/svg/icons.svg "$BTCPAY_APP_WWWROOT/img/icon-sprite.svg"
  cp dist/svg/supporters.svg "$BTCPAY_APP_WWWROOT/img/supporter-sprite.svg"

  cp dist/styles/btcpayserver-variables.css "$BTCPAY_APP_WWWROOT/css/theme.css"

  echo "Copied assets to $BTCPAY_APP_WWWROOT"
fi
