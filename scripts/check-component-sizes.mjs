import { readFile, readdir } from 'node:fs/promises'
import { extname, join, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const targets = ['src/components', 'src/sections', 'src/three']
const violations = []

async function visit(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const path = join(directory, entry.name)
    if (entry.isDirectory()) await visit(path)
    if (entry.isFile() && extname(path) === '.tsx') {
      const lines = (await readFile(path, 'utf8')).split(/\r?\n/).length
      if (lines > 200) violations.push(`${relative(root, path)}: ${lines} lines`)
    }
  }
}

for (const target of targets) await visit(resolve(root, target))

if (violations.length > 0) {
  process.stderr.write(`Component size limit exceeded:\n${violations.join('\n')}\n`)
  process.exit(1)
}

process.stdout.write('Component size check passed (all TSX files <= 200 lines)\n')
