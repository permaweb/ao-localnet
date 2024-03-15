#!/usr/bin/env node

import { createHash } from 'node:crypto'
import { readdir, readFile } from 'node:fs/promises'

const dirents = await readdir('.', { withFileTypes: true })

dirents.sort((a, b) => a.name.localeCompare(b.name))

for await (const dirent of dirents) {
  if (dirent.isFile()) {
    const { name: fileName } = dirent
    const fileContents = await readFile(fileName, 'utf-8')
    try {
      const wallet = JSON.parse(fileContents)
      const { n: owner } = wallet
      if (!owner) continue
      const ownerBuffer = Buffer.from(owner, 'base64url')
      const addressBuffer = createHash('sha256').update(ownerBuffer).digest()
      const address = addressBuffer.toString('base64url')
      console.log(`${address} ${fileName}`)
    } catch (e) {
      // console.error(e)
    }
  }
}
