import { readFile } from 'node:fs/promises'

export async function loadWallet () {
  const json = await readFile('wallet.json', 'utf-8')
  return JSON.parse(json)
}
