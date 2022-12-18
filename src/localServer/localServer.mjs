import express from 'express'
import morgan from 'morgan'
import path from 'path'
import { fileURLToPath } from 'url'
import { server } from '../functions/dist/server.mjs'
import { createProxyMiddleware } from 'http-proxy-middleware'

const app = express()
const PORT = 3000

app.use(morgan('tiny'))
app.use(
  '/static',
  express.static(
    path.join(fileURLToPath(import.meta.url), '../../frontend/dist/static')
  )
)

app.get('/', async (_, res) => res.send((await server()).body))

app.use(
  '/translate',
  createProxyMiddleware({
    target: 'http://localhost:3001',
    changeOrigin: true,
  })
)

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))
