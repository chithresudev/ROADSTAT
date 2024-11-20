import express from 'express'
import {register, login, verifyEmail, resendVerificationEmail} from '../Controllers/authController.js'
const router = express.Router()

router.post('/register', register)
router.post('/login', login)
router.get('/verify', verifyEmail)
router.post('/resend', resendVerificationEmail)

export default router