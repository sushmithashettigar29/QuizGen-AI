import { Link } from "react-router-dom";

function Navbar({ isLoggedIn, handleLogout }) {
  const navLinkClass =
    "px-3 py-2 rounded-lg font-medium text-sm hover:bg-gray-100 transition duration-150";
  const authButtonClass =
    "px-4 py-2 rounded-full font-semibold text-sm transition duration-150 shadow-md";

  return (
    <nav className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo/Home Link */}
          <div className="flex-shrink-0">
            <Link
              to="/"
              className="text-xl font-bold text-indigo-600 hover:text-indigo-800 transition"
            >
              QuizGen AI
            </Link>
          </div>

          {/* Main Links */}
          {isLoggedIn && (
            <div className="hidden md:flex space-x-2">
              <Link to="/" className={navLinkClass}>
                Home
              </Link>
              <Link to="/upload" className={navLinkClass}>
                Upload
              </Link>
              <Link to="/my-quizzes" className={navLinkClass}>
                My Quizzes
              </Link>
              <Link to="/attempts" className={navLinkClass}>
                Attempts
              </Link>
              <Link to="/leaderboard" className={navLinkClass}>
                Leaderboard
              </Link>
            </div>
          )}

          {/* Auth Links */}
          <div className="flex items-center space-x-3">
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className={navLinkClass + " text-indigo-600 hover:text-indigo-800"}
                >
                  Profile
                </Link>
                <button
                  onClick={handleLogout}
                  className={`${authButtonClass} bg-red-600 hover:bg-red-700 text-white`}
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className={`${authButtonClass} bg-indigo-600 text-white hover:bg-indigo-700`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className={`${authButtonClass} bg-green-500 text-white hover:bg-green-600`}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
