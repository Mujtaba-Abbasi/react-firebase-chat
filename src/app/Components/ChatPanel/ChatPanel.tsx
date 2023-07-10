import Input from "../Input";
import Chats from "../Messages";
import { useContext } from "react";
import { ChatContext } from "../../context/ChatContext";

const ChatPanel = () => {
  const {
    state: { chatId, user },
    dispatch,
  } = useContext(ChatContext);
  console.log(user);
  return (
    <div className="chat">
      <div className="chat-info">
        {user.photoURL && (
          <div style={{ display: "flex", gap: "5px", alignItems: "center" }}>
            <img
              src={user.photoURL}
              alt=""
              style={{ borderRadius: "100%", width: "40px", height: "40px" }}
            />
            <span>{user.displayName}</span>
          </div>
        )}
      </div>
      <Chats />
      <Input />
    </div>
  );
};

export default ChatPanel;
