#!/bin/bash -e

if [ -d "$BTCPAY_TARGET" ]; then
  sleep 1

  cp dist/styles/btcpayserver-bootstrap.css "$BTCPAY_TARGET/BTCPayServer/wwwroot/main/bootstrap/bootstrap.css"
  cp dist/scripts/bootstrap/* "$BTCPAY_TARGET/BTCPayServer/wwwroot/vendor/bootstrap/"

  # Update default.css
  rootSelector=":root {[\s\S]*?}\n"
  defaultCSS="$BTCPAY_TARGET/BTCPayServer/wwwroot/main/themes/default.css"
  defaultRoot=$(cat dist/styles/btcpayserver-variables.css | grep -oPz "$rootSelector")
  perl -0777 -i -pe "s/$rootSelector//" $defaultCSS
  echo -e "$defaultRoot\n$(cat $defaultCSS)" > $defaultCSS

  # Update default-dark.css
  rootDarkSelector=":root\[data-btcpay-theme=\"dark\"\] {[\s\S]*?}\n"
  defaultDarkCSS="$BTCPAY_TARGET/BTCPayServer/wwwroot/main/themes/default-dark.css"
  defaultDarkRoot=$(cat dist/styles/btcpayserver-variables.css | grep -oPz "$rootDarkSelector" | sed "s/\[data-btcpay-theme=\"dark\"\]//g")
  perl -0777 -i -pe "s/$rootSelector//" $defaultDarkCSS
  echo -e "$defaultDarkRoot$(cat $defaultDarkCSS)" > $defaultDarkCSS

  echo "Copied assets to $BTCPAY_TARGET"
fi
