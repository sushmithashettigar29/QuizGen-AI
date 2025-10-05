import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/quizzes/my", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (!res.ok) throw new Error(data.message);
        setQuizzes(data);
      } catch (err) {
        alert("Error: " + err.message);
      }
    };
    fetchQuizzes();
  }, [token]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Quizzes</h1>
      <ul>
        {quizzes.map((quiz) => (
          <li key={quiz._id} className="mb-2">
            {quiz.title || "Untitled Quiz"}{" "}
            <Link
              to={`/quiz/${quiz._id}`}
              className="text-blue-600 underline"
            >
              Attempt
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default QuizList;
