import axios from "axios";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const logout = async () => {
    await axios.post("/logout");
    setUser(null);
    navigate("/");
  };
  return (
    <div className="text-center max-w-lg mx-auto">
      Logged in as {user.name} ({user.email})<br />
      <button onClick={logout} className="primary max-w-sm mt-2">
        Logout
      </button>
    </div>
  );
};

export default ProfilePage;
