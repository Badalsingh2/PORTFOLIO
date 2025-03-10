import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import { InfiniteMovingCards } from "../ui/infinite-moving-cards";
import * as SiIcons from "react-icons/si"; // Import all Simple Icons

interface Project {
    id: string;
    title: string;
    description: string;
    image: string;
    link: string;
    languages?: string[];
}

// Mapping language names to react-icons/si component names
const languageIcons: { [key: string]: keyof typeof SiIcons } = {
    "Django": "SiDjango",
    "FastAPI": "SiFastapi",
    "NodeJS": "SiNodedotjs", // Corrected from SiNodeDotJs
    "Stripe": "SiStripe",
    "GenAI": "SiOpenai", // Changed to OpenAI icon
    "Chrome Extension": "SiGooglechrome",
    "Map Tracking": "SiOpenstreetmap",
    "SQLite": "SiSqlite",
    "React": "SiReact",
    "Android Studio": "SiAndroidstudio",
    "Python": "SiPython",
    "Kotlin": "SiKotlin",
    "Firebase": "SiFirebase",
    "Spring Boot": "SiSpringboot",
    "Thymeleaf": "SiThymeleaf",
    "OAuth": "SiAuth0",
    "JWT": "SiJsonwebtokens",
    "MySQL": "SiMysql",
};

const ProjectShowcase = () => {
    const [projects, setProjects] = useState<Project[]>([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/projects");
                const data = await response.json();
                setProjects(data);
            } catch (error) {
                console.error("Error fetching projects:", error);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section className="py-24 px-6 overflow-hidden">
            <div className="container mx-auto">
                <div className="text-center mb-16">
                    <span className="inline-block px-4 py-2 rounded-full bg-yellow-900/30 text-yellow-400 text-sm font-medium mb-4">
                        SHOWCASE
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 text-transparent bg-clip-text">
                        Project Showcase
                    </h2>
                    <p className="text-lg text-gray-300 max-w-2xl mx-auto">
                        See my projects in action.
                    </p>
                </div>

                <div className="flex justify-center overflow-hidden">
                    <InfiniteMovingCards
                        items={projects}
                        direction="left"
                        speed="fast"
                        pauseOnHover={true}
                        className="py-8"
                    >
                        {(project) => (
                            <div className="w-72 h-full flex-shrink-0 mx-3">
                                <div className="bg-black border border-gray-800 rounded-xl overflow-hidden h-full flex flex-col group hover:border-gray-500 hover:shadow-lg transition duration-300">
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors">
                                            {project.title}
                                        </h3>
                                        <p className="text-gray-300 mb-4 line-clamp-3">
                                            {project.description}
                                        </p>

                                        {/* Display Language Icons */}
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            {(project.languages || []).map((lang, index) => {
                                                const iconName = languageIcons[lang]; // Mapped icon name
                                                const IconComponent = iconName ? SiIcons[iconName] : null; // Fetch component

                                                console.log("Language:", lang, "Icon Name:", iconName, "Exists:", !!IconComponent);

                                                return IconComponent ? (
                                                    <IconComponent key={index} className="h-8 w-8 text-yellow-400" title={lang} />
                                                ) : (
                                                    <span key={index} className="text-red-500">🚨 {lang} Icon Not Found</span>
                                                );
                                            })}
                                        </div>


                                        <a
                                            href={project.link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="mt-auto bg-blue-600 hover:bg-yellow-700/90 text-white py-2 px-4 rounded-lg inline-flex items-center justify-center transition-all duration-300 group-hover:bg-yellow-500 group-hover:text-black"
                                        >
                                            <span className="mr-2">View Project</span>
                                            <ExternalLink size={16} />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        )}
                    </InfiniteMovingCards>
                </div>
            </div>
        </section>
    );
};

export default ProjectShowcase;
