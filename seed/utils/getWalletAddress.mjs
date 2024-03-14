import { instance as arweave } from './arweave.mjs'
import { loadWallet } from './loadWallet.mjs'

export async function getWalletAddress () {
  const wallet = await loadWallet()
  const address = await arweave.wallets.getAddress(wallet)
  return address
}
