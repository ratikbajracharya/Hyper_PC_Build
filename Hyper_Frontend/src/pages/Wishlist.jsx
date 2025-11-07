import React from "react";
import { useCart } from "../CartContext"; // To handle Add to Bag
import { useNavigate } from "react-router-dom";

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist, addToCart } = useCart(); // Make sure wishlistItems exists in CartContext
  const navigate = useNavigate();

  const handleCartContext = (item) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  return (
    <div className="max-w-7xl mx-auto p-6 min-h-screen bg-gray-100">
      <h1 className="text-3xl font-semibold mb-8 text-center sm:text-left text-gray-800">
        💖 My Wishlist
      </h1>

      {wishlistItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Your wishlist is empty.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-contain mb-4 rounded"
              />
              <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
              <p className="text-red-600 font-semibold mb-4">${item.price}</p>
              <div className="mt-auto flex flex-col gap-2">
                <button
                  onClick={() => handleCartContext(item)}
                  className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
                >
                  Add to Bag
                </button>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="border border-gray-300 py-2 rounded hover:bg-gray-100 transition"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Continue Shopping button */}
      <div className="mt-10 flex justify-center">
        <button
          onClick={() => navigate("/home")}
          className="px-6 py-3 border border-gray-300 rounded hover:bg-gray-100 transition-transform transform hover:-translate-y-1"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Wishlist;
