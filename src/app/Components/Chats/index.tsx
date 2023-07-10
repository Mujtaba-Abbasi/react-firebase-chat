import { useChats } from "../../hooks/useChats";
import ChatListItem from "../ChatListItem";

const Chats = () => {
  const { chats, onChatSelect } = useChats();
  const arrayData: any =
    chats &&
    Object.entries(chats).sort((a: any, b: any) => b[1].date - a[1].date);

  return (
    <div className="chats">
      {arrayData?.map((chat: any) => (
        <ChatListItem
          key={chat[0]}
          name={chat[1]?.userInfo.displayName}
          imageURL={chat[1]?.userInfo.photoURL}
          lastMessage={chat[1]?.lastMessage}
          onSelect={() => onChatSelect(chat[1].userInfo)}
        />
      ))}
    </div>
  );
};

export default Chats;
