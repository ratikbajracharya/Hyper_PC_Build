import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

const Layout = () => {
  const location = useLocation();

  // Optional — Automatically generate page title from URL
  const pageTitle = location.pathname
    .replace("/", "")
    .replaceAll("-", " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()) || "Home";

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">

      {/* Navbar always on top */}
      <Navbar />

      {/* Optional Page Title */}
      {location.pathname !== "/home" &&
        !location.pathname.startsWith("/search") && (
          <div className="w-full bg-white shadow-sm border-b py-4 mb-4">
            <h1 className="text-2xl font-bold text-center text-gray-800">
              {pageTitle}
            </h1>
          </div>
        )
      }

      {/* Main Page Content */}
      <main className="flex-1 px-6 py-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-white border-t py-4 text-center text-sm text-gray-500 mt-auto">
        &copy; {new Date().getFullYear()} Hyper PC Build. All rights reserved.
      </footer>
    </div>
  );
};

export default Layout;
