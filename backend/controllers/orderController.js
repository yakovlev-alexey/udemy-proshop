import asyncHandler from 'express-async-handler'
import Order from '../models/order.model.js'

// @desc    Create new order
// @route   POST /api/orders
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
// @route   GET /api/orders/:id
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

// @desc    Get logged in user orders
// @route   GET /api/orders/my
// @access  Private
export const getMyOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })

  res.json(orders)
})

// @desc    Get all orders
// @route   GET /api/orders
// @access  Private/Admin
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find().populate('user', 'id name email')

  res.json(orders)
})

// @desc    Delete order by id
// @route   DELETE /api/orders/:id
// @access  Private/Admin
export const deleteOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    await order.remove()

    res.json({ message: 'Order removed' })
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

// @desc    Toggle order as delivered
// @route   POST /api/orders/delivered
// @access  Private/Admin
export const toggleDelivered = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isDelivered = !order.isDelivered
    order.deliveredAt = new Date()

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
