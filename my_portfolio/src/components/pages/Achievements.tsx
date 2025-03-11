import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { SparklesCore } from "../ui/sparkles";
import { Meteors } from "../ui/meteors";
import { BackgroundBeams } from "../ui/background-beams";
import { TextGenerateEffect } from "../ui/text-generate-effect";
import { Award, Star, Trophy, Medal, CheckCircle } from "lucide-react";

interface Achievement {
    id: string;
    title: string;
    description: string;
}

const iconOptions = [<Award />, <Star />, <Trophy />, <Medal />, <CheckCircle />];

const Achievements = () => {
    const [achievements, setAchievements] = useState<Achievement[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAchievements = async () => {
            try {
                const response = await fetch("https://portfolio-ckll.onrender.com/achievements"); // Update with your backend URL
                const data = await response.json();
                setAchievements(data);
            } catch (error) {
                console.error("Error fetching achievements:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchAchievements();
    }, []);

    if (loading) return <p className="text-center text-gray-300">Loading achievements...</p>;

    return (
        <section className="relative py-32 px-6 overflow-hidden" id="achievements">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-black via-green-950/10 to-black opacity-80" />
                <BackgroundBeams className="opacity-20" />
                <Meteors number={20} />
            </div>

            <div className="container relative z-10 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <span className="inline-block px-4 py-2 rounded-full bg-gradient-to-r bg-green-900/30 text-green-400 border border-green-700/50 hover:bg-green-900/40 text-sm font-medium tracking-wider mb-6 backdrop-blur-sm">
                        RECOGNITION
                    </span>
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 via-teal-300 to-emerald-500 text-transparent bg-clip-text">
                        Achievements
                    </h2>
                    <div className="max-w-2xl mx-auto">
                        <TextGenerateEffect
                            words="Recognitions and milestones that mark my professional journey and showcase the impact of my work."
                            className="text-gray-300 text-lg"
                        />
                    </div>
                </motion.div>

                <div className="max-w-4xl mx-auto space-y-8">
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                        >
                            <AchievementCard achievement={achievement} index={index} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AchievementCard = ({ achievement, index }: { achievement: Achievement; index: number }) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    }

    const gradientFrom = index % 2 === 0 ? "from-green-500" : "from-teal-500";
    const gradientTo = index % 2 === 0 ? "to-teal-500" : "to-emerald-500";
    const iconColor = index % 2 === 0 ? "text-green-400" : "text-teal-400";

    return (
        <Card
            onMouseMove={onMouseMove}
            className="group relative overflow-hidden rounded-xl border border-white/10 bg-black/30 backdrop-blur-md p-0.5"
        >
            <motion.div
                className={cn(
                    "pointer-events-none absolute -inset-px rounded-xl opacity-0 transition-opacity duration-300 group-hover:opacity-100",
                    `bg-gradient-to-r ${gradientFrom} ${gradientTo}`
                )}
                style={{
                    background: useMotionTemplate`
                        radial-gradient(
                            650px circle at ${mouseX}px ${mouseY}px,
                            rgba(120, 255, 200, 0.15),
                            transparent 80%
                        )
                    `,
                }}
            />

            <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <SparklesCore
                    id={`achievement-sparkles-${index}`}
                    background="transparent"
                    minSize={0.2}
                    maxSize={0.6}
                    particleDensity={10}
                    className="w-full h-full"
                    particleColor="#fff"
                />
            </div>

            <div className="relative z-10 p-6 flex flex-col md:flex-row items-center gap-6">
                <div className={cn(
                    "text-6xl flex items-center justify-center w-20 h-20 rounded-full bg-black/50 backdrop-blur-sm",
                    iconColor
                )}>
                    {iconOptions[index % iconOptions.length]}
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h3 className={cn(
                        "text-2xl font-bold mb-2 bg-gradient-to-r text-transparent bg-clip-text",
                        gradientFrom, gradientTo
                    )}>
                        {achievement.title}
                    </h3>
                    <p className="text-gray-300 leading-relaxed">{achievement.description}</p>
                </div>
            </div>
        </Card>
    );
};

export default Achievements;
