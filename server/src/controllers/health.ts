import { Router } from 'express'
import mongoose from 'mongoose'

const healthRouter = Router()

// 503 when the DB is down so Render's health check doesn't route traffic to a broken instance
healthRouter.get('/', (_req, res) => {
  const dbConnected = mongoose.connection.readyState === mongoose.ConnectionStates.connected
  res.status(dbConnected ? 200 : 503).json({
    status: dbConnected ? 'ok' : 'unavailable',
    db: dbConnected ? 'connected' : 'disconnected',
  })
})

export default healthRouter
