import type { CookieOptions, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { IS_PROD, JWT_SECRET } from './config.js'

const SESSION_COOKIE = 'token'
const SESSION_SECONDS = 7 * 24 * 60 * 60

// Lax is enough: in prod the frontend reaches the API through a same-origin Vercel rewrite
const cookieOptions: CookieOptions = { httpOnly: true, secure: IS_PROD, sameSite: 'lax', path: '/' }

export function startSession(res: Response, userId: string): void {
  const token = jwt.sign({ sub: userId }, JWT_SECRET, { expiresIn: SESSION_SECONDS })
  res.cookie(SESSION_COOKIE, token, { ...cookieOptions, maxAge: SESSION_SECONDS * 1000 })
}

export function endSession(res: Response): void {
  res.clearCookie(SESSION_COOKIE, cookieOptions)
}

export function readSessionUserId(req: Request): string | null {
  const token: unknown = req.cookies?.[SESSION_COOKIE]
  if (typeof token !== 'string') return null

  try {
    const payload = jwt.verify(token, JWT_SECRET, { algorithms: ['HS256'] })
    return typeof payload === 'object' && typeof payload.sub === 'string' ? payload.sub : null
  } catch (error) {
    // Expired or tampered token means "not logged in"; anything else is a real failure
    if (error instanceof jwt.JsonWebTokenError) return null
    throw error
  }
}
