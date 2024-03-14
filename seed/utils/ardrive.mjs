import safeImport from './safeImport.mjs'
const { arDriveFactory, JWKWallet } = await safeImport('ardrive-core-js')

import { instance as arweave } from './arweave.mjs'
import { loadWallet } from './loadWallet.mjs'

export const arDrive = arDriveFactory({
  arweave,
  wallet: new JWKWallet(await loadWallet()),
  // TODO: should we be using the turbo service?
  // turboSettings: {
  //   turboUrl: 'http://localhost:4005',
  // }
})
