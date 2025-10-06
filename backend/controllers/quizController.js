const Quiz = require("../models/Quiz");
const User = require("../models/User");
const QuizAttempt = require("../models/QuizAttempt");
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({}); // GEMINI_API_KEY from .env

// -------------------- Generate Quiz --------------------
exports.generateQuiz = async (req, res) => {
  try {
    const { extractedText, fileName } = req.body; // 👈 also accept fileName
    console.log("📘 Received generateQuiz request with fileName:", fileName);

    if (!extractedText)
      return res.status(400).json({ message: "No text provided" });

    // Send text to Gemini API
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
        Create a quiz from the following text in JSON format.
        Each question should have:
        "question" (string),
        "options" (array of 4 strings),
        "answer" (correct option string).
        Text: ${extractedText}
      `,
      config: { thinkingConfig: { thinkingBudget: 0 } },
    });

    // Clean AI output
    let cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let quizJSON;
    try {
      quizJSON = JSON.parse(cleanedText);
    } catch (err) {
      console.error("Error parsing Gemini output:", err);
      console.log("Raw AI output:", response.text);
      return res
        .status(500)
        .json({ message: "Failed to parse quiz JSON from Gemini" });
    }

    // Filter only valid questions
    const validQuestions = quizJSON.filter(
      (q) =>
        q.question &&
        Array.isArray(q.options) &&
        q.options.length === 4 &&
        q.answer
    );

    if (validQuestions.length === 0)
      return res
        .status(500)
        .json({ message: "No valid questions returned from AI" });

    // inside generateQuiz
    const cleanTitle = fileName
      ? fileName.replace(/\.[^/.]+$/, "")
      : "Untitled Quiz";

    const newQuiz = await Quiz.create({
      user: req.user._id,
      title: cleanTitle, // 👈 now saves "biology" not "biology.pdf"
      questions: validQuestions,
      createdAt: new Date(),
    });

    // Add quiz to user's quizzes array
    await req.user.updateOne({ $push: { quizzes: newQuiz._id } });

    res.json({ message: "Quiz generated successfully", quiz: newQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error generating quiz" });
  }
};

// -------------------- Submit Quiz Attempt --------------------
exports.attemptQuiz = async (req, res) => {
  try {
    const { quizId } = req.params;
    const { answers } = req.body; // [{ questionId, answer }]

    if (!answers || !Array.isArray(answers))
      return res.status(400).json({ message: "Answers are required" });

    const quiz = await Quiz.findById(quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });

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

    const quizAttempt = await QuizAttempt.create({
      user: req.user._id,
      quiz: quiz._id,
      score,
    });

    // Update user stats
    await User.findByIdAndUpdate(req.user._id, {
      $inc: { quizzesAttempted: 1, totalScore: score },
    });

    res.json({
      message: "Quiz submitted successfully",
      score,
      totalQuestions: quiz.questions.length,
      detailedResults,
      quizAttempt,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error submitting quiz" });
  }
};

// -------------------- Get My Quizzes --------------------
exports.getMyQuizzes = async (req, res) => {
  try {
    const quizzes = await Quiz.find({ user: req.user._id }).sort({
      createdAt: -1,
    });
    res.json(quizzes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching quizzes" });
  }
};

// -------------------- Get Quiz By ID --------------------
exports.getQuizById = async (req, res) => {
  try {
    const quiz = await Quiz.findById(req.params.quizId);
    if (!quiz) return res.status(404).json({ message: "Quiz not found" });
    res.json(quiz);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching quiz" });
  }
};
