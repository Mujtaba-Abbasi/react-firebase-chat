import {
  DocumentSnapshot,
  collection,
  doc,
  getDoc,
  setDoc,
  getDocs,
  query,
  where,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { useContext, useState } from "react";
import { db } from "../firebase/firebase";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";

export const useSearch = () => {
  const currentUser = useContext(AuthContext);
  const [user, setUser] = useState<any>(null);
  const { dispatch } = useContext(ChatContext);

  const searchUser = async (search: string) => {
    const searchQuery = query(
      collection(db, "users"),
      where("displayName", "==", search)
    );
    try {
      const querySnapshot = await getDocs(searchQuery);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  };

  //* If the user is already in the chat list, then we don't need to create a new chat
  /* We just need to update the chat list of both users: For currentUser, 
  add searchUser's info and for searchedUser, add the currentUser's info */

  const handleSelect = async () => {
    if (currentUser.uid && user.uid) {
      const combinedId =
        currentUser.uid > user.uid
          ? currentUser.uid + user.uid
          : user.uid + currentUser.uid;

      try {
        //* This returns the messages
        const res: DocumentSnapshot = await getDoc(
          doc(db, "chats", combinedId)
        );

        if (!res.exists()) {
          await setDoc(doc(db, "chats", combinedId), { messages: [] });

          await updateDoc(doc(db, "userChats", currentUser.uid), {
            [combinedId + ".userInfo"]: {
              uid: user.uid,
              displayName: user.displayName,
              photoURL: user.photoURL,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });

          await updateDoc(doc(db, "userChats", user.uid), {
            [combinedId + ".userInfo"]: {
              uid: currentUser.uid,
              displayName: currentUser.displayName,
              photoURL: currentUser.photo,
            },
            [combinedId + ".date"]: serverTimestamp(),
          });
        }

        dispatch({ type: "CHANGE_USER", payload: user });
      } catch (error) {
        console.log(error);
      } finally {
        setUser(null);
      }
    }
  };
  return { searchUser, handleSelect, searchedUser: user };
};
