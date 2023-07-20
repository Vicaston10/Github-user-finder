import { createContext, useReducer } from "react";

export const ThemeContext = createContext();

const reducerFunction = (state, action) => {
  switch (action.type) {
    case "LIGHTMODE":
      return { darkMode: !state.darkMode };
    case "DARKMODE":
      return { darkMode: !state.darkMode };
    default:
      return state;
  }
};
export const ThemeProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunction, { darkMode: false });
  return <ThemeContext.Provider value={{ ...state, dispatch }}>{children}</ThemeContext.Provider>;
};
