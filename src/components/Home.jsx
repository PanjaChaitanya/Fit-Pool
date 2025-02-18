import { useState } from 'react';
import NavSideBar from './NavSideBar';
import LoginModal from './LoginModal'; // Import LoginModal

function Home() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  return (
    <>
      <div className="flex">
        <main className="flex flex-1 max-h-screen overflow-y-auto p-2">
          <section className="HomeSection1 flex flex-wrap mt-10">
            <aside className="textContainer1 flex flex-col gap-5 align-middle justify-center p-10">
              <div className="tagLine montserratFont">
                <h3>
                  Let<span className="text-red-500">&apos;</span>s
                </h3>
                <h2>Dive into the</h2>
                <h1>
                  <span className="first-letter:text-red-500 first-letter:text-7xl inline-block">Fit </span>
                  <span className="first-letter:text-red-500 first-letter:text-6xl inline-block"> Pool</span>
                </h1>
              </div>
              <p className="poppinFont">
                Transform your fitness journey with Fit Pool! Explore a wide range of exercises, expert workout guides.
                Whether you aim to build strength, improve endurance, or stay active, we provide the right tools and
                motivation to keep you on track. Let&apos;s get every muscle in shape!
              </p>
              <div className="flex justify-center">
                <button
                  onClick={openLoginModal} // Open Login Modal when clicked
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
            <aside className="imageContainer1">
              <img src="/images/assets/home1.png" alt="couplePosing" className="w-4xl" />
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
