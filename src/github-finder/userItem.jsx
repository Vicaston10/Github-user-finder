import React, { useState, useEffect, useCallback } from "react";
import User from "./user";
import Search from "./search";
import "./userItem.css";

const UserItem = () => {
  const [users, setUsers] = useState([]);
  const [text, setText] = useState("");
  const [loading, SetLoading] = useState(false);
  const [nextPage, setNextPage] = useState(1);

  const url = "https://api.github.com/users";
  const searchUsers = async () => {
    if (text?.length) {
     await filterUsers();
    } else {
     await getUsers();
    }
  };

  const getUsers = async () => {
    const response = await fetch(`https://api.github.com/users?page=${nextPage}`);
    console.log(response, "this is my response");
    const user = await response.json();
    setUsers(user);
    SetLoading(false);
  };

  const filterUsers = useCallback(async () => {
    SetLoading(true);
    const urlSearch = `https://api.github.com/search/users?q=${text}&page=${nextPage}`;
    const response = await fetch(urlSearch);
    const data = await response.json();
    SetLoading(false);
    setUsers(data.items);
  }, [text, nextPage]);

  const changeSearchPage = async (pageNo) => {
    pageNo = pageNo < 1 ? 1 : pageNo;
    setNextPage(pageNo);
    await searchUsers();
  };

  const clearUsers = async () => {
    setUsers([]);
    setNextPage(1);
    setText("");
    await searchUsers();
  };

  useEffect(() => {
    searchUsers();
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
            users?.length >= 1 ? <div className="styleList">
                {users?.map((user) => <User key={user?.id} user={user} />)}
            </div> : <div className="userListContainer">
                <p>No user available</p>
            </div>
        )}
      </div>
      {users?.length >= 30 && (
        <section className="btn-container">
          <button onClick={() => changeSearchPage(nextPage - 1)}>
            {" "}
            Previous{" "}
          </button>
          <button onClick={() => changeSearchPage(nextPage + 1)}> Next </button>
        </section>
      )}
    </React.Fragment>
  );
};

export default UserItem;
