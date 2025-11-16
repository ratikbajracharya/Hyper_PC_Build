import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { User, Package, MapPin, Settings, CreditCard, Heart } from "lucide-react";
import axios from "axios";

const ProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch logged-in user details
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token"); // token stored on login
        if (!token) {
          navigate("/profile");
          return;
        }

        const response = await axios.get("http://127.0.0.1:8000/api/users/profile/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        navigate("/profile");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  if (loading) {
    return <div className="flex justify-center items-center min-h-screen text-lg">Loading profile...</div>;
  }

  if (!user) {
    return <div className="flex justify-center items-center min-h-screen text-red-500">User not found.</div>;
  }

  const orders = [
    { id: "ORD-2024-001", date: "Nov 3, 2025", status: "Delivered", total: "$129.99", items: 2 },
    { id: "ORD-2024-002", date: "Nov 1, 2025", status: "Shipped", total: "$89.50", items: 1 },
  ];

  const addresses = [
    { id: 1, type: "Home", address: user.address || "No address provided", city: "N/A", isDefault: true },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <div className="relative h-64 w-full overflow-hidden">
        <img
          src="/images/profileBanner.jpg"
          alt="Profile Banner"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-red-600/70 to-black/50" />
      </div>

      {/* Profile Card */}
      <div className="max-w-6xl mx-auto px-6 -mt-20 relative z-10">
        <div className="bg-white shadow-2xl rounded-xl p-8 mb-10 flex flex-col md:flex-row items-center gap-6">
          {/* Profile Image */}
          <div className="relative">
            <img
              src={user.profile_picture || "/images/Profilepic.webp"}
              alt="Profile"
              className="w-36 h-36 rounded-full border-4 border-white shadow-md object-cover"
            />
          </div>

          {/* User Info */}
          <div className="flex-1 text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-800">{user.username}</h1>
            <p className="text-gray-600">{user.email}</p>
            <p className="text-gray-500 mt-2">Member since {user.date_joined ? new Date(user.date_joined).toDateString() : "N/A"}</p>

            <div className="flex justify-center md:justify-start gap-3 mt-4">
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

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <Package className="h-6 w-6 mx-auto text-red-600 mb-2" />
            <h3 className="text-lg font-semibold">Orders</h3>
            <p className="text-gray-600">{user.total_orders || 0} Orders Placed</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <Heart className="h-6 w-6 mx-auto text-red-600 mb-2" />
            <h3 className="text-lg font-semibold">Wishlist</h3>
            <p className="text-gray-600">{user.wishlist_count || 0} Saved Items</p>
          </div>

          <div className="bg-white shadow-md rounded-xl p-6 text-center">
            <CreditCard className="h-6 w-6 mx-auto text-red-600 mb-2" />
            <h3 className="text-lg font-semibold">Rewards</h3>
            <p className="text-gray-600">{user.rewards || 0} Points</p>
          </div>
        </div>

        {/* Order History */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <Package className="h-5 w-5 text-red-600" />
              Order History
            </h2>
            <Link to="/orders" className="text-sm text-red-600 hover:underline">
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between border rounded-lg p-4 hover:shadow transition"
              >
                <div>
                  <p className="font-semibold">{order.id}</p>
                  <p className="text-gray-500 text-sm">
                    {order.date} • {order.items} items
                  </p>
                </div>
                <div className="text-right mt-2 sm:mt-0">
                  <p className="text-gray-800 font-bold">{order.total}</p>
                  <span
                    className={`text-sm ${
                      order.status === "Delivered"
                        ? "text-green-600"
                        : order.status === "Shipped"
                        ? "text-blue-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {order.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Addresses */}
        <div className="bg-white shadow-md rounded-xl p-6 mb-10">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold flex items-center gap-2">
              <MapPin className="h-5 w-5 text-red-600" />
              Saved Addresses
            </h2>
            <Link to="/edit-profile" className="text-sm text-red-600 hover:underline">
              Add Address
            </Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="border rounded-lg p-4 hover:shadow transition"
              >
                <h4 className="font-semibold mb-1">{address.type}</h4>
                <p className="text-gray-600 text-sm">{address.address}</p>
                <p className="text-gray-500 text-sm">{address.city}</p>
                {address.isDefault && (
                  <p className="text-xs text-green-600 mt-2 font-medium">Default</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
