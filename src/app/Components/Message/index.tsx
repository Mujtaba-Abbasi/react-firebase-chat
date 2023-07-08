import { useContext, useEffect, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { ChatContext } from "../../context/ChatContext";
import { useMessages } from "../../hooks/useMessages";

interface IMessage {
  message: any;
}

const Message = ({ message }: IMessage) => {
  const currentUser = useContext(AuthContext);
  const {
    state: { user },
  } = useContext(ChatContext);
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [message]);

  return (
    <div
      className={`message ${currentUser.uid === message?.senderId && "owner"}`}
      ref={containerRef}
    >
      <div className="messageInfo ">
        <img
          src={
            currentUser.uid === message?.senderId
              ? currentUser.photo ?? ""
              : user.photoURL ?? "https://avatars.githubusercontent.com/u/7?v=4"
          }
          alt="avatar"
        />
        <span className="message-time">Just Now</span>
      </div>
      <div className="messageContent">
        {message.text && <p>{message.text}</p>}
        {message.imageUrl && <img src={message.imageUrl} alt="avatar" />}
      </div>
    </div>
  );
};

export default Message;
