"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";

const HomePage = () => {
  return (
    <main>
      <div>
        <Navbar />
      </div>
      <div className="flex flex-col items-center justify-center mt-[40px]">
        {" "}
        <div className="w-screen items-center flex justify-center  bg-white">
          <img
            src={
              "https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/f/ec545603-cf4e-48e0-936d-5376ea12fdc0/dh7y3rq-ceae25e3-109f-4f8a-90b2-47e2ec518212.png/v1/fill/w_1280,h_732/burger_king_bk_royal_crispy_chicken_png_2024_by_wcwjunkbox_dh7y3rq-fullview.png?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJ1cm46YXBwOjdlMGQxODg5ODIyNjQzNzNhNWYwZDQxNWVhMGQyNmUwIiwiaXNzIjoidXJuOmFwcDo3ZTBkMTg4OTgyMjY0MzczYTVmMGQ0MTVlYTBkMjZlMCIsIm9iaiI6W1t7ImhlaWdodCI6Ijw9NzMyIiwicGF0aCI6IlwvZlwvZWM1NDU2MDMtY2Y0ZS00OGUwLTkzNmQtNTM3NmVhMTJmZGMwXC9kaDd5M3JxLWNlYWUyNWUzLTEwOWYtNGY4YS05MGIyLTQ3ZTJlYzUxODIxMi5wbmciLCJ3aWR0aCI6Ijw9MTI4MCJ9XV0sImF1ZCI6WyJ1cm46c2VydmljZTppbWFnZS5vcGVyYXRpb25zIl19.WltOdAtW8ebALMSUdVHkF5RkfVGm45p6fmu1HwOUeF8"
            }
            className="w- pt-20 "
          />
        </div>
        <div className="bg-gradient-to-b from-white via-green-200 to-green-500 flex items-center flex-col w-full">
          <h1 className="font-extrabold items-center text-center min-w-fit text-2xl py-4 text-black">
            The{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-600 to-yellow-500 text-5xl">
              NEW
            </span>{" "}
            Spicy Chicken Sandwich has landed!
          </h1>
          <div className="md:flex  gap-10 pb-10 mb-10">
            <a href="order">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex no_transition items-center shadow-2xl border justify-center w-full mb-4 text-white bg-gradient-to-r from-green-500 from-10%  via-30% to-emerald-500 to-90% font-bold px-8 py-2 text-2xl rounded-full "
              >
                Order Pickup
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-up-right stroke-white"
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
              </motion.button>
            </a>
            <a href="order">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center no_transition shadow-2xl border justify-center bg-gradient-to-r min-w-fit text-white from-green-500 from-10%  via-30% to-emerald-500 to-90% font-bold px-8 py-2 text-2xl rounded-full"
              >
                Order Delivery{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-arrow-up-right stroke-white"
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
              </motion.button>
            </a>
          </div>
          <div className="flex flex-col items-center justify-center">
            <div className="bg-white w-full h-fit rounded-lg font-extrabold text-3xl p-4">
              Earn Rewards
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default HomePage;
