const User = require("../models/User");
const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");

// Get user profile with stats
exports.getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });

    const quizzesGenerated = await Quiz.countDocuments({ user: user._id });
    const quizAttempts = await QuizAttempt.find({ user: user._id });
    const quizzesAttempted = quizAttempts.length;
    const totalScore = quizAttempts.reduce((acc, a) => acc + a.score, 0);
    const averageScore =
      quizzesAttempted > 0 ? totalScore / quizzesAttempted : 0;

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

// Get all attempts by logged-in user (with quiz details)
exports.getUserAttempts = async (req, res) => {
  try {
    const attempts = await QuizAttempt.find({ user: req.user._id })
      .populate("quiz", "title questions createdAt") // ✅ include title
      .sort({ date: -1 });

    // ✅ Format the response for front-end
    const formattedAttempts = attempts.map((a) => ({
      _id: a._id,
      quizId: a.quiz?._id || null,
      title: a.quiz?.title || "Untitled Quiz",
      score: a.score,
      totalQuestions: a.quiz?.questions?.length || 0,
      percentage:
        a.quiz?.questions?.length > 0
          ? Math.round((a.score / a.quiz.questions.length) * 100)
          : 0,
      date: a.date || a.quiz?.createdAt,
    }));

    res.json(formattedAttempts);
  } catch (err) {
    console.error("❌ Error fetching attempts:", err);
    res.status(500).json({ message: "Server error fetching attempts" });
  }
};

// Leaderboard (top 10 users by totalScore)
exports.getLeaderboard = async (req, res) => {
  try {
    const topUsers = await User.find()
      .sort({ totalScore: -1 }) // highest score first
      .limit(10)
      .select("name totalScore averageScore");

    res.json(topUsers);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching leaderboard" });
  }
};
