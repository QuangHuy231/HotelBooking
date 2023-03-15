import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { UserContext } from "../context/UserContext";

const AccountPage = () => {
  const { user } = useContext(UserContext);

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <div>
      <AccountNav />
      <Outlet />
    </div>
  );
};

export default AccountPage;
