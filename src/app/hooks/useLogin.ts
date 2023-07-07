import { useState } from "react";
import { ILogin } from "../constants/types";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebase";
import { useNavigate } from "react-router-dom";

export const initialFormData: ILogin = {
  email: "",
  password: "",
};

const useLogin = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<any>("");
  const navigate = useNavigate();

  const handleFormSubmit = async (values: ILogin) => {
    console.log(values);
    try {
      setIsLoading(true);
      const { email, password } = values;
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      setErrors(error);
      setIsLoading(true);
    }
  };

  return { handleFormSubmit, errors, isLoading, initialFormData };
};

export default useLogin;
