import React from "react";

const Zap = (props) => (
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
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
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
function HowToUse() {
  const StepCard = ({ step, description, icon: Icon }) => (
    <div className="p-6 bg-white rounded-xl shadow-md border border-gray-100 text-center flex flex-col items-center h-full">
      <div className="mb-4 p-3 bg-indigo-50 rounded-full inline-block">
        <Icon className="w-8 h-8 text-indigo-600" />
      </div>
      <h3 className="text-2xl font-extrabold text-violet-700 mb-2">
        Step {step}
      </h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
  return (
    <section className="max-w-6xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
        How to Master QuizGen AI in 4 Steps
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <StepCard
          step={1}
          description="Click 'Upload & Generate Quiz' and select your learning document."
          icon={UploadCloud}
        />
        <StepCard
          step={2}
          description="Wait for the AI to instantly analyze the content and draft the quiz questions."
          icon={Zap}
        />
        <StepCard
          step={3}
          description="Start the quiz attempt, answer the questions, and submit for instant grading."
          icon={CheckSquare}
        />
        <StepCard
          step={4}
          description="View your history, track your improvement, and compete on the leaderboard."
          icon={History}
        />
      </div>
    </section>
  );
}

export default HowToUse;
