import React from 'react';
import 'font-awesome/css/font-awesome.min.css';
// import logo from "../Assets/images/";

const HomePage = () => {
  return (
    <div className="font-['Roboto'] text-gray-900">
      <header className="sticky top-0 bg-white h-[66px] shadow-md z-50 px-[5vw] py-[13px]">
        <nav className="flex justify-between items-center text-xs pt-3 flex-wrap">
          <div className="flex items-center space-x-4">
            {/* <img src={logo} alt="HPB logo" className="w-[90px] h-[38px]" /> */}
            <ul className="flex items-center uppercase font-semibold text-sm space-x-3">
              <li>Prebuilt PC</li>
              <li>Monitors</li>
              <li>Components</li>
              <li>Laptops</li>
              <li>Accessories</li>
              <li>Build my pc</li>
            </ul>
          </div>
          <div className="flex items-center mt-2 lg:mt-0">
            <input
              className="bg-[#f7f8fd] border border-gray-400 rounded px-4 py-2 w-[34vw] mr-4"
              placeholder="Search for products, brands and more"
            />
            <div className="flex space-x-4 text-sm font-medium">
              <div className="cursor-pointer">Profile</div>
              <div className="cursor-pointer">Wishlist</div>
              <div className="cursor-pointer">Bag</div>
            </div>
          </div>
        </nav>
      </header>

      <section className="bg-[#f2f2f2] px-[5vw] my-6">
        {[
          { img: 'home1.jpg', label: 'Buy now' },
          { img: 'home2.jpg', label: 'Shop now' },
          { img: 'home3.jpg', label: 'Shop now' },
        ].map((item, i) => (
          <div key={i} className="relative mb-6">
            <img className="w-[80vw] mx-auto mb-2" src={`images/${item.img}`} alt={`home ${i}`} />
            <button className="absolute bottom-4 left-4 text-white bg-[#c21f2e] py-3 px-8 text-base rounded">
              {item.label}
            </button>
          </div>
        ))}
        <img className="w-[80vw] mx-auto" src="images/home4.gif" alt="home image 4" />
      </section>

      <section className="flex bg-[#f2f2f2] px-[5vw] my-6 justify-center gap-4 flex-wrap">
        <img className="w-[45vw] object-cover rounded" src="images/home5.jpeg" alt="home image 5" />
        <img className="w-[45vw] object-cover rounded" src="images/home6.png" alt="home image 6" />
      </section>

      <section className="flex flex-wrap bg-[#f2f2f2] px-[5vw] my-6 justify-center gap-3">
        {['item1.jpg', 'item2.jpg', 'item3.jpg', 'item4.jpg', 'item5.jpg', 'item6.jpg'].map((img, idx) => (
          <img
            key={idx}
            className="w-[14vw] object-cover rounded"
            src={`images/${img}`}
            alt={`item image ${idx + 1}`}
          />
        ))}
      </section>

      <footer className="py-6 text-center text-gray-700 shadow-md mt-8">
        Copyright &copy; Hyper_Pc_Build 2023. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;
