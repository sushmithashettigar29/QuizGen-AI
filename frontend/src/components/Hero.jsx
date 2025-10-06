import { Link } from "react-router-dom";

function Hero() {
  return (
    <section className="bg-gradient-to-br from-indigo-900 via-violet-800 to-fuchsia-700 text-white py-32 px-6 text-center">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight">
          Innovating Your Learning{" "}
          <span className="block mt-2">With QuizGen AI</span>
        </h1>
        <p className="text-xl md:text-2xl mb-10 opacity-90">
          Generate sophisticated quizzes from your documents instantly using the
          power of AI.
        </p>
        <div className="flex justify-center gap-6 flex-wrap">
          <Link
            to="/upload"
            className="bg-white text-violet-700 font-bold px-8 py-4 rounded-xl shadow-2xl hover:bg-gray-200 transition transform hover:scale-105"
          >
            Upload & Generate Quiz
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Hero;
