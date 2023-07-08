import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import {
  Timestamp,
  arrayUnion,
  doc,
  onSnapshot,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db, storage } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";

export const useMessages = () => {
  const [messages, setMessages] = useState<any>();
  const [error, setError] = useState<string>("");

  const currentUser = useContext(AuthContext);
  const {
    state: { chatId, user },
  } = useContext(ChatContext);

  useEffect(() => {
    if (chatId) {
      const unsubscribe = onSnapshot(doc(db, "chats", chatId), (doc) => {
        if (doc.exists()) {
          setMessages(doc.data());
          setError("");
        } else {
          setError("Chat not found.");
        }
      });
      return () => unsubscribe();
    }
  }, [chatId]);

  const onMessageSend = async (
    text: string,
    image: File | null,
    cb: () => void
  ) => {
    if (!currentUser.uid) {
      setError("User not authenticated.");
      return;
    }
    try {
      if (!image) {
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            uid: uuid(),
            text,
            date: Timestamp.now(),
            senderId: currentUser.uid,
          }),
        });
      } else {
        const storageRef = ref(storage, uuid());
        await uploadBytesResumable(storageRef, image);
        const imageUrl = await getDownloadURL(storageRef);
        await updateDoc(doc(db, "chats", chatId), {
          messages: arrayUnion({
            uid: uuid(),
            text,
            date: Timestamp.now(),
            senderId: currentUser.uid,
            imageUrl,
          }),
        });
      }
      cb();
      if (text) {
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [chatId + ".lastMessage"]: {
            text,
          },
          [chatId + ".date"]: serverTimestamp(),
        });

        await updateDoc(doc(db, "userChats", user.uid), {
          [chatId + ".lastMessage"]: {
            text,
          },
          [chatId + ".date"]: serverTimestamp(),
        });
      }

      setError("");
    } catch (error) {
      setError("Error sending message. Please try again.");
      console.error(error);
    } finally {
    }
  };

  return { messages, onMessageSend, error };
};
