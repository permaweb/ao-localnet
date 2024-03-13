import { readFile } from 'node:fs/promises'
import { dirname, join } from 'node:path'

export async function loadWallet (filename = 'user-wallet.json') {
  const __dirname = dirname(import.meta.url.slice(7))
  const userWalletFile = join(__dirname, '..', '..', 'wallets', filename)
  const json = await readFile(userWalletFile, 'utf-8')
  return JSON.parse(json)
}
