const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

/**
 * @route   POST /api/auth/register
 * @desc    Register a new user
 * @access  Public
 */
// PUBLIC_INTERFACE
router.post("/auth/register", authController.register);

/**
 * @route   POST /api/auth/login
 * @desc    Login a user and return token
 * @access  Public
 */
// PUBLIC_INTERFACE
router.post("/auth/login", authController.login);

module.exports = router;
