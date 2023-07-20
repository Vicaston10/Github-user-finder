import React, { useState } from "react";
import { ThemeContext } from "./context/ThemeProvider";
import { useContext } from "react";
import './navbar.css'


const Navbar = () => {
  const { darkMode, dispatch } = useContext(ThemeContext);
  const [isDarkMode, setIsDarkMode] = useState(() => false);

  console.log(darkMode);
  const handleToggle = () => {
    dispatch({
      type: "LIGHTMODE",
    });
    setIsDarkMode();
  };
  return (
    <div className="nav">
      <a>Github Finder</a>
      <div onClick={handleToggle} className='toggleBtn'>
      </div>
    </div>
  );
};

export default Navbar;
