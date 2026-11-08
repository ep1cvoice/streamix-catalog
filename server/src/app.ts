import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authRouter from './controllers/auth.js'
import healthRouter from './controllers/health.js'
import listsRouter from './controllers/lists.js'
import { unknownEndpoint, errorHandler } from './middleware/errorHandler.js'
import { requestLogger } from './middleware/requestLogger.js'
import { TRUST_PROXY } from './utils/config.js'

const app = express()

app.set('trust proxy', TRUST_PROXY)

app.use(requestLogger)
app.use(helmet())
app.use(express.json())
app.use(cookieParser())

app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)
app.use('/api/lists', listsRouter)

app.use(unknownEndpoint)
app.use(errorHandler)

export default app
