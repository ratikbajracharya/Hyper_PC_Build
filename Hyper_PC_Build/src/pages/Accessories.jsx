import React from "react";
import { useCart } from "../CartContext"; // adjust path if needed

const Accessories = () => {
  const products = [
    { id: "acc-1", name: "Accessories 1", image: "/images/Accessories/accessories1.jpg", price: "$1200" },
    { id: "acc-2", name: "Accessories 2", image: "/images/Accessories/accessories2.jpg", price: "$1400" },
    { id: "acc-3", name: "Accessories 3", image: "/images/Accessories/accessories3.png", price: "$850" },
    { id: "acc-4", name: "Accessories 4", image: "/images/Accessories/accessories4.jpg", price: "$2000" },
    { id: "acc-5", name: "Accessories 5", image: "/images/Accessories/accessories5.jpg", price: "$650" },
    { id: "acc-6", name: "Accessories 6", image: "/images/Accessories/accessories6.jpg", price: "$700" },
  ];

  const { addToCart } = useCart();

  const handleAddToBag = (product) => {
    const price = parseFloat(product.price.replace("$", ""));
    addToCart({ ...product, price }); // ensure price is a number
  };

  return (
    <div className="flex bg-gray-100 min-h-screen">
      {/* Sidebar Filter */}
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

export default Accessories;
