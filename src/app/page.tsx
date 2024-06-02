"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";

const HomePage = () => {
  return (
    <main>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center mt-[60px]">
        <h1 className="font-extrabold text-7xl text-white">Home</h1>
      </div>
    </main>
  );
};

export default HomePage;
