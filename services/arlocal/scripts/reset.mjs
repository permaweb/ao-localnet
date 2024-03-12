#!/usr/bin/env node

import { arlocalUrl } from './utils/arweaveInstance.mjs'

const url = `${arlocalUrl}/reset`

console.log(`GET ${url}`)

const res = await fetch(url, {
  method: 'GET',
})

console.log(`${res.status} ${res.statusText}`)

const result = await res.text()
console.log(result)
