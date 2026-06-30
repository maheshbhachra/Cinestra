const express = require('express')
const router = express.Router()
const authController = require('../controllers/auth.controller')
const authMiddleware = require('../middlewares/auth.middleware')

router.post("/register", authController.register)

router.post("/login", authController.loginUser)

router.get("/me", authMiddleware.authUser, (req, res) => {
  res.status(200).json(req.user);
});

router.post('/logout', authController.logoutUser)

module.exports = router