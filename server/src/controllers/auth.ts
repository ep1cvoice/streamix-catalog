import { Router } from 'express'
import bcrypt from 'bcrypt'
import mongoose from 'mongoose'
import { rateLimit } from 'express-rate-limit'
import { z } from 'zod'
import User, { toPublicUser } from '../models/user.js'
import { requireAuth } from '../middleware/requireAuth.js'
import { startSession, endSession } from '../utils/session.js'

const SALT_ROUNDS = 10

const email = z.string().trim().toLowerCase().pipe(z.email('invalid email'))

const registerSchema = z.object({
  email,
  password: z
    .string()
    .min(8, 'password must be at least 8 characters')
    // bcrypt silently ignores everything past 72 bytes
    .refine(p => Buffer.byteLength(p) <= 72, 'password is too long'),
})

const loginSchema = z.object({
  email,
  password: z.string().min(1, 'password is required'),
})

// Brute-force guard for credential endpoints; the in-memory store is fine for a single instance
const credentialsLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 20,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  message: { error: 'too many attempts, try again in 15 minutes' },
})

function isDuplicateKeyError(error: unknown): boolean {
  return error instanceof mongoose.mongo.MongoServerError && error.code === 11000
}

const authRouter = Router()

authRouter.post('/register', credentialsLimiter, async (req, res) => {
  const { email, password } = registerSchema.parse(req.body)
  const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)

  try {
    // Relying on the unique index rather than a findOne pre-check, which would race
    const user = await User.create({ email, passwordHash })
    startSession(res, user.id)
    res.status(201).json(toPublicUser(user))
  } catch (error) {
    if (isDuplicateKeyError(error)) {
      res.status(409).json({ error: 'email is already registered' })
      return
    }
    throw error
  }
})

authRouter.post('/login', credentialsLimiter, async (req, res) => {
  const { email, password } = loginSchema.parse(req.body)
  const user = await User.findOne({ email })

  // Same answer for unknown email and wrong password, so emails can't be enumerated
  if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
    res.status(401).json({ error: 'invalid email or password' })
    return
  }

  startSession(res, user.id)
  res.json(toPublicUser(user))
})

authRouter.post('/logout', (_req, res) => {
  endSession(res)
  res.status(204).end()
})

authRouter.get('/me', requireAuth, async (req, res) => {
  const user = await User.findById(req.userId)
  if (!user) {
    // Valid token for an account that no longer exists
    endSession(res)
    res.status(401).json({ error: 'not authenticated' })
    return
  }
  res.json(toPublicUser(user))
})

export default authRouter
