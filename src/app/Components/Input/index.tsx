import { FormEvent, useContext, useEffect, useState } from "react";
import placeholderImage from "/images/img.png";
import { useMessages } from "../../hooks/useMessages";
import { ChatContext } from "../../context/ChatContext";

const Input = () => {
  const {
    state: { chatId },
  } = useContext(ChatContext);
  const [text, setText] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const { onMessageSend } = useMessages();
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    await onMessageSend(text, image, () => {
      setText("");
      setImage(null);
    });
  };

  return (
    <form action="submit" onSubmit={(e) => handleSendMessage(e)}>
      <div className="input">
        <input
          type="text"
          placeholder={
            chatId
              ? "Type some message here..."
              : "Select a chat to start messaging"
          }
          value={text}
          disabled={!chatId}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="send">
          <input
            type="file"
            style={{ display: "none" }}
            id="file"
            onChange={(e) => {
              setImage(e.target.files?.[0] ?? null);
            }}
            disabled={!chatId}
          />
          <label htmlFor="file">
            <img
              alt=""
              src={(image && URL.createObjectURL(image)) ?? placeholderImage}
              style={{ borderRadius: "4px", height: "35px", width: "35px" }}
            />
          </label>
          <button disabled={text.length === 0 && image === null}>Send</button>
        </div>
      </div>
    </form>
  );
};

export default Input;
