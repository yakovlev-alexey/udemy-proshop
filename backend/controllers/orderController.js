import asyncHandler from 'express-async-handler'
import Order from '../models/order.model.js'

// @desc    Create new order
// @route   POST /api/order
// @access  Private
export const addOrderItems = asyncHandler(async (req, res) => {
  const { orderItems, shippingAddress, paymentMethod, itemsPrice, taxPrice, shippingPrice, totalPrice } = req.body

  if (!orderItems || orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  }

  // Check if order is correct

  const order = new Order({
    orderItems,
    user: req.user._id,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice
  })

  const createdOrder = await order.save()

  res.status(201).json(createdOrder)
})

// @desc    Get order by id
// @route   GET /api/order/:id
// @access  Private
export const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('user', 'name email')

  if (order) {
    if (req.user.email != order.user.email && !req.user.isAdmin) {
      res.status(401)
      throw new Error('Not authorized to view this order')
    }

    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
