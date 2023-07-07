import { onAuthStateChanged } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase";
import { ICurrentUser } from "../constants/types";
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
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          email: user.email,
          uid: user.uid,
          displayName: user.displayName,
          photo: user.photoURL,

          refreshToken: user.refreshToken,
        });
      }
    });

    return () => unsubscribe();
  }, []);
  return (
    <AuthContext.Provider value={currentUser}>{children}</AuthContext.Provider>
  );
};
