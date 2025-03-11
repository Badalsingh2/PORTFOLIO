import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "../../index.css";
import { FaReact, FaNodeJs, FaPython, FaVuejs, FaJs, FaAngular, FaAws, FaDocker } from "react-icons/fa";
import { SiTypescript, SiTailwindcss, SiMongodb, SiNextdotjs, SiFirebase, SiExpress } from "react-icons/si";
import { JSX } from "react";

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    technologies: string[]; // Changed from logos to technologies
}

// Tech icon mapping with consistent naming
const techIcons: { [key: string]: JSX.Element } = {
    "React": <FaReact className="text-blue-400" />,
    "react": <FaReact className="text-blue-400" />,
    "Node.js": <FaNodeJs className="text-green-500" />,
    "node.js": <FaNodeJs className="text-green-500" />,
    "nodejs": <FaNodeJs className="text-green-500" />,
    "Node": <FaNodeJs className="text-green-500" />,
    "node": <FaNodeJs className="text-green-500" />,
    "TypeScript": <SiTypescript className="text-blue-600" />,
    "typescript": <SiTypescript className="text-blue-600" />,
    "ts": <SiTypescript className="text-blue-600" />,
    "JavaScript": <FaJs className="text-yellow-400" />,
    "javascript": <FaJs className="text-yellow-400" />,
    "js": <FaJs className="text-yellow-400" />,
    "Python": <FaPython className="text-blue-500" />,
    "python": <FaPython className="text-blue-500" />,
    "py": <FaPython className="text-blue-500" />,
    "Tailwind": <SiTailwindcss className="text-cyan-400" />,
    "tailwind": <SiTailwindcss className="text-cyan-400" />,
    "TailwindCSS": <SiTailwindcss className="text-cyan-400" />,
    "tailwindcss": <SiTailwindcss className="text-cyan-400" />,
    "MongoDB": <SiMongodb className="text-green-600" />,
    "mongodb": <SiMongodb className="text-green-600" />,
    "mongo": <SiMongodb className="text-green-600" />,
    "Vue.js": <FaVuejs className="text-green-500" />,
    "vue.js": <FaVuejs className="text-green-500" />,
    "Vue": <FaVuejs className="text-green-500" />,
    "vue": <FaVuejs className="text-green-500" />,
    "Angular": <FaAngular className="text-red-500" />,
    "angular": <FaAngular className="text-red-500" />,
    "Next.js": <SiNextdotjs className="text-white" />,
    "next.js": <SiNextdotjs className="text-white" />,
    "Next": <SiNextdotjs className="text-white" />,
    "next": <SiNextdotjs className="text-white" />,
    "Firebase": <SiFirebase className="text-yellow-500" />,
    "firebase": <SiFirebase className="text-yellow-500" />,
    "Express": <SiExpress className="text-gray-400" />,
    "express": <SiExpress className="text-gray-400" />,
    "AWS": <FaAws className="text-orange-400" />,
    "aws": <FaAws className="text-orange-400" />,
    "Docker": <FaDocker className="text-blue-500" />,
    "docker": <FaDocker className="text-blue-500" />
};

