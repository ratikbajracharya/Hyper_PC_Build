import React, { createContext, useContext, useState } from "react";

const BagContext = createContext();

export const useBag = () => useContext(BagContext);

export const BagProvider = ({ children }) => {
  const [bagItems, setBagItems] = useState([]);

  const addToBag = (product) => {
    setBagItems((prev) => [...prev, product]);
  };

  return (
    <BagContext.Provider value={{ bagItems, addToBag }}>
      {children}
    </BagContext.Provider>
  );
};
