import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useCart } from "../CartContext";

const Monitors = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // Filters
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [inStock, setInStock] = useState(false);

  const priceGap = 100;
  const minRangeRef = useRef(null);
  const maxRangeRef = useRef(null);
  const progressRef = useRef(null);

  // Fetch monitors
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("category", "monitor");
      selectedBrands.forEach((brand) => params.append("brand", brand));
      selectedCategories.forEach((cat) => params.append("subcategory", cat));
      if (priceRange[0] > 0) params.append("min_price", priceRange[0]);
      if (priceRange[1] < 10000) params.append("max_price", priceRange[1]);
      if (inStock) params.append("in_stock", "true");

      const response = await axios.get(
        `http://127.0.0.1:8000/api/products/products/?${params.toString()}`
      );

      const data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      setProducts(data);
    } catch (err) {
      console.error("Error fetching monitors:", err);
      setError("Failed to load monitors.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedBrands, selectedCategories, priceRange, inStock]);

  const handleBrandChange = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handleAddToBag = (product) => {
    const price = parseFloat(product.price);
    addToCart({ ...product, price });
  };

  // Price slider progress
  useEffect(() => {
    if (progressRef.current) {
      const minPercent = (priceRange[0] / 10000) * 100;
      const maxPercent = (priceRange[1] / 10000) * 100;
      progressRef.current.style.left = `${minPercent}%`;
      progressRef.current.style.right = `${100 - maxPercent}%`;
    }
  }, [priceRange]);

  const handleMinInput = (e) => {
    let val = Math.min(Number(e.target.value), priceRange[1] - priceGap);
    setPriceRange([Math.max(val, 0), priceRange[1]]);
  };

  const handleMaxInput = (e) => {
    let val = Math.max(Number(e.target.value), priceRange[0] + priceGap);
    setPriceRange([priceRange[0], Math.min(val, 10000)]);
  };

  const handleMinRange = (e) => {
    let val = Math.min(Number(e.target.value), priceRange[1] - priceGap);
    setPriceRange([Math.max(val, 0), priceRange[1]]);
  };

  const handleMaxRange = (e) => {
    let val = Math.max(Number(e.target.value), priceRange[0] + priceGap);
    setPriceRange([priceRange[0], Math.min(val, 10000)]);
  };

  const dragHandle = (e, type) => {
    e.preventDefault();
    const slider = e.target.parentElement;
    const rect = slider.getBoundingClientRect();

    const onMouseMove = (moveEvent) => {
      let newValue = Math.round(
        ((moveEvent.clientX - rect.left) / rect.width) * 10000
      );
      if (type === "min") {
        newValue = Math.min(newValue, priceRange[1] - priceGap);
        setPriceRange([Math.max(newValue, 0), priceRange[1]]);
      } else {
        newValue = Math.max(newValue, priceRange[0] + priceGap);
        setPriceRange([priceRange[0], Math.min(newValue, 10000)]);
      }
    };

    const onMouseUp = () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 p-6 bg-black text-white hidden md:block sticky top-0 h-screen overflow-auto">
        <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
          Filter By
        </h2>

        {/* Category Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 uppercase text-sm">Category</h3>
          <ul className="space-y-2 text-sm">
            {["Gaming", "Office", "Compact"].map((cat) => (
              <li key={cat}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="mr-2 accent-red-600"
                  />
                  {cat}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Price Slider */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 uppercase text-sm">Price Range</h3>
          <div className="flex items-center mb-4">
            <input
              type="number"
              value={priceRange[0]}
              onChange={handleMinInput}
              className="w-1/2 border border-gray-300 px-2 py-1 rounded text-center bg-white text-black"
            />
            <span className="mx-2 text-white">-</span>
            <input
              type="number"
              value={priceRange[1]}
              onChange={handleMaxInput}
              className="w-1/2 border border-gray-300 px-2 py-1 rounded text-center bg-white text-black"
            />
          </div>
          <div className="relative h-2 bg-gray-700 rounded">
            <div
              ref={progressRef}
              className="absolute h-2 bg-red-600 rounded transition-all duration-200"
              style={{
                left: `${(priceRange[0] / 10000) * 100}%`,
                right: `${100 - (priceRange[1] / 10000) * 100}%`,
              }}
            />
            <input
              ref={minRangeRef}
              type="range"
              min="0"
              max="10000"
              step="10"
              value={priceRange[0]}
              onChange={handleMinRange}
              className="absolute w-full h-2 appearance-none pointer-events-none"
            />
            <input
              ref={maxRangeRef}
              type="range"
              min="0"
              max="10000"
              step="10"
              value={priceRange[1]}
              onChange={handleMaxRange}
              className="absolute w-full h-2 appearance-none pointer-events-none"
            />
            <div
              className="absolute top-1/2 w-5 h-5 bg-red-600 rounded-full shadow -translate-y-1/2 cursor-pointer"
              style={{
                left: `calc(${(priceRange[0] / 10000) * 100}% - 0.625rem)`,
              }}
              onMouseDown={(e) => dragHandle(e, "min")}
            />
            <div
              className="absolute top-1/2 w-5 h-5 bg-red-600 rounded-full shadow -translate-y-1/2 cursor-pointer"
              style={{
                left: `calc(${(priceRange[1] / 10000) * 100}% - 0.625rem)`,
              }}
              onMouseDown={(e) => dragHandle(e, "max")}
            />
          </div>
        </div>

        {/* Brand Filter */}
        <div className="mb-6">
          <h3 className="font-semibold mb-3 uppercase text-sm">Brand</h3>
          <ul className="space-y-2 text-sm">
            {["HP", "Lenovo", "Dell", "Samsung"].map((brand) => (
              <li key={brand}>
                <label className="flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="mr-2 accent-red-600"
                  />
                  {brand}
                </label>
              </li>
            ))}
          </ul>
        </div>

        {/* Availability Filter */}
        <div>
          <h3 className="font-semibold mb-3 uppercase text-sm">Availability</h3>
          <label className="flex items-center text-sm cursor-pointer">
            <input
              type="checkbox"
              checked={inStock}
              onChange={() => setInStock(!inStock)}
              className="mr-2 accent-red-600"
            />
            In Stock Only
          </label>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="w-full md:w-3/4 p-6">
        {loading ? (
          <p className="text-center mt-8">Loading monitors...</p>
        ) : error ? (
          <p className="text-center mt-8 text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center mt-10">
            <img
              src="/no-products.svg"
              alt="No products found"
              className="w-48 h-48 mb-4"
            />
            <p className="text-gray-300 text-lg">No monitors found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition flex flex-col"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-56 object-contain rounded mb-4 bg-gray-100"
                  onError={(e) => (e.target.src = "/images/placeholder.jpg")}
                />
                <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                <p className="text-red-600 font-semibold bg-red-100 px-3 py-1 inline-block rounded mb-3">
                  ${product.price}
                </p>
                <div className="mt-auto flex flex-col gap-2">
                  <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition w-full">
                    Buy Now
                  </button>
                  <button
                    onClick={() => handleAddToBag(product)}
                    className="w-full bg-gray-800 text-white py-2 rounded hover:bg-gray-900 transition"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default Monitors;
