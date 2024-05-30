import { useState } from "react";
import { motion } from "framer-motion";

interface ItemData {
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
}

interface ComponentProps {
  itemData: ItemData;
  setTotalPrice: any;
}

const DipIngredients: React.FC<ComponentProps> = ({
  itemData,
  setTotalPrice,
}) => {
  const updateDipCount = (dipName: string, value: number) => {
    setDips((prevDips) => ({
      ...prevDips,
      [dipName]: { count: value },
    }));
  };
  const [dips, setDips] = useState<{ [key: string]: { count: number } }>(
    Object.fromEntries(
      Object.entries(itemData.itemDip.availableDips).map(([key, value]) => [
        key,
        { count: value.count },
      ])
    )
  );

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
  return (
    <main>
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
                  {dips[dipName]?.count > 1 ? ` x${dips[dipName].count}` : ""}
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
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M12 5v14" />
                      <path d="M5 12h14" />
                    </svg>
                  </motion.button>
                  <h1 className="bg-gray-100 h-7 text-center w-7 rounded-full">
                    {dips[dipName].count}
                  </h1>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="no_transition"
                    onClick={() => removeDip(dipName)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`icon icon-tabler icon-tabler-minus stroke-white ${
                        dips[dipName].count == itemData.itemDip.maxDips
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

export default DipIngredients;
