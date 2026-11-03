import type { RequestHandler } from 'express'
import * as logger from '../utils/logger.js'

// One line per request in the host's logs. ip= is the address rate limiting keys on and xff= the raw
// forwarded chain: after deploy, TRUST_PROXY = (entries after your own IP in xff) + 1, then ip= shows your IP.
export const requestLogger: RequestHandler = (req, res, next) => {
  const start = performance.now()
  res.on('finish', () => {
    const ms = Math.round(performance.now() - start)
    const xff = req.headers['x-forwarded-for'] ?? '-'
    logger.info(`${req.method} ${req.originalUrl} ${res.statusCode} ${ms}ms ip=${req.ip} xff=${xff}`)
  })
  next()
}
