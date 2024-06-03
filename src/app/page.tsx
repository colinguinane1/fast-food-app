"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";

const HomePage = () => {
  return (
    <main>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center mt-[60px]">
        {" "}
        <img
          src={
            "https://img.freepik.com/premium-photo/big-double-cheddar-cheeseburger-with-chicken-cutlet_147620-1306.jpg?size=626&ext=jpg&ga=GA1.1.1141335507.1717113600&semt=ais_user"
          }
          className="w-full"
        />
        <div className="bg-white flex items-center flex-col w-full h-40">
          <h1 className="font-extrabold  text-4xl py-4 text-black">
            Start your Burger Blitz Order
          </h1>
          <div className="flex gap-10">
            <button className="flex items-center bg-gradient-to-r from-green-500 from-10%  via-30% to-emerald-500 to-90% font-bold px-8 py-2 text-2xl rounded-full ">
              Order Pickup
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-arrow-up-right stroke-black"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 7l-10 10" />
                <path d="M8 7l9 0l0 9" />
              </svg>
            </button>
            <button className="flex items-center bg-gradient-to-r from-green-500 from-10%  via-30% to-emerald-500 to-90% font-bold px-8 py-2 text-2xl rounded-full">
              Order Delivery{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-arrow-up-right stroke-black"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 7l-10 10" />
                <path d="M8 7l9 0l0 9" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
