import React, { useContext, useState } from "react";
import { ThemeContext } from "./context/ThemeProvider";
import "./theme.css";
import "./user.css";
const User = (props) => {
  const { darkMode } = useContext(ThemeContext);
  const { login, html_url, score, avatar_url } = props.user;
  const [isHover, setIsHover] = useState(false);

  const handleMouseEnter = () => {
    setIsHover(true);
  };

  const handleMouseLeave = () => {
    setIsHover(false);
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`card ${darkMode ? "card-dark" : "card-light"}`}
    >
      <img src={avatar_url} alt={login} className="imgStyle" />
      <h4>{login}</h4>
      <div>
        {isHover && (
          <div className="profile-details">
            <p>Score: {score ? score : "-"}</p>
            <a href={html_url}>{html_url}</a>
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
