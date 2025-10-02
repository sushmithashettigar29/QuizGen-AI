const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { attemptQuiz } = require("../controllers/quizController"); // attemptQuiz logic in quizController

// Submit a quiz attempt
router.post("/attempt/:quizId", protect, attemptQuiz);

module.exports = router;
