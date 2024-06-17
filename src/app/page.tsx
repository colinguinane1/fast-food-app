"use client";
import { useState } from "react";
import Navbar from "./components/Navbar";
import Image from "next/image";
import { motion } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";
import Footer from "./components/Footer";

const HomePage = () => {
  const largeScreen = useMediaQuery("min-width: 768px");
  const currentPage = "Home";
  return (
    <main>
      <Navbar cartValue={0} currentPage={currentPage} />
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
          <h1 className="font-extrabold items-center text-center min-w-fit text-2xl py-12 text-black">
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
          <div className="flex flex-col w-[90vw] items-center justify-center">
            <div className="w-full">
              <div className="bg-white bg-opacity-75 bg-gradient-to-b from-white to-green-200 shadow-2xl   h-full rounded-lg font-extrabold text-2xl p-4">
                Earn FREE{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500 ">
                  Burger Blitz
                </span>
                <div className="text-sm font-normal py-1">
                  <h1>Free is always better than not being free.</h1>
                  <div className="flex items-center justify-between pt-4 text-2xl font-extrabold">
                    <h1 className="text-red-500">10pts</h1>
                    <h1 className="text-base text-left">FREE DRINK</h1>
                  </div>
                  <div className="flex items-center justify-between text-2xl font-extrabold">
                    <h1 className="text-red-500">20pts</h1>
                    <h1 className="text-base">FREE SMALL BURGER</h1>
                  </div>
                  <div className="flex items-center justify-between text-2xl font-extrabold">
                    <h1 className="text-red-500">60pts</h1>
                    <h1 className="text-base">FREE BIG BURGER</h1>
                  </div>
                  <div className="flex items-center justify-between text-2xl font-extrabold">
                    <h1 className="text-red-500">100pts</h1>
                    <h1 className="text-base">FREE COMBO</h1>
                  </div>
                  <div className="flex justify-between py-4 items-center">
                    <div className="py-2 flex items-center gap-1">
                      <h1>Your current points:</h1>
                      <h1 className="text-2xl font-extrabold text-red-500">
                        0
                      </h1>
                    </div>
                    <div>
                      <a href="order">
                        <motion.button
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="flex items-center no_transition shadow-2xl border justify-center bg-gradient-to-r min-w-fit text-white from-green-500 from-10%  via-30% to-emerald-500 to-90% font-bold px-3 py-2  rounded-lg"
                        >
                          Claim Rewards
                        </motion.button>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>{" "}
        </div>{" "}
        <div className="py-10 items-center flex flex-col -mt-16">
          <img
            className=""
            src="https://freeiconshop.com/wp-content/uploads/edd/app-store-badge.png"
          ></img>
          <img
            className="w-auto h-[114px] -mt-24"
            src="https://www.aps.edu/students-parents/images/downloadOnTheGooglePlayStoreBadge.png/image"
          ></img>
        </div>
        <div className="grid md:grid-cols-2 max-w-[90vw] min-w-[90vw]  grid-cols-1 gap-10 pb-20">
          <div className="bg-white bg-gradient-to-br w-full from-green-100 to-white  shadow-2xl max-w-[90vw]    rounded-lg font-extrabold text-3xl p-4">
            <h1 className="text-center text-yellow-500">BLITZ MONDAYS</h1>
            <p className="text-sm py-2 font-normal ">
              We hate Mondays. You hate Mondays. How can we make Mondays better?
            </p>

            <h1 className="text-base">
              From 7AM-10AM enjoy:{" "}
              <div className="  py-4 grid items-center justify-center  gap-4  ">
                {" "}
                <div className="bg-green-200 rounded-full shadow-2xl  h-40 w-40 flex items-center">
                  <h1 className="text-xl py-2 max-w-40  text-center  text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">
                    <span className="text-3xl">50% off</span> breakfast meals
                  </h1>
                </div>{" "}
                <div className="bg-amber-200 shadow-2xl rounded-full h-40 w-40 justify-center flex items-center">
                  <h1 className="text-xl text-center flex max-w-40 flex-col items-center  text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-amber-500">
                    FREE Coffee
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-coffee stroke-amber-600"
                      width="44"
                      height="44"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#2c3e50"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M3 14c.83 .642 2.077 1.017 3.5 1c1.423 .017 2.67 -.358 3.5 -1c.83 -.642 2.077 -1.017 3.5 -1c1.423 -.017 2.67 .358 3.5 1" />
                      <path d="M8 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
                      <path d="M12 3a2.4 2.4 0 0 0 -1 2a2.4 2.4 0 0 0 1 2" />
                      <path d="M3 10h14v5a6 6 0 0 1 -6 6h-2a6 6 0 0 1 -6 -6v-5z" />
                      <path d="M16.746 16.726a3 3 0 1 0 .252 -5.555" />
                    </svg>
                  </h1>{" "}
                </div>
                <div className="bg-blue-200 rounded-full shadow-2xl h-40 w-40 justify-center flex items-center">
                  <h1 className="text-xl text-center py-2 max-w-40 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-700">
                    <span className="text-5xl">2x</span> Bonus Points
                  </h1>
                </div>
              </div>
              <div className="flex justify-between">
                <a className="underline font-normal text-black py-2">
                  Terms & Conditions
                </a>
                <a href="order">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="flex items-center no_transition shadow-2xl border justify-center bg-gradient-to-r min-w-fit text-white from-green-500 from-10%  via-30% to-emerald-500 to-90% font-bold px-3 py-2  rounded-lg"
                  >
                    Order
                  </motion.button>
                </a>
              </div>
            </h1>
          </div>{" "}
          <div className="bg-white bg-gradient-to-t from-green-200 to-transparent max-h-fit shadow-2xl  max-w-[90vw]  rounded-lg font-extrabold text-3xl p-4">
            <h1>Try our new Shakes!</h1>
            <div className="flex items-center justify-center">
              <img
                className="w-60 h-60"
                src="https://png.pngtree.com/png-clipart/20231018/original/pngtree-3-cup-milkshake-png-image_13354288.png"
              ></img>
            </div>
            <div className="flex justify-between">
              <div>
                <h2 className="text-base font-normal">
                  Starting at{" "}
                  <span className=" py-2 font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-green-500">
                    $2.49 CAD
                  </span>
                </h2>
              </div>
              <a href="order">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center no_transition shadow-2xl border justify-center bg-gradient-to-r min-w-fit text-white from-green-500 from-10%  via-30% to-emerald-500 to-90% font-bold px-3 py-2 text-base rounded-lg"
                >
                  Order
                </motion.button>
              </a>
            </div>{" "}
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default HomePage;
