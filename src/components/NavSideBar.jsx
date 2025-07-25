import { useState } from "react";
import style from '../styles/NavSideBar.module.css';
import { useNavigate } from "react-router-dom";


const NavSideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const goToHome = () => navigate('/');
  const goToBMICalculator = () => navigate('/bmicalculator');

  const goToExercises = () => {
      navigate('/searchexercises');
  };
  const goToAbout = () => {
    navigate('/about');
  };
  const goToContact = () => {
    navigate('/contact');
    };
  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };



  return (
    <div className={style.navSidebar}>
      {/* Home Icon - Stays on Left Always */}
      <div className={style.icon} onClick={goToHome}>
        <img className={style.iconImage} src="/images/fitpool.png" alt="Fit Pool Logo" />
      </div>

      {/* Menu Icon for Small Screens */}
      <img 
        src="/icons/menu-dumble.png" 
        alt="Menu" 
        className={style.menuIcon} 
        onClick={toggleSidebar} 
      />

      <aside className={`${style.sidebar} ${isOpen ? style.open : ""}`}>
        <img className={style.sidebarAvatar} src="/images/fitpool.png" alt="Fit Pool Logo" />
        <div className={style.sidebarBrand}>F<span className="text-red-500">I</span>T P<span className="text-red-500">OO</span>L</div>
        
        {/* Menu */}
        <nav className={style.sidebarMenu}>
          <div className='btnFonts' onClick={goToHome}>
            <img src="/icons/icon-home.svg" alt="Home" />
            <span>Home</span>
          </div>
          <div className='btnFonts' onClick={goToBMICalculator}>
            <img src="/icons/bmical.png" alt="BMI Calculator" />
            <span>BMI Calculator</span>
          </div>
          <div className='btnFonts' onClick={goToExercises}>
            <img src="/icons/gym.png" alt="Exercises" />
            <span>Exercises</span>
          </div>
        </nav>

        {/* Bottom Menu */}
    
          <nav className={`${style.sidebarMenu} ${style.bottom}`}>
            <div color="error" className='btnFonts' onClick={goToAbout}>
              <img src="/icons/icon-lock.svg" alt="about" />
              <span> About </span>
            </div>
            <div className='btnFonts' onClick={goToContact}>
              <img src="/icons/icon-lock.svg" alt="about" />
              <span> Contact </span>
            </div>
          </nav>
        
      </aside>
    </div>
  );
};

export default NavSideBar;
