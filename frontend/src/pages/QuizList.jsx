import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function QuizList() {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
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
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, [token]);

  const StatusBox = ({ type, message }) => (
    <div
      className={`p-4 rounded-xl text-sm font-medium mt-4 transition-opacity duration-300 
        ${
          type === "error"
            ? "bg-red-100 text-red-800 border border-red-300"
            : "bg-indigo-100 text-indigo-800 border border-indigo-300"
        }`}
    >
      {message}
    </div>
  );

  const QuizCard = ({ quiz }) => (
    <div className="p-5 bg-white rounded-xl shadow-lg hover:shadow-xl transition duration-300 border border-gray-100 flex flex-col justify-between">
      <div>
        <h3 className="text-xl font-bold text-indigo-700 mb-2">
          {quiz.title || "Untitled Quiz"}
        </h3>
        <p className="text-sm text-gray-500 mb-3">
          Created: {new Date(quiz.createdAt).toLocaleDateString()}
        </p>
      </div>

      <div className="flex justify-between items-center border-t border-dashed border-gray-200 pt-3 mt-3">
        <div className="text-sm text-gray-600 space-y-1">
          <p>
            <span className="font-semibold text-violet-600">
              {quiz.questions?.length || 0}
            </span>{" "}
            Questions
          </p>
        </div>

        <Link
          to={`/quiz/${quiz._id}`}
          className="bg-violet-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md hover:bg-violet-700 transition transform hover:scale-[1.05] text-sm"
        >
          Start Quiz
        </Link>
      </div>
    </div>
  );

  return (
    <div className="min-h-[80vh] p-4 sm:p-6 flex flex-col items-center bg-gray-50">
      <div className="w-full max-w-5xl mt-8">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-indigo-800">
          My Quizzes
        </h1>

        {/* Status */}
        {error && <StatusBox type="error" message={error} />}
        {loading && <StatusBox type="info" message="Loading your quizzes..." />}

        {!loading && !error && quizzes.length === 0 && (
          <StatusBox
            type="info"
            message={
              <span>
                You haven’t generated any quizzes yet.{" "}
                <Link
                  to="/upload"
                  className="font-semibold text-violet-700 hover:underline"
                >
                  Upload a document
                </Link>{" "}
                to start!
              </span>
            }
          />
        )}

        {/* Quiz Grid */}
        {!loading && !error && quizzes.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quizzes.map((quiz) => (
              <QuizCard key={quiz._id} quiz={quiz} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuizList;
