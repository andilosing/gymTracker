const express = require('express')
const router = express.Router()
const AuthController = require('../controllers/authController')

router.post('/register', AuthController.register)
router.post("/resend-confirmation-email", AuthController.resendConfirmationEmail)
router.post("/confirm-email/:token", AuthController.confirmEmail)
router.post("/login",AuthController.login)
router.post("/logout", AuthController.logout)
router.post("/refresh-token", AuthController.refreshToken)



module.exports = router;