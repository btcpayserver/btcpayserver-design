#!/bin/bash -e

if [ -d "$BTCPAY_TARGET" ]; then
  cp dist/styles/btcpayserver-bootstrap.css "$BTCPAY_TARGET/BTCPayServer/wwwroot/main/bootstrap/bootstrap.css"

  echo "Copied assets to $BTCPAY_TARGET"
fi
