import { useState } from "react";
import { motion } from "framer-motion";

interface ItemData {
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

interface ComponentProps {
  itemData: ItemData;
  setTotalPrice: any;
}

const ExtraIngredients: React.FC<ComponentProps> = ({
  itemData,
  setTotalPrice,
}) => {
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
        (prevTotalPrice: number) =>
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
        (prevTotalPrice: number) =>
          prevTotalPrice - itemData.itemExtraIngredients[ingredientName].price
      );
    }
  };
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
  const updateExtraIngredientCount = (
    ingredientName: string,
    value: number
  ) => {
    setExtraIngredients((prevExtraIngredients) => ({
      ...prevExtraIngredients,
      [ingredientName]: { count: value },
    }));
  };
  return (
    <main>
      {Object.keys(itemData.itemExtraIngredients).length > 0 && (
        <div className="border-t mt-4 pt-4">
          <h2 className="font-extrabold text-xl py-1">Extra Ingredients</h2>
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
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </motion.button>
                  <h1 className="bg-gray-100 h-7 text-center w-7 rounded-full">
                    {extraIngredients[ingredientName].count}
                  </h1>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="no_transition"
                    onClick={() => removeExtraIngredient(ingredientName)}
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
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12h14" />
                    </svg>
                  </motion.button>
                </div>
              </div>
            )
          )}
        </div>
      )}
    </main>
  );
};

export default ExtraIngredients;
