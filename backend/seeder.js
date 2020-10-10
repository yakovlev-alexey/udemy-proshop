import mongoose from 'mongoose'
import colors from 'colors'
import dotenv from 'dotenv'

import users from './data/users.js'
import products from './data/products.js'

import User from './models/user.model.js'
import Product from './models/product.model.js'
import Order from './models/order.model.js'

import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const admin = createdUsers[0]._id

    const sampleProducts = products.map((product) => ({ ...product, user: admin }))

    await Product.insertMany(sampleProducts)

    console.log('Data imported'.green.inverse)
    process.exit()
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse)
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data destroyed'.yellow.inverse)
    process.exit()
  } catch (error) {
    console.log(`Error: ${error}`.red.inverse)
    process.exit(1)
  }
}

if (process.argv[2] === '-d') {
  destroyData()
} else {
  importData()
}
