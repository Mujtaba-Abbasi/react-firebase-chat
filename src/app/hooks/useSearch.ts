import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { useState } from "react";
import { db } from "../firebase/firebase";

export const useSearch = () => {
  const searchUser = async (search: string) => {
    let user;
    console.log(search);
    const searchQuery = query(
      collection(db, "users"),
      where("displayName", "==", "Mujtaba")
    );

    try {
      const querySnapshot = await getDocs(searchQuery);
      querySnapshot.forEach((doc) => {
        user = doc.data();
      });
      return user;
    } catch (error) {
      console.log(error);
    }
  };
  return { searchUser };
};
