import { readFile, readdir } from 'node:fs/promises'
import { extname, join, relative, resolve } from 'node:path'

const root = resolve(import.meta.dirname, '..')
const roots = ['src', 'public', 'dist', 'index.html']
const textExtensions = new Set(['.html', '.css', '.js', '.jsx', '.json', '.svg', '.ts', '.tsx', '.txt', '.xml'])
const forbiddenCopy = [
  /trusted\s+by/i,
  /customers?\s+include/i,
  /<blockquote[^>]+testimonial/i,
  /\bAurem\b/i,
  /\bPraxis\b/i,
]
const logoPattern = /(?:logo|brand)[-_ ]?(?:mercell|tendium|tendsign|microsoft|sharepoint)/i
const violations = []

async function scanFile(path) {
  if (!textExtensions.has(extname(path).toLowerCase())) return
  const content = await readFile(path, 'utf8')
  for (const pattern of forbiddenCopy) {
    if (pattern.test(content)) violations.push(`${relative(root, path)} contains forbidden pattern ${pattern}`)
  }
  if (path.endsWith('.tsx') && /#[0-9a-f]{3,8}\b/i.test(content)) {
    violations.push(`${relative(root, path)} contains a color literal outside tokens.css`)
  }
}

async function visit(path) {
  const entries = await readdir(path, { withFileTypes: true })
  for (const entry of entries) {
    const child = join(path, entry.name)
    if (entry.isDirectory()) await visit(child)
    else {
      if (logoPattern.test(entry.name)) violations.push(`${relative(root, child)} looks like a third-party logo asset`)
      await scanFile(child)
    }
  }
}

for (const item of roots) {
  const path = resolve(root, item)
  try {
    if (extname(path)) await scanFile(path)
    else await visit(path)
  } catch (error) {
    if (/** @type {NodeJS.ErrnoException} */ (error).code !== 'ENOENT') throw error
  }
}

if (violations.length > 0) {
  process.stderr.write(`Content lint failed:\n${violations.join('\n')}\n`)
  process.exit(1)
}

process.stdout.write('Content lint passed (claims, branding, logo, and color-token rules)\n')
