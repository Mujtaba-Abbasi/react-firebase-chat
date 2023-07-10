import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { ICurrentUser } from "../constants/types";
import { decryptData, encryptData } from "../utils/encryption";
interface IAuthContext {
  children: React.ReactNode;
}

const initialValues: ICurrentUser = {
  email: "",
  uid: "",
  displayName: "",
  photo: "",
  refreshToken: "",
};

export const AuthContext = createContext<ICurrentUser>(initialValues);

export const AuthProvider = ({ children }: IAuthContext) => {
  const [currentUser, setCurrentUser] = useState<ICurrentUser>(initialValues);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const decryptedUser = decryptData(storedUser);
      setCurrentUser(decryptedUser);
    }

    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData: ICurrentUser = {
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photo: user.photoURL,
          refreshToken: user.refreshToken,
        };

        const encryptedUser = encryptData(userData);
        setCurrentUser(userData);
        localStorage.setItem("currentUser", encryptedUser);
      } else {
        setCurrentUser(initialValues);
        localStorage.removeItem("currentUser");
      }
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
