import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const saved = localStorage.getItem("cartItems");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch {}
  }, [cartItems]);

  const addToCart = useCallback((product) => {
    setCartItems((items) => {
      const existing = items.find((i) => i.id === product.id);
      if (existing) {
        return items.map((i) =>
          i.id === product.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      } else {
        return [...items, { ...product, quantity: 1 }];
      }
    });
  }, []);

  const removeFromCart = useCallback((id) => {
    setCartItems((items) => items.filter((i) => i.id !== id));
  }, []);

  const updateQty = useCallback((id, quantity) => {
    setCartItems((items) =>
      items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, quantity) } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQty, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
