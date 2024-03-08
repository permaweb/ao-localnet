import { writeFile } from 'node:fs/promises'

import { arDriveFactory, JWKWallet } from 'ardrive-core-js'

import { instance as arweave } from './utils/arweaveInstance.mjs'
import { loadWallet } from './utils/loadWallet.mjs'

const arDrive = arDriveFactory({
  arweave,
  wallet: new JWKWallet(await loadWallet()),
})

const { created } = await arDrive.createPublicDrive({
  driveName: 'Test Drive'
})

const driveJson = JSON.stringify(created, null, 2)

await writeFile('drive.json', driveJson)

const txId = created.find(x => x.type === 'bundle').bundleTxId
console.log(`txId:         ${txId}`)

const driveId = created.find(x => x.type === 'drive').entityId
console.log(`driveId:      ${driveId}`)

const rootFolderId = created.find(x => x.type === 'folder').entityId
console.log(`rootFolderId: ${rootFolderId}`)
