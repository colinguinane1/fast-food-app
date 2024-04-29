"use client"
import React, { useState } from "react";
import { motion } from "framer-motion";

export default function OrderPage() {
  const [ingredients, setIngredients] = useState({
    cheese: { count: 1, price: 0.5, max: 3, min: 0 },
    tomato: { count: 1, price: 0.5, max: 2, min: 0 },
    patty: { count: 1, price: 1.2, max: 3, min: 1 },
    onion: { count: 1, price: 0.3, max: 2, min: 0 },
    pickles: { count: 1, price: 0.3, max: 2, min: 0 },
    ketchup: { count: 1, price: 0.1, max: 3, min: 0 },
    mustard: { count: 1, price: 0.1, max: 3, min: 0 },
    lettuce: { count: 1, price: 0.4, max: 2, min: 0 },
  });

  const basePrice = 5.99;

  const updateIngredientCount = (ingredient, value) => {
    setIngredients({
      ...ingredients,
      [ingredient]: { ...ingredients[ingredient], count: value },
    });
  };

  const updatedPrice = "";

  const addIngredient = (ingredient) => {
    if (ingredients[ingredient].count < ingredients[ingredient].max)
      updateIngredientCount(ingredient, ingredients[ingredient].count + 1);
  };

  const decreaseIngredient = (ingredient) => {
    if (ingredients[ingredient].count > ingredients[ingredient].min) {
      updateIngredientCount(ingredient, ingredients[ingredient].count - 1);
    }
  };

  // Calculate total price including extra ingredient costs
  let totalPrice = basePrice;
  Object.entries(ingredients).forEach(([ingredient, { count, price, max }]) => {
    if (count > max) {
      updatedPrice(totalPrice += price);
    }
  });

  return (
    <main className="flex flex-col items-center mx-4">
      <div className="p-4 mt-4 w-full max-w-[900px] min-w-fit bg-white shadow-lg border rounded-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="font-extrabold text-4xl py-2">Cheeseburger</h1>
            <h2 className="font-bold py-2">${totalPrice.toFixed(2)}</h2>
          </div>
          <div className="mr-40">
            <img
              className="w-40 h-40 min-h-fit min-w-fit"
              src="https://th.bing.com/th/id/R.3b7b87e9c27c39045716ade889c4d533?rik=64l%2fkT1tiaI2yQ&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f16%2fClassic-Cheese-Burger-Transparent-PNG.png&ehk=Tj7xPCvPYFFqA96s0sgdVjwWf29DPqDDEPQwKtMpWOo%3d&risl=&pid=ImgRaw&r=0"
              alt="burger"
            ></img>
          </div>
        </div>
        <div>
          <h1>Customize your order:</h1>
          {Object.entries(ingredients).map(([ingredient, { count, price }]) => (
            <div
              key={ingredient}
              className="flex justify-between border p-4 my-4 rounded-lg shadow-md items-center"
            >
              <h1 className="text-black capitalize">
                {ingredient}:{" "}
                {count === 2 ? "Double" : count === 3 ? "Triple" : count === 1 ? "Regular" : "None"}
                <span className="text-gray-300 ml-10"></span>
              </h1>
              <div className="flex items-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => addIngredient(ingredient)}
                  className={`border p-1 px-2 rounded-md mx-4 hover:font-extrabold hover:bg-green-200 ${ingredients[ingredient].count === ingredients[ingredient].max ? "cursor-not-allowed hover:text-gray-400" : ""}`}
                >
                  Extra <span className="text-gray-400"> +${price}0</span>
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => decreaseIngredient(ingredient)}
                  className={`border rounded-md p-1 px-2 mx-4 hover:font-extrabold hover:bg-red-200 ${ingredients[ingredient].count === ingredients[ingredient].min ? "cursor-not-allowed hover:text-gray-400" : "" }`}
                >
                  Remove
                </motion.button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col items-end">
          <button className="bg-green-500 hover:bg-green-600 text-white border p-2 rounded-md">
            Add To Cart <span>${totalPrice}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
