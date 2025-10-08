import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

function AttemptQuiz() {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); // quiz question index
  const [reviewIndex, setReviewIndex] = useState(0); // review index
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);
  const [reviewMode, setReviewMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const token = localStorage.getItem("token");

  // Fetch quiz by ID
  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/quizzes/${quizId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setQuiz(data);
      } catch (err) {
        setError(err.message);
      }
    };
    if (quizId) fetchQuiz();
  }, [quizId, token]);

  const handleSelect = (questionId, option) => {
    setAnswers((prev) => ({ ...prev, [questionId]: option }));
  };

  const handleNext = () => {
    if (!reviewMode) {
      if (currentIndex < quiz.questions.length - 1)
        setCurrentIndex(currentIndex + 1);
    } else {
      if (reviewIndex < result.detailedResults.length - 1)
        setReviewIndex(reviewIndex + 1);
    }
  };

  const handlePrev = () => {
    if (!reviewMode) {
      if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
    } else {
      if (reviewIndex > 0) setReviewIndex(reviewIndex - 1);
    }
  };

  const handleSubmit = async () => {
    if (!quiz) return;
    setLoading(true);
    try {
      const formattedAnswers = Object.entries(answers).map(([qId, ans]) => ({
        questionId: qId,
        answer: ans,
      }));

      const res = await fetch(
        `http://localhost:5000/api/quiz-attempts/attempt/${quizId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ answers: formattedAnswers }),
        }
      );

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      const percentage = (data.score / data.totalQuestions) * 100 || 0;
      setResult({ ...data, percentage });
      setReviewMode(true);
      setReviewIndex(0); // start review from first question
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const StatusBox = ({ type, message }) => (
    <div
      className={`p-4 rounded-xl text-sm font-medium my-4 transition-opacity duration-300 
      ${
        type === "error"
          ? "bg-red-100 text-red-800 border border-red-300"
          : "bg-indigo-100 text-indigo-800 border border-indigo-300"
      }`}
    >
      {message}
    </div>
  );

  if (!quiz && !error)
    return <p className="p-4 text-center">Loading quiz...</p>;

  return (
    <div className="min-h-[80vh] flex justify-center p-4 sm:p-6 bg-gray-50">
      <div className="w-full max-w-2xl mt-8">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-indigo-800">
          {quiz?.title || "Attempt Quiz"}
        </h1>
        {error && <StatusBox type="error" message={error} />}

        {/* Quiz Completed summary */}
        {result && (
          <div className="bg-white p-6 rounded-2xl shadow-2xl border border-purple-200 text-center mb-6">
            <h2 className="text-3xl font-bold text-violet-700">
              Quiz Completed!
            </h2>
            <p
              className="text-6xl font-extrabold my-4"
              style={{
                color:
                  result.percentage >= 80
                    ? "#10B981"
                    : result.percentage >= 50
                    ? "#F59E0B"
                    : "#EF4444",
              }}
            >
              {result.percentage.toFixed(0)}%
            </p>
            <p className="text-lg text-gray-600">
              You scored {result.score} out of {result.totalQuestions} questions
              correctly.
            </p>
            <Link
              to="/attempts"
              className="inline-block mt-4 text-sm font-medium text-purple-600 hover:underline"
            >
              View all attempts
            </Link>
          </div>
        )}

        {/* Question / Review card */}
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-2xl border border-indigo-100 space-y-6">
          {!reviewMode && quiz && (
            <>
              <p className="text-lg font-bold mb-4 text-gray-800">
                <span className="text-violet-600 mr-2">
                  {currentIndex + 1}.
                </span>
                {quiz.questions[currentIndex].question}
              </p>

              <div className="space-y-3">
                {quiz.questions[currentIndex].options.map((opt, i) => (
                  <label
                    key={i}
                    className={`flex items-center p-3 rounded-lg cursor-pointer transition duration-150 
                  ${
                    answers[quiz.questions[currentIndex]._id] === opt
                      ? "bg-violet-100 border-2 border-violet-500 shadow-md text-violet-800 font-medium"
                      : "bg-gray-50 hover:bg-violet-50 border border-gray-200 text-gray-700"
                  }`}
                  >
                    <input
                      type="radio"
                      name={quiz.questions[currentIndex]._id}
                      value={opt}
                      onChange={() =>
                        handleSelect(quiz.questions[currentIndex]._id, opt)
                      }
                      checked={
                        answers[quiz.questions[currentIndex]._id] === opt
                      }
                      className="form-radio h-4 w-4 text-violet-600 border-gray-300 focus:ring-violet-500 transition-colors duration-150 mr-3"
                      style={{ accentColor: "#7c3aed" }}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            </>
          )}

          {reviewMode && result && (
            <>
              <p className="text-lg font-bold mb-4 text-gray-800">
                <span className="text-violet-600 mr-2">{reviewIndex + 1}.</span>
                {result.detailedResults[reviewIndex].question}
              </p>

              <div className="space-y-3">
                <p
                  className={`p-3 rounded-lg border ${
                    result.detailedResults[reviewIndex].isCorrect
                      ? "bg-green-50 border-green-300"
                      : "bg-red-50 border-red-300"
                  }`}
                >
                  Your Answer:{" "}
                  <span
                    className={
                      result.detailedResults[reviewIndex].isCorrect
                        ? "text-green-700 font-semibold"
                        : "text-red-700 font-bold"
                    }
                  >
                    {result.detailedResults[reviewIndex].userAnswer ||
                      "No Answer"}
                  </span>
                </p>
                {!result.detailedResults[reviewIndex].isCorrect && (
                  <p className="p-3 rounded-lg border bg-green-50 border-green-300">
                    Correct Answer:{" "}
                    <span className="font-bold">
                      {result.detailedResults[reviewIndex].correctAnswer}
                    </span>
                  </p>
                )}
              </div>
            </>
          )}

          {/* Navigation */}
          <div className="flex justify-between mt-6">
            <button
              onClick={handlePrev}
              disabled={
                (!reviewMode && currentIndex === 0) ||
                (reviewMode && reviewIndex === 0)
              }
              className={`px-6 py-2 rounded-xl font-bold shadow-md transition ${
                (!reviewMode && currentIndex === 0) ||
                (reviewMode && reviewIndex === 0)
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-violet-600 text-white hover:bg-violet-700"
              }`}
            >
              Previous
            </button>

            {!reviewMode ? (
              currentIndex < quiz.questions.length - 1 ? (
                <button
                  onClick={handleNext}
                  className="px-6 py-2 rounded-xl font-bold bg-violet-600 text-white shadow-md hover:bg-violet-700 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  disabled={loading}
                  className={`px-6 py-2 rounded-xl font-bold shadow-md transition ${
                    loading
                      ? "bg-violet-400 cursor-not-allowed"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  {loading ? "Submitting..." : "Submit Quiz"}
                </button>
              )
            ) : reviewIndex < result.detailedResults.length - 1 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 rounded-xl font-bold bg-violet-600 text-white shadow-md hover:bg-violet-700 transition"
              >
                Next
              </button>
            ) : (
              <button
                disabled
                className="px-6 py-2 rounded-xl font-bold bg-gray-300 text-white shadow-md cursor-not-allowed"
              >
                End of Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AttemptQuiz;
