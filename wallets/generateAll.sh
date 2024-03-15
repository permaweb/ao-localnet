#!/bin/bash

cd $(dirname $0)

./generateWallet.sh ao
./generateWallet.sh aos
./generateWallet.sh aos-module-publisher
./generateWallet.sh bundler
./generateWallet.sh scheduler-location-publisher
./generateWallet.sh turbo
./generateWallet.sh user
