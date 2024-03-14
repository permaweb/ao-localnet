#!/usr/bin/env node

import { writeFile } from 'node:fs/promises'
import { join } from 'node:path'

import { arDrive } from './utils/ardrive.mjs'

const { created } = await arDrive.createPublicDrive({
  driveName: 'Test Drive',
})

const driveJson = JSON.stringify(created, null, 2)

await writeFile(join('extras', 'drive.json'), driveJson)

const txId = created.find(x => x.type === 'bundle').bundleTxId
console.log(`txId:         ${txId}`)

const driveId = created.find(x => x.type === 'drive').entityId
console.log(`driveId:      ${driveId}`)

const rootFolderId = created.find(x => x.type === 'folder').entityId
console.log(`rootFolderId: ${rootFolderId}`)
