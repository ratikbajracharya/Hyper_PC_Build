import React, { useState, useEffect, useRef } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

const navItems = [
  { name: "Prebuilt PC", path: "/prebuilt-pc" },
  { name: "Monitors", path: "/monitors" },
  { name: "Components", path: "/components" },
  { name: "Laptops", path: "/laptops" },
  { name: "Accessories", path: "/accessories" },
  { name: "Build my PC", path: "/build-my-pc" },
];

function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Fetch product suggestions
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (searchTerm.trim().length < 2) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await axios.get(
          "http://127.0.0.1:8000/api/products/products/"
        );
        const filtered = res.data.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSuggestions(filtered.slice(0, 5));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchSuggestions();
  }, [searchTerm]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setIsFocused(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-black text-white px-6 py-6 flex flex-wrap items-center justify-between shadow-md">
      {/* Logo */}
      <Link to="/home" className="text-3xl font-bold tracking-wide flex-shrink-0">
        Hyper <span className="text-red-500">PC</span> Build
      </Link>

      {/* Categories */}
      <ul className="flex flex-wrap gap-3 uppercase font-semibold text-sm ml-6 flex-shrink-0">
        {navItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              className={({ isActive }) =>
                isActive
                  ? "px-2 py-1 rounded bg-gray-700"
                  : "px-2 py-1 rounded hover:bg-gray-800"
              }
            >
              {item.name}
            </NavLink>
          </li>
        ))}
      </ul>

      {/* Search Bar */}
      <div
        className="relative flex-grow min-w-[200px] lg:min-w-[300px] mx-4"
        ref={dropdownRef}
      >
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setIsFocused(true);
            }}
            className="w-full px-4 py-2 rounded-lg text-black bg-white outline-none"
          />
        </form>

        {isFocused && suggestions.length > 0 && (
          <ul className="absolute bg-white text-black w-full mt-1 rounded-lg shadow-lg z-50">
            {suggestions.map((product) => (
              <li
                key={product.id}
                onClick={() => {
                  setSearchTerm(product.name);
                  navigate(`/search?query=${encodeURIComponent(product.name)}`);
                  setIsFocused(false);
                }}
                className="px-4 py-2 hover:bg-gray-200 cursor-pointer"
              >
                {product.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Right-side Links */}
      <div className="flex gap-4 flex-shrink-0 mt-2 lg:mt-0">
        <NavLink
          to="/wishlist"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 px-3 py-1 rounded"
              : "hover:bg-gray-800 px-3 py-1 rounded"
          }
        >
          Wishlist
        </NavLink>
        <NavLink
          to="/bag"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 px-3 py-1 rounded"
              : "hover:bg-gray-800 px-3 py-1 rounded"
          }
        >
          Bag
        </NavLink>
        <NavLink
          to="/profile"
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700 px-3 py-1 rounded"
              : "hover:bg-gray-800 px-3 py-1 rounded"
          }
        >
          Profile
        </NavLink>
      </div>
    </header>
  );
}

export default Navbar;
