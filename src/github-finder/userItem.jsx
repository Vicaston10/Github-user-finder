import React, { useState, useEffect, useCallback, useContext } from "react";
import User from "./user";
import Search from "./search";
import { ThemeContext } from "./context/ThemeProvider";
import "./userItem.css";

const UserItem = () => {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [loading, SetLoading] = useState(false);
  const [page, setPage] = useState(1);
  const { darkMode } = useContext(ThemeContext);
  const [pageData, setPageDate] = useState({});
  const [nextPage, setNextPage] = useState(1);

  const url = "https://api.github.com/users";

  const updateUsers = async () => {
    // const response = await fetch(url);
    const response = await fetch(`${url}?page=${nextPage}`);
    console.log(response, "this is my response");
    const user = await response.json();
    setUsers(user);
    SetLoading(false);
  };

  const searchUsers = useCallback(async () => {
    SetLoading(true);
    // const urlSearch = `https://api.github.com/search/users?q=${text}`;
    const urlSearch = `https://api.github.com/search/users?q=${text}&page=${nextPage}`;
    const response = await fetch(urlSearch);
    const data = await response.json();
    console.log(data.items);
    SetLoading(false);
    setUsers(data.items);
  }, [text, page]);

  const clearUsers = () => {
    setUsers([]);
    SetLoading(false);
  };

  useEffect(() => {
    updateUsers();
    if (text?.length) {
      searchUsers();
    }
  }, [text]);

  return (
    <React.Fragment>
      <div className="container">
        <Search
          searchUser={searchUsers}
          value={text}
          updateValue={setText}
          clearUsers={clearUsers}
          showUser={users?.length > 0 ? true : false}
        />

        {loading === true ? (
          // <div>
          //   <h1 className="text-center m-2 text-danger">Loading...</h1>
          // </div>
          <div className="loading-container">
            <div className="loading-spinner"></div>
          </div>
        ) : (
          <div className="styleList">
            {users?.length > 1 ? (
              users?.map((user) => <User key={user.id} user={user} />)
            ) : (
              <p>No user available</p>
            )}
          </div>
        )}
      </div>
      {users?.length >= 30 && (
        <section className="btn-container">
          <button onClick={(prev) => setNextPage(prev - 1)}> Previous </button>
          <button onClick={(prev) => setNextPage(prev + 1)}> Next </button>
        </section>
      )}
    </React.Fragment>
  );
};

// const styleList = {
//   display: "flex",
//   justifyContent: "center",
//   alignItems: "center",
//   flexWrap: "wrap",
// };

// const searchBtn = {
//   width: "100px",
//   height: "30px",
//   // background: "#a83535",
//   // color: "white",
//   outline: "none",
//   border: "0",
//   borderRadius: "3px",
//   cursor: "pointer",
//   position: "fixed",
//   right: "0px",
//   bottom: "0px",
// };

export default UserItem;
