<<<<<<< HEAD
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
=======
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { SparklesCore } from "./components/ui/sparkles";
import { TextGenerateEffect } from "./components/ui/text-generate-effect";
import { BackgroundGradient } from "./components/ui/background-gradient";
import { AnimatedTooltip } from "./components/ui/animated-tooltip";
import { HoverEffect } from "./components/ui/card-hover-effect";
import { WavyBackground } from "./components/ui/wavy-background";
import { GlowingStarsBackgroundCard } from "./components/ui/glowing-stars";
import { TypewriterEffect } from "./components/ui/typewriter-effect";
import { LampContainer } from "./components/ui/lamp";
import { StickyScroll } from "./components/ui/sticky-scroll-reveal";
import { Spotlight } from "./components/ui/spotlight";
import { cn } from "@/lib/utils";
import { Menu, X, Github, Twitter, Linkedin, ExternalLink, Mail, ArrowDown } from "lucide-react";

const projects = [
  {
    title: "Project One",
    description: "A web app to manage tasks efficiently.",
    image: "/api/placeholder/400/250",
    link: "#",
    tags: ["React", "TypeScript", "Firebase"]
  },
  {
    title: "Project Two",
    description: "An AI chatbot for automation.",
    image: "/api/placeholder/400/250",
    link: "#",
    tags: ["Python", "TensorFlow", "NLP"]
  },
  {
    title: "Project Three",
    description: "A finance dashboard for tracking investments.",
    image: "/api/placeholder/400/250",
    link: "#",
    tags: ["Next.js", "D3.js", "Tailwind CSS"]
  }
];

const skills = [
  { name: "React", category: "Frontend" },
  { name: "TypeScript", category: "Frontend" },
  { name: "Next.js", category: "Frontend" },
  { name: "Tailwind CSS", category: "Frontend" },
  { name: "Node.js", category: "Backend" },
  { name: "Express", category: "Backend" },
  { name: "Python", category: "Backend" },
  { name: "PostgreSQL", category: "Backend" },
  { name: "AWS", category: "DevOps" },
  { name: "Docker", category: "DevOps" },
  { name: "CI/CD", category: "DevOps" },
  { name: "Git", category: "DevOps" }
];

const achievements = [
  {
    icon: "🏆",
    title: "Winner of Hackathon XYZ 2023",
    description: "Built an innovative solution for climate data visualization that impressed the judges."
  },
  {
    icon: "🏅",
    title: "Certified Full Stack Developer",
    description: "Earned advanced certification in modern web development frameworks and best practices."
  },
  {
    icon: "🎯",
    title: "Completed 50+ Projects Successfully",
    description: "Delivered high-quality solutions for clients across various industries and technical domains."
  }
];

// Data for TypewriterEffect component
const typewriterWords = [
  {
    text: "Build.",
    className: "text-blue-500"
  },
  {
    text: "Design.",
    className: "text-purple-500"
  },
  {
    text: "Develop.",
    className: "text-green-500"
  },
  {
    text: "Deploy.",
    className: "text-yellow-500"
  }
];

