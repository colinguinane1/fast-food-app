"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function OrderCheeseburger() {
  const [itemData, setItemData] = useState(null);
  const [ingredients, setIngredients] = useState(null);
  const [basePrice, setBasePrice] = useState(null);

  useEffect(() => {
    async function fetchItemData() {
      try {
        // Replace 'your-bucket-url' and 'item-data.json' with your actual bucket URL and file name
        const response = await fetch(
          `https://storage.cloud.google.com/fast-food-app-58d04.appspot.com/menu/Burgers/${menuItem}/metadata.json`
        );
        const jsonData = await response.json();
        setItemData(jsonData);
        setIngredients(jsonData);
        setBasePrice(jsonData.itemBasePrice);
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    }
    fetchItemData();
  }, []);

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
            src="https://th.bing.com/th/id/R.3b7b87e9c27c39045716ade889c4d533?rik=64l%2fkT1tiaI2yQ&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f16%2fClassic-Cheese-Burger-Transparent-PNG.png&ehk=Tj7xPCvPYFFqA96s0sgdVjwWf29DPqDDEPQwKtMpWOo%3d&risl=&pid=ImgRaw&r=0"
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