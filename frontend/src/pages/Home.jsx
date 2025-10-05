import Footer from "../components/Footer";
import Hero from "../components/Hero";
import Features from "../components/Features";
import HowToUse from "../components/HowToUse";
import Stats from "../components/Stats";

function Home() {
  return (
    <div className="space-y-16">
      <Hero />
      <Features />
      <Stats />
      <HowToUse />
      <Footer />
    </div>
  );
}

export default Home;
