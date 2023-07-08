import React from "react";
import SidebarHeader from "../SidebarHeader/SidebarHeader";
import Search from "../Search";
import Chats from "../Chats";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SidebarHeader />
      <Search />
      <Chats />
    </div>
  );
};

export default Sidebar;
