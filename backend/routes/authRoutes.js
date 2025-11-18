const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Jalur Pendaftaran: POST /api/auth/register
router.post('/register', authController.register);

// Jalur Login: POST /api/auth/login
router.post('/login', authController.login);

module.exports = router;