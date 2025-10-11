import { useEffect, useState } from "react";
import API from "../api/axios";
import { Zap, Trophy, Shield, User } from "lucide-react";

function Leaderboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch leaderboard data
  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const res = await API.get("/users/leaderboard");
        setUsers(res.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch leaderboard data");
      } finally {
        setLoading(false);
      }
    };
    fetchLeaderboard();
  }, []);

  // Status Box (for loading or error)
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

  // Renders each leaderboard row
  const LeaderboardRow = ({ user, rank }) => {
    const baseClasses =
      "py-3 px-4 text-gray-800 font-medium transition-colors duration-150";

    let rankDisplay;
    let rowClasses = "bg-white hover:bg-violet-50 border-b border-gray-100";

    if (rank === 1) {
      rankDisplay = (
        <Trophy className="w-5 h-5 text-yellow-500 fill-yellow-300" />
      );
      rowClasses =
        "bg-yellow-50/50 hover:bg-yellow-100/70 border-b-2 border-yellow-300 shadow-md";
    } else if (rank === 2) {
      rankDisplay = <Trophy className="w-5 h-5 text-gray-400 fill-gray-200" />;
      rowClasses =
        "bg-gray-50/50 hover:bg-gray-100/70 border-b-2 border-gray-200";
    } else if (rank === 3) {
      rankDisplay = (
        <Trophy className="w-5 h-5 text-amber-600 fill-amber-300" />
      );
      rowClasses =
        "bg-amber-50/50 hover:bg-amber-100/70 border-b-2 border-amber-300";
    } else {
      rankDisplay = <span className="text-gray-500 font-bold">{rank}</span>;
      rowClasses =
        rank % 2 === 0
          ? "bg-white hover:bg-violet-50"
          : "bg-gray-50 hover:bg-violet-50";
    }

    return (
      <tr className={rowClasses}>
        <td className={`${baseClasses} text-center w-16`}>
          <div className="flex justify-center items-center h-6">
            {rankDisplay}
          </div>
        </td>
        <td className={`${baseClasses} flex items-center gap-3`}>
          <User className="w-4 h-4 text-indigo-500" />
          {user.name || "Anonymous"}
        </td>
        <td
          className={`${baseClasses} text-center font-extrabold text-lg text-violet-700`}
        >
          {user.totalScore?.toLocaleString() || 0}{" "}
          <span className="text-sm font-semibold text-violet-400">PTS</span>
        </td>
      </tr>
    );
  };

  // Main Render
  return (
    <div className="min-h-[80vh] flex justify-center p-4 sm:p-6 bg-gray-50">
      <div className="w-full max-w-3xl mt-8">
        <h1 className="text-4xl font-extrabold text-center mb-8 text-indigo-800 flex items-center justify-center gap-3">
          <Shield className="w-8 h-8 text-violet-600" />
          Global Leaderboard
        </h1>

        {loading ? (
          <div className="p-4 flex justify-center">
            <StatusBox type="info" message="Fetching top scores..." />
          </div>
        ) : error ? (
          <div className="p-4 flex justify-center">
            <StatusBox type="error" message={error} />
          </div>
        ) : users.length === 0 ? (
          <StatusBox type="info" message="No leaderboard data available yet." />
        ) : (
          <>
            <div className="bg-white p-4 rounded-2xl shadow-2xl border border-indigo-100 overflow-x-auto">
              <table className="w-full text-left table-auto">
                <thead>
                  <tr className="bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-lg rounded-t-xl">
                    <th className="py-3 px-4 text-sm font-semibold text-center rounded-tl-xl w-16">
                      <Zap className="w-4 h-4 inline-block align-middle" />
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold">
                      User Name
                    </th>
                    <th className="py-3 px-4 text-sm font-semibold text-center rounded-tr-xl">
                      Total Score
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u, idx) => (
                    <LeaderboardRow
                      key={u._id || idx}
                      user={u}
                      rank={idx + 1}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <p className="text-center text-xs text-gray-500 mt-4">
              Scores are aggregated from all quiz attempts. Keep learning to
              climb the ranks! 🚀
            </p>
          </>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
