import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h4 className="text-xl font-bold mb-4 text-violet-400">QuizGen AI</h4>
        <div className="flex justify-center gap-6 text-sm text-gray-400 mb-4">
          <Link to="/about" className="hover:text-violet-300 transition">
            About
          </Link>
          <Link to="/terms" className="hover:text-violet-300 transition">
            Terms of Service
          </Link>
          <Link to="/privacy" className="hover:text-violet-300 transition">
            Privacy Policy
          </Link>
        </div>
        <p className="text-gray-500 text-sm mt-4">
          &copy; {new Date().getFullYear()} QuizGen AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
