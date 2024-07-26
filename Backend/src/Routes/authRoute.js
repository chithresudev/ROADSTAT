import express from 'express'
import {register, login, verifyEmail} from '../Controllers/authController.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.post('/verify', verifyEmail)

export default router