// Data for StickyScroll component
const skillsContent = [
  {
    title: "Frontend Development",
    description: "Building responsive and accessible user interfaces with modern frameworks and tools.",
    content: (
      <div className="h-full w-full bg-gray-900 flex items-center justify-center text-white">
        <div className="flex flex-wrap gap-2">
          {skills.filter(skill => skill.category === "Frontend").map((skill) => (
            <span key={skill.name} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "Backend Engineering",
    description: "Developing robust API services and database architectures to power web applications.",
    content: (
      <div className="h-full w-full bg-gray-900 flex items-center justify-center text-white">
        <div className="flex flex-wrap gap-2">
          {skills.filter(skill => skill.category === "Backend").map((skill) => (
            <span key={skill.name} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )
  },
  {
    title: "DevOps & Cloud",
    description: "Implementing CI/CD pipelines and deploying scalable cloud infrastructure.",
    content: (
      <div className="h-full w-full bg-gray-900 flex items-center justify-center text-white">
        <div className="flex flex-wrap gap-2">
          {skills.filter(skill => skill.category === "DevOps").map((skill) => (
            <span key={skill.name} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
              {skill.name}
            </span>
          ))}
        </div>
      </div>
    )
  }
];

// Data for card hover effect 
const projectCards = projects.map(p => ({
  title: p.title,
  description: p.description,
  link: p.link
}));

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      // Reset form after submission
      e.target.reset();
      // Show success message (could be a toast or alert)
      alert("Message sent successfully!");
    }, 1000);
  };

  return (
    <div className="bg-black text-white min-h-screen">
      {/* Navbar */}
      <nav className="fixed w-full bg-black/80 backdrop-blur-md py-4 px-6 flex justify-between items-center shadow-lg z-50 border-b border-gray-800/50">
        <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
          Dev Portfolio
        </h1>
        
        <div className="hidden md:flex items-center space-x-8">
          <a href="#projects" className="text-gray-300 hover:text-white transition-colors relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#skills" className="text-gray-300 hover:text-white transition-colors relative group">
            Skills
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#achievements" className="text-gray-300 hover:text-white transition-colors relative group">
            Achievements
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#contact" className="text-gray-300 hover:text-white transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-500 transition-all group-hover:w-full"></span>
          </a>
          <a href="#" className="bg-blue-600 hover:bg-blue-700 transition-all rounded-full px-6 py-2 text-white inline-block">
            Resume
          </a>
        </div>
        
        <Button 
          variant="ghost" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden text-white"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </Button>
      </nav>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 bg-black z-40 pt-20 px-6 flex flex-col md:hidden">
          <a 
            href="#projects" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-medium py-4 border-b border-gray-800"
          >
            Projects
          </a>
          <a 
            href="#skills" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-medium py-4 border-b border-gray-800"
          >
            Skills
          </a>
          <a 
            href="#achievements" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-medium py-4 border-b border-gray-800"
          >
            Achievements
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="text-2xl font-medium py-4 border-b border-gray-800"
          >
            Contact
          </a>
          <a 
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="mt-6 bg-blue-600 hover:bg-blue-700 transition-all rounded-full text-center py-3"
          >
            Download Resume
          </a>
        </div>
      )}

      {/* Hero Section with Spotlight, SparklesCore, and TextGenerateEffect */}
      <section className="relative h-screen flex flex-col justify-center items-center text-center px-6 pt-16 bg-black">
        {/* Add SparklesCore background */}
        <div className="absolute inset-0 z-0">
          <SparklesCore
            id="heroSparkles"
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={30}
            className="w-full h-full"
            particleColor="#fff"
          />
        </div>
        
        <Spotlight
          className="h-screen w-full"
          fill="blue"
        />
        <div className="relative z-10 max-w-4xl">
          <div className="mb-4">
            <TypewriterEffect words={typewriterWords} />
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
            Creative Developer
          </h1>
          
          {/* Fix TextGenerateEffect - ensure it has proper className and words property */}
          <div className="max-w-2xl mx-auto mb-8">
            <TextGenerateEffect
              words="I craft exceptional digital experiences with modern technologies, focusing on performance, accessibility, and beautiful interfaces."
            />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#projects" className="bg-blue-600 hover:bg-blue-700 transition-all rounded-full px-8 py-3 inline-flex items-center text-white">
              <span className="mr-2">View Projects</span>
              <ExternalLink size={18} />
            </a>
            <a href="#contact" className="border border-blue-500 text-blue-400 hover:bg-blue-500/10 rounded-full px-8 py-3 inline-flex items-center">
              <span className="mr-2">Contact Me</span>
              <Mail size={18} />
            </a>
          </div>
        </div>
        
        <a href="#projects" className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown size={24} className="text-blue-400" />
        </a>
      </section>
      
      {/* Projects Section with WavyBackground and HoverEffect */}
      <section className="py-24 px-6 relative" id="projects">
        <WavyBackground className="absolute inset-0" waveWidth={100} backgroundFill="#000">
          <div className="container mx-auto relative z-10">
            <div className="text-center mb-16">
              <span className="inline-block px-3 py-1 rounded-full bg-blue-900/30 text-blue-400 text-sm font-medium mb-4">
                PORTFOLIO
              </span>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                Explore some of my recent work spanning web applications, AI solutions, and interactive dashboards.
              </p>
            </div>
            
            <HoverEffect items={projectCards} />
          </div>
        </WavyBackground>
      </section>
      
      {/* Skills Section with StickyScroll */}
      <section className="py-24 px-6" id="skills">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-purple-900/30 text-purple-400 text-sm font-medium mb-4">
              EXPERTISE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
              Technical Skills
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              A collection of technologies and tools I've mastered throughout my career.
            </p>
          </div>
          
          <div className="h-[50vh] md:h-[80vh]">
            <StickyScroll content={skillsContent} />
          </div>
        </div>
      </section>
      
      {/* Achievements Section with GlowingStarsBackgroundCard */}
      <section className="py-24 px-6 bg-gray-900/50" id="achievements">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-green-900/30 text-green-400 text-sm font-medium mb-4">
              RECOGNITION
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-teal-500 text-transparent bg-clip-text">
              Achievements
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Recognitions and milestones that mark my professional journey.
            </p>
          </div>
          
          <div className="max-w-4xl mx-auto space-y-6">
            {achievements.map((achievement, index) => (
              <div key={index}>
                <GlowingStarsBackgroundCard>
                  <div className="bg-black/80 p-6 rounded-xl backdrop-blur-sm flex flex-col md:flex-row items-center gap-4 border border-gray-800/50">
                    <div className="text-5xl">{achievement.icon}</div>
                    <div>
                      <h3 className="text-xl font-bold text-blue-300">{achievement.title}</h3>
                      <p className="text-gray-300">{achievement.description}</p>
                    </div>
                  </div>
                </GlowingStarsBackgroundCard>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Project Showcase (Alternative to MacbookScroll) */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-yellow-900/30 text-yellow-400 text-sm font-medium mb-4">
              SHOWCASE
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
              Project Showcase
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              See my projects in action.
            </p>
          </div>
          
          {/* Grid layout instead of MacbookScroll */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
            {projects.map((project, index) => (
              <BackgroundGradient key={index} className="rounded-xl overflow-hidden">
                <div className="bg-black flex flex-col h-full">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-48 object-cover" 
                  />
                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="text-xl font-bold text-white mb-2">{project.title}</h3>
                    <p className="text-gray-300 mb-4">{project.description}</p>
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tags.map((tag, idx) => (
                        <span key={idx} className="text-xs bg-blue-900/30 text-blue-400 px-2 py-1 rounded-full">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <a 
                      href={project.link} 
                      className="mt-auto bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg inline-flex items-center justify-center"
                    >
                      <span className="mr-2">View Project</span>
                      <ExternalLink size={16} />
                    </a>
                  </div>
                </div>
              </BackgroundGradient>
            ))}
          </div>
        </div>
      </section>
      
      <section className="py-24 px-6 relative" id="contact">
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full bg-pink-900/30 text-pink-400 text-sm mb-4">
              CONNECT
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-pink-400 to-red-500 text-transparent bg-clip-text">
              Let's Work Together
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Have a project in mind? I'm just one message away from helping you bring it to life.
            </p>
          </div>
          
          <div className="max-w-lg mx-auto">
            <BackgroundGradient className="rounded-[2.5rem] p-1">
              <form onSubmit={handleSubmit} className="bg-black p-8 rounded-[2rem] space-y-6 border border-gray-800/50">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm text-gray-300">Your Name</label>
                  <Input 
                    id="name"
                    name="name"
                    placeholder="John Doe" 
                    className="bg-gray-900 border-gray-700 text-white rounded-xl"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm text-gray-300">Your Email</label>
                  <Input 
                    id="email"
                    name="email"
                    type="email" 
                    placeholder="john@example.com" 
                    className="bg-gray-900 border-gray-700 text-white rounded-xl"
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm text-gray-300">Your Message</label>
                  <Textarea 
                    id="message"
                    name="message"
                    placeholder="Describe your project..." 
                    className="bg-gray-900 border-gray-700 text-white h-32 rounded-xl"
                    required
                  />
                </div>
                
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-700 hover:to-violet-700 rounded-xl py-3 transition-all"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </BackgroundGradient>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-black border-t border-gray-800/50">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Dev Portfolio</h3>
              <p className="text-gray-400">Crafting exceptional digital experiences with a focus on performance and accessibility.</p>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Navigation</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
                <li><a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a></li>
                <li><a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a></li>
                <li><a href="#achievements" className="hover:text-blue-400 transition-colors">Achievements</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><Github size={16} className="mr-2" /> GitHub</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><Twitter size={16} className="mr-2" /> Twitter</a></li>
                <li><a href="#" className="hover:text-blue-400 transition-colors flex items-center"><Linkedin size={16} className="mr-2" /> LinkedIn</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
              <ul className="space-y-2 text-gray-400">
                <li className="flex items-center"><Mail size={16} className="mr-2" /> hello@example.com</li>
                <li>San Francisco, California</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-500 mb-4 md:mb-0">© 2025 Dev Portfolio. All rights reserved.</p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </footer>
>>>>>>> 3d1b26ff794b153c26f57c4ded4caaa6bc19a189
    </div>
  );
};

export default App;