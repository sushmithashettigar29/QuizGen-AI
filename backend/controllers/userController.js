const User = require("../models/User");
const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");

// Get User Profile with Stats
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Optional: fetch real stats from quizzes & attempts
    // Count quizzes generated
    const quizzesGenerated = await Quiz.countDocuments({ user: user._id });

    // Count quiz attempts
    const quizAttempts = await QuizAttempt.find({ user: user._id });
    const quizzesAttempted = quizAttempts.length;

    // Calculate total and average score
    const totalScore = quizAttempts.reduce((acc, attempt) => acc + attempt.score, 0);
    const averageScore = quizzesAttempted > 0 ? totalScore / quizzesAttempted : 0;

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      documentsUploaded: user.documentsUploaded,
      quizzesGenerated,
      quizzesAttempted,
      totalScore,
      averageScore,
      quizzes: user.quizzes,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
