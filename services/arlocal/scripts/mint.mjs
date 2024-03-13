#!/usr/bin/env node

import { arlocalUrl } from './utils/arweaveInstance.mjs'
import { getWalletAddress } from './utils/getWalletAddress.mjs'

const amount = process.argv[2] || '1000000000'

const address = await getWalletAddress()

const url = `${arlocalUrl}/mint/${address}/${amount}`

console.log(`GET ${url}`)

const res = await fetch(url, {
  method: 'GET',
})

console.log(`${res.status} ${res.statusText}`)

const balance = await res.text()

console.log(`new balance: ${balance} winston`)
