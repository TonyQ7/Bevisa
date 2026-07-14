import { readFile, readdir } from 'node:fs/promises'
import { extname, join, resolve } from 'node:path'
import { gzipSync } from 'node:zlib'

const root = resolve(import.meta.dirname, '..')
const assets = resolve(root, 'dist', 'assets')
const files = await readdir(assets)
let total = 0
const report = []

for (const file of files.filter((name) => extname(name) === '.js')) {
  const bytes = gzipSync(await readFile(join(assets, file))).byteLength
  total += bytes
  report.push(`${file}: ${(bytes / 1024).toFixed(1)} KB gzip`)
}

const limit = 450 * 1024
process.stdout.write(`${report.join('\n')}\nTotal JavaScript: ${(total / 1024).toFixed(1)} KB gzip\n`)
if (total > limit) {
  process.stderr.write(`JavaScript budget exceeded by ${((total - limit) / 1024).toFixed(1)} KB\n`)
  process.exit(1)
}
