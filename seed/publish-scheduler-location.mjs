#!/usr/bin/env node

import { readFile } from 'node:fs/promises'

import { instance as arweave } from './utils/arweave.mjs'

const wallet = JSON.parse(await readFile(import.meta.resolve('../wallets/scheduler-location-publisher-wallet.json').slice(7), 'utf8'))
const address = await arweave.wallets.getAddress(wallet)

console.log('scheduler location publisher address:', address)

const tx = await arweave.createTransaction({
  data: Math.random.toString().slice(-4)
})

tx.addTag('Data-Protocol', 'ao')
tx.addTag('Type', 'Scheduler-Location')
tx.addTag('Variant', 'ao.LN.1')
tx.addTag('Url', 'http://host.docker.internal:4003')
tx.addTag('Time-To-Live', '1')

await arweave.transactions.sign(tx, wallet)

console.log('POST /tx')

const res = await arweave.transactions.post(tx)

if (res.status === 200) {
  console.log(`${res.status} ${res.statusText}`)
  console.log(`tx id : ${tx.id}`)
} else {
  console.log(`${res.status} ${JSON.stringify(res.statusText, null, 2)}`)
}
