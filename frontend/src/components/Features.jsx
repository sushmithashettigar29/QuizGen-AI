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
const Target = (props) => (
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
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);
const Users = (props) => (
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
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

function Features() {
    const FeatureCard = ({ title, description, icon: Icon }) => (
    <div className="p-8 bg-white rounded-2xl shadow-xl border border-indigo-100 transition duration-300 hover:shadow-2xl text-left">
      <div className="mb-4 p-3 bg-violet-100 rounded-lg inline-block">
        <Icon className="w-6 h-6 text-violet-600" />
      </div>
      <h3 className="text-xl font-bold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
  return (
    <section className="max-w-6xl mx-auto py-20 px-6">
      <h2 className="text-4xl font-bold text-center mb-16 text-gray-800">
        Features That Power Your Study
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <FeatureCard
          title="Smart Quiz Generation"
          description="Convert any complex document (PDF, DOCX) into a structured quiz automatically using deep learning models."
          icon={Zap}
        />
        <FeatureCard
          title="Detailed Progress Tracking"
          description="Monitor your performance across attempts, identify weak spots, and visualize your learning curve over time."
          icon={Target}
        />
        <FeatureCard
          title="Collaborative Learning"
          description="Share your custom quizzes with friends or study groups and compete to climb the global leaderboard."
          icon={Users}
        />
      </div>
    </section>
  );
}

export default Features;
