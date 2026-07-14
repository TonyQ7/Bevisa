import { mkdirSync, writeFileSync } from 'node:fs'
import { resolve } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { CANONICAL_URL, EN_COPY, SOURCES } from './src/content/copy'

const escapeHtml = (value: string): string =>
  value.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;')

function noscriptMarkup(): string {
  const copy = EN_COPY
  const sections = [
    `<section><p>${escapeHtml(copy.hero.eyebrow)}</p><h1>${escapeHtml(copy.hero.title)}</h1><p>${escapeHtml(copy.hero.body)}</p></section>`,
    `<section><p>${escapeHtml(copy.problem.eyebrow)}</p><h2>${escapeHtml(copy.problem.title)}</h2><p>${escapeHtml(copy.problem.body)}</p><ul>${copy.problem.stats.map((stat) => `<li><strong>${escapeHtml(stat.value)}</strong> ${escapeHtml(stat.label)} — <a href="${stat.sourceUrl}">${escapeHtml(stat.sourceLabel)}</a></li>`).join('')}</ul><p>${escapeHtml(copy.problem.context)} ${escapeHtml(copy.problem.contextQualifier)}</p></section>`,
    `<section><p>${escapeHtml(copy.pipeline.eyebrow)}</p><h2>${escapeHtml(copy.pipeline.title)}</h2><p>${escapeHtml(copy.pipeline.intro)}</p><ol>${copy.pipeline.steps.map((step) => `<li><h3>${step.number} ${escapeHtml(step.title)}</h3><p>${escapeHtml(step.body)}</p></li>`).join('')}</ol></section>`,
    `<section><p>${escapeHtml(copy.health.eyebrow)}</p><h2>${escapeHtml(copy.health.title)}</h2><p>${escapeHtml(copy.health.body)}</p></section>`,
    `<section><p>${escapeHtml(copy.sovereignty.eyebrow)}</p><h2>${escapeHtml(copy.sovereignty.title)}</h2><p>${escapeHtml(copy.sovereignty.body)}</p><p>${escapeHtml(copy.sovereignty.commitment)} <a href="${SOURCES.cloudPolicy2026}">${escapeHtml(copy.sovereignty.sourceLabel)}</a></p></section>`,
    `<section><p>${escapeHtml(copy.stack.eyebrow)}</p><h2>${escapeHtml(copy.stack.title)}</h2><p>${escapeHtml(copy.stack.body)}</p></section>`,
    `<section><p>${escapeHtml(copy.offer.eyebrow)}</p><h2>${escapeHtml(copy.offer.title)}</h2><p>${escapeHtml(copy.offer.body)}</p><ul>${copy.offer.terms.map((term) => `<li>${escapeHtml(term)}</li>`).join('')}</ul><p>${escapeHtml(copy.offer.legal)}</p></section>`,
  ]

  return `<noscript><main class="noscript-shell">${sections.join('')}</main><footer class="noscript-shell"><p>${escapeHtml(copy.footer.tagline)}</p><p>${escapeHtml(copy.footer.privacy)}</p><p>${escapeHtml(copy.footer.legal)}</p></footer></noscript>`
}

function contentPlugin(): Plugin {
  return {
    name: 'bevisa-content-output',
    transformIndexHtml(html) {
      return html
        .replaceAll('__SITE_TITLE__', escapeHtml(EN_COPY.meta.title))
        .replaceAll('__SITE_DESCRIPTION__', escapeHtml(EN_COPY.meta.description))
        .replaceAll('__CANONICAL_URL__', CANONICAL_URL)
        .replaceAll('__OG_IMAGE_URL__', `${CANONICAL_URL}og-image.png`)
        .replace('<!-- NOSCRIPT_FALLBACK -->', noscriptMarkup())
    },
    writeBundle(options) {
      const output = resolve(import.meta.dirname, options.dir ?? 'dist')
      mkdirSync(output, { recursive: true })
      const notFound = EN_COPY.notFound
      writeFileSync(
        resolve(output, '404.css'),
        ':root{color-scheme:dark}*{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;background:#101B2D;color:#F2F4F1;font-family:system-ui,sans-serif}.shell{width:min(42rem,calc(100% - 2rem));padding:3rem;border:1px solid #5A6472}.eyebrow{font:500 .75rem/1.4 monospace;letter-spacing:.12em;color:#82c9b2}h1{font-size:clamp(2.5rem,8vw,5rem);line-height:.95;margin:1rem 0}p{color:#c6ccd4;line-height:1.6}a{display:inline-block;margin-top:1rem;padding:.8rem 1rem;background:#1E7A5F;color:white;text-decoration:none}a:focus-visible{outline:2px solid white;outline-offset:4px}',
      )
      writeFileSync(
        resolve(output, '404.html'),
        `<!doctype html><html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><meta http-equiv="Content-Security-Policy" content="default-src 'self'; style-src 'self'; base-uri 'self'; object-src 'none'"><link rel="stylesheet" href="./404.css"><title>${escapeHtml(notFound.title)} · Bevisa</title></head><body><main class="shell"><p class="eyebrow">${escapeHtml(notFound.eyebrow)}</p><h1>${escapeHtml(notFound.title)}</h1><p>${escapeHtml(notFound.body)}</p><a href="./">${escapeHtml(notFound.home)}</a></main></body></html>`,
      )
    },
  }
}

export default defineConfig({
  base: './',
  plugins: [react(), contentPlugin()],
  build: {
    target: 'es2022',
    cssCodeSplit: true,
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          const moduleId = id.replaceAll('\\', '/')
          if (moduleId.includes('vite/preload-helper')) return 'runtime'
          if (
            moduleId.includes('/node_modules/react/') ||
            moduleId.includes('/node_modules/react-dom/') ||
            moduleId.includes('/node_modules/scheduler/')
          ) {
            return 'react'
          }
          if (moduleId.includes('/node_modules/three/') || moduleId.includes('/node_modules/@react-three/')) {
            return 'three'
          }
          if (
            moduleId.includes('/node_modules/gsap/') ||
            moduleId.includes('/node_modules/lenis/') ||
            moduleId.includes('/node_modules/framer-motion/')
          ) {
            return 'motion'
          }
          return undefined
        },
      },
    },
  },
})
