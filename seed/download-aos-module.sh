#!/bin/sh

# TODO: need to find this module id programatically with a query to Arlocal
AOS_MODULE=SBNb1qPQ1TDwpD_mboxm2YllmMLXpWw4U8P9Ff8W9vk
echo "!!!"
echo "!!!"
echo "!!!"
echo "!!!                      $AOS_MODULE"
echo "!!!"
echo "!!! downloading this aos ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
echo "!!! module from testnet"
echo "!!!"
echo "!!!"
echo "!!!"

curl -L https://arweave.net/$AOS_MODULE -o extras/aos.wasm
