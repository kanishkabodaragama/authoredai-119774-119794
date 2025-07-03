const express = require("express");
const router = express.Router();
const articleController = require("../controllers/articleController");

/**
 * @route   POST /api/article/generate
 * @desc    Generate a humanized article based on input topic and word count
 * @access  Protected (auth required)
 */
// PUBLIC_INTERFACE
router.post("/article/generate", articleController.generateArticle);

module.exports = router;
