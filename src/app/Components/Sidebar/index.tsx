import React from "react";
import SidebarHeader from "../SidebarHeader/SidebarHeader";
import Search from "../Search";
import SidebarChats from "../SidebarChats";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <SidebarHeader />
      <Search />
      <SidebarChats />
    </div>
  );
};

export default Sidebar;
