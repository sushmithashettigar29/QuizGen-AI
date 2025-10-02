const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { generateQuiz, getQuizById, getMyQuizzes } = require("../controllers/quizController");

// Generate a new quiz
router.post("/generate", protect, generateQuiz);

// Get all quizzes created by logged-in user
router.get("/my", protect, getMyQuizzes);

// Fetch a single quiz by ID
router.get("/:quizId", protect, getQuizById);

module.exports = router;
