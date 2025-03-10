import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronRight } from "lucide-react";

interface NavbarProps {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ mobileMenuOpen, setMobileMenuOpen }) => {
  const [scrolled, setScrolled] = useState(false);
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Projects", href: "/projects" },
    { name: "Skills", href: "/skills" },
    { name: "Achievements", href: "/achievements" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <nav 
        className={`fixed w-full py-4 px-6 flex justify-between items-center z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-gray-900/75 backdrop-blur-sm shadow-lg" 
            : "bg-transparent"
        }`}
      >
        <div className="flex items-center">
          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg blur opacity-75"></div>
            <div className="relative px-4 py-2 bg-black rounded-lg">
              <h1 className="text-2xl font-bold text-white">
                Badal <span className="text-blue-400">Singh</span>
              </h1>
            </div>
          </div>
        </div>
        
        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="px-4 py-2 text-gray-300 hover:text-white relative overflow-hidden group rounded-md"
            >
              <span className="absolute inset-0 w-0 bg-gradient-to-r from-purple-600/20 to-blue-500/20 transition-all duration-300 ease-out group-hover:w-full"></span>
              <span className="relative">{link.name}</span>
            </a>
          ))}
          <div className="relative ml-4">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
            <a 
              href="#" 
              className="relative bg-black hover:bg-gray-800 rounded-full px-6 py-2 text-white inline-block transition-all"
            >
              Resume
            </a>
          </div>
        </div>
        
        {/* Mobile Menu Button */}
        <Button 
          variant="ghost" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
          className="md:hidden relative group"
        >
          <div className="absolute -inset-2 bg-gradient-to-r from-purple-600/50 to-blue-500/50 rounded-full blur opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            {mobileMenuOpen ? <X size={24} className="text-white" /> : <Menu size={24} className="text-white" />}
          </div>
        </Button>
      </nav>
      
      {/* Mobile Menu with Animation */}
      <div 
        className={`fixed inset-0 bg-gray-900/95 backdrop-blur-md z-40 flex flex-col md:hidden transition-all duration-500 ease-in-out transform ${
          mobileMenuOpen ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
        }`}
      >
        <div className="flex justify-end p-6">
          <Button 
            variant="ghost" 
            onClick={() => setMobileMenuOpen(false)} 
            className="text-white"
          >
            <X size={24} />
          </Button>
        </div>
        
        <div className="flex flex-col items-center justify-center flex-1 space-y-8 p-8">
          {navLinks.map((link, i) => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="text-2xl font-medium text-white flex items-center space-x-2 group"
              style={{ 
                transitionDelay: `${i * 100}ms`,
                opacity: mobileMenuOpen ? 1 : 0,
                transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.3s ease-in-out"
              }}
            >
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 h-px w-0 group-hover:w-8 transition-all duration-300 mr-2"></span>
              {link.name}
              <ChevronRight size={18} className="opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300" />
            </a>
          ))}
          
          <a
            href="#"
            onClick={() => setMobileMenuOpen(false)}
            className="relative mt-6 inline-block"
            style={{ 
              transitionDelay: `${navLinks.length * 100}ms`,
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? "translateY(0)" : "translateY(20px)",
              transition: "all 0.3s ease-in-out"
            }}
          >
            <div className="absolute -inset-1 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full blur opacity-75"></div>
            <div className="relative px-8 py-3 bg-black rounded-full">
              Download Resume
            </div>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;