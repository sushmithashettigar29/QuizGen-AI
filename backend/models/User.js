const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  documentsUploaded: {
    type: Number,
    default: 0, // count of PDF/DOC uploads
  },
  quizzesGenerated: {
    type: Number,
    default: 0, // how many quizzes AI created for this user
  },
  quizzesAttempted: {
    type: Number,
    default: 0, // how many quizzes user has played
  },
  totalScore: {
    type: Number,
    default: 0, // sum of all quiz scores
  },
  averageScore: {
    type: Number,
    default: 0, // calculated as totalScore / quizzesAttempted
  },
  quizzes: [
    { type: mongoose.Schema.Types.ObjectId, ref: "Quiz" }
  ]
}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);
