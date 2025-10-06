import { useState } from "react";
import { Link } from "react-router-dom";

export default function Upload() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [quizGenerated, setQuizGenerated] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setSuccessMessage("");
    setQuizGenerated(false);
  };

  const handleUpload = async () => {
    if (!file) return setError("Please select a file first");

    const token = localStorage.getItem("token");
    if (!token) return setError("Please login first");

    setLoading(true);
    setError("");
    setSuccessMessage("");
    setQuizGenerated(false);

    try {
      // 1️⃣ Upload document
      const formData = new FormData();
      formData.append("file", file);

      const uploadRes = await fetch(
        "http://localhost:5000/api/uploads/upload",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      const uploadData = await uploadRes.json();
      if (!uploadRes.ok) throw new Error(uploadData.message || "Upload failed");

      // uploadData should now include { extractedText, fileName }

      // 2️⃣ Generate quiz
      const quizRes = await fetch(
        "http://localhost:5000/api/quizzes/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            extractedText: uploadData.extractedText,
            fileName: uploadData.fileName || file.name,
          }),
        }
      );

      const quizData = await quizRes.json();
      if (!quizRes.ok)
        throw new Error(quizData.message || "Quiz generation failed");

      setSuccessMessage("Quiz generated successfully!");
      setQuizGenerated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-start justify-center p-4 sm:p-6">
      <div className="w-full max-w-xl bg-white p-8 sm:p-10 mt-10 rounded-2xl shadow-2xl border border-indigo-100">
        {/* Header */}
        <h1 className="text-3xl font-extrabold text-center mb-2 text-indigo-800">
          Upload Document & Generate Quiz
        </h1>
        <p className="text-center text-gray-500 mb-8">
          Select a file to quickly generate your quiz.
        </p>

        {/* Status Messages */}
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg mb-4 text-center">
            {error}
          </div>
        )}
        {successMessage && (
          <div className="bg-green-50 border border-green-200 text-green-700 p-3 rounded-lg mb-4 text-center">
            {successMessage}
          </div>
        )}

        {/* Upload Form */}
        {!quizGenerated && (
          <div className="flex flex-col gap-6 p-6 bg-indigo-50 border border-indigo-200 rounded-xl">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.docx,.txt"
              className="file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-violet-100 file:text-violet-700 hover:file:bg-violet-200 file:cursor-pointer transition duration-150"
            />
            <button
              onClick={handleUpload}
              disabled={loading || !file}
              className={`px-4 py-3 rounded-xl font-semibold transition duration-200 shadow-lg w-full
                ${
                  loading || !file
                    ? "bg-violet-400 cursor-not-allowed text-white"
                    : "bg-violet-600 hover:bg-violet-700 text-white transform hover:scale-[1.01]"
                }`}
            >
              {loading ? "Processing..." : "Upload & Generate Quiz"}
            </button>
          </div>
        )}

        {/* Navigate to My Quizzes after generation */}
        {quizGenerated && (
          <div className="text-center mt-6">
            <Link
              to="/my-quizzes"
              className="inline-block bg-purple-600 text-white font-bold px-8 py-3 rounded-xl shadow-md hover:bg-purple-700 transition transform hover:scale-[1.02]"
            >
              Go to My Quizzes
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
