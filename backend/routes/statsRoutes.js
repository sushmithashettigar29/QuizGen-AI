const express = require("express");
const router = express.Router();
const { getPlatformStats } = require("../controllers/statsController");

// Public stats (no authentication)
router.get("/", getPlatformStats);

module.exports = router;
