import { useEffect, useState } from "react";
import API from "../api/axios";

const CheckSquare = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m3 12 2-2 4 4 8-8 2 2" />
    <rect width="18" height="18" x="3" y="3" rx="2" />
  </svg>
);
const UploadCloud = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.23" />
    <path d="M12 12v9" />
    <path d="m16 16-4-4-4 4" />
  </svg>
);

const History = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const Award = (props) => (
  <svg
    {...props}
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="8" r="6" />
    <path d="M15.47 12.13a4 4 0 0 1 0 7.74" />
    <path d="M8.53 19.87a4 4 0 0 1 0-7.74" />
    <path d="M12 2v2" />
    <path d="m14 19.5-2 2-2-2" />
  </svg>
);

function Stats() {
  const [stats, setStats] = useState({
    quizzesGenerated: 0,
    documentsUploaded: 0,
    attemptsMade: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await API.get("/stats");
        setStats(res.data);
      } catch (err) {
        console.error("Failed to fetch stats:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchStats();
  }, []);

  const StatCard = ({ value, label, icon: Icon }) => (
    <div className="p-6 bg-white rounded-xl shadow-lg border border-gray-100 transition duration-300 transform hover:scale-[1.02] flex flex-col items-center">
      <div className="mb-2 p-2 bg-violet-100 rounded-full inline-block">
        {Icon && <Icon className="w-8 h-8 text-violet-600" />}
      </div>
      <h3 className="text-4xl font-extrabold text-indigo-800 mb-1">
        {value.toLocaleString()}
      </h3>
      <p className="text-gray-500 font-medium text-center">{label}</p>
    </div>
  );
  return (
    <section className="bg-indigo-50 py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
        Our Growing Platform Stats
      </h2>
      {loading ? (
        <div className="max-w-5xl mx-auto text-center p-8 bg-white rounded-xl shadow-lg">
          <p className="text-lg text-indigo-600 animate-pulse">
            Loading platform metrics...
          </p>
        </div>
      ) : (
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard
            value={stats.quizzesGenerated}
            label="Quizzes Generated"
            icon={CheckSquare}
          />
          <StatCard
            value={stats.documentsUploaded}
            label="Documents Uploaded"
            icon={UploadCloud}
          />
          <StatCard
            value={stats.attemptsMade}
            label="Quiz Attempts Made"
            icon={History}
          />
          <StatCard value={stats.totalUsers} label="Total Users" icon={Award} />
        </div>
      )}
    </section>
  );
}

export default Stats;
