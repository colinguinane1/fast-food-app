"use client";
import React, { useState } from "react";
import Image from "next/image";
import OrderCheeseburger from "./order/cheeseburger";
import OrderNuggets from "./order/nuggets";
import { motion } from "framer-motion";

export default function Home() {
  const [showCheeseburgerOrder, setShowCheeseburgerOrder] = useState(false);
  const [showNuggetsOrder, setShowNuggetsOrder] = useState(false);

  const toggleOrder = (orderType) => {
    if (orderType === "cheeseburger") {
      setShowCheeseburgerOrder(!showCheeseburgerOrder);
      setShowNuggetsOrder(false); // Hide Nuggets order if Cheeseburger is clicked
    } else if (orderType === "nuggets") {
      setShowNuggetsOrder(!showNuggetsOrder);
      setShowCheeseburgerOrder(false); // Hide Cheeseburger order if Nuggets is clicked
    }
  };

  return (
    <main className="flex gap-4 mt-4 flex-col items-center justify-between">
      {showCheeseburgerOrder && <OrderCheeseburger />}
      {showNuggetsOrder && <OrderNuggets />}

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="bg-white flex items-center gap-3 p-4 rounded-md shadow-lg cursor-pointer"
        onClick={() => toggleOrder("cheeseburger")}
      >
        <h1>Cheeseburger</h1>
        <img
          className="w-10 h-10"
          src="https://th.bing.com/th/id/R.3b7b87e9c27c39045716ade889c4d533?rik=64l%2fkT1tiaI2yQ&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f16%2fClassic-Cheese-Burger-Transparent-PNG.png&ehk=Tj7xPCvPYFFqA96s0sgdVjwWf29DPqDDEPQwKtMpWOo%3d&risl=&pid=ImgRaw&r=0"
          alt="burger"
        />
      </motion.button>
      <div
        className="bg-white flex items-center gap-3 p-4 rounded-md shadow-lg cursor-pointer"
        onClick={() => toggleOrder("nuggets")}
      >
        <h1>Chicken Nuggets</h1>
        <img
          className="w-14 h-10"
          src="https://s7d1.scene7.com/is/image/mcdonalds/mcdonalds-Chicken-McNuggets-6-pieces-2:1-3-product-tile-desktop?wid=829&hei=515&dpr=off"
          alt="burger"
        />
      </div>
    </main>
  );
}
