"use client";
import React, { useState } from "react";
import Image from "next/image";
import OrderCheeseburger from "./order/cheeseburger"; // Import your OrderCheeseburger component

export default function Home() {
  const [showOrder, setShowOrder] = useState(false); // State to toggle showing the order

  // Function to toggle the display of the order component
  const toggleOrder = () => {
    setShowOrder(!showOrder);
  };

  return (
    <main className="flex flex-col items-center justify-between">
      {/* Render OrderCheeseburger component if showOrder is true */}
      {showOrder && <OrderCheeseburger />}

      {/* Render h1 with onClick event handler to toggle order display */}
      <div
        className="bg-white flex items-center gap-3 p-4 rounded-md shadow-lg cursor-pointer"
        onClick={toggleOrder}
      >
        <h1>Cheeseburger</h1>
        <img
          className="w-10 h-10"
          src="https://th.bing.com/th/id/R.3b7b87e9c27c39045716ade889c4d533?rik=64l%2fkT1tiaI2yQ&riu=http%3a%2f%2fwww.pngmart.com%2ffiles%2f16%2fClassic-Cheese-Burger-Transparent-PNG.png&ehk=Tj7xPCvPYFFqA96s0sgdVjwWf29DPqDDEPQwKtMpWOo%3d&risl=&pid=ImgRaw&r=0"
          alt="burger"
        ></img>
      </div>
    </main>
  );
}
