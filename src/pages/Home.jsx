import { useState, useRef } from 'react';
import { motion, useInView } from "framer-motion";
import NavSideBar from '../components/NavSideBar';
import LoginModal from '../components/LoginModal';
import "../App.css"


const Home = () => {

  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // Refs for scroll detection
  const section1Ref = useRef(null);
  const section2Ref = useRef(null);

  // Check if sections are in view
  const isSection1InView = useInView(section1Ref, { once: true, margin: "-100px 0px" });
  const isSection2InView = useInView(section2Ref, { once: true, margin: "-100px 0px" });

  return (
    <>
      <div className="flex">
        <main className="flex flex-1 flex-col max-h-screen overflow-y-auto p-2 no-scrollbar">
          
          {/* First Section */}
          <section ref={section1Ref} className="HomeSection1 flex flex-wrap mt-10">
            <aside className="textContainer1 flex-1 min-w-[340px] p-10 flex flex-col gap-5 align-middle justify-center">
              <div className="tagLine montserratFont">
                <motion.h3 initial={{ opacity: 0 }} animate={isSection1InView ? { opacity: 1 } : {}} transition={{ duration: 1.5, ease: "easeInOut" }}>
                  Let<span className="text-red-500">&apos;</span>s
                </motion.h3>
                <motion.h2 initial={{ opacity: 0 }} animate={isSection1InView ? { opacity: 1 } : {}} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}>
                  Dive into the
                </motion.h2>
                <h1 id='fitPool'>
                <motion.span
                  initial={{ opacity: 0, x: 500 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 2.5 }}
                  className="first-letter:text-red-500 first-letter:text-7xl inline-block"
                >
                  Fit {" "}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -500 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 2.5 }}
                  className="first-letter:text-red-500 first-letter:text-6xl inline-block"
                >
                  {" "} Pool
                </motion.span>
              </h1>
              </div>
              <p className="poppinFont">
                Transform your fitness journey with Fit Pool! Explore a wide range of exercises and expert workout guides. Whether you aim
                to build strength, improve endurance, or stay active, we provide the right tools and motivation to keep you on track.
                Let&apos;s get every muscle in shape!
              </p>
              <div className="flex justify-center">
                <motion.button onClick={openLoginModal} className="px-6 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-lg animate-pulse flex items-center gap-2 hover:scale-105 active:scale-95 transition-transform group btnFonts" initial={{ opacity: 0, y: 50 }} animate={isSection1InView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 1, ease: "easeIn", delay: 1.5 }}>
                  Get Started
                  <span className="transition-transform group-hover:-translate-y-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                    </svg>
                  </span>
                </motion.button>
              </div>
            </aside>
            <aside className="imageContainer1 flex-[0.8] min-w-[260px] flex justify-center align-middle items-center relative">
              <motion.div className="absolute w-[350px] h-[250px] bg-red-500 rounded-[50%] rotate-[20deg]" initial={{ opacity: 0, x: 500 }} animate={isSection1InView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}></motion.div>
              <motion.img src="/images/assets/home1.png" alt="couplePosing" className="max-w-[300px] h-auto relative" initial={{ opacity: 0 }} animate={isSection1InView ? { opacity: 1 } : {}} transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }} />
            </aside>
          </section>

          {/* Second Section - BMI & Stopwatch */}
          <section ref={section2Ref} className="HomeSection2 flex flex-wrap mt-20">
            <aside className="imageContainer2 flex-[0.8] min-w-[260px] flex justify-center align-middle items-center relative">
              <motion.div className="absolute w-[350px] h-[250px] bg-blue-500 rounded-[50%] rotate-[-20deg]" initial={{ opacity: 0, x: -500 }} animate={isSection2InView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 1, ease: "easeInOut", delay: 1.5 }}></motion.div>
              <motion.img src="/images/assets/home2.png" alt="bmiStopwatch" className="max-w-[300px] h-auto relative" initial={{ opacity: 0 }} animate={isSection2InView ? { opacity: 1 } : {}} transition={{ duration: 1.5, ease: "easeInOut", delay: 1 }} />
            </aside>
            <aside className="textContainer2 flex-1 min-w-[340px] p-10 flex flex-col gap-5 align-middle justify-center">
              <motion.h3 initial={{ opacity: 0 }} animate={isSection2InView ? { opacity: 1 } : {}} transition={{ duration: 1.5, ease: "easeInOut" }}>
                Stay on Track
              </motion.h3>
              <motion.h2 initial={{ opacity: 0 }} animate={isSection2InView ? { opacity: 1 } : {}} transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}>
                with Smart Tools
              </motion.h2>
              <p className="poppinFont">
                Monitor your progress with our built-in BMI Calculator and Stopwatch! Keep track of your fitness journey, analyze your improvements, and stay motivated. Fit Pool makes it easy to stay on top of your goals!
              </p>
            </aside>
          </section>
        </main>
        <div>
          <NavSideBar />
        </div>
      </div>
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}

export default Home;
