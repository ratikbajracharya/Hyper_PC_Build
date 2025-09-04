import React from "react";
import { useCart } from "../CartContext";
import { useNavigate } from "react-router-dom";

const Bag = () => {
  const { cartItems, removeFromCart, updateQty } = useCart();
  const navigate = useNavigate();

  const subtotal = cartItems.reduce(
    (sum, item) => sum + parseFloat(item.price) * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 50 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-semibold mb-8">Items in Bag</h1>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Your bag is empty.</p>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Items list */}
          <div className="flex-1 bg-white p-6 rounded-lg shadow">
            {cartItems.map(({ id, name, image, price, quantity }) => (
              <div
                key={id}
                className="flex items-center border-b border-gray-200 py-4 last:border-b-0"
              >
                <img
                  src={image}
                  alt={name}
                  className="w-24 h-24 object-contain rounded"
                />
                <div className="flex flex-col flex-1 ml-4">
                  <h2 className="text-lg font-semibold">{name}</h2>
                  <p className="text-red-600 font-semibold mt-1">${price}</p>
                  <div className="mt-2 flex items-center space-x-3">
                    <label htmlFor={`qty-${id}`} className="text-sm font-medium">
                      Qty:
                    </label>
                    <input
                      type="number"
                      id={`qty-${id}`}
                      min="1"
                      value={quantity}
                      onChange={(e) => updateQty(id, Number(e.target.value))}
                      className="w-16 border rounded px-2 py-1 text-center"
                    />
                    <button
                      onClick={() => removeFromCart(id)}
                      className="ml-auto text-sm text-gray-500 hover:text-red-600"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <p className="w-20 text-right font-semibold">
                  ${(parseFloat(price) * quantity).toFixed(2)}
                </p>
              </div>
            ))}
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
