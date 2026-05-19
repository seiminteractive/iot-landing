import { createServer } from 'node:http'
import { readFile } from 'node:fs/promises'
import { writeFile } from 'node:fs/promises'
import { extname, join, resolve, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import puppeteer from 'puppeteer'

const __dirname = dirname(fileURLToPath(import.meta.url))
const distDir = resolve(__dirname, '..', 'dist')

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.js':   'application/javascript; charset=utf-8',
  '.mjs':  'application/javascript; charset=utf-8',
  '.css':  'text/css; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.svg':  'image/svg+xml',
  '.png':  'image/png',
  '.jpg':  'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif':  'image/gif',
  '.ico':  'image/x-icon',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf':  'font/ttf'
}

function startStaticServer(root) {
  const server = createServer(async (req, res) => {
    try {
      const url = new URL(req.url, 'http://localhost')
      let filePath = join(root, decodeURIComponent(url.pathname))
      if (filePath.endsWith('/')) filePath = join(filePath, 'index.html')
      let data
      try {
        data = await readFile(filePath)
      } catch {
        data = await readFile(join(root, 'index.html'))
        filePath = join(root, 'index.html')
      }
      res.setHeader('Content-Type', MIME[extname(filePath)] || 'application/octet-stream')
      res.end(data)
    } catch (err) {
      res.statusCode = 500
      res.end(String(err))
    }
  })
  return new Promise((resolveListen) => {
    server.listen(0, '127.0.0.1', () => {
      const port = server.address().port
      resolveListen({ server, port })
    })
  })
}

async function main() {
  console.log('[prerender] starting…')
  const { server, port } = await startStaticServer(distDir)
  console.log(`[prerender] static server on http://127.0.0.1:${port}`)

  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  })
  const page = await browser.newPage()
  await page.setViewport({ width: 1440, height: 900 })

  // Flag for composables to skip GSAP setup
  await page.evaluateOnNewDocument(() => {
    window.__PRERENDER__ = true
  })

  await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'networkidle0', timeout: 30000 })

  // Wait until Vue has rendered actual content into #app
  await page.waitForFunction(
    () => {
      const app = document.querySelector('#app')
      return app && app.innerText && app.innerText.trim().length > 200
    },
    { timeout: 15000 }
  )

  // Snapshot the full document
  const html = await page.evaluate(() => {
    // Strip any GSAP-injected inline styles defensively
    document.querySelectorAll('[style]').forEach((el) => {
      const s = el.getAttribute('style') || ''
      if (/opacity\s*:\s*0|visibility\s*:\s*hidden|transform\s*:\s*translate/i.test(s)) {
        el.removeAttribute('style')
      }
    })
    return '<!DOCTYPE html>\n' + document.documentElement.outerHTML
  })

  await browser.close()
  server.close()

  const outFile = join(distDir, 'index.html')
  await writeFile(outFile, html, 'utf8')
  console.log(`[prerender] wrote ${outFile} (${(html.length / 1024).toFixed(1)} KB)`)
}

main().catch((err) => {
  console.error('[prerender] failed:', err)
  process.exit(1)
})
