"use client";
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CartItem {
  saleActive: boolean;
  salePrice: number;
  name: string;
  price: number;
  basePrice: number;
  image: string;
  sizeCustomizations: {
    [key: string]: {
      price: number;
    };
  };
  dipCustomizations: {
    maxDips: number;
    availableDips: {
      [key: string]: {
        count: number;
        max: number;
        min: number;
      };
    };
  };
  itemCustomizations: {
    [key: string]: {
      count: number;
      price: number;
      comesWith: number;
      max: number;
      min: number;
    };
  };
  extraAdditions: {
    [key: string]: {
      count: number;
      price: number;
      comesWith: number;
      max: number;
      min: number;
    };
  };
}

interface CartContextProps {
  cartContents: CartItem[];
  cartValue: number;
  cartCount: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
}

const CartContext = createContext<CartContextProps | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartContents, setCartContents] = useState<CartItem[]>([]);

  // Load cart data from local storage on component mount
  useEffect(() => {
    const savedCart = localStorage.getItem("cartContents");
    if (savedCart) {
      setCartContents(JSON.parse(savedCart));
    }
  }, []);

  // Save cart data to local storage whenever cartContents change
  useEffect(() => {
    localStorage.setItem("cartContents", JSON.stringify(cartContents));
  }, [cartContents]);

  const addToCart = (item: CartItem) => {
    setCartContents((prevContents) => [...prevContents, item]);
  };

  const removeFromCart = (item: CartItem) => {
    setCartContents((prevContents) =>
      prevContents.filter((cartItem) => cartItem.name !== item.name)
    );
  };

  const cartValue = cartContents.reduce((total, item) => total + item.price, 0);
  const cartCount = cartContents.length;

  return (
    <CartContext.Provider
      value={{ cartContents, cartValue, cartCount, addToCart, removeFromCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
