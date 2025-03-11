"use client";

import { useState, useEffect } from "react";
import { SparklesCore } from "../ui/sparkles";
import { motion } from "framer-motion";
import * as Icons from "react-icons/si"; // Import all Si-prefixed icons

interface Skill {
  name: string;
  icon: string;
  category: string;
}

const SkillsSection = () => {
    const [skills, setSkills] = useState<Skill[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string>("");
    
    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const response = await fetch("https://portfolio-ckll.onrender.com/skills/"); // Update with your API URL
                if (!response.ok) throw new Error("Failed to fetch skills");
                
                const data: Skill[] = await response.json();
                setSkills(data);
                
                if (data.length > 0) setActiveCategory(data[0].category);
            } catch (err) {
                setError("Error loading skills data");
            } finally {
                setLoading(false);
            }
        };

        fetchSkills();
    }, []);

    const categories = [...new Set(skills.map(skill => skill.category))];

    if (loading) return <p className="text-center text-gray-300">Loading skills...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <section className="relative py-32 overflow-hidden" id="skills">
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
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 space-y-4"
                >
                    <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-fuchsia-300 to-pink-500 text-transparent bg-clip-text">
                        Technical Skills
                    </h2>
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
                                .map((skill, index) => {
                                    const IconComponent = (Icons as any)[skill.icon]; // Dynamically get the icon
                                    return (
                                        <motion.div
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.3, delay: index * 0.05 }}
                                            key={skill.name}
                                            className="flex flex-col items-center justify-center p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/5 hover:border-purple-500/30 hover:from-white/10 hover:to-white/15 transition-all group"
                                        >
                                            <div className="w-12 h-12 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                                                {IconComponent ? <IconComponent size={40} className="text-white" /> : <span>❓</span>}
                                            </div>
                                            <span className="text-sm font-medium text-center text-gray-200 group-hover:text-white transition-colors">{skill.name}</span>
                                        </motion.div>
                                    );
                                })}
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default SkillsSection;