import { useState } from "react";
import Navbar from "./components/pages/Navbar";
import HeroSection from "./components/pages/HeroSection";
import ProjectsSection from "./components/pages/ProjectsSection";
import SkillsSection from "./components/pages/SkillsSection";
import AchievementsSection from "./components/pages/Achievements";
import ProjectShowcase from "./components/pages/ProjectShowcase";
import ContactSection from "./components/pages/ContactSection";
import Footer from "./components/pages/Footer";
import { projects, skills, achievements } from "./lib/data";

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      <HeroSection />
      <ProjectsSection projects={projects} />
      <SkillsSection skills={skills} />
      <AchievementsSection achievements={achievements} />
      <ProjectShowcase projects={projects} />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default App;