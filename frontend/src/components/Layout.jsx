import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  return (
    <div className="px-8 py-4 flex flex-col min-h-screen">
      <Navbar />
      <Outlet />
    </div>
  );
};

export default Layout;
