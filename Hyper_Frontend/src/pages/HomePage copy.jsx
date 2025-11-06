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

  const handleAddToBag = (product) => addToCart(product);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col">
      <main className="flex-1">
        {/* Hero Banner */}
        <section className="relative h-[70vh] flex items-center justify-center text-center text-white">
          <img
            src="/images/Homepage/home1.webp"
            alt="Hero Banner"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="relative z-10 px-6">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">Hyper PC Build</h1>
            <p className="text-lg md:text-xl mb-6">
              Build, Buy, and Explore the Future of Gaming PCs
            </p>
            <div className="space-x-4">
              <Link
                to="/prebuilt-pc"  // ✅ Fixed to match App.jsx
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

        {/* Featured Products */}
        <section className="px-6 py-12">
          <h2 className="text-2xl font-bold mb-6">🔥 Featured Products</h2>
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
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-red-600 font-semibold mb-3">${product.price}</p>
                <div className="mt-auto flex flex-col gap-2">
                  <button className="bg-red-600 text-white py-2 rounded hover:bg-red-700 transition transform hover:-translate-y-0.5">
                    Buy Now
                  </button>
                  <button
                    onClick={() => handleAddToBag(product)}
                    className="bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition transform hover:-translate-y-0.5"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Remaining sections stay the same */}
      </main>
    </div>
  );
};

export default HomePage;
