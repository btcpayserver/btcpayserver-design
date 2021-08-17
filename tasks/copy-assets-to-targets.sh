#!/bin/bash -e

if [ -d "$BTCPAY_TARGET" ]; then
  cp dist/styles/btcpayserver-bootstrap.css "$BTCPAY_TARGET/BTCPayServer/wwwroot/main/bootstrap/bootstrap.css"
  cp dist/scripts/bootstrap/* "$BTCPAY_TARGET/BTCPayServer/wwwroot/vendor/bootstrap/"
  echo "Copied assets to $BTCPAY_TARGET"
fi
