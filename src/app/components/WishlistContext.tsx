'use client'
import React, { createContext, useContext, useState, ReactNode } from "react";


export type Product = {
  image: string;
  category: string;
  price: number;
};


interface WishlistContextType {
  wishlist: Product[];
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (product: Product) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);


export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load wishlist from localStorage on client only
  React.useEffect(() => {
    const stored = localStorage.getItem('wishlist');
    if (stored) {
      setWishlist(JSON.parse(stored));
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  React.useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((p) => p.image === product.image && p.category === product.category && p.price === product.price)) {
        return prev;
      }
      return [...prev, product];
    });
  };

  const removeFromWishlist = (product: Product) => {
    setWishlist((prev) =>
      prev.filter(
        (p) =>
          !(
            p.image === product.image &&
            p.category === product.category &&
            p.price === product.price
          )
      )
    );
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within a WishlistProvider");
  return context;
};
