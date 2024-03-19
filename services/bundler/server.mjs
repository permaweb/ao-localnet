import { readFileSync } from 'node:fs'

import Arweave from 'arweave'
import { DataItem } from 'arbundles'
import debug from 'debug'
import express from 'express'

const logger = debug('bundler')
const txLogger = logger.extend('tx')

const requiredEnvVars = ['GATEWAY_URL', 'WALLET_FILE']
for ( const name of requiredEnvVars) {
  if (!process.env[name]) {
    throw new Error(`${name} is not define`)
  }
}

const port = process.env.PORT || 3000
logger('port =', port)
const gatewayUrl = new URL(process.env.GATEWAY_URL)
logger('gatewayUrl =', gatewayUrl)
const arweave = new Arweave({
  protocol: gatewayUrl.protocol.slice(0, -1),
  host: gatewayUrl.hostname,
  port: gatewayUrl.port,
  network: 'ao-localnet',
  logging: true,
  logger: logger.extend('arweave'),
})
logger('arweave.api.config =', arweave.api.config)
const walletFile = process.env.WALLET_FILE
logger('walletFile =', walletFile)
const wallet = JSON.parse(await readFileSync(walletFile,'utf-8'))
logger('walletAddress =', await arweave.wallets.jwkToAddress(wallet))

const handler = async (req, res) => {
  logger('handling request...')
  const dataItem = new DataItem(req.body)
  if (!dataItem.isValid()) {
    throw new Error('Uploaded data item is invalid')
  }
  logger('parsed ANS-104 data item from request body')

  txLogger('building tx...')
  const tx = await arweave.createTransaction({
    data: dataItem.rawData,
  })
  txLogger('adding tags...')
  tx.addTag('App-Name',       'ao-localnet bundler')
  tx.addTag('App-Version',    '0.0.1'              )
  tx.addTag('Bundle-Format',  'binary'             )
  tx.addTag('Bundle-Version', '2.0.0'              )
  txLogger('signing...')
  await arweave.transactions.sign(tx, wallet)
  txLogger('signed', tx)

  logger('posting tx', tx.id, 'to arweave...')
  const { status, statusText, data } = await arweave.transactions.post(tx)

  if (status === 200) {
    logger('success. posted tx', tx.id, 'to arweave.')
    res.sendStatus(200)
  } else {
    logger('failed to post tx', tx.id, 'to arweave.')
    logger(status, statusText, data)
    res.status(status).end(data)
  }
}

const app = express()

app.use(express.raw({ limit: '10mb' }))

app.post('/tx', handler)
app.post('/tx/arweave', handler)
app.post('/v1/tx', handler)
app.post('/v1/tx/arweave', handler)

app.listen(port, () => {
  logger(`listening on port ${port}`)
})
