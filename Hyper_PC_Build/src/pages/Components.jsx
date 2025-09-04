import React from "react";
import { useCart } from "../CartContext"; // adjust path if needed

const Components = () => {
  const products = [
    { id: "com-1", name: "Component 1", image: "/images/Components/component1.jpg", price: "$300" },
    { id: "com-2", name: "Component 2", image: "/images/Components/component2.jpg", price: "$500" },
    { id: "com-3", name: "Component 3", image: "/images/Components/component3.jpg", price: "$750" },
    { id: "com-4", name: "Component 4", image: "/images/Components/component4.jpg", price: "$1100" },
    { id: "com-5", name: "Component 5", image: "/images/Components/component5.jpg", price: "$250" },
    { id: "com-6", name: "Component 6", image: "/images/Components/component6.jpg", price: "$950" },
  ];

  const { addToCart } = useCart();

  const handleAddToBag = (product) => {
    const price = parseFloat(product.price.replace("$", ""));
    addToCart({ ...product, price }); // ensures price is number
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar Filter */}
      <aside className="w-1/4 p-6 border-r bg-white hidden md:block">
        <h2 className="text-xl font-bold mb-6">Filter By</h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Category</h3>
          <ul className="space-y-2 text-sm">
            <li><label><input type="checkbox" className="mr-2" />CPU</label></li>
            <li><label><input type="checkbox" className="mr-2" />GPU</label></li>
            <li><label><input type="checkbox" className="mr-2" />RAM</label></li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price</h3>
          <input type="range" min="100" max="2000" className="w-full" />
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Brand</h3>
          <ul className="space-y-2 text-sm">
            <li><label><input type="checkbox" className="mr-2" />Intel</label></li>
            <li><label><input type="checkbox" className="mr-2" />AMD</label></li>
            <li><label><input type="checkbox" className="mr-2" />NVIDIA</label></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Availability</h3>
          <ul className="space-y-2 text-sm">
            <li><label><input type="checkbox" className="mr-2" />In Stock</label></li>
            <li><label><input type="checkbox" className="mr-2" />Pre-order</label></li>
          </ul>
        </div>
      </aside>

      {/* Product Grid */}
      <main className="w-full md:w-3/4 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition flex flex-col"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-contain rounded mb-4 bg-gray-100"
            />
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>

            <p className="text-red-600 font-semibold bg-red-100 px-3 py-1 inline-block rounded mb-3">
              {product.price}
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
      </main>
    </div>
  );
};

export default Components;
