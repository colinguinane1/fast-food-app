"use client";
import React, { useRef, useEffect, useState } from "react";
import Backdrop from "./Backdrop";

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
}

const Modal: React.FC<ModalProps> = ({ itemData, toggleModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const [customize, setCustomize] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<{
    [key: string]: { count: number };
  }>({});
  const [totalPrice, setTotalPrice] = useState<number>(itemData.itemBasePrice);

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
    const handleClickOutside = (event: MouseEvent) => {
      console.log("Clicked outside");
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        toggleModal();
      }
    };
    // Attach event listener for clicks outside the modal
    document.addEventListener("click", handleClickOutside);

    // Cleanup function to remove event listener
    return () => {
      document.removeEventListener("click", handleClickOutside);
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
    <main>
      <div className="fixed inset-0 flex items-center justify-center">
        <div ref={modalRef} className="bg-white p- w-full mx-8 p-4 rounded-lg">
          <div className="border-b mb-2">
            <h1 className="font-extrabold text-2xl">{itemData.itemName}</h1>
            <p className="text-sm">{itemData.itemDescription}</p>
            <div className="flex flex-col">
              <h1
                className={`${
                  totalPrice != itemData.itemBasePrice ? "text-green-500" : ""
                }`}
              >
                ${totalPrice.toFixed(2)}
              </h1>
              <h1 className="text-sm">{itemData.itemCalories} kcals</h1>
            </div>
          </div>
          {customize && (
            <div className="grid grid-cols-1  gap-4">
              {Object.entries(itemData.itemIngredients).map(
                ([ingredientName, ingredient]) => (
                  <div
                    key={ingredientName}
                    className="flex items-center border-b py-1 justify-between"
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
                      {ingredients[ingredientName]?.count > ingredient.comesWith
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
                      <button
                        onClick={() => addIngredient(ingredientName)}
                        className=""
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`icon icon-tabler icon-tabler-plus bg-green-500 stroke-white rounded-full w-6 h-6 ${
                            ingredients[ingredientName].count == ingredient.max
                              ? "bg-gray-200 stroke-slate-300 cursor-not-allowed"
                              : ""
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
                      </button>
                      <button
                        className=""
                        onClick={() => removeIngredient(ingredientName)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className={`icon icon-tabler icon-tabler-minus stroke-white bg-green-500 rounded-full w-6 h-6 
                            ${
                              ingredients[ingredientName].count ==
                              ingredient.min
                                ? "bg-gray-200 stroke-slate-300 cursor-not-allowed"
                                : ""
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
                      </button>
                    </div>
                  </div>
                )
              )}
            </div>
          )}
          <div className="flex gap-2 mt-4">
            <button className="bg-green-500 hover:bg-green-700 rounded-full px-4 p-1 text-white">
              Add +${totalPrice.toFixed(2)}
            </button>{" "}
            <button
              onClick={toggleCustomize}
              className="bg-green-500 flex items-center hover:bg-green-700 rounded-full px-3  text-white"
            >
              Customize
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-settings stroke-white"
                width="20"
                height="20"
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
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Modal;
