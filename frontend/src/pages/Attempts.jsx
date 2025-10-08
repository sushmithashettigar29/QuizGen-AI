import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

function Attempts() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // StatusBox component
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

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await API.get("/users/attempts");
        // Map attempts to include title, percentage, totalQuestions if missing
        const mapped = res.data.map((a) => ({
          ...a,
          title: a.title || a.quizTitle || "Untitled Quiz",
          totalQuestions: a.totalQuestions || a.questions?.length || 0,
          percentage:
            a.percentage !== undefined
              ? a.percentage
              : a.totalQuestions
              ? Math.round((a.score / a.totalQuestions) * 100)
              : 0,
        }));
        setAttempts(mapped);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load attempts");
      } finally {
        setLoading(false);
      }
    };
    fetchAttempts();
  }, []);

  const formatScoreColor = (percentage) => {
    if (percentage >= 80) return "text-green-600 font-bold";
    if (percentage >= 60) return "text-yellow-600 font-bold";
    return "text-red-600 font-bold";
  };

  if (loading)
    return (
      <div className="p-4 flex justify-center">
        <StatusBox type="info" message="Loading your attempt history..." />
      </div>
    );

  if (error)
    return (
      <div className="p-4 flex justify-center">
        <StatusBox type="error" message={error} />
      </div>
    );

  return (
    <div className="min-h-[80vh] flex justify-center p-4 sm:p-6 bg-gray-50">
      <div className="w-full max-w-4xl mt-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-800">
          My Quiz Attempts
        </h1>

        {attempts.length === 0 ? (
          <StatusBox
            type="info"
            message={
              <span>
                You have not attempted any quizzes yet.{" "}
                <Link
                  to="/my-quizzes"
                  className="font-semibold text-violet-700 hover:underline"
                >
                  Find a quiz
                </Link>{" "}
                to start learning!
              </span>
            }
          />
        ) : (
          <div className="bg-white p-6 rounded-2xl shadow-xl border border-indigo-100 overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-indigo-200 bg-indigo-50/50">
                  <th className="py-3 px-4 text-sm font-semibold text-indigo-700 rounded-tl-xl">
                    Quiz Title
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-indigo-700 text-center">
                    Score
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-indigo-700 text-center">
                    Percentage
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-indigo-700 text-center">
                    Date
                  </th>
                  <th className="py-3 px-4 text-sm font-semibold text-indigo-700 rounded-tr-xl text-center">
                    Time
                  </th>
                </tr>
              </thead>
              <tbody>
                {attempts.map((a, index) => {
                  const dateObj = new Date(a.date);
                  const dateStr = dateObj.toLocaleDateString();
                  const timeStr = dateObj.toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  });

                  return (
                    <tr
                      key={a._id}
                      className={`${
                        index % 2 === 0 ? "bg-white" : "bg-gray-50"
                      } hover:bg-violet-50 transition-colors duration-150`}
                    >
                      <td className="py-3 px-4 text-gray-800 font-medium">
                        <Link
                          to={`/quiz/${a.quizId}`}
                          className="hover:text-violet-600 transition-colors"
                        >
                          {a.title}
                        </Link>
                      </td>
                      <td className="py-3 px-4 text-center text-gray-700">
                        {a.score} / {a.totalQuestions}
                      </td>
                      <td
                        className={`py-3 px-4 text-center ${formatScoreColor(
                          a.percentage
                        )}`}
                      >
                        {a.percentage}%
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-600">
                        {dateStr}
                      </td>
                      <td className="py-3 px-4 text-center text-sm text-gray-600">
                        {timeStr}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default Attempts;
