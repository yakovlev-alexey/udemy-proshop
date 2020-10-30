import express from 'express'
import { admin, protect } from '../middleware/authMiddleware.js'
import {
  addOrderItems,
  deleteOrder,
  getMyOrders,
  getOrderById,
  getOrders,
  toggleDelivered
} from '../controllers/orderController.js'
import { updatePaypalOrderToPaid } from '../controllers/paypalController.js'
import { payWithQiwi } from '../controllers/qiwiController.js'

const router = express.Router()

router.route('/').get(protect, admin, getOrders).post(protect, addOrderItems)

router.get('/my', protect, getMyOrders)

router.route('/:id').get(protect, getOrderById).delete(protect, admin, deleteOrder)

router.post('/:id/delivered', protect, admin, toggleDelivered)

router.route('/:id/paypal').put(protect, updatePaypalOrderToPaid)

router.get('/:id/qiwi', protect, payWithQiwi)

export default router
