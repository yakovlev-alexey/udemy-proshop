import express from 'express'
import { protect } from '../middleware/authMiddleware.js'
import { addOrderItems, getMyOrders, getOrderById } from '../controllers/orderController.js'
import { updatePaypalOrderToPaid } from '../controllers/paypalController.js'
import { payWithQiwi } from '../controllers/qiwiController.js'

const router = express.Router()

router.route('/').post(protect, addOrderItems)

router.get('/my', protect, getMyOrders)

router.route('/:id').get(protect, getOrderById)

router.route('/:id/paypal').put(protect, updatePaypalOrderToPaid)

router.get('/:id/qiwi', protect, payWithQiwi)

export default router
