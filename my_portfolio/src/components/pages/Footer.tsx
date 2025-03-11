import { Github, Linkedin, Mail, Instagram } from "lucide-react";

const Footer = () => {
    return (
        <footer className="py-12 bg-black border-t border-gray-800/50">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-500 text-transparent bg-clip-text">Dev Portfolio</h3>
                        <p className="text-gray-400">Crafting exceptional digital experiences with a focus on performance and accessibility.</p>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Navigation</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="#" className="hover:text-blue-400 transition-colors">Home</a></li>
                            <li><a href="#projects" className="hover:text-blue-400 transition-colors">Projects</a></li>
                            <li><a href="#skills" className="hover:text-blue-400 transition-colors">Skills</a></li>
                            <li><a href="#achievements" className="hover:text-blue-400 transition-colors">Achievements</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Connect</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li><a href="https://github.com/Badalsingh2" className="hover:text-blue-400 transition-colors flex items-center"><Github size={16} className="mr-2" /> GitHub</a></li>
                            <li><a href="https://www.instagram.com/ll_badal_singh_ll/" className="hover:text-blue-400 transition-colors flex items-center"><Instagram size={16} className="mr-2" /> Instagram</a></li>
                            <li><a href="https://www.linkedin.com/in/badal-singh-454b18255/" className="hover:text-blue-400 transition-colors flex items-center"><Linkedin size={16} className="mr-2" /> LinkedIn</a></li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-lg font-semibold mb-4 text-white">Contact</h4>
                        <ul className="space-y-2 text-gray-400">
                            <li className="flex items-center"><Mail size={16} className="mr-2" /> bs.421521@gmail.com</li>
                            <li>Kudus,Palghar</li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 mt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 mb-4 md:mb-0">© 2025 Dev Portfolio. All rights reserved.</p>
                    <div className="flex space-x-6">
                        <a href="https://github.com/Badalsingh2" className="text-gray-400 hover:text-white transition-colors">
                            <Github size={20} />
                        </a>
                        <a href="https://www.instagram.com/ll_badal_singh_ll/" className="text-gray-400 hover:text-white transition-colors">
                            <Instagram size={20} />
                        </a>
                        <a href="https://www.linkedin.com/in/badal-singh-454b18255/" className="text-gray-400 hover:text-white transition-colors">
                            <Linkedin size={20} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;