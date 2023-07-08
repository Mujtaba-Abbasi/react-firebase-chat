import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { ChatContext } from "../context/ChatContext";

export const useChats = () => {
  const [chats, setChats] = useState<any>(null);
  const currentUser = useContext(AuthContext);
  const { dispatch } = useContext(ChatContext);

  useEffect(() => {
    if (currentUser.uid) {
      const unsubscribe = onSnapshot(
        doc(db, "userChats", currentUser.uid),
        (doc) => {
          setChats(doc.data());
        }
      );
      return () => {
        unsubscribe();
      };
    }
  }, [currentUser.uid]);

  const onChatSelect = (userInfo: any) => {
    dispatch({ type: "CHANGE_USER", payload: userInfo });
  };

  return { chats, onChatSelect };
};
