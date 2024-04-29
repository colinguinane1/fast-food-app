"use client";
import React, { useState } from "react";

export default function OrderPage() {
  const [ingredients, setIngredients] = useState({
    cheese: { count: 1, price: 0.5, max: 2, min: 0 },
    tomato: { count: 1, price: 0.5, max: 2, min: 0 },
    patty: { count: 1, price: 1.2, max: 2, min: 1 },
    onion: { count: 1, price: 0.3, max: 2, min: 0 },
    pickles: { count: 1, price: 0.2, max: 2, min: 0 },
    ketchup: { count: 1, price: 0.2, max: 3, min: 0 },
    mustard: { count: 1, price: 0.2, max: 3, min: 0 },
    lettuce: { count: 1, price: 0.4, max: 2, min: 0 },
  });

  const basePrice = 1.99;

  const updateIngredientCount = (ingredient, value) => {
    setIngredients({
      ...ingredients,
      [ingredient]: { ...ingredients[ingredient], count: value },
    });
  };

  const addIngredient = (ingredient) => {
    if (ingredients[ingredient].count < ingredients[ingredient].max)
      updateIngredientCount(ingredient, ingredients[ingredient].count + 1);
  };

  const decreaseIngredient = (ingredient) => {
    if (ingredients[ingredient].count > 1) {
      updateIngredientCount(ingredient, ingredients[ingredient].count - 1);
    }
  };

  const totalIngredientsPrice = Object.values(ingredients).reduce(
    (acc, { count, price }) => acc + count * price,
    0
  );

  const totalPrice = basePrice + totalIngredientsPrice;

  return (
    <main className="mx-4 my-4 p-10 shadow-lg border rounded-lg">
      <div>
        <h1 className="font-extrabold text-4xl py-2">Cheeseburger</h1>
        <h2 className="font-bold py-2">${totalPrice.toFixed(2)}</h2>
      </div>
      <div>
        <h1>Customize your order:</h1>
        {Object.entries(ingredients).map(([ingredient, { count, price }]) => (
          <div
            key={ingredient}
            className="flex justify-between border p-4 my-4 rounded-lg shadow-md items-center"
          >
            <h1 className="text-black capitalize">
              {ingredient}: {count}{" "}
              <span className="text-gray-300 ml-10"></span>
            </h1>
            <div className="flex items-center">
              <button
                onClick={() => addIngredient(ingredient)}
                className="border p-1 rounded-md mx-4"
              >
                Extra <span className="text-gray-300"> +${price}0</span>
              </button>
              <button
                onClick={() => decreaseIngredient(ingredient)}
                className="border rounded-md p-1"
              >
                None
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col items-end">
        <button className="bg-green-500 hover:bg-green-600 text-white border p-2 rounded-md">
          Add To Cart
        </button>
      </div>
    </main>
  );
}
