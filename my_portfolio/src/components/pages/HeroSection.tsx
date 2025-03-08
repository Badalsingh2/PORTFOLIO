import { SparklesCore } from "../ui/sparkles";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { TypewriterEffect } from "../ui/typewriter-effect";
import { Spotlight } from "../ui/spotlight";
import { ExternalLink, Mail, ArrowDown } from "lucide-react";
import { typewriterWords } from "../../lib/data";

const HeroSection = () => {
  return (
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
  );
};

export default HeroSection;