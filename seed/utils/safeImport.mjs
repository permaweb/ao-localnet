import { execFileSync } from 'node:child_process'
import { dirname } from 'node:path'

export default async function safeImport (module) {
  try {
    return await import(module);
  } catch (e) {
    console.log(`Installing '${module}' from npm...`)
    execFileSync('npm', ['install', module], {
      cwd: dirname(import.meta.url).slice(7),
      encoding: 'utf-8',
    })
    console.log(`Installed '${module}'.`)
    return await import(module);
  }
}
