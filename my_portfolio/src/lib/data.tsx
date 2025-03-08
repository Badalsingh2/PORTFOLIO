import { SiReact, SiTypescript, SiFirebase, SiNextdotjs, SiD3Dotjs, SiTailwindcss, SiNodedotjs, SiExpress, SiPython, SiPostgresql, SiDocker, SiGithub } from "react-icons/si";
import { JSX } from "react";

// Define types for better TypeScript support
export interface Project {
    title: string;
    description: string;
    image: string;
    link: string;
    logos: JSX.Element[]; // Store icons as JSX elements
}

export interface Skill {
    name: string;
    icon: JSX.Element;
    category: "Frontend" | "Backend" | "DevOps";
}

export interface Achievement {
    icon: string;
    title: string;
    description: string;
}

export interface TypewriterWord {
    text: string;
    className: string;
}

export const projects: Project[] = [
    {
        title: "Project One",
        description: "A web app to manage tasks efficiently.",
        image: "/proj1.png",
        link: "#",
        logos: [<SiReact size={24} />, <SiTypescript size={24} />, <SiFirebase size={24} />]
    },
    {
        title: "Project Two",
        description: "An AI chatbot for automation.",
        image: "https://images.unsplash.com/photo-1579353977828-2a4eab540b9a?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2FtcGxlfGVufDB8fDB8fHww",
        link: "#",
        logos: [<SiReact size={24} />, <SiFirebase size={24} />]
    },
    {
        title: "Project Three",
        description: "A finance dashboard for tracking investments.",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYVx6CB56pxO8gwlzLLOkV8fPN0jfF3T_98w&s",
        link: "#",
        logos: [<SiNextdotjs size={24} />, <SiD3Dotjs size={24} />, <SiTailwindcss size={24} />]
    }
];


export const skills: Skill[] = [
    { name: "React", icon: <SiReact size={24} />, category: "Frontend" },
    { name: "TypeScript", icon: <SiTypescript size={24} />, category: "Frontend" },
    { name: "Next.js", icon: <SiNextdotjs size={24} />, category: "Frontend" },
    { name: "Tailwind CSS", icon: <SiTailwindcss size={24} />, category: "Frontend" },
    { name: "Node.js", icon: <SiNodedotjs size={24} />, category: "Backend" },
    { name: "Express", icon: <SiExpress size={24} />, category: "Backend" },
    { name: "Python", icon: <SiPython size={24} />, category: "Backend" },
    { name: "PostgreSQL", icon: <SiPostgresql size={24} />, category: "Backend" },
    { name: "Docker", icon: <SiDocker size={24} />, category: "DevOps" },
    { name: "CI/CD", icon: <SiGithub size={24} />, category: "DevOps" }
];
  

// Achievements data
export const achievements: Achievement[] = [
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
export const typewriterWords: TypewriterWord[] = [
    { text: "Build.", className: "text-blue-500" },
    { text: "Design.", className: "text-purple-500" },
    { text: "Develop.", className: "text-green-500" },
    { text: "Deploy.", className: "text-yellow-500" }
];

// Data for StickyScroll component
export const skillsContent = (skills: Skill[]) => [
    {
        title: "Frontend Development",
        description: "Building responsive and accessible user interfaces with modern frameworks and tools.",
        image: 'https://codedamn.com/assets/images/learnpaths/og/frontend.png',
        content: (
            <div className="h-full w-full bg-gray-900 flex items-center justify-center text-white">
                <div className="flex flex-wrap gap-2">
                    {skills
                        .filter((skill) => skill.category === "Frontend")
                        .map((skill) => (
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
        image: 'https://play-lh.googleusercontent.com/mHEywwrourM3N9Z94du0IqO7tVu0cm78E0NeYdUFUwDAvfPLtFt0jXMGbh8mIcapDio',
        content: (
            <div className="h-full w-full bg-gray-900 flex items-center justify-center text-white">
                <div className="flex flex-wrap gap-2">
                    {skills
                        .filter((skill) => skill.category === "Backend")
                        .map((skill) => (
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
        image: 'https://shalb.com/wp-content/uploads/2019/11/Devops1.jpeg',
        content: (
            <div className="h-full w-full bg-gray-900 flex items-center justify-center text-white">
                <div className="flex flex-wrap gap-2">
                    {skills
                        .filter((skill) => skill.category === "DevOps")
                        .map((skill) => (
                            <span key={skill.name} className="px-3 py-1 bg-green-500/20 text-green-300 rounded-full text-sm">
                                {skill.name}
                            </span>
                        ))}
                </div>
            </div>
        )
    }
];

// Transform projects data for card hover effect
export const getProjectCards = (projects: Project[]) =>
    projects.map((p) => ({
        title: p.title,
        description: p.description,
        link: p.link
    }));
