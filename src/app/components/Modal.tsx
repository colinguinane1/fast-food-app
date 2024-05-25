import React, { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";

interface ItemData {
  itemImageURL: string;
  itemName: string;
  itemCalories: number;
  itemDescription: string;
  itemBasePrice: number;
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
  const [extraIngredients, setExtraIngredients] = useState<{
    [key: string]: { count: number };
  }>(
    Object.fromEntries(
      Object.entries(itemData.itemExtraIngredients).map(([key, value]) => [
        key,
        { count: value.count },
      ])
    )
  );
  const [dips, setDips] = useState<{ [key: string]: { count: number } }>(
    Object.fromEntries(
      Object.entries(itemData.itemDip.availableDips).map(([key, value]) => [
        key,
        { count: value.count },
      ])
    )
  );
  const [totalPrice, setTotalPrice] = useState<number>(itemData.itemBasePrice);

  const handleClickOutside = (event: MouseEvent) => {
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

  const updateDipCount = (dipName: string, value: number) => {
    setDips((prevDips) => ({
      ...prevDips,
      [dipName]: { count: value },
    }));
  };

  const addDip = (dipName: string) => {
    const totalDips = Object.values(dips).reduce(
      (acc, dip) => acc + dip.count,
      0
    );
    if (
      dips[dipName] &&
      dips[dipName].count < itemData.itemDip.availableDips[dipName].max &&
      totalDips < itemData.itemDip.maxDips
    ) {
      updateDipCount(dipName, dips[dipName].count + 1);
    }
  };

  const removeDip = (dipName: string) => {
    if (
      dips[dipName] &&
      dips[dipName].count > itemData.itemDip.availableDips[dipName].min
    ) {
      updateDipCount(dipName, dips[dipName].count - 1);
    }
  };

  const updateIngredientCount = (ingredientName: string, value: number) => {
    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredientName]: { count: value },
    }));
  };

  const updateExtraIngredientCount = (
    ingredientName: string,
    value: number
  ) => {
    setExtraIngredients((prevExtraIngredients) => ({
      ...prevExtraIngredients,
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

  const addExtraIngredient = (ingredientName: string) => {
    if (
      extraIngredients[ingredientName] &&
      extraIngredients[ingredientName].count <
        itemData.itemExtraIngredients[ingredientName].max
    ) {
      updateExtraIngredientCount(
        ingredientName,
        extraIngredients[ingredientName].count + 1
      );
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice + itemData.itemExtraIngredients[ingredientName].price
      );
    }
  };

  const removeExtraIngredient = (ingredientName: string) => {
    if (
      extraIngredients[ingredientName] &&
      extraIngredients[ingredientName].count >
        itemData.itemExtraIngredients[ingredientName].min
    ) {
      updateExtraIngredientCount(
        ingredientName,
        extraIngredients[ingredientName].count - 1
      );
      setTotalPrice(
        (prevTotalPrice) =>
          prevTotalPrice - itemData.itemExtraIngredients[ingredientName].price
      );
    }
  };

  return (
    <motion.main
      initial={largeScreen ? { y: 0, scale: 0 } : { y: 1000, scale: 1 }}
      animate={largeScreen ? { y: 0, scale: 1 } : { y: 0, scale: 1 }}
      exit={largeScreen ? { y: 0, scale: 0 } : { y: 1000, scale: 1 }}
      transition={{ type: "spring", duration: 0.4 }}
      className="no_transition flex flex-col items-center justify-center h-screen z-[100]"
    >
      <div className="fixed flex h-screen items-center justify-center">
        <div
          ref={modalRef}
          className="bg-white md:w-[70vw] w-screen md:min-h-[40vh] md:h-fit md:max-h-[80vh] rounded-lg h-full p-4 overflow-y-auto"
        >
          <div className="border-b mb-3">
            <div className="flex flex-col items-center">
              <button
                className="block md:hidden mt-10 md:-mt-6 py-6 px-2"
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
            <p className="text-sm">{itemData.itemDescription}</p>
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
                      <div className="flex gap-2 items-center">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => addIngredient(ingredientName)}
                          className="no_transition"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={`icon icon-tabler icon-tabler-plus stroke-white rounded-lg w-7 h-7 ${
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
                            className={`icon icon-tabler icon-tabler-minus stroke-white rounded-lg w-7 h-7 ${
                              ingredients[ingredientName]?.count ===
                              ingredient.min
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
                            <path d="M5 12h14" />
                          </svg>
                        </motion.button>
                      </div>
                    </div>
                  )
                )}
                {Object.keys(itemData.itemExtraIngredients).length > 0 && (
                  <div className="border-t mt-4 pt-4">
                    <h2 className="font-extrabold text-xl py-1">
                      Extra Ingredients
                    </h2>
                    {Object.entries(itemData.itemExtraIngredients).map(
                      ([ingredientName, ingredient]) => (
                        <div
                          key={ingredientName}
                          className="flex flex-row py-3 items-center justify-between"
                        >
                          <p
                            className={`capitalize ${
                              extraIngredients[ingredientName]?.count > 0
                                ? "text-green-500"
                                : ""
                            }`}
                          >
                            {ingredientName}
                            {extraIngredients[ingredientName]?.count > 1
                              ? ` x${extraIngredients[ingredientName].count}`
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
                              onClick={() => addExtraIngredient(ingredientName)}
                              className="no_transition"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`icon icon-tabler icon-tabler-plus stroke-white rounded-lg w-7 h-7 ${
                                  extraIngredients[ingredientName]?.count ===
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
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 5v14" />
                                <path d="M5 12h14" />
                              </svg>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="no_transition"
                              onClick={() =>
                                removeExtraIngredient(ingredientName)
                              }
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`icon icon-tabler icon-tabler-minus stroke-white rounded-lg w-7 h-7 ${
                                  extraIngredients[ingredientName]?.count ===
                                  ingredient.min
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
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M5 12h14" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
                {Object.entries(itemData.itemDip.availableDips).length > 0 && (
                  <div className="">
                    <div className="flex items-center gap-4">
                      <h2 className="font-extrabold text-xl py-1">Dip</h2>
                      <p className="text-sm italic">
                        (Choose up to {itemData.itemDip.maxDips})
                      </p>
                    </div>
                    {Object.entries(itemData.itemDip.availableDips).map(
                      ([dipName, dip]) => (
                        <div
                          key={dipName}
                          className="flex flex-row py-3 items-center justify-between"
                        >
                          <p
                            className={`capitalize ${
                              dips[dipName]?.count > 0 ? "text-green-500" : ""
                            }`}
                          >
                            {dipName}
                            {dips[dipName]?.count > 1
                              ? ` x${dips[dipName].count}`
                              : ""}
                          </p>
                          <div className="">
                            <h1 className="text-gray-200">
                              {/* +${dip.price ? dip.price.toFixed(2) : ""} */}
                            </h1>
                          </div>
                          <div className="flex gap-2 items-center">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => addDip(dipName)}
                              className="no_transition"
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`icon icon-tabler icon-tabler-plus stroke-white rounded-lg w-7 h-7 ${
                                  dips[dipName]?.count === dip.max
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
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M12 5v14" />
                                <path d="M5 12h14" />
                              </svg>
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              className="no_transition"
                              onClick={() => removeDip(dipName)}
                            >
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className={`icon icon-tabler icon-tabler-minus stroke-white ${
                                  dips[dipName].count ==
                                  itemData.itemDip.maxDips
                                    ? "bg-gray-200"
                                    : ""
                                } rounded-lg w-7 h-7 ${
                                  dips[dipName]?.count === dip.min
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
                                <path
                                  stroke="none"
                                  d="M0 0h24v24H0z"
                                  fill="none"
                                />
                                <path d="M5 12h14" />
                              </svg>
                            </motion.button>
                          </div>
                        </div>
                      )
                    )}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
          <div className="md:flex items-center gap-2 md:relative w-full fixed bottom-4"></div>
          {!largeScreen && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={addToCart}
              className={`bg-green-500 ${
                largeScreen ? "fixed" : ""
              } no_transition w-full mt-3 mb-20 md:mb-0 hover:bg-green-700 z-[1000] rounded-lg py-3 text-white`}
            >
              Add +${totalPrice.toFixed(2)}
            </motion.button>
          )}
        </div>
      </div>
    </motion.main>
  );
};

export default Modal;
