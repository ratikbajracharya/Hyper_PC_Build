import React from "react";

const Accessories = () => {
  const products = [
    { id: 1, name: "accessories 1", image: "/images/Accessories/accessories1.jpg", price: "$1200" },
    { id: 2, name: "accessories 2", image: "/images/Accessories/accessories2.jpg", price: "$1400" },
    { id: 3, name: "accessories 3", image: "/images/Accessories/accessories3.png", price: "$850" },
    { id: 4, name: "accessories 4", image: "/images/Accessories/accessories4.jpg", price: "$2000" },
    { id: 5, name: "accessories 5", image: "/images/Accessories/accessories5.jpg", price: "$650" },
    { id: 6, name: "accessories 6", image: "/images/Accessories/accessories6.jpg", price: "$700" },
  ];

  return (
    <div className="flex bg-gray-50 min-h-screen">
      {/* Filter Sidebar */}
      <aside className="w-1/4 p-6 border-r bg-white">
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
      <main className="w-3/4 p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="border rounded-lg p-4 bg-white shadow hover:shadow-md transition"
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-56 object-contain rounded mb-4 bg-gray-100"
            />
            <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
            <p className="text-gray-700 text-sm">{product.price}</p>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Accessories;
