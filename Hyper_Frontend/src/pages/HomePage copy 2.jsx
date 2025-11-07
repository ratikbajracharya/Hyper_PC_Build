import React from "react";
import { useCart } from "../CartContext";
import { Link } from "react-router-dom";

const HomePage = () => {
  const { addToCart } = useCart();

  const featuredProducts = [
    { id: 101, name: "Gaming Laptop X1", price: 1200, image: "/images/featured/laptop1.jpg" },
    { id: 102, name: "UltraWide Monitor", price: 1200, image: "/images/featured/monitor1.jpg" },
    { id: 103, name: "Intel Core Ultra", price: 300, image: "/images/featured/component1.jpg" },
  ];

  const upcomingProducts = [
    { id: 201, name: "RTX 6000 Series", release: "Coming March 2026", image: "/images/upcoming/upcoming1.jpg" },
    { id: 202, name: "NVIDIA RTX Beast Build", release: "Coming April 2026", image: "/images/upcoming/upcoming2.jpg" },
  ];

  const handleCartContext = (product) => addToCart(product);

  return (
    <div className="bg-white min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-[75vh] flex items-center justify-center text-center">
          <img
            src="/images/Homepage/home1.webp"
            alt="Hero Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 px-6 py-12 bg-black/40 rounded-lg">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">Hyper PC Build</h1>
            <p className="text-lg md:text-2xl text-gray-100 mb-6">
              Build, Buy, and Explore the Future of Gaming PCs
            </p>
            <div className="space-x-4">
              <Link
                to="/prebuilt-pc"
                className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-lg font-semibold transition transform hover:-translate-y-1"
              >
                Shop Prebuilt PCs
              </Link>
              <Link
                to="/components"
                className="bg-gray-800 hover:bg-gray-900 px-6 py-3 rounded-lg font-semibold transition transform hover:-translate-y-1"
              >
                Browse Components
              </Link>
            </div>
          </div>
        </section>

        {/* Promotional Strip */}
        <section className="bg-gray-50 py-4">
          <div className="max-w-6xl mx-auto flex justify-around text-sm sm:text-base font-medium text-gray-700">
            <span>🚚 Free Delivery on Orders Above $500</span>
            <span>💳 Easy Payment Options</span>
            <span>🔒 Secure Checkout</span>
          </div>
        </section>

        {/* Hot / Featured Products */}
        <section className="px-6 py-12 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">🔥 Hot Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-56 w-full object-contain mb-4"
                />
                <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                <p className="text-red-600 font-semibold mb-3">${product.price}</p>
                <div className="mt-auto flex flex-col gap-2">
                  <button
                    onClick={() => handleCartContext(product)}
                    className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition transform hover:-translate-y-0.5"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Upcoming Products */}
        <section className="px-6 py-12 bg-gray-50 max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800">⏳ Upcoming Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {upcomingProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white border rounded-lg shadow hover:shadow-lg transition p-4 flex flex-col sm:flex-row items-center gap-4"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-40 object-contain mb-2 sm:mb-0"
                />
                <div className="flex flex-col">
                  <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-600">{product.release}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
