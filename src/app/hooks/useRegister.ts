import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase/firebase";
import { useState } from "react";
import { IRegisterUserValues } from "../constants/types";
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import ROUTES from "../constants/navigation";

const initialFormData: IRegisterUserValues = {
  displayName: "",
  email: "",
  password: "",
  file: undefined,
};

const useRegister = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>("");
  const navigate = useNavigate();
  const handleRegisterFormSubmit = async (formData: IRegisterUserValues) => {
    setIsLoading(true);
    try {
      const { email, password, displayName, file } = formData;
      await registerUser({ email, password, displayName, file });
      setIsLoading(false);
      navigate(ROUTES.LOGIN);
    } catch (error) {
      setErrors(error);
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  return { handleRegisterFormSubmit, initialFormData, isLoading, errors };
};

const uploadProfileImage = async (displayName: string, file: File) => {
  try {
    const date = new Date().getTime();
    const storageRef = ref(storage, `${displayName + date}`);
    await uploadBytesResumable(storageRef, file);
    return await getDownloadURL(storageRef);
  } catch (error) {
    throw error;
  }
};

const registerUser = async (values: IRegisterUserValues) => {
  const { email, password, displayName, file } = values;
  let imageUrl;
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);

    if (file) {
      imageUrl = await uploadProfileImage(displayName, file);
    }

    await updateProfile(res.user, {
      displayName,
      photoURL: imageUrl ?? "",
    });

    await setDoc(doc(db, "users", res.user.uid), {
      uid: res.user.uid,
      photoURL: imageUrl ?? "",
      email,
      displayName,
    });

    await setDoc(doc(db, "userChats", res.user.uid), {});
  } catch (error) {
    throw error;
  }
};

export default useRegister;
