import express from 'express'
import { getAllUsers, getUserByID, updateUser, deleteUser } from '../Controllers/user-details/userController.js'
import authenticate from '../Utils/authMiddleware.js'
const router = express.Router()

// GET route for fetching all user details
router.get('/', getAllUsers)

// GET route for fetching user details by ID
router.get('/:id', authenticate, getUserByID)

// PUT route for updating user details by ID
router.put('/:id', authenticate, updateUser)

// DELETE route for deleting user by ID
router.delete('/:id', authenticate, deleteUser)

export default router