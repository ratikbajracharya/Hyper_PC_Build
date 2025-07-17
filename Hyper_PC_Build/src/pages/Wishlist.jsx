import React from "react";

const Wishlist = ({ wishlistItems = [], removeFromWishlist }) => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Your Wishlist</h1>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="border rounded p-4 shadow hover:shadow-lg transition relative"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-full h-48 object-cover rounded mb-2"
              />
              <h3 className="font-semibold text-lg">{item.name}</h3>
              <p className="text-sm text-gray-700 mb-4">{item.price}</p>
              {removeFromWishlist && (
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;
