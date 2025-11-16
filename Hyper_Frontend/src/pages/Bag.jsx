import React, { useState } from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";

const Bag = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const [expandedIds, setExpandedIds] = useState([]);

  const toggleExpand = (id) => {
    setExpandedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const subtotal = cartItems.reduce((sum, item) => {
    const itemPrice = item.type === "pc-build" ? 0 : parseFloat(item.price);
    return sum + itemPrice * item.quantity;
  }, 0);
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8">Items in Bag</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your bag is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items List */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow space-y-4">
            {cartItems.map((item) => {
              const isBuild = item.type === "pc-build";
              return (
                <div
                  key={item.id}
                  className="border-b border-gray-200 pb-4 last:border-b-0"
                >
                  <div className="flex items-center">
                    {!isBuild && item.image && (
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 object-contain rounded"
                      />
                    )}
                    <div className="flex-1 ml-4">
                      <h2 className="text-lg font-semibold">{item.name}</h2>
                      {!isBuild && (
                        <p className="text-red-600 font-semibold mt-1">${item.price}</p>
                      )}
                      <div className="mt-2 flex items-center space-x-3">
                        <label className="text-sm font-medium">Qty:</label>
                        <input
                          type="number"
                          min="1"
                          value={item.quantity}
                          onChange={(e) => updateQty(item.id, Number(e.target.value))}
                          className="w-16 border rounded px-2 py-1 text-center"
                        />
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="ml-auto text-sm text-gray-500 hover:text-red-600"
                        >
                          Remove
                        </button>
                        {isBuild && (
                          <button
                            onClick={() => toggleExpand(item.id)}
                            className="text-sm text-blue-600 hover:underline"
                          >
                            {expandedIds.includes(item.id) ? "Hide Parts" : "View Parts"}
                          </button>
                        )}
                      </div>

                      {/* Expandable PC Build Parts */}
                      {isBuild && expandedIds.includes(item.id) && (
                        <div className="mt-2 p-3 bg-gray-50 rounded text-sm space-y-1 border">
                          {Object.entries(item.parts).map(([category, part]) => (
                            <div key={category} className="flex justify-between">
                              <span className="capitalize">{category}:</span>
                              <span>{part}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                    <p className="w-20 text-right font-semibold">
                      {isBuild
                        ? `$${(0 * item.quantity).toFixed(2)}`
                        : `$${(parseFloat(item.price) * item.quantity).toFixed(2)}`}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Summary */}
          <div className="w-full lg:w-96 bg-white p-6 rounded-lg shadow h-fit">
            <h2 className="text-xl font-semibold mb-6">Order Summary</h2>
            <div className="flex justify-between mb-3">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-3">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <hr className="mb-6" />
            <div className="flex justify-between text-lg font-bold mb-6">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="w-full bg-red-600 text-white py-3 rounded hover:bg-red-700 transition mb-3"
            >
              Proceed to Checkout
            </button>

            <button
              onClick={() => navigate("/home")}
              className="w-full border border-gray-300 py-3 rounded hover:bg-gray-100 transition-transform transform hover:-translate-y-1 duration-200"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Bag;
