import express from 'express'
import protect from '../middleware/authMiddleware.js'
import { authUser, getUserProfile, updateUserProfile, registerUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/').post(registerUser)

export default router
