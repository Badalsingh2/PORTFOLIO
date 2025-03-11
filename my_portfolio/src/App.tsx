import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useState } from "react";
import Navbar from "./components/pages/Navbar";
import HeroSection from "./components/pages/HeroSection";
import ProjectsSection from "./components/pages/ProjectsSection";
import SkillsSection from "./components/pages/SkillsSection";
import AchievementsSection from "./components/pages/Achievements";
import ProjectShowcase from "./components/pages/ProjectShowcase";
import ContactSection from "./components/pages/ContactSection";
import Footer from "./components/pages/Footer";
import LoginPage from "./components/pages/LoginPage";
import AdminPage from "./components/pages/AdminPage";

const Layout = ({ children }: { children: React.ReactNode }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white min-h-screen">
      <Navbar mobileMenuOpen={mobileMenuOpen} setMobileMenuOpen={setMobileMenuOpen} />
      {children}
      <Footer />
    </div>
  );
};

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <Layout>
        <HeroSection />
        <ProjectsSection />
        <SkillsSection />
        <AchievementsSection />
        <ProjectShowcase />
        <ContactSection />
      </Layout>
    ),
  },
  {
    path: "/login",
    element: (
      <Layout>
        <LoginPage />
      </Layout>
    ),
  },
  {
    path: "/admin",
    element: (
      <Layout>
        <AdminPage />
      </Layout>
    ),
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
