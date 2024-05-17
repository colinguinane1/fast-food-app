"use client";
import React, { useRef, useEffect, useState } from "react";
import Backdrop from "./Backdrop";
import { AnimatePresence, motion } from "framer-motion";

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
  const [customize, setCustomize] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<{
    [key: string]: { count: number };
  }>({});
  const [totalPrice, setTotalPrice] = useState<number>(itemData.itemBasePrice);

  const handleClickOutside = (event: MouseEvent) => {
    console.log("Clicked outside");
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggleModal();
    }
  };

  const addToCart = () => {
    setCartValue(cartValue + totalPrice);
  };

  const toggleCustomize = () => {
    setCustomize(!customize);
  };

  useEffect(() => {
    console.log("modalRef:", modalRef.current);
    // Initialize ingredient counts from itemData
    const initialIngredients: { [key: string]: { count: number } } = {};
    Object.keys(itemData.itemIngredients).forEach((ingredientName) => {
      initialIngredients[ingredientName] = {
        count: itemData.itemIngredients[ingredientName].count,
      };
    });
    setIngredients(initialIngredients);

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [itemData, toggleModal]);

  const updateIngredientCount = (ingredientName: string, value: number) => {
    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredientName]: { count: value },
    }));
  };

  const addIngredient = (ingredientName: string) => {
    if (
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
    <main className="">
      <div className="fixed inset-0 flex items-center justify-center">
        <div
          ref={modalRef}
          className="bg-white md:h-full w-full md:mx-8 h-full md:max-h-fit p-4 rounded-lg overflow-y-auto"
          style={{ maxHeight: "100vh" }}
        >
          <div className="border-b 2 mb-4">
            <button
              className="absolute border rounded-full px-2 border-black right-4"
              onClick={toggleModal}
            >
              X
            </button>
            <img
              src={itemData.itemImageURL}
              className="w-full h-full"
              alt={itemData.itemName}
            />
            <h1 className="font-extrabold text-2xl">{itemData.itemName}</h1>
            <p className="text-sm">{itemData.itemDescription}</p>
            <div className="flex flex-col">
              <h1
                className={`${
                  totalPrice !== itemData.itemBasePrice ? "text-green-500" : ""
                }`}
              >
                ${totalPrice.toFixed(2)}
              </h1>
              <h1 className="text-sm">{itemData.itemCalories} kcals</h1>
            </div>
          </div>
          <AnimatePresence>
            {customize && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: "just" }}
                className="grid grid-cols-1 no_transition  gap-4 border-b mb-4"
              >
                {Object.entries(itemData.itemIngredients).map(
                  ([ingredientName, ingredient]) => (
                    <div
                      key={ingredientName}
                      className="flex flex-row py-4 justify-between"
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
                      <div className="flex gap-2 items-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addIngredient(ingredientName)}
                          className=""
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`icon icon-tabler icon-tabler-plus  stroke-white rounded-lg w-7 h-7 ${
                              ingredients[ingredientName].count ===
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
                          className=""
                          onClick={() => removeIngredient(ingredientName)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`icon icon-tabler icon-tabler-minus stroke-white 0 rounded-lg w-7 h-7 
                            ${
                              ingredients[ingredientName].count ===
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
          <div className="flex items-center gap-2 md:relative fixed bottom-4">
            {" "}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={addToCart}
              className="bg-green-500 no_transition md:w-fit w-full hover:bg-green-700 z-[1000] rounded-lg px-4 py-2 text-white"
            >
              Add +${totalPrice.toFixed(2)}
            </motion.button>
            <motion.button
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
            </motion.button>{" "}
          </div>{" "}
        </div>{" "}
      </div>
    </main>
  );
};

export default Modal;
