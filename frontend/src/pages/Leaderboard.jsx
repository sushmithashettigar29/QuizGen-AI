import { useEffect, useState } from "react";
import API from "../api/axios";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get("/users/leaderboard");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  if (loading) return <p>Loading leaderboard...</p>;
  return (
    <div className="max-w-3xl mx-auto p-4 border rounded-lg shadow">
      <h1 className="text-2xl font-bold mb-4">Leaderboard</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b">
            <th className="py-2">Rank</th>
            <th className="py-2">Name</th>
            <th className="py-2">Total Score</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u, idx) => (
            <tr key={u._id} className="border-b">
              <td className="py-2">{idx + 1}</td>
              <td className="py-2">{u.name}</td>
              <td className="py-2">{u.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
