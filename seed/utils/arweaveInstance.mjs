import Arweave from 'arweave'

export const protocol = 'http'
export const host = 'localhost'
export const port = 4000

export const arlocalUrl = `${protocol}://${host}:${port}`

export const instance = new Arweave({
  protocol: 'http',
  host: 'localhost',
  port: 4000,
})
