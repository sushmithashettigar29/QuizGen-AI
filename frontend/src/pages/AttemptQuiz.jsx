import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

function AttemptQuiz() {
  const { quizId } = useParams(); // <-- must come from Router param
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

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
        alert("Error: " + err.message);
      }
    };
    if (quizId) fetchQuiz();
  }, [quizId, token]);

  const handleSelect = (questionId, option) => {
    setAnswers({ ...answers, [questionId]: option });
  };

  const handleSubmit = async () => {
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
      setResult(data);
    } catch (err) {
      alert("Error: " + err.message);
    }
  };

  if (!quiz) return <p className="p-4">Loading quiz...</p>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Attempt Quiz</h1>

      {result ? (
        <div>
          <h2 className="text-lg font-semibold">Your Results</h2>
          <p>
            Score: {result.score} / {result.totalQuestions}
          </p>
          <ul className="mt-2">
            {result.detailedResults.map((r, idx) => (
              <li key={idx} className="mb-2">
                <strong>{r.question}</strong> <br />
                Your Answer:{" "}
                <span
                  className={r.isCorrect ? "text-green-600" : "text-red-600"}
                >
                  {r.userAnswer || "No Answer"}
                </span>{" "}
                | Correct: {r.correctAnswer}
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          {quiz.questions.map((q) => (
            <div key={q._id} className="mb-4">
              <p className="font-semibold">{q.question}</p>
              {q.options.map((opt, i) => (
                <label key={i} className="block">
                  <input
                    type="radio"
                    name={q._id}
                    value={opt}
                    onChange={() => handleSelect(q._id, opt)}
                    checked={answers[q._id] === opt}
                  />{" "}
                  {opt}
                </label>
              ))}
            </div>
          ))}

          <button
            onClick={handleSubmit}
            className="bg-green-500 text-white px-4 py-2 rounded"
          >
            Submit Quiz
          </button>
        </div>
      )}
    </div>
  );
}

export default AttemptQuiz;
