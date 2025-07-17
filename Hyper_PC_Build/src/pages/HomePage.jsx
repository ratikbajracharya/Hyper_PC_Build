import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div className="font-['Roboto'] text-gray-900">
      <header className="sticky top-0 bg-white h-[66px] shadow-md z-50 px-[5vw] py-[13px]">
      </header>

      {/* Main Body */}
      <main>
        {/* Hero Banners */}
        <section className="bg-[#f2f2f2] px-[5vw] my-6">
          {[
            { img: 'home1.jpg', label: 'Buy now' },
            { img: 'home2.jpg', label: 'Shop now' },
            { img: 'home3.jpg', label: 'Shop now' },
          ].map((item, i) => (
            <div key={i} className="relative mb-6">
              <img className="w-[80vw] mx-auto mb-2" src={`/images/${item.img}`} alt={`Banner ${i + 1}`} />
              <button className="absolute bottom-4 left-4 text-white bg-[#c21f2e] py-3 px-8 text-base rounded">
                {item.label}
              </button>
            </div>
          ))}
          <img className="w-[80vw] mx-auto" src="/images/home4.gif" alt="Promotional GIF" />
        </section>

        {/* Dual Image Section */}
        <section className="flex bg-[#f2f2f2] px-[5vw] my-6 justify-center gap-4 flex-wrap">
          <img className="w-[45vw] object-cover rounded" src="/images/home5.jpeg" alt="PC Bundle" />
          <img className="w-[45vw] object-cover rounded" src="/images/home6.png" alt="Setup Showcase" />
        </section>

        {/* Item Grid Section */}
        <section className="flex flex-wrap bg-[#f2f2f2] px-[5vw] my-6 justify-center gap-3">
          {['item1.jpg', 'item2.jpg', 'item3.jpg', 'item4.jpg', 'item5.jpg', 'item6.jpg'].map((img, idx) => (
            <img
              key={idx}
              className="w-[14vw] object-cover rounded"
              src={`/images/${img}`}
              alt={`Product ${idx + 1}`}
            />
          ))}
        </section>
      </main>

      {/* Footer */}
      <footer className="py-6 text-center text-gray-700 shadow-md mt-8">
        &copy; Hyper_Pc_Build 2023. All rights reserved.
      </footer>
    </div>
  );
};

export default HomePage;