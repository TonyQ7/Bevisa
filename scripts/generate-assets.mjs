import { access } from 'node:fs/promises'
import { resolve } from 'node:path'
import sharp from 'sharp'

const root = resolve(import.meta.dirname, '..')
const source = resolve(root, 'public', 'og-image.svg')
const output = resolve(root, 'public', 'og-image.png')

await access(source)
await sharp(source, { density: 144 })
  .resize(1200, 630, { fit: 'fill' })
  .png({ compressionLevel: 9, palette: true })
  .toFile(output)

process.stdout.write('Generated public/og-image.png (1200x630)\n')
