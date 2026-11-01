import type { RequestHandler } from 'express'
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
