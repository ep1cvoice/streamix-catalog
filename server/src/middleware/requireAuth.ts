import type { Request, RequestHandler } from 'express'
import { readSessionUserId } from '../utils/session.js'

export const requireAuth: RequestHandler = (req, res, next) => {
  const userId = readSessionUserId(req)
  if (!userId) {
    res.status(401).json({ error: 'not authenticated' })
    return
  }
  req.userId = userId
  next()
}

// For handlers behind requireAuth: a missing id here is a wiring bug, not a client error
export function authedUserId(req: Request): string {
  if (!req.userId) throw new Error('authedUserId called on a route without requireAuth')
  return req.userId
}
