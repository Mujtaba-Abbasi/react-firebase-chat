import React, { useState } from "react";
import ChatListItem from "../ChatListItem";
import { useSearch } from "../../hooks/useSearch";

const Search = () => {
  const [username, setUsername] = useState<string>("");
  const { searchedUser, searchUser, handleSelect } = useSearch();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    await searchUser(username);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSearch(e);
    }
  };

  return (
    <div className="search" style={{ position: "relative" }}>
      <form
        className="search-form"
        onSubmit={(e) => {
          handleSearch(e);
        }}
      >
        <input
          type="text"
          name="search"
          value={username}
          placeholder="Search"
          onKeyDown={handleKey}
          onChange={(e) => setUsername(e.target.value)}
        />
      </form>
      {searchedUser && (
        <div
          style={{
            transition: "all 0.3s ease-in-out",
          }}
          onClick={async () => {
            await handleSelect();
            setUsername("");
          }}
        >
          <ChatListItem
            name={searchedUser.displayName}
            imageURL={searchedUser.photoURL}
          />
        </div>
      )}
    </div>
  );
};

export default Search;
