const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { attemptQuiz } = require("../controllers/quizAttemptController");

// POST /api/quiz/attempt/:quizId
router.post("/attempt/:quizId", protect, attemptQuiz);

module.exports = router;
