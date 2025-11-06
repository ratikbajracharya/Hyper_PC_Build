// src/components/FilterSidebar.jsx
import React, { useEffect, useRef } from "react";

const FilterSidebar = ({
  selectedBrands,
  setSelectedBrands,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  inStock,
  setInStock,
  categories = [],
  brands = [],
  title = "Filter By", // Optional title
}) => {
  const priceGap = 100;
  const minRangeRef = useRef(null);
  const maxRangeRef = useRef(null);
  const progressRef = useRef(null);

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

  return (
    <aside className="w-1/4 p-6 bg-black text-white hidden md:block sticky top-0 h-screen overflow-auto">
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-700 pb-2">
        {title}
      </h2>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3 uppercase text-sm">Category</h3>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
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
      )}

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
      {brands.length > 0 && (
        <div className="mb-6">
          <h3 className="font-semibold mb-3 uppercase text-sm">Brand</h3>
          <ul className="space-y-2 text-sm">
            {brands.map((brand) => (
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
      )}

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
  );
};

export default FilterSidebar;
