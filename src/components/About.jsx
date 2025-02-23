import { motion } from "framer-motion";
import NavSideBar from "./NavSideBar";

const About = () => {
  return (
    <div className="flex">
        <div className="flex flex-1 flex-col lg:flex-row h-auto min-h-screen bg-gray-100 p-6">
        {/* Left Section with Image */}
        <motion.div
            className="lg:w-1/3 flex justify-center items-center p-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
        >
            <img
            src="/images/assets/chaitanya.png"
            alt="Chaitanya Panja"
            className="w-40 h-40 md:w-60 md:h-60 object-cover rounded-full shadow-xl ring-4 ring-red-500"
            />
        </motion.div>

        {/* Right Section with Details */}
        <div className="flex-1 flex flex-col justify-center text-left p-6 md:p-10">
            {/* Animated Heading */}
            <motion.h1
            className="text-3xl md:text-5xl font-extrabold text-gray-900 mb-6 tracking-wide"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            >
            About <span className="text-red-500">Fit Pool</span>
            </motion.h1>

            {/* Developer Name */}
            <motion.p
            className="text-base md:text-lg text-gray-700 max-w-2xl"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            >
            Crafted with passion by <span className="font-semibold text-gray-900">
                <span className="text-red-500">C</span>haitanya <span className="text-red-500">P</span>anja
            </span>, Fit Pool is a <span className="text-blue-500 font-semibold">React + Vite</span> fitness platform designed to enhance your workout experience.
            </motion.p>

            
            <motion.div
            className="mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            >
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-800 text-md">
                {["Exercise Search", "BMI Calculator", "Workout Timers", "ExerciseDB API", "Firebase Authentication", "Material UI & Tailwind"].map((feature, index) => (
                <motion.li
                    key={index}
                    className="p-3 bg-white shadow-lg rounded-lg flex items-center gap-2 hover:scale-105 transition-all duration-300"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.2 }}
                >
                    <img src="/icons/right-arrow.png" width="20px" alt="" /> {feature}
                </motion.li>
                ))}
            </ul>
            </motion.div>

            {/* Additional Info */}
            <motion.div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6"
            initial={{ opacity: 0, y:300}}
            animate={{ opacity: 1, y:0}}
            transition={{ duration: 0.5, ease:"easeInOut", delay: 1}}  
            >
            <div className="bg-white p-3 rounded-lg hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900">Typography</h3>
                <p className="text-gray-700">Fonts are sourced from Google Fonts.</p>
                <ul className="mt-2 text-gray-800">
                <li className="montserratFont">Montserrat - Headings</li>
                <li className="poppinFont">Poppins - Body text</li>
                <li className="btnFonts">Rajadhani - Buttons</li>
                </ul>
            </div>
            <div className="bg-white p-3 rounded-lg hover:scale-105 transition-all duration-300">
                <h3 className="text-xl font-semibold text-gray-900">Future Improvements</h3>
                <ul className="mt-2 text-gray-800">
                    <li>👤 User Profile</li>
                    <li>🌙 Dark Mode Theme</li>
                    <li>🏋️‍♂️ Home Workouts</li>
                </ul>
            </div>
            </motion.div>
        </div>

        {/* Sidebar */}
        </div>
      <div>
        <NavSideBar />
      </div>
    </div>
  );
};

export default About;
