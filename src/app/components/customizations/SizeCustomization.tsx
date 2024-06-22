import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ItemData {
  itemSizes: {
    [key: string]: {
      price: number;
    };
  };
}

interface ComponentProps {
  itemData: ItemData | null;
  setTotalPrice: (price: number) => void;
}

const SizeCustomization: React.FC<ComponentProps> = ({
  itemData,
  setTotalPrice,
}) => {
  const [selectedSize, setSelectedSize] = useState<string | null>(null);

  const handleSizeSelection = (sizeName: string) => {
    setSelectedSize(sizeName);
    if (itemData) {
      setTotalPrice(itemData.itemSizes[sizeName].price);
    }
  };

  if (!itemData || !itemData.itemSizes) {
    return <div></div>; // or any other loading indicator
  }

  return (
    <main>
      {" "}
      <h1 className="font-extrabold text-xl">Select size</h1>
      {Object.entries(itemData.itemSizes).map(([sizeName, { price }]) => (
        <div
          key={sizeName}
          className="flex flex-row py-3 add_transition duration-500 items-center justify-between"
        >
          <div className="capitalize">{sizeName}</div>
          <div className="flex gap-1 items-center">
            <div className="">${price}</div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSizeSelection(sizeName)}
              className={` px-4  rounded-lg ${
                selectedSize === sizeName ? " text-white" : " text-white"
              }`}
            >
              {selectedSize === sizeName ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-circle-filled border-2 p-1 border-black rounded-full stroke-black"
                  width="25"
                  height="25"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path
                    d="M7 3.34a10 10 0 1 1 -4.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 4.995 -8.336z"
                    stroke-width="0"
                    fill="#22c55e"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-circle border-black  rounded-full"
                  width="30"
                  height="30"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="#2c3e50"
                  fill="none"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                >
                  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                  <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                </svg>
              )}
            </motion.button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default SizeCustomization;
