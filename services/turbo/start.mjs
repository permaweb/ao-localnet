import { readFileSync } from 'node:fs'

import { TurboPaymentService } from './lib/arch/payment.js'
import { createServer } from './lib/server.js'

const json = readFileSync('turbo-wallet.json', 'utf-8')
const jwk = JSON.parse(json)

createServer({
  getArweaveWallet: async () => jwk,
  paymentService: new TurboPaymentService(true),
})
