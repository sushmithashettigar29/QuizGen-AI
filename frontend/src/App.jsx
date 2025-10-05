import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import AttemptQuiz from "./pages/AttemptQuiz";
import Profile from "./pages/Profile";
import QuizList from "./pages/QuizList";
import Leaderboard from "./pages/Leaderboard";
import Attempts from "./pages/Attempts";
import Navbar from "./components/Navbar";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check token on app load
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar Component */}
      <Navbar isLoggedIn={isLoggedIn} handleLogout={handleLogout} />

      {/* Main Content Area */}
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          {/* Note: Passing handleLogin to Login component for simulation */}
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/upload" element={<Upload />} />
          <Route path="/quiz/:quizId" element={<AttemptQuiz />} />
          <Route path="/my-quizzes" element={<QuizList />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/attempts" element={<Attempts />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
