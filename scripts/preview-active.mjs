import { build, preview } from 'vite'

process.env.VITE_BOOKING_URL = 'https://example.test/bevisa'
process.env.VITE_CONTACT_EMAIL = 'founders@bevisa.se'
process.env.VITE_SAMPLE_REPORT_URL = 'https://example.test/sample-report.pdf'

await build({ build: { outDir: 'dist-active' } })
const server = await preview({
  build: { outDir: 'dist-active' },
  preview: { host: '127.0.0.1', port: 4174, strictPort: true },
})

const close = async () => {
  await server.close()
  process.exit(0)
}

process.once('SIGINT', () => void close())
process.once('SIGTERM', () => void close())
