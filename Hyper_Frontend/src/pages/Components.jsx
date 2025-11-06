import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../CartContext";
import FilterSidebar from "../components/FilterSidebar"; // Import reusable filter sidebar

const Components = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { addToCart } = useCart();

  // Filters
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [inStock, setInStock] = useState(false);

  // Fetch products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        "http://127.0.0.1:8000/api/products/products/"
      );

      let data = Array.isArray(response.data)
        ? response.data
        : response.data.results || [];

      // Exclude accessories & monitors
      data = data.filter(
        (item) => item.category !== "accessory" && item.category !== "monitor"
      );

      setProducts(data);
    } catch (err) {
      console.error("Error fetching components:", err);
      setError("Failed to load components.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [selectedBrands, selectedCategories, priceRange, inStock]);

  const handleAddToBag = (product) => {
    const price = parseFloat(product.price);
    addToCart({ ...product, price });
  };

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Reusable Filter Sidebar */}
      <FilterSidebar
        selectedBrands={selectedBrands}
        setSelectedBrands={setSelectedBrands}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        inStock={inStock}
        setInStock={setInStock}
        categories={["CPU", "GPU", "RAM", "Motherboard", "Storage"]}
        brands={["Intel", "AMD", "NVIDIA", "Corsair", "Samsung"]}
      />

      {/* Product Grid */}
      <main className="w-full md:w-3/4 p-6">
        {loading ? (
          <p className="text-center mt-8">Loading components...</p>
        ) : error ? (
          <p className="text-center mt-8 text-red-600">{error}</p>
        ) : products.length === 0 ? (
          <div className="flex flex-col items-center mt-10">
            <img
              src="/no-products.svg"
              alt="No components found"
              className="w-48 h-48 mb-4"
            />
            <p className="text-gray-300 text-lg">No components found.</p>
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

export default Components;
