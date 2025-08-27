import httpProxy from 'http-proxy'
import { NextApiRequest, NextApiResponse } from 'next'

export const config = {
  api: {
    // Enable `externalResolver` option in Next.js
    externalResolver: true,
    bodyParser: false,
  },
}

const proxy: httpProxy = httpProxy.createProxy()
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  new Promise((resolve, reject) => {
    const src = req.url || ''
    const dest = src.replace(/^\/api\//, '/')
    req.url = dest
    proxy.once('proxyRes', resolve).once('error', reject).web(req, res, {
      changeOrigin: true,
      target: process.env.FRONTEND_BFF_ENDPOINT_OPENAPI,
    })
  })
}
