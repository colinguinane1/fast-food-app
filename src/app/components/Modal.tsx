"use client";
import React, { useRef, useEffect, useState } from "react";
import Backdrop from "./Backdrop";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";

interface ItemData {
  itemImageURL: string;
  itemName: string;
  itemCalories: number;
  itemDescription: string;
  itemBasePrice: number;
  itemIngredients: {
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
  setCartValue: any;
}

const Modal: React.FC<ModalProps> = ({
  itemData,
  toggleModal,
  setCartValue,
  cartValue,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [customize, setCustomize] = useState<boolean>(true);
  const largeScreen = useMediaQuery("min-width: 768px");
  const [ingredients, setIngredients] = useState<{
    [key: string]: { count: number };
  }>(
    Object.fromEntries(
      Object.entries(itemData.itemIngredients).map(([key, value]) => [
        key,
        { count: value.count },
      ])
    )
  );
  const [totalPrice, setTotalPrice] = useState<number>(itemData.itemBasePrice);

  const handleClickOutside = (event: MouseEvent) => {
    console.log("Clicked outside");
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggleModal();
    }
  };

  const addToCart = () => {
    setCartValue(cartValue + totalPrice);
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

  const updateIngredientCount = (ingredientName: string, value: number) => {
    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredientName]: { count: value },
    }));
  };

  const addIngredient = (ingredientName: string) => {
    if (
      ingredients[ingredientName] &&
      ingredients[ingredientName].count <
        itemData.itemIngredients[ingredientName].max
    ) {
      updateIngredientCount(
        ingredientName,
        ingredients[ingredientName].count + 1
      );
      if (
        ingredients[ingredientName].count + 1 >
        itemData.itemIngredients[ingredientName].comesWith
      ) {
        setTotalPrice(
          (prevTotalPrice) =>
            prevTotalPrice + itemData.itemIngredients[ingredientName].price
        );
      }
    }
  };

  const removeIngredient = (ingredientName: string) => {
    if (
      ingredients[ingredientName] &&
      ingredients[ingredientName].count >
        itemData.itemIngredients[ingredientName].min
    ) {
      updateIngredientCount(
        ingredientName,
        ingredients[ingredientName].count - 1
      );
      if (
        ingredients[ingredientName].count >
        itemData.itemIngredients[ingredientName].comesWith
      ) {
        setTotalPrice(
          (prevTotalPrice) =>
            prevTotalPrice - itemData.itemIngredients[ingredientName].price
        );
      }
    }
  };

  return (
    <motion.main
      initial={largeScreen ? { y: 0, scale: 0 } : { y: 1000, scale: 1 }}
      animate={largeScreen ? { y: 0, scale: 1 } : { y: 0, scale: 1 }}
      exit={largeScreen ? { y: 0, scale: 0 } : { y: 1000, scale: 1 }}
      transition={{ type: "spring", duration: 0.4 }}
      className="no_transition flex flex-col items-center justify-center h-screen  z-[100]"
    >
      <div className="fixed flex  h-screen items-center  justify-center">
        <div
          ref={modalRef}
          className="bg-white md:w-[70vw] w-screen md:h-[80vh] rounded-lg   h-full p-4  overflow-y-auto"
        >
          <div className="border-b mb-2  ">
            <div className="flex flex-col items-center">
              <button className="    px-2 " onClick={toggleModal}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-bar-down"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 20l0 -10" />
                  <path d="M12 20l4 -4" />
                  <path d="M12 20l-4 -4" />
                  <path d="M4 4l16 0" />
                </svg>
              </button>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={itemData.itemImageURL}
                className="w-full h-full max-w-[400px]"
                alt={itemData.itemName}
              />
            </div>
            <h1 className="font-extrabold text-2xl py-1">
              {itemData.itemName}
            </h1>
            <p className="text-sm ">{itemData.itemDescription}</p>
            <div className="flex items-center gap-2 py-1">
              <h1
                className={`${
                  totalPrice !== itemData.itemBasePrice ? "text-green-500" : ""
                }`}
              >
                ${totalPrice.toFixed(2)}
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
                className="grid grid-cols-1 no_transition border-b"
              >
                {Object.entries(itemData.itemIngredients).map(
                  ([ingredientName, ingredient]) => (
                    <div
                      key={ingredientName}
                      className="flex flex-row py-3 items-center justify-between"
                    >
                      <p
                        className={`capitalize ${
                          ingredients[ingredientName]?.count >
                          ingredient.comesWith
                            ? "text-green-500"
                            : ""
                        } ${
                          ingredients[ingredientName]?.count === 0
                            ? "text-gray-200 line-through"
                            : ""
                        }`}
                      >
                        {ingredientName}
                        {ingredients[ingredientName]?.count >
                        ingredient.comesWith
                          ? ": Extra"
                          : ": Regular"}
                        {ingredients[ingredientName]?.count >
                        ingredient.comesWith + 1
                          ? " x2"
                          : ""}
                      </p>
                      <div className="">
                        <h1 className="text-gray-200">
                          +${ingredient.price.toFixed(2)}
                        </h1>
                      </div>
                      <div className="flex gap-2 items-center ">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addIngredient(ingredientName)}
                          className="no_transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`icon icon-tabler icon-tabler-plus  stroke-white rounded-lg w-7 h-7 ${
                              ingredients[ingredientName]?.count ===
                              ingredient.max
                                ? "bg-gray-200 stroke-slate-300 cursor-not-allowed"
                                : "bg-green-500"
                            }`}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#ffffff"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M12 5v14" />
                            <path d="M5 12h14" />
                          </svg>
                        </motion.button>
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="no_transition"
                          onClick={() => removeIngredient(ingredientName)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`icon icon-tabler icon-tabler-minus stroke-white 0 rounded-lg w-7 h-7 
                            ${
                              ingredients[ingredientName]?.count ===
                              ingredient.min
                                ? "bg-gray-200 stroke-slate-300 cursor-not-allowed"
                                : "bg-green-500"
                            }
                          `}
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#ffffff"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M5 12h14" />
                          </svg>
                        </motion.button>{" "}
                      </div>{" "}
                    </div>
                  )
                )}
              </motion.div>
            )}{" "}
          </AnimatePresence>
          {/* <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={toggleCustomize}
              className="bg-green-500 no_transition flex items-center py-2 hover:bg-green-700 rounded-lg px-2 text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-settings stroke-white"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M10.325 4.317c.426 -1.756 2.924 -1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543 -.94 3.31 .826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756 .426 1.756 2.924 0 3.35a1.724 1.724 0 0 0 -1.066 2.573c.94 1.543 -.826 3.31 -2.37 2.37a1.724 1.724 0 0 0 -2.572 1.065c-.426 1.756 -2.924 1.756 -3.35 0a1.724 1.724 0 0 0 -2.573 -1.066c-1.543 .94 -3.31 -.826 -2.37 -2.37a1.724 1.724 0 0 0 -1.065 -2.572c-1.756 -.426 -1.756 -2.924 0 -3.35a1.724 1.724 0 0 0 1.066 -2.573c-.94 -1.543 .826 -3.31 2.37 -2.37c1 .608 2.296 .07 2.572 -1.065z" />
                <path d="M9 12a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" />
              </svg>
            </motion.button>{" "} */}
          <div className="md:flex items-center gap-2 md:relative w-full fixed bottom-4">
            {" "}
          </div>{" "}
          {!largeScreen && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addToCart}
              className={`bg-green-500 ${
                largeScreen ? "fixed" : ""
              } no_transition w-full px-20 my-4 md:mb-20 hover:bg-green-700 z-[1000] rounded-lg py-3 text-white`}
            >
              Add +${totalPrice.toFixed(2)}
            </motion.button>
          )}
        </div>{" "}
      </div>
    </motion.main>
  );
};

export default Modal;
