import mongoose from 'mongoose'
import app from './app.js'
import { MONGODB_URI, PORT } from './utils/config.js'
import * as logger from './utils/logger.js'

try {
  await mongoose.connect(MONGODB_URI)
  logger.info('connected to MongoDB')
} catch (error) {
  logger.error('error connecting to MongoDB:', error)
  process.exit(1)
}

app.listen(PORT, (error) => {
  if (error) {
    logger.error('failed to start server:', error)
    process.exit(1)
  }
  logger.info(`Server running on port ${PORT}`)
})
