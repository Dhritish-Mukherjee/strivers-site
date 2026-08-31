const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { auth } = require('../middleware/auth');

// Public routes
router.post('/login', authController.studentLogin);
router.post('/register', authController.studentRegister);

// Protected routes
router.put('/profile', auth, authController.updateProfile);

// Export router
module.exports = router;