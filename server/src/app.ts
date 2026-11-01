import express from 'express'
import helmet from 'helmet'
import healthRouter from './controllers/health.js'
import { unknownEndpoint, errorHandler } from './middleware/errorHandler.js'

const app = express()

app.use(helmet())
app.use(express.json())

app.use('/api/health', healthRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
