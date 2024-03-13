import safeImport from './safeImport.mjs'
const { default: Arweave } = await safeImport('arweave')

export const protocol = 'http'
export const host = 'localhost'
export const port = 4000

export const arlocalUrl = `${protocol}://${host}:${port}`

export const instance = new Arweave({
  protocol,
  host,
  port,
})
