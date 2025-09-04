import React, { createContext, useContext, useState, useEffect, useCallback } from "react";

const CartContext = createContext();
export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cartItems");
    return saved ? JSON.parse(saved) : [];
  });

  const [wishlistItems, setWishlistItems] = useState(() => {
    const saved = localStorage.getItem("wishlistItems");
    return saved ? JSON.parse(saved) : [];
  });

  // Persist cart
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  // Persist wishlist
  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
  }, [wishlistItems]);

  // Cart functions
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

  const updateQty = useCallback((id, qty) => {
    setCartItems((items) =>
      items.map((i) => (i.id === id ? { ...i, quantity: Math.max(1, qty) } : i))
    );
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);

  // Wishlist functions
  const addToWishlist = useCallback((product) => {
    setWishlistItems((items) => {
      if (!items.find((i) => i.id === product.id)) {
        return [...items, product];
      }
      return items;
    });
  }, []);

  const removeFromWishlist = useCallback((id) => {
    setWishlistItems((items) => items.filter((i) => i.id !== id));
  }, []);

  const value = {
    cartItems,
    wishlistItems,
    addToCart,
    removeFromCart,
    updateQty,
    clearCart,
    addToWishlist,
    removeFromWishlist,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
