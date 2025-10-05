import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import API from "../api/axios";

export default function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await API.get("/users/profile");
        setUser(res.data);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  if (loading) return <p className="p-4">Loading profile...</p>;
  if (error) return <p className="text-red-500 p-4">{error}</p>;

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-6">
      <h1 className="text-3xl font-bold">Profile & Dashboard</h1>
      <p className="text-gray-600">Welcome back, {user?.name}!</p>

      {/* User Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Documents Uploaded</h2>
          <p className="text-2xl font-bold">{user?.documentsUploaded}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Quizzes Generated</h2>
          <p className="text-2xl font-bold">{user?.quizzesGenerated}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Quizzes Attempted</h2>
          <p className="text-2xl font-bold">{user?.quizzesAttempted}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Total Score</h2>
          <p className="text-2xl font-bold">{user?.totalScore}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow text-center">
          <h2 className="text-lg font-semibold">Average Score</h2>
          <p className="text-2xl font-bold">{user?.averageScore.toFixed(2)}</p>
        </div>
      </div>

      {/* Quick Links / Actions */}
      <div className="p-4 bg-white rounded-lg shadow space-y-4">
        <h2 className="text-xl font-semibold mb-2">Quick Actions</h2>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/upload"
            className="flex-1 text-center bg-blue-500 text-white px-4 py-3 rounded hover:bg-blue-600 transition"
          >
            Upload Document & Generate Quiz
          </Link>
          <Link
            to="/my-quizzes"
            className="flex-1 text-center bg-green-500 text-white px-4 py-3 rounded hover:bg-green-600 transition"
          >
            My Quizzes
          </Link>
          <Link
            to="/attempts"
            className="flex-1 text-center bg-yellow-500 text-white px-4 py-3 rounded hover:bg-yellow-600 transition"
          >
            Attempt History
          </Link>
          <Link
            to="/leaderboard"
            className="flex-1 text-center bg-purple-500 text-white px-4 py-3 rounded hover:bg-purple-600 transition"
          >
            Leaderboard
          </Link>
        </div>
      </div>

      {/* Optional Detailed Profile Info */}
      <div className="p-4 bg-white rounded-lg shadow space-y-2">
        <h2 className="text-xl font-semibold mb-2">Profile Details</h2>
        <p>
          <strong>Name:</strong> {user?.name}
        </p>
        <p>
          <strong>Email:</strong> {user?.email}
        </p>
        <p>
          <strong>Joined:</strong>{" "}
          {new Date(user?.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
}
