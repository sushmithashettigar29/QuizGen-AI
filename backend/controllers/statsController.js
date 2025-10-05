const Quiz = require("../models/Quiz");
const User = require("../models/User");
const QuizAttempt = require("../models/QuizAttempt");

exports.getPlatformStats = async (req, res) => {
  try {
    // Total quizzes created by everyone
    const quizzesGenerated = await Quiz.countDocuments();

    // Total documents uploaded by all users
    const documentsUploadedAgg = await User.aggregate([
      { $group: { _id: null, total: { $sum: "$documentsUploaded" } } },
    ]);
    const documentsUploaded = documentsUploadedAgg[0]?.total || 0;

    // Total quiz attempts by all users
    const attemptsMade = await QuizAttempt.countDocuments();

    // Total registered users
    const totalUsers = await User.countDocuments();

    res.json({
      quizzesGenerated,
      documentsUploaded,
      attemptsMade,
      totalUsers,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
