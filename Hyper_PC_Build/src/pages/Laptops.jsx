import React from "react";
import { useCart } from "../CartContext";

const Laptops = () => {
  const products = [
    { id: "lap-1", name: "Laptop 1", image: "/images/Laptops/laptop1.jpg", price: 1200 },
    { id: "lap-2", name: "Laptop 2", image: "/images/Laptops/laptop2.jpg", price: 1400 },
    { id: "lap-3", name: "Laptop 3", image: "/images/Laptops/laptop3.jpg", price: 850 },
    { id: "lap-4", name: "Laptop 4", image: "/images/Laptops/laptop4.png", price: 2000 },
    { id: "lap-5", name: "Laptop 5", image: "/images/Laptops/laptop5.webp", price: 650 },
    { id: "lap-6", name: "Laptop 6", image: "/images/Laptops/laptop6.jpg", price: 700 },
  ];

  const { addToCart } = useCart();
  const handleAddToBag = (product) => addToCart(product);

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar */}
      <aside className="w-1/4 p-6 border-r bg-white hidden md:block">
        <h2 className="text-xl font-bold mb-6">Filter By</h2>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Category</h3>
          <ul className="space-y-2 text-sm">
            <li><label><input type="checkbox" className="mr-2" />Gaming</label></li>
            <li><label><input type="checkbox" className="mr-2" />Office</label></li>
            <li><label><input type="checkbox" className="mr-2" />Compact</label></li>
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Price</h3>
          <input type="range" min="500" max="2500" className="w-full" />
        </div>

        <div className="mb-6">
          <h3 className="font-semibold mb-2">Color</h3>
          <ul className="space-y-2 text-sm">
            <li><label><input type="checkbox" className="mr-2" />Black</label></li>
            <li><label><input type="checkbox" className="mr-2" />White</label></li>
          </ul>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Brands</h3>
          <ul className="space-y-2 text-sm">
            <li><label><input type="checkbox" className="mr-2" />HP</label></li>
            <li><label><input type="checkbox" className="mr-2" />Lenovo</label></li>
            <li><label><input type="checkbox" className="mr-2" />Custom</label></li>
          </ul>
        </div>
      </aside>

      {/* Products */}
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
      </main>
    </div>
  );
};

export default Laptops;
