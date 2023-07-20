import Navbar from "./github-finder/navbar";
import UserItem from "./github-finder/userItem";
import "./github-finder/theme.css";
import { ThemeContext } from "./github-finder/context/ThemeProvider";
import { useContext } from "react";
const App = () => {
  const { darkMode } = useContext(ThemeContext);
  return (
    <div className={darkMode ? "body-dark" : "body-light"}>
      <div>
        <Navbar />
        <UserItem />
      </div>
    </div>
  );
};

export default App;
