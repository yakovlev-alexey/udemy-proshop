import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'

import connectDB from './config/db.js'

import productRoutes from './routes/productRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'

dotenv.config()

// initialize a connection to MongoDB Atlas
connectDB()

const app = express()
const port = process.env.PORT || 5000

// setup routers
app.use('/api/products', productRoutes)

// setup middleware
app.use(notFound)
app.use(errorHandler)

// initialize server
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold)
})
