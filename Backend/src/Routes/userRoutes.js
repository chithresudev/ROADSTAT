import express from 'express'
import { getAllUsers, getUserByID, updateUser, deleteUser } from '../Controllers/user-details/userController.js'
const router = express.Router()

// GET route for fetching all user details
router.get('/', getAllUsers)

// GET route for fetching user details by ID
router.get('/:id', getUserByID)

// PUT route for updating user details by ID
router.put('/:id', updateUser)

// DELETE route for deleting user by ID
router.delete('/:id', deleteUser)

export default router