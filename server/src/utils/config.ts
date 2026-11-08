import { existsSync, readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { parseEnv } from 'node:util'

// Resolved from this file rather than cwd, so it works from src/ (tsx), dist/ (node) and when started from the repo root
const ENV_PATH = fileURLToPath(new URL('../../.env', import.meta.url))

// Locally env comes from server/.env; on Render it is set in the dashboard and there is no file.
// Not process.loadEnvFile(): it keeps a UTF-8 BOM (PowerShell 5.1 writes one) as part of the first key name.
if (existsSync(ENV_PATH)) {
  const parsed = parseEnv(readFileSync(ENV_PATH, 'utf8').replace(/^﻿/, ''))
  for (const [key, value] of Object.entries(parsed)) {
    process.env[key] ??= value
  }
}

function requireEnv(name: string): string {
  const value = process.env[name]
  if (value) return value

  const hint = existsSync(ENV_PATH)
    ? `add ${name} to server/.env`
    : 'set it in the host environment (e.g. Render → Environment), or locally copy server/.env.example to server/.env'
  // A plain message instead of a thrown error: a stack trace here only buries the actual fix
  console.error(`Missing required env variable ${name}: ${hint}`)
  process.exit(1)
}

export const PORT = Number(process.env.PORT ?? 3001)
export const MONGODB_URI = requireEnv('MONGODB_URI')
export const JWT_SECRET = requireEnv('JWT_SECRET')
export const IS_PROD = process.env.NODE_ENV === 'production'
// Reverse proxies in front of the app; rate limiting needs it to see real client IPs
export const TRUST_PROXY = Number(process.env.TRUST_PROXY ?? 0)
