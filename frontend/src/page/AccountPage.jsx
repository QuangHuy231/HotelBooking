import React, { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import AccountNav from "../components/AccountNav";
import { UserContext } from "../context/UserContext";

const AccountPage = () => {
  const { user, ready } = useContext(UserContext);

  if (!ready) {
    return "Loading...";
  }
  if (ready && !user) {
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
