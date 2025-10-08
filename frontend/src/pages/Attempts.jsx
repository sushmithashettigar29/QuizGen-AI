import { useEffect, useState } from "react";
import API from "../api/axios";

function Attempts() {
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const res = await API.get("/users/attempts");
        setAttempts(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load attempts");
      } finally {
        setLoading(false);
      }
    };
    fetchAttempts();
  }, []);

  if (loading) return <p>Loading attempts...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">My Quiz Attempts</h1>
      {attempts.length === 0 ? (
        <p>No attempts yet.</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2">Quiz Title</th>
              <th className="py-2">Score</th>
              <th className="py-2">Date Attempted</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((a) => (
              <tr key={a._id} className="border-b">
                <td className="py-2">{a.title || "Untitled Quiz"}</td>
                <td className="py-2">{a.score}</td>
                <td className="py-2">
                  {new Date(a.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Attempts;
