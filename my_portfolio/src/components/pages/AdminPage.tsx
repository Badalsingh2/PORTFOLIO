import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
    const [projects, setProjects] = useState([]);
    const [skills, setSkills] = useState([]);
    const [achievements, setAchievements] = useState([]);
    const [newProject, setNewProject] = useState({ title: "", description: "", image: "", link: "", logos: [] });
    const [newSkill, setNewSkill] = useState({ name: "", icon: "", category: "" });
    const [newAchievement, setNewAchievement] = useState({ title: "", description: "", icon: "" });
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) navigate("/login");

        const fetchData = async () => {
            try {
                const projectRes = await fetch("https://portfolio-ckll.onrender.com/projects/");
                const skillRes = await fetch("https://portfolio-ckll.onrender.com/skills/");
                const achievementRes = await fetch("https://portfolio-ckll.onrender.com/achievements/");

                const projectsData = await projectRes.json();
                const skillsData = await skillRes.json();
                const achievementsData = await achievementRes.json();

                setProjects(projectsData);
                setSkills(skillsData);
                setAchievements(achievementsData);
            } catch {
                navigate("/login");
            }
        };

        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    const token = localStorage.getItem("token");

    // ✅ Function to Add Project
    const addProject = async () => {
        const response = await fetch("https://portfolio-ckll.onrender.com/projects/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                ...newProject,
                logos: newProject.logos.split(",").map((logo) => logo.trim()), // Convert logos to an array
            }),
        });

        if (response.ok) {
            const addedProject = await response.json();
            setProjects([...projects, addedProject]);
            setNewProject({ title: "", description: "", image: "", link: "", logos: [] });
        } else {
            alert("Failed to add project");
        }
    };

    // ✅ Function to Add Skill
    const addSkill = async () => {
        const response = await fetch("https://portfolio-ckll.onrender.com/skills/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newSkill),
        });

        if (response.ok) {
            const addedSkill = await response.json();
            setSkills([...skills, addedSkill]);
            setNewSkill({ name: "", icon: "", category: "" });
        } else {
            alert("Failed to add skill");
        }
    };

    // ✅ Function to Add Achievement
    const addAchievement = async () => {
        const response = await fetch("https://portfolio-ckll.onrender.com/achievements/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(newAchievement),
        });

        if (response.ok) {
            const addedAchievement = await response.json();
            setAchievements([...achievements, addedAchievement]);
            setNewAchievement({ title: "", description: "", icon: "" });
        } else {
            alert("Failed to add achievement");
        }
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-900 text-white pt-16">
            <div className="p-6 w-full max-w-4xl">
                <h1 className="text-3xl font-bold">Admin Dashboard</h1>
                <button onClick={handleLogout} className="px-4 py-2 bg-red-500 mt-4 rounded">Logout</button>

                {/* Projects Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold">Projects</h2>
                    {/* <ul className="mb-4">
                        {projects.map((project: any, index) => (
                            <li key={index} className="mt-2">
                                <h3 className="text-lg font-semibold">{project.title}</h3>
                                <img src={project.image} alt={project.title} className="w-full h-auto mt-2 rounded" />
                                <p className="text-sm mt-2">{project.description}</p>
                            </li>
                        ))}
                    </ul> */}
                    <h2 className="text-xl font-bold pt-10 pb-5"> Add Projects</h2>
                    <input
                        type="text"
                        placeholder="Project Title"
                        value={newProject.title}
                        onChange={(e) => setNewProject({ ...newProject, title: e.target.value })}
                        className="w-full p-2 bg-gray-800 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newProject.description}
                        onChange={(e) => setNewProject({ ...newProject, description: e.target.value })}
                        className="w-full p-2 bg-gray-800 rounded mt-2"
                    />
                    <input
                        type="text"
                        placeholder="Image URL"
                        value={newProject.image}
                        onChange={(e) => setNewProject({ ...newProject, image: e.target.value })}
                        className="w-full p-2 bg-gray-800 rounded mt-2"
                    />
                    <input
                        type="text"
                        placeholder="GitHub Link"
                        value={newProject.link}
                        onChange={(e) => setNewProject({ ...newProject, link: e.target.value })}
                        className="w-full p-2 bg-gray-800 rounded mt-2"
                    />
                    <input
                        type="text"
                        placeholder="Logos (comma-separated)"
                        value={newProject.logos}
                        onChange={(e) => setNewProject({ ...newProject, logos: e.target.value })}
                        className="w-full p-2 bg-gray-800 rounded mt-2"
                    />
                    <button onClick={addProject} className="px-4 py-2 bg-blue-500 mt-2 rounded">Add Project</button>
                </div>

                {/* Skills Section */}
                <div className="mt-3">
                    <h2 className="text-xl font-bold pt-5 pb-5">Skills</h2>
                    {/* <ul className="mb-4">
                        {skills.map((skill: any, index) => (
                            <li key={index} className="mt-2">{skill.name}</li>
                        ))}
                    </ul> */}
                    <input
                        type="text"
                        placeholder="Skill Name"
                        value={newSkill.name}
                        onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                        className="w-full p-2 bg-gray-800 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Icon (e.g., SiReact)"
                        value={newSkill.icon}
                        onChange={(e) => setNewSkill({ ...newSkill, icon: e.target.value })}
                        className="w-full p-2 bg-gray-800 rounded mt-2"
                    />
                    <input
                        type="text"
                        placeholder="Category"
                        value={newSkill.category}
                        onChange={(e) => setNewSkill({ ...newSkill, category: e.target.value })}
                        className="w-full p-2 bg-gray-800 rounded mt-2"
                    />
                    <button onClick={addSkill} className="px-4 py-2 bg-blue-500 mt-2 rounded">Add Skill</button>
                </div>

                {/* Achievements Section */}
                <div className="mt-6">
                    <h2 className="text-xl font-bold pt-5 pb-5">Achievements</h2>
                    {/* <ul className="mb-4">
                        {achievements.map((achievement: any, index) => (
                            <li key={index} className="mt-2">{achievement.title}</li>
                        ))}
                    </ul> */}
                    <input
                        type="text"
                        placeholder="Achievement Title"
                        value={newAchievement.title}
                        onChange={(e) => setNewAchievement({ ...newAchievement, title: e.target.value })}
                        className="w-full p-2 bg-gray-800 rounded"
                    />
                    <input
                        type="text"
                        placeholder="Description"
                        value={newAchievement.description}
                        onChange={(e) => setNewAchievement({ ...newAchievement, description: e.target.value })}
                        className="w-full p-2 bg-gray-800 rounded mt-2"
                    />
                    <button onClick={addAchievement} className="px-4 py-2 bg-blue-500 mt-2 rounded">Add Achievement</button>
                </div>
            </div>
        </div>
    );
};

export default AdminPage;
