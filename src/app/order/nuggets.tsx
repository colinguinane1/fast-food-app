"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function OrderNuggets() {
  interface Ingredient {
    comesWith: number;
    count: number;
    price: number;
    max: number;
    min: number;
  }

  const [ingredients, setIngredients] = useState<{
    [key: string]: Ingredient;
  }>({
    cheese: { comesWith: 1, count: 1, price: 0.5, max: 3, min: 0 },
    tomato: { comesWith: 1, count: 1, price: 0.5, max: 2, min: 0 },
    patty: { comesWith: 1, count: 1, price: 0.9, max: 3, min: 1 },
    onion: { comesWith: 1, count: 1, price: 0.3, max: 2, min: 0 },
    pickles: { comesWith: 1, count: 1, price: 0.3, max: 2, min: 0 },
    ketchup: { comesWith: 1, count: 1, price: 0.1, max: 3, min: 0 },
    mustard: { comesWith: 1, count: 1, price: 0.1, max: 3, min: 0 },
    lettuce: { comesWith: 1, count: 1, price: 0.4, max: 2, min: 0 },
  });
  const itemData = { baseCost: 5.99, name: "Chicken Nuggets" };
  const [basePrice, setBasePrice] = useState(itemData.baseCost);

  const updateIngredientCount = (ingredient: string, value: number) => {
    setIngredients({
      ...ingredients,
      [ingredient]: { ...ingredients[ingredient], count: value },
    });
  };

  const updatedPrice = "";

  const addIngredient = (ingredient: string) => {
    if (ingredients[ingredient].count < ingredients[ingredient].max) {
      updateIngredientCount(ingredient, ingredients[ingredient].count + 1);
      if (
        ingredients[ingredient].count + 1 >
        ingredients[ingredient].comesWith
      ) {
        setBasePrice(basePrice + ingredients[ingredient].price);
      }
    }
  };

  const decreaseIngredient = (ingredient: string) => {
    if (ingredients[ingredient].count > ingredients[ingredient].min) {
      updateIngredientCount(ingredient, ingredients[ingredient].count - 1);
      if (ingredients[ingredient].count > ingredients[ingredient].comesWith) {
        setBasePrice(basePrice - ingredients[ingredient].price);
      }
    }
  };

  return (
    <main className="flex flex-col items-center mx-2 text-sm">
      <div className="p-4 mt-4 w-full max-w-[900px] min-w-fit bg-white shadow-lg border rounded-lg">
        <div className="md:flex justify-between items-center">
          {" "}
          <div className="md:mr-40 flex flex-col items-center"></div>
          <div>
            <h1 className="font-extrabold text-4xl py-2">{itemData.name}</h1>
            <h2
              className={`font-bold py-2 ${
                basePrice != 5.99 ? "text-green-500" : ""
              }`}
            >
              ${basePrice.toFixed(2)}
            </h2>{" "}
            {/*toFixed() MAKES IT ALWAYS 2 DECIMALS */}
          </div>{" "}
          <img
            className="w-45 h-40"
            src="https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-Chicken-McNuggets-6-pieces-2:1-3-product-tile-desktop?wid=829&hei=515&dpr=off"
            alt="burger"
          ></img>
        </div>
        <div>
          <h1>Customize your order:</h1>
          {Object.entries(ingredients).map(([ingredient, { count, price }]) => (
            <div
              key={ingredient}
              className="flex justify-between border p-4 my-4 rounded-lg shadow-md items-center"
            >
              <h1
                className={`text-black capitalize ${
                  count === 0
                    ? "text-gray-200 line-through"
                    : count > 1
                    ? "text-green-500"
                    : ""
                }`}
              >
                {ingredient}:{" "}
                {count === 2
                  ? "Double"
                  : count === 3
                  ? "Triple"
                  : count === 1
                  ? "Regular"
                  : "None"}
                <span className={`text-gray-300 ml-10`}></span>
              </h1>
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addIngredient(ingredient)}
                  className={`border p-1 px-2 rounded-md mx-  hover:bg-green-200 ${
                    ingredients[ingredient].count ===
                    ingredients[ingredient].max
                      ? "cursor-not-allowed text-gray-400"
                      : ""
                  }`}
                >
                  Extra <span className="text-gray-400"> +${price}0</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => decreaseIngredient(ingredient)}
                  className={`border rounded-md p-1 px-2 mx-2 hover:bg-red-200 ${
                    ingredients[ingredient].count ===
                    ingredients[ingredient].min
                      ? "cursor-not-allowed text-gray-400"
                      : ""
                  }`}
                >
                  Remove
                </motion.button>
              </div>
            </div>
          ))}
        </div>
        <div className="fixed bottom-10 right-4 items-end">
          <button className="bg-green-500 hover:bg-green-600 text-white border p-2 rounded-md">
            Add To Cart <span>${basePrice.toFixed(2)}</span>
          </button>
        </div>
      </div>
    </main>
  );
}