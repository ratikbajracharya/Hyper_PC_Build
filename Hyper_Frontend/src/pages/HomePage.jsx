import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../CartContext";

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

  const handleCartContext = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center justify-center overflow-hidden">
        <img
          src="/images/Homepage/home1.webp"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-75"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/40"></div>
        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 tracking-tight drop-shadow-lg">
            NO LAG, NO LIMITS
          </h1>
          <p className="text-xl md:text-2xl text-white/90 mb-6 font-semibold drop-shadow">
            BUILT TO DOMINATE
          </p>
          <p className="text-lg md:text-xl text-white/80 mb-10 drop-shadow">
            Build, Buy, and Explore the Future of Gaming PCs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              className="bg-red-600 hover:bg-red-700 text-white px-8 py-3 rounded-lg font-semibold shadow-lg transition transform hover:-translate-y-1"
              to="/prebuilt-pc"
            >
              Shop Prebuilt PCs
            </Link>
            <Link
              className="bg-white/10 backdrop-blur-sm border border-white/30 text-white px-8 py-3 rounded-lg font-semibold hover:bg-white/20 transition transform hover:-translate-y-1"
              to="/components"
            >
              Browse Components
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">
            🔥 Hot Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative overflow-hidden aspect-square flex items-center justify-center bg-gray-50">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                  />
                </div>
                <div className="p-6 flex flex-col gap-2">
                  <h3 className="font-bold text-xl text-gray-900 group-hover:text-red-600 transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-2xl font-extrabold text-red-600">${product.price}</p>
                  <button
                    onClick={() => handleCartContext(product)}
                    className="bg-gray-800 text-white py-2 rounded-lg font-semibold hover:bg-gray-900 transition transform hover:-translate-y-0.5 mt-2"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Products */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-10 text-center">
            ⏰ Upcoming Products
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-xl shadow-lg hover:shadow-2xl overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
              >
                <div className="grid md:grid-cols-5 gap-4 p-6">
                  <div className="md:col-span-2 aspect-square flex items-center justify-center bg-gray-100 rounded-lg overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <div className="md:col-span-3 flex flex-col justify-center">
                    <h3 className="font-bold text-2xl mb-2 text-gray-900 group-hover:text-red-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-gray-700 text-lg font-semibold mb-4">{product.release}</p>
                    <span className="text-red-600 font-semibold">Stay Tuned</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
