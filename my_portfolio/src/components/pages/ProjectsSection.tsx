import { useState } from "react";
import { motion } from "framer-motion";
import { Project } from "../../lib/data";
import "../../index.css"

const ProjectsSection = ({ projects }: { projects: Project[] }) => {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    return (
        <section className="py-32 relative overflow-hidden" id="projects">
            {/* Animated background elements */}
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

            {/* Main content */}
            <div className="container mx-auto px-4 relative z-10">
                {/* Header with animated text reveal */}
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

                {/* 3D Project Cards Grid */}
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
                                {/* Card glass effect top highlight */}
                                <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>

                                {/* Project Image with hover effect */}
                                <div className="relative h-64 overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10"></div>
                                    <img
                                        src={project.image}
                                        alt={project.title}
                                        className="w-full h-full object-cover transform group-hover:scale-110 transition-all duration-700 ease-out"
                                    />
                                    {/* Tech badges floating on image */}
                                    <div className="absolute top-4 right-4 z-20 flex flex-wrap justify-end gap-2">
                                        {project.logos.map((Logo, index) => (
                                            <span key={index}>{Logo}</span>
                                        ))}
                                    </div>
                                </div>

                                {/* Content */}
                                <div className="relative p-6 flex flex-col flex-grow">
                                    <h3 className="text-xl font-bold mb-2 text-white group-hover:text-blue-400 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-400 text-sm mb-4 flex-grow">
                                        {project.description}
                                    </p>
                                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-800">
                                        <div className="flex items-center space-x-1">
                                            {/* Featured badge removed as it's not in the Project type */}
                                        </div>
                                        <div className="flex space-x-3">
                                            <a
                                                href={project.link}
                                                className="text-sm text-gray-400 hover:text-blue-400 transition-colors"
                                            >
                                                View Project
                                            </a>
                                        </div>
                                    </div>
                                </div>

                                {/* Animated border glow on hover */}
                                <div className={`absolute inset-0 rounded-2xl transition-opacity duration-300 pointer-events-none ${activeIndex === index ? 'opacity-100' : 'opacity-0'
                                    }`}>
                                    <div className="absolute inset-[-1px] rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-cyan-500 opacity-30 blur-sm"></div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* View all projects button */}
                <div className="mt-16 text-center">
                    <motion.button
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="group relative inline-flex items-center justify-center px-8 py-3 text-lg font-medium text-white overflow-hidden rounded-full backdrop-blur-sm"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-br from-blue-600 to-purple-600 opacity-70"></span>
                        <span className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent transform translate-x-full group-hover:translate-x-0 transition-transform duration-700"></span>
                        <span className="relative flex items-center">
                            View All Projects
                            <svg
                                className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                            </svg>
                        </span>
                    </motion.button>
                </div>
            </div>

            {/* Add global animation keyframes */}
            <div className="float-animation"></div>
        </section>
    );
};

export default ProjectsSection;