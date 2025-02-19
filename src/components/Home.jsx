import { useState } from 'react';
import NavSideBar from './NavSideBar';
import LoginModal from './LoginModal'; // Import LoginModal
import { motion } from "framer-motion";



function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <div className="flex">
        <main className="flex flex-1  overflow-y-auto p-2">
        <section className="HomeSection1 flex flex-wrap mt-10">
          {/* Text Container */}
          <aside className="textContainer1 flex-1 min-w-[340px] p-10 flex flex-col gap-5 align-middle justify-center">
            <div className="tagLine montserratFont">
              <motion.h3
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 0.5 }}
              >
                Let<span className="text-red-500">&apos;</span>s
              </motion.h3>
              <motion.h2
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5, ease: "easeInOut", delay: 1.5 }}
              >
                Dive into the
              </motion.h2>
              <h1>
                <motion.span
                  initial={{ opacity: 0, x: 500 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 2.5 }}
                  className="first-letter:text-red-500 first-letter:text-7xl inline-block"
                >
                  Fit{" "}
                </motion.span>
                <motion.span
                  initial={{ opacity: 0, x: -500 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 2.5 }}
                  className="first-letter:text-red-500 first-letter:text-6xl inline-block"
                >
                  Pool
                </motion.span>
              </h1>
            </div>
            <p className="poppinFont">
              Transform your fitness journey with Fit Pool! Explore a wide range of exercises, expert workout guides. Whether you aim
              to build strength, improve endurance, or stay active, we provide the right tools and motivation to keep you on track.
              Let&apos;s get every muscle in shape!
            </p>
            <div className="flex justify-center">
              <button
                onClick={openLoginModal}
                className="px-6 py-2 text-white bg-gradient-to-r from-red-500 to-red-700 rounded-full shadow-lg animate-pulse flex items-center gap-2 hover:scale-105 active:scale-95 cursor-pointer transition transform group btnFonts"
              >
                Get Started
                <span className="transition-transform group-hover:-translate-y-2">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                  </svg>
                </span>
              </button>
            </div>
          </aside>

          {/* Image Container (Slightly Smaller) */}
          <aside 
            className="imageContainer1 flex-[0.8] min-w-[260px] flex justify-center align-middle items-center relative"
           
          >
            {/* Potato-Shaped Background */}
            <motion.div className="absolute w-[350px] h-[250px] bg-red-500 rounded-[50%] rotate-[20deg]"
            initial={{ opacity: 0, x: 500 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeInOut", delay: 4.5
            }}
            ></motion.div>

            {/* Image */}
            <motion.img src="/images/assets/home1.png" alt="couplePosing" 
            className="max-w-[300px] h-auto relative" 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.5, ease: "easeInOut", delay: 3.5 }}
            />
          </aside>

        </section>
        </main>
        <div>
          <NavSideBar />
        </div>
      </div>

      {/* Login Modal */}
      <LoginModal isOpen={isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}

export default Home;
