import React, { useState, useContext } from "react";
import { ThemeContext } from "./context/ThemeProvider";
import { debounce } from "lodash";
import "./theme.css";
import "./search.css";

const Search = (props) => {
  const { darkMode } = useContext(ThemeContext);

  const onSubmit = debounce((e) => {
    e.preventDefault();
    props.searchUser(props.value);
    props.updateValue("");
  }, 500);

  return (
    <React.Fragment>
      <form onSubmit={onSubmit} className="form">
        <input
          type="text"
          name="text"
          placeholder="Search User"
          value={props.value}
          onChange={(event) => props.updateValue(event.target.value)}
          className="inputStyle"
        />
        <input
          type="submit"
          value="Search"
          style={searchBtn}
          className={darkMode ? "searchBtn-dark" : "searchBtn-light"}
        />
        {props.showUser && (
          <button
            onClick={props.clearUsers}
            className={`clearBtn ${darkMode ? "Btn-dark" : "Btn-light"}`}
          >
            Clear
          </button>
        )}
      </form>
    </React.Fragment>
  );
};

const searchBtn = {
  width: "100px",
  height: "30px",
  // background: "#a83535",
  // color: "white",
  outline: "none",
  border: "0",
  borderRadius: "3px",
  cursor: "pointer",
};

export default Search;
