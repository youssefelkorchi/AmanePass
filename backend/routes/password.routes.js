const express = require('express');
const router = express.Router();
const passwordController = require('../controllers/password.controller');

/**
 * @route   POST /api/check-password
 * @desc    Check if a password is strong and if it has been leaked
 * @access  Public
 */
router.post('/check-password', passwordController.checkPassword);

/**
 * @route   GET /api/suggest-passwords
 * @desc    Get alternative strong password suggestions
 * @access  Public
 */
router.get('/suggest-passwords', passwordController.suggestPasswords);

module.exports = router;