#!/usr/bin/env node

import { readFile } from 'node:fs/promises'

import { instance as arweave } from './utils/arweave.mjs'

const wallet = JSON.parse(await readFile(import.meta.resolve('../wallets/aos-module-publisher-wallet.json').slice(7), 'utf8'))
const address = await arweave.wallets.getAddress(wallet)

console.log('aos publisher address:', address)

const tx = await arweave.createTransaction({
  data: await readFile('extras/aos.wasm'),
})

tx.addTag('Memory-Limit',    '500-mb'                   )
tx.addTag('Compute-Limit',   '9000000000000'            )
tx.addTag('Data-Protocol',   'ao'                       )
tx.addTag('Type',            'Module'                   )
tx.addTag('Module-Format',   'wasm32-unknown-emscripten')
tx.addTag('Input-Encoding',  'JSON-1'                   )
tx.addTag('Output-Encoding', 'JSON-1'                   )
tx.addTag('Variant',         'ao.LN.1'                  )
tx.addTag('Content-Type',    'application/wasm'         )

await arweave.transactions.sign(tx, wallet)

console.log('POST /tx')

const res = await arweave.transactions.post(tx)

if (res.status === 200) {
  console.log(`${res.status} ${res.statusText}`)
  console.log(`aos module: ${tx.id}`)
} else {
  console.log(`${res.status} ${JSON.stringify(res.statusText, null, 2)}`)
}
