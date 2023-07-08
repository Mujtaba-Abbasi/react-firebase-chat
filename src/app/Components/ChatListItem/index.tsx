const image =
  "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=";
interface IChatListItemProps {
  name: string;
  lastMessage?: string;
  imageURL: string;
  onSelect?: () => void;
}

const ChatListItem = ({
  name,
  lastMessage,
  imageURL,
  onSelect,
}: IChatListItemProps) => {
  return (
    <div className="user-chat" onClick={onSelect}>
      <img src={imageURL ?? image} alt="" />
      <div className="user-chat-info">
        <span>{name}</span>
        {/* {lastMessage && <p>{lastMessage}</p>} */}
      </div>
    </div>
  );
};

export default ChatListItem;
