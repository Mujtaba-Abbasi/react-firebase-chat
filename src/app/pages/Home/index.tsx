import React from "react";
import Sidebar from "../../Components/Sidebar";
import ChatPanel from "../../Components/ChatPanel/ChatPanel";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Sidebar />
        <ChatPanel />
      </div>
    </div>
  );
};

export default Home;
