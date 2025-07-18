import React from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Prebuilt PC", path: "/prebuilt-pc" },
  { name: "Monitors", path: "/monitors" },
  { name: "Components", path: "/components" },
  { name: "Laptops", path: "/laptops" },
  { name: "Accessories", path: "/accessories" },
  { name: "Build my PC", path: "/build-my-pc" },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 bg-white h-[66px] shadow-md z-50 px-[5vw] py-[13px]">
      <nav className="flex justify-between items-center text-xs pt-3 flex-wrap">
        <div className="flex items-center space-x-4">
          <NavLink to="/home">
            <img src="/images/Logo.jpg" alt="HPB logo" className="w-[90px] h-[38px]" />
          </NavLink>
          <ul className="flex items-center uppercase font-semibold text-sm space-x-3" role="navigation">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    isActive
                      ? "px-2 py-1 rounded bg-gray-400 text-black"
                      : "px-2 py-1 rounded hover:bg-gray-200"
                  }
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex items-center mt-2 lg:mt-0">
          <input
            className="bg-[#f7f8fd] border border-gray-400 rounded px-4 py-2 w-[34vw] mr-4"
            placeholder="Search for products, brands and more"
            aria-label="Search bar"
          />
          <div className="flex space-x-4 text-sm font-medium">
            <NavLink to="/profile" className={({ isActive }) => isActive ? "bg-gray-400 px-2 py-1 rounded text-black" : "hover:bg-gray-200 px-2 py-1 rounded"}>
              Profile
            </NavLink>
            <NavLink to="/wishlist" className={({ isActive }) => isActive ? "bg-gray-400 px-2 py-1 rounded text-black" : "hover:bg-gray-200 px-2 py-1 rounded"}>
              Wishlist
            </NavLink>
            <NavLink to="/bag" className={({ isActive }) => isActive ? "bg-gray-400 px-2 py-1 rounded text-black" : "hover:bg-gray-200 px-2 py-1 rounded"}>
              Bag
            </NavLink>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
