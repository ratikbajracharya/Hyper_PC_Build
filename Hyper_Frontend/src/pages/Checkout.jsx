// pages/Checkout.jsx
import React from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  const handleCheckout = () => {
    clearCart();
    alert("Thank you for your purchase!");
    navigate("/home");
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8 text-center">Checkout</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">
          Your cart is empty.
        </p>
      ) : (
        <div className="flex flex-col gap-8">
          {/* Items List */}
          <div className="space-y-4">
            {cartItems.map(({ id, name, price, quantity, image }) => (
              <div
                key={id}
                className="flex items-center bg-white p-4 rounded-lg shadow hover:shadow-lg transition"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-24 h-24 object-contain rounded bg-gray-100"
                />
                <div className="flex-1 ml-4">
                  <h3 className="font-semibold text-lg">{name}</h3>
                  <p className="text-gray-500 mt-1">Quantity: {quantity}</p>
                  <p className="text-red-600 font-semibold mt-1">
                    ${(parseFloat(price) * quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Summary Section - now at bottom */}
          <div className="w-full bg-white p-6 rounded-lg shadow h-fit space-y-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between text-lg font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              onClick={handleCheckout}
              className="w-full bg-green-600 text-white py-3 rounded-lg hover:bg-green-700 transition"
            >
              Complete Purchase
            </button>

            <button
              onClick={() => navigate("/bag")}
              className="w-full border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition-transform transform hover:-translate-y-1 duration-200"
            >
              Back to Bag
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Checkout;
