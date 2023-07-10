import React, { useContext } from "react";
import { auth } from "../../firebase/firebase";
import { signOut } from "firebase/auth";
import { AuthContext } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../constants/navigation";
const dummy =
  "https://media.istockphoto.com/id/1289220545/photo/beautiful-woman-smiling-with-crossed-arms.jpg?s=612x612&w=0&k=20&c=qmOTkGstKj1qN0zPVWj-n28oRA6_BHQN8uVLIXg0TF8=";

const SidebarHeader = () => {
  const currentUser = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <div className="sidebar-header">
      <span className="sidebar-logo">React Chat</span>
      <div className="header-user-info">
        <img src={currentUser.photo ? currentUser.photo : dummy} alt="avatar" />
        <span>{currentUser.displayName}</span>
        <button
          onClick={() => {
            try {
              signOut(auth)
                .then(() => {
                  localStorage.removeItem("currentUser");
                  navigate(ROUTES.LOGIN);
                })
                .catch((error) => {});
            } catch (error) {
              console.log(error);
            }
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SidebarHeader;
