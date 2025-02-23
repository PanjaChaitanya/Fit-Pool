import { useState } from "react";
import style from '../styles/NavSideBar.module.css';
import Button from '@mui/material/Button';
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
          <Button variant="contained" color="error" className='btnFonts' onClick={goToHome}>
            <img src="/icons/icon-home.svg" alt="Home" />
            <span>Home</span>
          </Button>
          <Button variant="contained" color="error" className='btnFonts' onClick={goToBMICalculator}>
            <img src="/icons/bmicalculator-icon.png" alt="BMI Calculator" />
            <span>BMI Calculator</span>
          </Button>
          <Button variant="contained" color="error" className='btnFonts' onClick={goToExercises}>
            <img src="/icons/bmicalculator-icon.png" alt="Exercises" />
            <span>Exercises</span>
          </Button>
          
        </nav>

        {/* Bottom Menu */}
    
          <nav className={`${style.sidebarMenu} ${style.bottom}`}>
            <Button variant="contained" color="error" className='btnFonts' onClick={goToAbout}>
              <img src="/icons/icon-lock.svg" alt="about" />
              <span>About</span>
            </Button>
          </nav>
        
      </aside>

      
    </div>
  );
};

export default NavSideBar;
