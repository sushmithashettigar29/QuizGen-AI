const Quiz = require("../models/Quiz");
const { GoogleGenAI } = require("@google/genai");
const ai = new GoogleGenAI({}); // Reads GEMINI_API_KEY from .env

// Generate Quiz from extracted text
exports.generateQuiz = async (req, res) => {
  try {
    const { extractedText } = req.body;
    console.log("req.body:", req.body);

    if (!extractedText) {
      return res.status(400).json({ message: "No text provided" });
    }

    // Send text to Gemini API with a prompt for structured quiz
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
      config: {
        thinkingConfig: { thinkingBudget: 0 }, // optional: disable thinking for speed
      },
    });

    // Clean Gemini output (remove markdown or ```json backticks)
    let cleanedText = response.text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    let quizJSON;
    try {
      quizJSON = JSON.parse(cleanedText);
    } catch (err) {
      console.error("Error parsing Gemini output:", err);
      console.log("Raw Gemini output:", response.text);
      return res
        .status(500)
        .json({ message: "Failed to parse quiz JSON from Gemini" });
    }

    // Save quiz to MongoDB
    const newQuiz = await Quiz.create({
      user: req.user._id,
      questions: quizJSON,
      createdAt: new Date(),
    });

    // Update user's quizzes array
    await req.user.updateOne({ $push: { quizzes: newQuiz._id } });

    res.json({ message: "Quiz generated successfully", quiz: newQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error generating quiz" });
  }
};
