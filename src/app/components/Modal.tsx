import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";
import ExtraIngredients from "./customizations/ExtraIngredients";
import MainIngredients from "./customizations/MainIngredients";
import DipIngredients from "./customizations/DipIngredients";
import SizeCustomization from "./customizations/SizeCustomization";
import Navbar from "./Navbar";
import { useCart } from "../context/CartContext";

interface ItemData {
  itemNewProduct: boolean;
  itemImageURL: string;
  itemName: string;
  itemCalories: number;
  itemDescription: string;
  itemBasePrice: number;
  itemVegetarian: boolean;
  itemSale: boolean;
  itemSalePrice: number;
  itemSizes: {
    [key: string]: {
      price: number;
    };
  };
  itemDip: {
    maxDips: number;
    availableDips: {
      [key: string]: {
        count: number;
        max: number;
        min: number;
      };
    };
  };
  itemIngredients: {
    [key: string]: {
      count: number;
      price: number;
      comesWith: number;
      max: number;
      min: number;
    };
  };
  itemExtraIngredients: {
    [key: string]: {
      count: number;
      price: number;
      comesWith: number;
      max: number;
      min: number;
    };
  };
}
interface CartItem {
  name: string;
  price: number;
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

interface ModalProps {
  itemData: ItemData;
  toggleModal: () => void;
  cartValue: number;
  setCartValue: (value: number) => void;
  currentCurrency: string;
  cartCount: number;
  setCartCount: (count: number) => void;
  cartContents: CartItem[];
  setCartContents: (contents: CartItem[]) => void;
}

const Modal: React.FC<ModalProps> = ({
  itemData,
  toggleModal,
  setCartValue,
  cartValue,
  currentCurrency,
  cartCount,
  cartContents,
  setCartContents,
  setCartCount,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const [customize, setCustomize] = useState<boolean>(true);
  const largeScreen = useMediaQuery("min-width: 768px");
  const [totalPrice, setTotalPrice] = useState<number>(
    itemData.itemSale ? itemData.itemSalePrice : itemData.itemBasePrice
  );
  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggleModal();
    }
  };

  const { addToCart } = useCart();

  const handleAddToCart = () => {
    const newItem = {
      name: itemData.itemName,
      basePrice: itemData.itemBasePrice,
      saleActive: itemData.itemSale,
      salePrice: itemData.itemSalePrice,
      price: totalPrice,
      image: itemData.itemImageURL,
      sizeCustomizations: itemData.itemSizes,
      dipCustomizations: itemData.itemDip,
      itemCustomizations: itemData.itemIngredients,
      extraAdditions: itemData.itemExtraIngredients,
    };
    addToCart(newItem); // Add item to cart using the context function
    toggleModal();
  };

  const toggleCustomize = () => {
    setCustomize(!customize);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <motion.main
      initial={largeScreen ? { y: 0, scale: 0 } : { y: 2000, scale: 1 }}
      animate={largeScreen ? { y: 0, scale: 1 } : { y: 0, scale: 1 }}
      exit={largeScreen ? { y: 0, scale: 0 } : { y: 2000, scale: 1 }}
      transition={{ type: "spring", duration: 0.5 }}
      className="no_transition flex flex-col items-center justify-center h-screen z-[100] overflow-hidden "
    >
      <div className="fixed flex h-screen items-center justify-center overflow-hidden">
        <div
          ref={modalRef}
          className=" bg-gradient-to-b from-slate-200 to-white md:w-[85vw] w-screen md:m-h-fit md:pb-4 pb-20 md:h-fit md:max-h-[80vh] md:rounded-lg h-full p-4 overflow-y-auto overflow-hidden"
        >
          <div className=" py-3 border-b mb-3">
            <div className="flex flex-col items-center">
              <button
                className="block md:hidden  md:-mt-6 py-4 px-2"
                onClick={toggleModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-bar-down"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 20l0 -10" />
                  <path d="M12 20l4 -4" />
                  <path d="M12 20l-4 -4" />
                  <path d="M4 4l16 0" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center py-4">
              <img
                src={itemData.itemImageURL}
                className="w-full h-full max-w-[400px]"
                alt={itemData.itemName}
              />
            </div>
            <div className="flex items-center gap-4">
              <h1 className="font-extrabold text-2xl py-1">
                {itemData.itemName}
              </h1>
              {itemData.itemVegetarian && (
                <h1 className="bg-yellow-300 px-3 rounded-full border-yellow-500 border text-base text-yellow-600">
                  Vegetarian
                </h1>
              )}
              {itemData.itemNewProduct && (
                <h1 className="bg-red-300 text-sm px-3 rounded-full border-red-500 border text-red-500">
                  New
                </h1>
              )}
            </div>
            <p className="text-sm">{itemData.itemDescription}</p>
            <div className="flex items-center gap-2 py-1">
              <h1
                className={`${totalPrice !== itemData.itemBasePrice ? "" : ""}`}
              >
                {itemData.itemSale ? (
                  <main className="flex items-center gap-3 py-1">
                    {" "}
                    <h1 className="bg-green-500  min-w-fit flex items-center gap-1 px-1 rounded-full bg-opacity-30 border border-green-500 text-green-500">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="icon icon-tabler icon-tabler-tag stroke-green-500"
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="#2c3e50"
                        fill="none"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      >
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <path d="M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                        <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" />
                      </svg>
                      Sale
                    </h1>
                    <h1 className="text-green-500">
                      ${totalPrice.toFixed(2)}
                      {currentCurrency}
                    </h1>{" "}
                    <h1 className="line-through text-gray-400">
                      ${itemData.itemBasePrice}
                      {currentCurrency}
                    </h1>
                  </main>
                ) : (
                  "$" + itemData.itemBasePrice.toFixed(2) + currentCurrency
                )}
              </h1>
              <h1> - </h1>
              <h1 className="text-sm">{itemData.itemCalories} kcals</h1>
            </div>
          </div>
          <AnimatePresence>
            {customize && (
              <motion.div
                initial={{ y: 500 }}
                animate={{ y: 0 }}
                exit={{ y: 500 }}
                transition={{ type: "spring", duration: 0.3 }}
                className="grid grid-cols-1 no_transition "
              >
                <MainIngredients
                  itemData={itemData}
                  setTotalPrice={setTotalPrice}
                />
                <ExtraIngredients
                  itemData={itemData}
                  setTotalPrice={setTotalPrice}
                />
                <DipIngredients
                  itemData={itemData}
                  setTotalPrice={setTotalPrice}
                />
                <SizeCustomization
                  itemData={itemData}
                  setTotalPrice={setTotalPrice}
                />
              </motion.div>
            )}
          </AnimatePresence>
          <div className="md:flex items-center gap-2 md:relative w-full fixed bottom-4"></div>
          {!largeScreen && (
            <motion.button
              whileHover={{ scale: 1.0 }}
              whileTap={{ scale: 0.9 }}
              onClick={handleAddToCart}
              className={`bg-green-500 ${
                largeScreen ? "fixed" : ""
              } no_transition flex items-center justify-center w-full mt-3 mb-20 md:mb-0 hover:bg-green-700 z-[1000] rounded-lg py-3 text-white`}
            >
              Add +${totalPrice.toFixed(2)}
              {currentCurrency}
            </motion.button>
          )}
        </div>
      </div>
    </motion.main>
  );
};

export default Modal;
