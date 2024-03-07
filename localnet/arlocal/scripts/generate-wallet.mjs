import { writeFile } from 'node:fs/promises'

import { instance as arweave } from './utils/arweaveInstance.mjs'

const wallet = await arweave.wallets.generate()

const walletJson = JSON.stringify(wallet, null, 2)
await writeFile('wallet.json', walletJson)

const walletAddress = await arweave.wallets.getAddress(wallet)
console.log(`new wallet address: ${walletAddress}`)
