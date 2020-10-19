import asyncHandler from 'express-async-handler'
import Order from '../models/order.model.js'

// @desc    Update order to paid using PayPal
// @route   PUT /api/order/:id/paypal
// @access  Private
export const updatePaypalOrderToPaid = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    if (req.user.email != order.user.email && !req.user.isAdmin) {
      res.status(401)
      throw new Error('Not authorized to view this order')
    }
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})
