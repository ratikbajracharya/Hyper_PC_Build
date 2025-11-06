import React from "react";

const ProfilePage = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-semibold mb-8">My Profile</h1>

      <div className="flex items-start space-x-10">
        <div className="w-40 h-40 bg-gray-300 flex items-center justify-center overflow-hidden rounded-md">
          <img
            src="/images/Profilepic.webp"
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>

        <div className="flex-1">
          <p className="text-2xl font-medium mb-4">Username: JohnDoe</p>
          <p className="text-lg text-gray-700 mb-3">Email: johndoe@example.com</p>
          <p className="text-lg text-gray-700">Phone: +123 456 7890</p>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
