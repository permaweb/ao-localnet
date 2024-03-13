#!/usr/bin/env node

import { arlocalUrl } from './utils/arweave.mjs'

const qty = process.argv[2] || '1'

const url = `${arlocalUrl}/mine/${qty}`

console.log(`GET ${url}`)

const res = await fetch(url, {
  method: 'GET',
})

console.log(`${res.status} ${res.statusText}`)

const { height } = await res.json()
console.log(`new height: ${height}`)
