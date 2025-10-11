import { useEffect, useState } from "react";
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

  const StatCard = ({ title, value }) => (
    <div className="p-5 bg-white rounded-xl shadow-lg border border-indigo-100 transition duration-300 hover:shadow-xl hover:translate-y-[-2px]">
      <h2 className="text-sm font-semibold text-gray-500 capitalize tracking-wider mb-1 text-center">
        {title}
      </h2>
      <p className="text-3xl font-extrabold text-indigo-700 text-center">{value}</p>
    </div>
  );

  if (loading)
    return (
      <div className="flex justify-center items-center h-48">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-indigo-500"></div>
        <p className="ml-4 text-indigo-700">Loading profile...</p>
      </div>
    );

  if (error)
    return (
      <div className="max-w-xl mx-auto p-6 bg-red-100 border border-red-400 text-red-700 rounded-xl mt-10">
        <p className="font-semibold">Error Loading Profile:</p>
        <p>{error}</p>
      </div>
    );

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-10">
      {/* Header and Welcome */}
      <div className="text-center md:text-left border-b border-indigo-200 pb-4">
        <h1 className="text-4xl font-extrabold text-gray-800">
          Your Dashboard
        </h1>
        <p className="text-xl text-indigo-600 mt-1">
          Welcome back, <span className="font-semibold">{user?.name}</span>!
        </p>
      </div>

      {/* Detailed Profile Info */}
      <div className="w-full p-6 bg-white rounded-2xl shadow-lg space-y-3">
        <h2 className="text-2xl font-bold text-gray-700 mb-3 pb-2">
          Account Details
        </h2>
        <p className="text-gray-600">
          <strong className="text-gray-800 w-24 inline-block">Name:</strong>{" "}
          {user?.name}
        </p>
        <p className="text-gray-600">
          <strong className="text-gray-800 w-24 inline-block">Email:</strong>{" "}
          {user?.email}
        </p>
        <p className="text-gray-600">
          <strong className="text-gray-800 w-24 inline-block">Joined:</strong>{" "}
          {new Date(user?.createdAt).toLocaleDateString()}
        </p>
      </div>

      {/* User Stats Grid */}
      <div>
        <h2 className="text-2xl font-bold text-gray-700 mb-6">
          Learning Metrics
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          <StatCard
            title="Documents Uploaded"
            value={user?.documentsUploaded}
          />
          <StatCard title="Quizzes Generated" value={user?.quizzesGenerated} />
          <StatCard title="Quizzes Attempted" value={user?.quizzesAttempted} />
          <StatCard title="Total Score" value={user?.totalScore} />
          <StatCard
            title="Average Score"
            value={
              user?.averageScore ? `${user.averageScore.toFixed(2)}%` : "N/A"
            }
          />
        </div>
      </div>
    </div>
  );
}
