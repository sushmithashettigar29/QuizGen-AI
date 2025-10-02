const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const { uploadDocument } = require("../controllers/uploadController");

// Upload document
router.post("/upload", protect, uploadDocument);

module.exports = router;
