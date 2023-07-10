import { Navigate, Route, Routes } from "react-router-dom";
import Login from "../../pages/Login";
import Register from "../../pages/Register";
import ROUTES from "../../constants/navigation";
import { useContext, useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../firebase/firebase";
import { AuthContext } from "../../context/AuthContext";
import Home from "../../pages/Home";
import { decryptData } from "../../utils/encryption";

interface IProtectedRouteProps {
  children: React.ReactElement;
}

const Navigation = () => {
  const currentUser = useContext(AuthContext);
  const storedUser = localStorage.getItem("currentUser");
  let decryptedUser: any;
  if (storedUser) {
    decryptedUser = decryptData(storedUser);
  }

  const ProtectedRoute = ({ children }: IProtectedRouteProps) => {
    if (currentUser === decryptedUser) {
      return <Navigate to={ROUTES.LOGIN} replace />;
    }
    return children;
  };

  return (
    <Routes>
      <Route element={<Login />} path={ROUTES.LOGIN} />
      <Route element={<Register />} path={ROUTES.REGISTER} />
      <Route
        index
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        path={ROUTES.HOME}
      />
    </Routes>
  );
};

export default Navigation;
