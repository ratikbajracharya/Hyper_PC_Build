import React from "react";
import { Link } from "react-router-dom";

const ProfilePage = () => {
  // Example user data (can later fetch from backend)
  const user = {
    username: "JohnDoe",
    email: "johndoe@example.com",
    phone: "+123 456 7890",
    address: "123 Main Street, City, Country",
    memberSince: "January 2023",
    orders: 12,
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-4 sm:px-6 lg:px-12">
      {/* Page Title */}
      <h1 className="text-4xl font-bold mb-10 text-center text-gray-800">
        My Profile
      </h1>

      {/* Profile Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col md:flex-row items-center md:items-start space-y-6 md:space-y-0 md:space-x-10">
        {/* Profile Picture */}
        <div className="w-40 h-40 bg-gray-300 rounded-full overflow-hidden border-4 border-gray-200 shadow-md flex items-center justify-center">
          <img
            src="/images/Profilepic.webp"
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>

        {/* User Info */}
        <div className="flex-1">
          <h2 className="text-2xl font-semibold mb-2">{user.username}</h2>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Email:</span> {user.email}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Phone:</span> {user.phone}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Address:</span> {user.address}
          </p>
          <p className="text-gray-700 mb-1">
            <span className="font-medium">Member Since:</span> {user.memberSince}
          </p>
          <p className="text-gray-700 mb-4">
            <span className="font-medium">Orders:</span> {user.orders}
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 mt-4">
            <Link
              to="/orders"
              className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded transition"
            >
              View Orders
            </Link>
            <Link
              to="/edit-profile"
              className="border border-gray-300 hover:bg-gray-100 px-4 py-2 rounded transition"
            >
              Edit Profile
            </Link>
          </div>
        </div>
      </div>

      {/* Additional Info Section */}
      <div className="max-w-4xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Wishlist</h3>
          <p className="text-gray-600">You have 8 items in your wishlist</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Saved Builds</h3>
          <p className="text-gray-600">You have 3 saved PC builds</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4 text-center">
          <h3 className="text-lg font-semibold mb-2">Membership</h3>
          <p className="text-gray-600">Premium Member</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
