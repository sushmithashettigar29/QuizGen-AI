const User = require("../models/User");
const Quiz = require("../models/Quiz");
const QuizAttempt = require("../models/QuizAttempt");

// Submit Quiz Attempt
exports.attemptQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // Array of { questionId, answer }

    // Validate input
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({ message: "Answers are required" });
    }

    // Fetch quiz
    const quiz = await Quiz.findById(quizId);
    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    // Calculate score and prepare detailed results
    let score = 0;
    const detailedResults = quiz.questions.map((q) => {
      const userAnswerObj = answers.find(
        (a) => a.questionId === q._id.toString()
      );
      const userAnswer = userAnswerObj ? userAnswerObj.answer.trim() : null;
      const isCorrect = userAnswer === q.answer.trim();

      if (isCorrect) score += 1;

      return {
        questionId: q._id,
        question: q.question,
        correctAnswer: q.answer,
        userAnswer,
        isCorrect,
      };
    });

    // Save quiz attempt
    const quizAttempt = await QuizAttempt.create({
      user: req.user._id,
      quiz: quiz._id,
      score,
    });

    // Update user's total quizzes attempted and score
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { quizzesAttempted: 1, totalScore: score },
    });

    res.json({
      message: "Quiz submitted successfully",
      score,
      totalQuestions: quiz.questions.length,
      quizAttempt,
      detailedResults, // optional: include feedback for each question
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error submitting quiz" });
  }
};
