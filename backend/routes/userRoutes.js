const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { getUserProfile, getUserAttempts, getLeaderboard } = require("../controllers/userController");

// Get logged-in user's profile and stats
router.get("/profile", protect, getUserProfile);

// Get quiz attempts of logged-in user
router.get("/attempts", protect, getUserAttempts);

// Leaderboard (public)
router.get("/leaderboard", getLeaderboard);

module.exports = router;
