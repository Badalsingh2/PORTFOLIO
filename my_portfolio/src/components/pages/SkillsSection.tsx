"use client";

import { useState, useEffect } from "react";
import { Skill } from "../../lib/data";
import { skillsContent } from "../../lib/data";
import { Badge } from "@/components/ui/badge";
import { SparklesCore } from "../ui/sparkles";
import { motion } from "framer-motion";

const SkillsSection = ({ skills }: { skills: Skill[] }) => {
    const contentData = skillsContent(skills);
    const [mounted, setMounted] = useState(false);
    const [activeCategory, setActiveCategory] = useState("");
    const [activeContentIndex, setActiveContentIndex] = useState(0);

    // Group skills by category
    const categories = [...new Set(skills.map(skill => skill.category))];

    useEffect(() => {
        setMounted(true);
        if (categories.length > 0) {
            setActiveCategory(categories[0]);
        }
    }, []);

    if (!mounted) return null;

    return (
        <section className="relative py-32 overflow-hidden" id="skills">
            {/* Background effect */}
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-purple-950/20 to-black opacity-80" />
                <SparklesCore
                    id="skillsSparkles"
                    background="transparent"
                    minSize={0.4}
                    maxSize={1}
                    particleDensity={15}
                    className="w-full h-full"
                    particleColor="#fff"
                />
            </div>

            <div className="container relative z-10 mx-auto max-w-6xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16 space-y-4"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r from-blue-600/30 to-purple-600/30 text-blue-300 text-sm font-medium tracking-wider mb-6 backdrop-blur-sm border border-blue-500/20">
                        EXPERTISE
                    </span>
                    <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-500 text-transparent bg-clip-text">
                        Technical Skills
                    </h2>
                    <p className="text-lg text-gray-300/80 max-w-2xl mx-auto">
                        A collection of technologies and tools I've mastered throughout my career.
                    </p>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    key={activeCategory}
                    className="mb-20"
                >
                    <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">
                                {activeCategory}
                            </h3>
                            <div className="flex gap-2">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={`w-3 h-3 rounded-full transition-all ${activeCategory === category
                                            ? 'bg-purple-500 scale-125'
                                            : 'bg-gray-600 hover:bg-gray-400'}`}
                                        aria-label={`View ${category} skills`}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {skills
                                .filter(skill => skill.category === activeCategory)
                                .map((skill, index) => (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        key={skill.name}
                                        className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/5 hover:border-purple-500/30 hover:from-white/10 hover:to-white/15 transition-all group"
                                    >
                                        <div className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                            {typeof skill.icon === 'string' ? (
                                                <img src={skill.icon || "/placeholder.svg"} alt={skill.name} className="w-10 h-10" />
                                            ) : (
                                                skill.icon
                                            )}
                                        </div>
                                        <span className="text-sm font-medium text-center text-gray-200 group-hover:text-white transition-colors">{skill.name}</span>
                                    </motion.div>
                                ))}
                        </div>
                    </div>
                </motion.div>

                {/* NEW SECTION: Timeline Journey - Replacing the old Skill Journey */}
                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    viewport={{ once: true }}
                    className="mb-24"
                >
                    <div className="text-center mb-12">
                        <h3 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text mb-4">
                            My Technical Journey
                        </h3>
                        <p className="text-gray-300/80 max-w-2xl mx-auto">
                            Explore how my skills have evolved and the key milestones in my career
                        </p>
                    </div>

                    {/* Timeline carousel for content data */}
                    <div className="w-full relative">
                        {/* Timeline indicator */}
                        <div className="absolute top-0 left-0 right-0 h-1 bg-purple-900/30 rounded-full">
                            <motion.div
                                className="h-full bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"
                                style={{
                                    width: `${(activeContentIndex / (contentData.length - 1)) * 100}%`,
                                    transition: 'width 0.5s ease'
                                }}
                            />
                        </div>

                        {/* Timeline navigation */}
                        <div className="flex justify-between mt-4 mb-12">
                            {contentData.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => setActiveContentIndex(index)}
                                    className={`w-4 h-4 rounded-full relative transition-all -mt-2
                    ${index <= activeContentIndex ? 'bg-purple-500' : 'bg-gray-700'}`}
                                >
                                    <span className={`absolute -top-8 left-1/2 transform -translate-x-1/2 text-xs font-medium
                    ${index === activeContentIndex ? 'opacity-100' : 'opacity-0'}`}>
                                        {index + 1}
                                    </span>
                                    {index === activeContentIndex && (
                                        <motion.span
                                            className="absolute inset-0 rounded-full bg-purple-400 animate-ping opacity-75"
                                            initial={{ opacity: 0, scale: 0 }}
                                            animate={{ opacity: 0.75, scale: 1.5 }}
                                            transition={{ duration: 1.5, repeat: Infinity }}
                                        />
                                    )}
                                </button>
                            ))}
                        </div>

                        {/* Content display */}
                        <motion.div
                            key={activeContentIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                            className="bg-black/40 backdrop-blur-sm rounded-2xl p-8 border border-purple-500/20"
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                                <div>
                                    <span className="inline-block px-3 py-1 bg-purple-900/50 text-purple-300 text-sm rounded-full mb-4">
                                        {`Phase ${activeContentIndex + 1}`}
                                    </span>
                                    <h4 className="text-2xl font-bold text-white mb-4">{contentData[activeContentIndex].title}</h4>
                                    <p className="text-gray-300/90 mb-6">{contentData[activeContentIndex].description}</p>
                                </div>

                                <div className="h-64 rounded-xl overflow-hidden relative group">
                                    <div className="absolute inset-0 bg-gradient-to-br from-purple-500/30 to-pink-500/30 group-hover:opacity-70 opacity-50 transition-opacity" />
                                    <img
                                        src={contentData[activeContentIndex].image}
                                        alt={contentData[activeContentIndex].title}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                            </div>
                        </motion.div>

                        {/* Navigation buttons */}
                        <div className="flex justify-between mt-8">
                            <button
                                onClick={() => setActiveContentIndex(Math.max(0, activeContentIndex - 1))}
                                disabled={activeContentIndex === 0}
                                className={`px-5 py-2 rounded-full flex items-center gap-2 transition-all
                  ${activeContentIndex === 0
                                        ? 'opacity-50 cursor-not-allowed bg-gray-800'
                                        : 'bg-purple-900/50 hover:bg-purple-800'}`}
                            >
                                <span>Previous</span>
                            </button>

                            <button
                                onClick={() => setActiveContentIndex(Math.min(contentData.length - 1, activeContentIndex + 1))}
                                disabled={activeContentIndex === contentData.length - 1}
                                className={`px-5 py-2 rounded-full flex items-center gap-2 transition-all
                  ${activeContentIndex === contentData.length - 1
                                        ? 'opacity-50 cursor-not-allowed bg-gray-800'
                                        : 'bg-purple-900/50 hover:bg-purple-800'}`}
                            >
                                <span>Next</span>
                            </button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;