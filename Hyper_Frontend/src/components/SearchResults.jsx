import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useCart } from "../CartContext";

function SearchResults() {
  const { addToCart } = useCart();
  const location = useLocation();
  const [products, setProducts] = useState([]);
  const query = new URLSearchParams(location.search).get("query") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://127.0.0.1:8000/api/products/products/");
        const filtered = res.data.filter((product) =>
          product.name.toLowerCase().includes(query.toLowerCase())
        );
        setProducts(filtered);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };
    fetchProducts();
  }, [query]);

  const handleAddToCart = (product) => {
    addToCart({ ...product, quantity: 1 });
  };

  if (!query) {
    return <p className="text-center mt-10">Please enter a search term.</p>;
  }

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Search results for "{query}"</h2>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow hover:shadow-lg overflow-hidden flex flex-col"
            >
              {/* Image */}
              <div className="relative w-full h-48 flex items-center justify-center bg-gray-200 p-2">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-contain transition-transform duration-300 hover:scale-105"
                />
              </div>

              {/* Product Info */}
              <div className="p-4 flex flex-col justify-between flex-grow">
                <div>
                  <h3 className="font-bold text-lg text-gray-900">{product.name}</h3>
                  <p className="text-xl font-semibold text-red-600 mt-2">${product.price}</p>
                </div>
                <button
                  onClick={() => handleAddToCart(product)}
                  className="bg-gray-800 text-white py-1 rounded hover:bg-gray-900 transition text-sm mt-4"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
