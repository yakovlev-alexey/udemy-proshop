import express from 'express'
import { protect, admin } from '../middleware/authMiddleware.js'
import { authUser, getUserProfile, updateUserProfile, registerUser, getUsers, deleteUser } from '../controllers/userController.js'

const router = express.Router()

router.post('/login', authUser)

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile)

router.route('/').get(protect, admin, getUsers).post(registerUser)

router.route('/:id').delete(protect, admin, deleteUser)

export default router
