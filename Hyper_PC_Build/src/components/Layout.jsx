import React from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <>
      <Navbar />
      <main>
        {/* Outlet will render the matched child route here */}
        <Outlet />
      </main>
    </>
  );
};

export default Layout;
