import type { ErrorRequestHandler, RequestHandler } from 'express'
import * as logger from '../utils/logger.js'

export const unknownEndpoint: RequestHandler = (_req, res) => {
  res.status(404).json({ error: 'unknown endpoint' })
}

// body-parser errors (malformed JSON, payload too large) carry a 4xx status and expose=true
function isClientHttpError(err: unknown): err is { status: number; message: string } {
  return (
    typeof err === 'object' && err !== null &&
    'expose' in err && err.expose === true &&
    'status' in err && typeof err.status === 'number' && err.status < 500
  )
}

export const errorHandler: ErrorRequestHandler = (err: unknown, _req, res, next) => {
  if (res.headersSent) {
    next(err)
    return
  }

  if (isClientHttpError(err)) {
    res.status(err.status).json({ error: err.message })
    return
  }

  logger.error(err)
  res.status(500).json({ error: 'internal server error' })
}
