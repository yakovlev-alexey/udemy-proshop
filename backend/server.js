import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import morgan from 'morgan'
import path from 'path'
import fs from 'fs'

import connectDB from './config/db.js'

import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import productRoutes from './routes/productRoutes.js'

import { notFound, errorHandler } from './middleware/errorMiddleware.js'

import { updateQiwiOrderStatus } from './controllers/qiwiController.js'

dotenv.config()

// initialize a connection to MongoDB Atlas
connectDB()

const app = express()
const port = process.env.PORT || 5000

// setup middleware
app.use(express.json())
app.use(process.env.NODE_ENV === 'development' ? morgan('dev') : morgan('prod'))

// setup routers
app.use('/api/users', userRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/products', productRoutes)
app.use('/api/upload', uploadRoutes)

// setup additional controllers
app.post('/api/payments/qiwi', updateQiwiOrderStatus)
app.get('/api/payments/paypal', (req, res) => res.send(process.env.PAYPAL_CLIENT_ID))

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '/frontend/build')))

  app.get('*', (req, res) =>
    res.sendFile(path.resolve(__dirname, 'frontend', 'build', 'index.html'))
  )
}

const uploadsFolder = path.join(__dirname, '/uploads')
if (!fs.existsSync(uploadsFolder)) {
  fs.mkdirSync(uploadsFolder)
}
app.use('/uploads', express.static(uploadsFolder))

// setup error handlers
app.use(notFound)
app.use(errorHandler)

// initialize server
app.listen(port, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`.yellow.bold)
})
