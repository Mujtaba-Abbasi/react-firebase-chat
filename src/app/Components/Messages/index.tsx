import Message from "../Message";
import { useMessages } from "../../hooks/useMessages";
import { useEffect, useRef } from "react";

export const Messages = () => {
  const { messages } = useMessages();

  return (
    <div className="messages">
      {messages?.messages?.length >= 0 ? (
        messages?.messages?.map((m: any) => <Message message={m} key={m.uid} />)
      ) : (
        <div className="no-messages">
          <span>Start your conversation</span>
        </div>
      )}
    </div>
  );
};

export default Messages;
