#!/usr/bin/env node

import { readFile } from 'node:fs/promises'

import { instance as arweave } from './utils/arweave.mjs'

const wallet = JSON.parse(await readFile(import.meta.resolve('../wallets/scheduler-location-publisher-wallet.json').slice(7), 'utf8'))
const address = await arweave.wallets.getAddress(wallet)

console.log('address', address)

const tx = await arweave.createTransaction(
  {
    data: Math.random.toString().slice(-4),
    tags: [
      {
        name: 'Data-Protocol',
        value: 'ao',
      },
      {
        name: 'Type',
        value: 'Scheduler-Location',
      },
      {
        name: 'Variant',
        value: 'ao.LN.1',
      },
      {
        name: 'URL',
        value: 'http://localhost:4003',
      },
      {
        name: 'Time-To-Live',
        value: '86400',
      },
    ].map(({ name, value }) => ({
      name: Buffer.from(name).toString('base64'),
      value: Buffer.from(value).toString('base64'),
    })),
  },
)

await arweave.transactions.sign(tx, wallet)

console.log(tx)

const res = await arweave.transactions.post(tx)

console.log(`${res.status} ${res.statusText}`)
