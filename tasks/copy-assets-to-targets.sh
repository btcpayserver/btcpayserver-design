#!/bin/bash -e

if [ -d "$BTCPAY_TARGET" ]; then
  cp dist/styles/btcpayserver-bootstrap-v5.css "$BTCPAY_TARGET/BTCPayServer/wwwroot/main/bootstrap/bootstrap.css"

  echo "Copied assets to $BTCPAY_TARGET"
fi

if [ -d "$LNBANK_TARGET" ]; then
  cp dist/styles/btcpayserver-bootstrap-v5.css "$LNBANK_TARGET/LNbank/wwwroot/css/btcpayserver-bootstrap.css"
  cp dist/styles/btcpayserver-variables.css "$LNBANK_TARGET/LNbank/wwwroot/css/btcpayserver-variables.css"
  cp dist/styles/btcpayserver-main.css "$LNBANK_TARGET/LNbank/wwwroot/css/btcpayserver-main.css"

  echo "Copied assets to $LNBANK_TARGET"
fi
