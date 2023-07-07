import React from "react";

const ChatListItem = () => {
  return (
    <div className="user-chat">
      <img
        src="https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8="
        alt=""
      />
      <div className="user-chat-info">
        <span>Person Name</span>
        <p>Last Message</p>
      </div>
    </div>
  );
};

export default ChatListItem;
