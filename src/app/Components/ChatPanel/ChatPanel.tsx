import React from "react";
import { Messages } from "../Messages";
import Input from "../Input";

const ChatPanel = () => {
  return (
    <div className="chat">
      <div className="chat-info">
        <span>Me</span>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default ChatPanel;
