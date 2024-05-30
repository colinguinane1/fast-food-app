import { useState } from "react";
import { motion } from "framer-motion";

interface ItemData {
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

interface ComponentProps {
  itemData: ItemData;
  setTotalPrice: any;
}

const MainIngredients: React.FC<ComponentProps> = ({
  itemData,
  setTotalPrice,
}) => {
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
          (prevTotalPrice: number) =>
            prevTotalPrice + itemData.itemIngredients[ingredientName].price
        );
      }
    }
  };

  const updateIngredientCount = (ingredientName: string, value: number) => {
    setIngredients((prevIngredients) => ({
      ...prevIngredients,
      [ingredientName]: { count: value },
    }));
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
          (prevTotalPrice: number) =>
            prevTotalPrice - itemData.itemIngredients[ingredientName].price
        );
      }
    }
  };
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
  return (
    <main>
      {Object.entries(itemData.itemIngredients).map(
        ([ingredientName, ingredient]) => (
          <div
            key={ingredientName}
            className="flex flex-row py-3 items-center justify-between"
          >
            <p
              className={`capitalize ${
                ingredients[ingredientName]?.count > ingredient.comesWith
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
              {ingredients[ingredientName]?.count > ingredient.comesWith + 1
                ? " x2"
                : ""}
            </p>
            <div className="">
              <h1 className="text-gray-200">+${ingredient.price.toFixed(2)}</h1>
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
                    ingredients[ingredientName]?.count === ingredient.max
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
              <h1 className="bg-gray-100 h-7 text-center w-7 rounded-full">
                {ingredients[ingredientName].count}
              </h1>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="no_transition"
                onClick={() => removeIngredient(ingredientName)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`icon icon-tabler icon-tabler-minus stroke-white rounded-lg w-7 h-7 ${
                    ingredients[ingredientName]?.count === ingredient.min
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
    </main>
  );
};

export default MainIngredients;