const ProjectsSection = () => {
    const [projects, setProjects] = useState<Project[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("https://portfolio-ckll.onrender.com/projects/"); // Update with your actual backend URL
                if (!response.ok) {
                    throw new Error("Failed to fetch projects");
                }
                const data = await response.json();
                console.log("Fetched projects:", data); // Debug log
                setProjects(data.slice(0, 3)); // Display only first 3 projects
            } catch (err: any) {
                console.error("Error fetching projects:", err); // Debug log
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchProjects();
    }, []);

    // Fallback data in case the API fails
    useEffect(() => {
        if (error) {
            const fallbackProjects = [
                {
                    id: "1",
                    title: "AI Content Generator",
                    description: "A full-stack application leveraging OpenAI's API to generate various types of content. Features user authentication and content history.",
                    image: "https://via.placeholder.com/600x400",
                    link: "#",
                    technologies: ["React", "Node.js", "TypeScript", "MongoDB"]
                },
                {
                    id: "2",
                    title: "E-commerce Dashboard",
                    description: "Interactive dashboard for store owners to track sales, inventory, and customer behavior with real-time data visualization.",
                    image: "https://via.placeholder.com/600x400",
                    link: "#",
                    technologies: ["Next.js", "Tailwind", "Firebase", "TypeScript"]
                },
                {
                    id: "3",
                    title: "Project Management App",
                    description: "Collaborative tool for teams to manage projects, track tasks, and communicate efficiently in one centralized platform.",
                    image: "https://via.placeholder.com/600x400",
                    link: "#",
                    technologies: ["Vue.js", "Express", "MongoDB", "AWS"]
                }
            ];
            console.log("Using fallback projects:", fallbackProjects); // Debug log
            setProjects(fallbackProjects);
            setLoading(false);
        }
    }, [error]);

    if (loading) return <p className="text-white text-center">Loading projects...</p>;

    console.log("Rendering projects:", projects); // Debug log

    // Helper function to find the correct tech icon
    const getTechIcon = (tech: string) => {
        console.log("Looking for tech icon:", tech);
        
        const normalizedTech = tech.trim().toLowerCase();
        const iconKey = Object.keys(techIcons).find(key => key.toLowerCase() === normalizedTech);
    
        if (iconKey) {
            return techIcons[iconKey];
        }
        console.log("Technology:", tech, "Icon found:", techIcons[tech]);
        return techIcons[normalizedTech] || <span className="text-white font-bold">{tech.charAt(0)}</span>; // Fallback
    };

    return (
        <section className="py-32 relative overflow-hidden" id="projects">
            <div className="absolute inset-0 bg-black">
                <div className="absolute w-full h-full opacity-30">
                    {[...Array(5)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute rounded-full bg-gradient-to-r from-blue-500/20 to-purple-600/20"
                            style={{
                                width: `${Math.random() * 300 + 100}px`,
                                height: `${Math.random() * 300 + 100}px`,
                                top: `${Math.random() * 100}%`,
                                left: `${Math.random() * 100}%`,
                                filter: "blur(80px)",
                                animation: `float ${Math.random() * 10 + 20}s infinite`,
                            }}
                        ></div>
                    ))}
                </div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 text-sm font-medium tracking-wider mb-6 backdrop-blur-sm border border-blue-500/20">
                            MY PORTFOLIO
                        </span>

                        <h2 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            <span className="inline-block bg-gradient-to-r from-blue-400 via-cyan-300 to-purple-500 text-transparent bg-clip-text">
                                Featured Projects
                            </span>
                        </h2>

                        <p className="text-lg text-gray-300/80 max-w-2xl mx-auto leading-relaxed">
                            Explore my most impactful work spanning modern web applications,
                            AI-powered solutions, and interactive experiences.
                        </p>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group"
                            onMouseEnter={() => setActiveIndex(index)}
                            onMouseLeave={() => setActiveIndex(null)}
                        >
                            <div className="relative h-full rounded-2xl overflow-hidden bg-gradient-to-br from-gray-900 to-gray-800 border border-gray-800 group-hover:border-blue-500/50 transition-all duration-300 flex flex-col">
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ease-out"
                                    />
                                    {/* Enhanced tech icons display */}
                                    <div className="absolute top-4 right-4 z-20 flex flex-wrap justify-end gap-2">
                                        {Array.isArray(project.technologies) && project.technologies.length > 0 ? (
                                            project.technologies.map((tech, i) => (
                                                <div 
                                                    key={i} 
                                                    className="w-8 h-8 rounded-full bg-gray-900/80 backdrop-blur-sm flex items-center justify-center border border-gray-700 group-hover:border-blue-500/50 transition-all duration-300"
                                                    title={tech}
                                                >
                                                    {getTechIcon(tech)}
                                                </div>
                                            ))
                                        ) : (
                                            <div className="text-xs text-gray-400">No technologies</div>
                                        )}
                                    </div>
                                </div>

                                <div className="relative p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                                        {project.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                                        <div className="flex space-x-3">
                                            <a
                                                href={project.link}
                                                className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                                            >
                                                View Project
                                            </a>
                                        </div>
                                        {/* Enhanced tech names display */}
                                        <div className="text-xs text-gray-500 truncate max-w-[70%]">
                                            {Array.isArray(project.technologies) && project.technologies.length > 0
                                                ? project.technologies.join(" • ")
                                                : "No technologies listed"}
                                        </div>
                                    </div>
                                </div>

                                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${activeIndex === index ? 'opacity-100' : 'opacity-0'}`}>
                                    <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-30 blur-sm"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProjectsSection;