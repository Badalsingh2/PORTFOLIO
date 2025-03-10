"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { BackgroundBeams } from "../ui/background-beams"
import { HoverBorderGradient } from "../ui/hover-border-gradient"
import { TextGenerateEffect } from "../ui/text-generate-effect"
import { toast } from "react-toastify"
import { cn } from "@/lib/utils"
import { Send, CheckCircle, Loader2, Mail } from "lucide-react"
import { motion } from "framer-motion"
import emailjs from "emailjs-com" // Import emailjs

const ContactSection = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [isSubmitted, setIsSubmitted] = useState(false)
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: "",
    })
    const formRef = useRef<HTMLFormElement>(null)

    // Initialize EmailJS once when component mounts
    useEffect(() => {
        // Replace "YOUR_USER_ID" with your actual EmailJS User ID
        emailjs.init("Ui2gAmZ1QFZ2vhGiI")
    }, [])

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const sendMail = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault() // Prevent the default form submission
        console.log("Form Data:", formData)
        const serviceID = "service_o3julvw"
        const templateID = "template_7xltjcc" 
        const userID = "Ui2gAmZ1QFZ2vhGiI" // Replace with your actual EmailJS User ID

        setIsSubmitting(true) // Start submitting

        emailjs.send(serviceID, templateID, formData, userID)
            .then((res) => {
                console.log(res)
                // Custom toast for success
                toast.success(
                    <div className="flex items-center space-x-2">
                        <CheckCircle className="text-green-500" size={20} />
                        <div>
                            <strong className="font-bold">Message sent successfully!</strong>
                            <p className="text-sm">I'll get back to you soon.</p>
                        </div>
                    </div>,
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        className: "bg-gray-900 border border-green-500",
                    }
                )

                setIsSubmitting(false) // Stop submitting
                setIsSubmitted(true)

                setTimeout(() => {
                    setIsSubmitted(false)
                    setFormData({
                        name: "",
                        email: "",
                        message: "",
                    })
                }, 5000)
            })
            .catch((err) => {
                console.log(err)
                setIsSubmitting(false) // Stop submitting
                toast.error(
                    <div className="flex items-center space-x-2">
                        <Mail className="text-red-500" size={20} />
                        <div>
                            <strong className="font-bold">Message failed to send</strong>
                            <p className="text-sm">Please try again later.</p>
                        </div>
                    </div>,
                    {
                        position: "top-right",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        className: "bg-gray-900 border border-red-500",
                    }
                )
            })
    }

    return (
        <section className="relative py-32 px-6 overflow-hidden flex justify-center items-center w-full" id="contact">
            <BackgroundBeams className="opacity-40" />
            <div className="relative z-10 mx-auto max-w-3xl w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
                        Get in Touch
                    </h2>
                    <div className="max-w-xl mx-auto">
                        <TextGenerateEffect
                            words="Have a project in mind? Let's collaborate to create something extraordinary together."
                            className="text-gray-300 text-lg"
                        />
                    </div>
                </motion.div>

                {isSubmitted ? (
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ 
                            duration: 0.5,
                            type: "spring",
                            stiffness: 200
                        }}
                        className="flex flex-col items-center justify-center py-16 text-center"
                    >
                        <motion.div 
                            className="relative p-6 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                            animate={{ 
                                scale: [1, 1.1, 1],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                repeatType: "loop"
                            }}
                        >
                            <CheckCircle size={64} className="text-white" />
                        </motion.div>
                        <h3 className="text-3xl font-bold mt-8 bg-gradient-to-r from-green-400 to-blue-500 text-transparent bg-clip-text">
                            Message Sent!
                        </h3>
                        <p className="text-gray-300 mt-4 text-lg">Thank you for reaching out. I'll get back to you shortly.</p>
                        <motion.div
                            className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 rounded-full mt-6"
                            initial={{ width: 0 }}
                            animate={{ width: "6rem" }}
                            transition={{ duration: 0.8 }}
                        />
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="w-full"
                    >
                        <HoverBorderGradient
                            className="rounded-xl p-[1px] bg-black w-full"
                            containerClassName="rounded-xl w-full"
                            from="from-blue-500"
                            to="to-pink-500"
                            animate={true}
                        >
                            <div className="bg-black/90 backdrop-blur-sm p-8 md:p-10 rounded-xl w-full">
                                <form onSubmit={sendMail} ref={formRef} className="space-y-6">
                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">Your Name</label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="John Doe"
                                            className="bg-gray-900/50 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20 text-white rounded-lg transition-all duration-300"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">Your Email</label>
                                        <Input
                                            name="email"
                                            type="email"
                                            value={formData.email}
                                            onChange={handleInputChange}
                                            placeholder="john@example.com"
                                            className="bg-gray-900/50 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20 text-white rounded-lg transition-all duration-300"
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-gray-300 mb-2 font-medium">Your Message</label>
                                        <Textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            placeholder="Describe your project or ideas..."
                                            className="bg-gray-900/50 border-gray-800 focus:border-blue-500 focus:ring-blue-500/20 text-white rounded-lg transition-all duration-300 h-32 resize-none"
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className={cn(
                                            "w-full rounded-lg py-6 text-white font-medium text-base",
                                            "bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700",
                                            "transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]",
                                            isSubmitting && "opacity-70 cursor-not-allowed",
                                        )}
                                    >
                                        {isSubmitting ? (
                                            <span className="flex items-center justify-center">
                                                <Loader2 size={20} className="mr-2 animate-spin" />
                                                Sending...
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center">
                                                Send Message
                                                <Send size={18} className="ml-2" />
                                            </span>
                                        )}
                                    </Button>
                                </form>
                            </div>
                        </HoverBorderGradient>
                    </motion.div>
                )}
            </div>
        </section>
    )
}

export default ContactSection
