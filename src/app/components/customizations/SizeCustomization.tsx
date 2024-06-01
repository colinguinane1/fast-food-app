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
      {Object.entries(itemData.itemSizes).map(([sizeName, { price }]) => (
        <div
          key={sizeName}
          className="flex flex-row py-3 items-center justify-between"
        >
          <div className="text-lg capitalize">{sizeName}</div>
          <div className="flex gap-2 items-center">
            <div className="text-lg">${price}</div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => handleSizeSelection(sizeName)}
              className={`no_transition px-4 py-2 rounded-lg ${
                selectedSize === sizeName
                  ? "bg-blue-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {selectedSize === sizeName ? "Selected" : "Select"}
            </motion.button>
          </div>
        </div>
      ))}
    </main>
  );
};

export default SizeCustomization;
