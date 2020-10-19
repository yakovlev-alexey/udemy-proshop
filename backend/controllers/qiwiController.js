import asyncHandler from 'express-async-handler'
import QiwiBillPaymentsAPI from '@qiwi/bill-payments-node-js-sdk'

import Order from '../models/order.model.js'

import dotenv from 'dotenv'

dotenv.config()

const SECRET_KEY = process.env.QIWI_SECRET_KEY
const PUBLIC_KEY = process.env.QIWI_PUBLIC_KEY

const qiwiApi = new QiwiBillPaymentsAPI(SECRET_KEY)

// @desc    Pay order using Qiwi
// @route   GET /api/order/:id/qiwi
// @access  Private
export const payWithQiwi = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  } else if (String(order.user) !== String(req.user._id) && !req.user.isAdmin) {
    res.status(401)
    throw new Error('Insufficient rights to access order')
  }

  const link = await qiwiApi.createPaymentForm({
    publicKey: PUBLIC_KEY,
    amount: 1.0,
    billId: String(order._id),
    successUrl: req.query.successUrl
  })

  res.json({ payUrl: link })
})

// @desc    Update order status from Qiwi
// @route   POST /api/payments/qiwi
// @access  Public
export const updateQiwiOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.body.bill.billId)

  if (!order) {
    res.status(404)
    throw new Error('Order not found')
  }

  updateQiwiOrderInfo(order)
})

export const updateQiwiOrderInfo = async (order) => {
  const info = await qiwiApi.getBillInfo(order._id)

  if (info) {
    order.isPaid = info.status.value === 'PAID'
    order.paidAt = info.status.changedDateTime
    order.paymentResult = {
      id: info.billId,
      status: info.status.value,
      updateTime: info.status.changedDateTime
    }
  }

  return await order.save()
}
