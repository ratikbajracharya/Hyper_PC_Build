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
  title = "Filter By",
  maxPrice = 10000,
}) => {
  const priceGap = 100;
  const minRangeRef = useRef(null);
  const maxRangeRef = useRef(null);
  const progressRef = useRef(null);

  // Update progress bar dynamically
  useEffect(() => {
    if (progressRef.current) {
      const minPercent = (priceRange[0] / maxPrice) * 100;
      const maxPercent = (priceRange[1] / maxPrice) * 100;
      progressRef.current.style.left = `${minPercent}%`;
      progressRef.current.style.right = `${100 - maxPercent}%`;
    }
  }, [priceRange, maxPrice]);

  // Handle price input and slider changes
  const handleMinInput = (e) => {
    let val = Math.min(Number(e.target.value), priceRange[1] - priceGap);
    setPriceRange([Math.max(val, 0), priceRange[1]]);
  };

  const handleMaxInput = (e) => {
    let val = Math.max(Number(e.target.value), priceRange[0] + priceGap);
    setPriceRange([priceRange[0], Math.min(val, maxPrice)]);
  };

  const handleMinRange = handleMinInput;
  const handleMaxRange = handleMaxInput;

  // Drag functionality for slider knobs
  const dragHandle = (e, type) => {
    e.preventDefault();
    const slider = e.target.parentElement;
    const rect = slider.getBoundingClientRect();

    const onMouseMove = (moveEvent) => {
      let newValue = Math.round(
        ((moveEvent.clientX - rect.left) / rect.width) * maxPrice
      );
      if (type === "min") {
        newValue = Math.min(newValue, priceRange[1] - priceGap);
        setPriceRange([Math.max(newValue, 0), priceRange[1]]);
      } else {
        newValue = Math.max(newValue, priceRange[0] + priceGap);
        setPriceRange([priceRange[0], Math.min(newValue, maxPrice)]);
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
      prev.includes(brand)
        ? prev.filter((b) => b !== brand)
        : [...prev, brand]
    );
  };

  const handleCategoryChange = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat)
        ? prev.filter((c) => c !== cat)
        : [...prev, cat]
    );
  };

  return (
    <aside className="w-1/4 p-6 hidden md:block sticky top-0 h-screen overflow-y-auto 
                     bg-gradient-to-b from-gray-900 to-black text-white border-r border-gray-800 shadow-xl">
      {/* Sidebar Title */}
      <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-2">
        <h2 className="text-2xl font-extrabold tracking-wide text-red-500">
          {title}
        </h2>
        <button
          onClick={() => {
            setSelectedBrands([]);
            setSelectedCategories([]);
            setPriceRange([0, maxPrice]);
            setInStock(false);
          }}
          className="text-xs text-white/70 hover:text-white transition"
        >
          Reset
        </button>
      </div>

      {/* Category Filter */}
      {categories.length > 0 && (
        <div className="mb-8 bg-gray-800/60 p-4 rounded-xl border border-gray-700 shadow-inner">
          <h3 className="font-semibold mb-3 uppercase text-sm text-red-400">
            Category
          </h3>
          <ul className="space-y-2 text-sm">
            {categories.map((cat) => (
              <li key={cat}>
                <label className="flex items-center cursor-pointer hover:text-red-400 transition">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="mr-2 accent-red-600 transform scale-110 hover:scale-125 transition"
                  />
                  <span className="text-white">{cat}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Price Filter */}
      <div className="mb-8 bg-gray-800/60 p-4 rounded-xl border border-gray-700 shadow-inner">
        <h3 className="font-semibold mb-3 uppercase text-sm text-red-400">
          Price Range
        </h3>
        <div className="flex items-center mb-4">
          <input
            type="number"
            value={priceRange[0]}
            onChange={handleMinInput}
            className="w-1/2 border border-gray-600 px-2 py-1 rounded text-center bg-gray-900 text-white focus:ring-1 focus:ring-red-500 outline-none"
          />
          <span className="mx-2 text-white">-</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={handleMaxInput}
            className="w-1/2 border border-gray-600 px-2 py-1 rounded text-center bg-gray-900 text-white focus:ring-1 focus:ring-red-500 outline-none"
          />
        </div>

        <div className="relative h-2 bg-gray-700 rounded">
          <div
            ref={progressRef}
            className="absolute h-2 bg-red-600 rounded transition-all duration-300"
            style={{
              left: `${(priceRange[0] / maxPrice) * 100}%`,
              right: `${100 - (priceRange[1] / maxPrice) * 100}%`,
            }}
          />
          <input
            ref={minRangeRef}
            type="range"
            min="0"
            max={maxPrice}
            step="10"
            value={priceRange[0]}
            onChange={handleMinRange}
            className="absolute w-full h-2 appearance-none pointer-events-none"
          />
          <input
            ref={maxRangeRef}
            type="range"
            min="0"
            max={maxPrice}
            step="10"
            value={priceRange[1]}
            onChange={handleMaxRange}
            className="absolute w-full h-2 appearance-none pointer-events-none"
          />
          {/* Slider Handles */}
          <div
            className="absolute top-1/2 w-5 h-5 bg-red-600 rounded-full shadow-md border border-white/30 -translate-y-1/2 cursor-pointer hover:scale-110 transition"
            style={{
              left: `calc(${(priceRange[0] / maxPrice) * 100}% - 0.625rem)`,
            }}
            onMouseDown={(e) => dragHandle(e, "min")}
          />
          <div
            className="absolute top-1/2 w-5 h-5 bg-red-600 rounded-full shadow-md border border-white/30 -translate-y-1/2 cursor-pointer hover:scale-110 transition"
            style={{
              left: `calc(${(priceRange[1] / maxPrice) * 100}% - 0.625rem)`,
            }}
            onMouseDown={(e) => dragHandle(e, "max")}
          />
        </div>
      </div>

      {/* Brand Filter */}
      {brands.length > 0 && (
        <div className="mb-8 bg-gray-800/60 p-4 rounded-xl border border-gray-700 shadow-inner">
          <h3 className="font-semibold mb-3 uppercase text-sm text-red-400">
            Brand
          </h3>
          <ul className="space-y-2 text-sm">
            {brands.map((brand) => (
              <li key={brand}>
                <label className="flex items-center cursor-pointer hover:text-red-400 transition">
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandChange(brand)}
                    className="mr-2 accent-red-600 transform scale-110 hover:scale-125 transition"
                  />
                  <span className="text-white">{brand}</span>
                </label>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Availability Filter */}
      <div className="bg-gray-800/60 p-4 rounded-xl border border-gray-700 shadow-inner">
        <h3 className="font-semibold mb-3 uppercase text-sm text-red-400">
          Availability
        </h3>
        <label className="flex items-center text-sm cursor-pointer hover:text-red-400 transition">
          <input
            type="checkbox"
            checked={inStock}
            onChange={() => setInStock(!inStock)}
            className="mr-2 accent-red-600 transform scale-110 hover:scale-125 transition"
          />
          <span className="text-white">In Stock Only</span>
        </label>
      </div>
    </aside>
  );
};

export default FilterSidebar;
