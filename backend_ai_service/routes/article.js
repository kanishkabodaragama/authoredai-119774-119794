const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");
const authMiddleware = require("../middleware/auth");

/**
 * @route   POST /api/article/generate
 * @desc    Generate a humanized article based on input topic and word count
 * @access  Protected (auth required)
 */
// PUBLIC_INTERFACE
router.post("/article/generate", authMiddleware, articleController.generateArticle);

module.exports = router;
