#!/bin/sh

cd $(dirname $0)

#########################################################################################
# Mint/grant tokens

# # Give the Scheduler Location Publisher 1 AR
# curl -q http://localhost:4000/mint/W8_WUWr_xaR9T8JwKwd-b861aq3W2iD3eVeaV_jOn-U/1000000000000
# echo
# # Give the `aos` Module Publisher 1 AR
# curl -q http://localhost:4000/mint/OVH7RgGAzjOxqUPaWjYf1MTrnznM1zpSOTMfC78DpKc/1000000000000
# echo
# # Give the bundler service 1 AR
# curl -q http://localhost:4000/mint/a55QnqSWizpWEnkTcPIijNYwuzTmk-TXTbXTM-CgjDc/1000000000000
# echo
# # Give the `ao` units 1 AR
# curl -q http://localhost:4000/mint/JYti9w4-nAFUUAo7fE0gh4xcv_YxhNad-3Yj7pZbxP0/1000000000000
# echo

echo "!!!"
echo "!!!"
echo "!!!"
echo "!!! Edit this script to grant tokens to your wallet(s)."
echo "!!!"
echo "!!!"
echo "!!!"

#########################################################################################
# Publish the 'Scheduler-Location' record

./publish-scheduler-location.mjs
./mine.mjs

#########################################################################################
# Publish the `aos` Module

./publish-aos-module.mjs
echo
echo "copy this   ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^"
echo
./mine.mjs
