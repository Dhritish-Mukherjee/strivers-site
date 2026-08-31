const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Public routes
router.post('/login', authController.studentLogin);
router.post('/register', authController.studentRegister);

// Export router
module.exports = router;