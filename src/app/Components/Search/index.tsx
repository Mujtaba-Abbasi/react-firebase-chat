import React, { useState } from "react";
import ChatListItem from "../ChatListItem";
import { set } from "firebase/database";
import { useSearch } from "../../hooks/useSearch";

const intialValue = "";

const Search = () => {
  const [search, setSearch] = useState(intialValue);
  const { searchUser } = useSearch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log(search);
    const user = await searchUser(search);
    console.log(user);
  };

  // const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
  //   if (e.key === "Enter") {
  //     console.log(search);
  //   }
  // };

  return (
    <div className="search">
      <form
        className="search-form"
        onSubmit={(e) => {
          handleSearch(e);
        }}
      >
        <input
          type="text"
          name="search"
          placeholder="Search"
          // onKeyDown={handleKey}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>
      <ChatListItem />
    </div>
  );
};

export default Search;
