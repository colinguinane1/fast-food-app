"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "./Checkout";
import { useCart } from "../context/CartContext";

interface CartItem {
  name: string;
  price: number;
  sizeCustomizations: [];
  dipCustomizations: [];
  itemCustomizations: [];
  extraAdditions: [];
  image: string;
}

const Navbar = ({}) => {
  const [navMenu, setNavMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState("CAD");
  const [cartVisible, setCartVisible] = useState(false);
  const { cartValue, cartCount } = useCart();

  const toggleCartVisible = () => {
    setCartVisible(!cartVisible);
  };

  const toggleMenu = () => {
    setNavMenu(!navMenu);
    console.log(navMenu);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main>
      <motion.div
        layout
        className={`top-0 fixed  z-[10000] text-white bg-green-500 w-screen h-fit ${
          scrolled ? "text-white shadow-2xl" : ""
        }`}
      >
        <motion.ul
          layout
          className=" items-center hidden md:flex font-extrabold md:py-2 py-4 justify-between mx-4 md:mr-10"
        >
          <li className="">
            <Image
              src={"/burgerb-2-2-2.png"}
              alt={"burger"}
              width={70}
              height={70}
            />
          </li>
          <li className="navbar_element">
            <a href="./home">Home</a>
          </li>
          <li className="navbar_element">
            <a href="./order">Order</a>
          </li>
          <li className="navbar_element">
            <a href="./careers">Careers</a>
          </li>
          <li className="navbar_element">
            <a href="./contact">Contact</a>
          </li>

          <li onClick={toggleCartVisible}>
            <motion.a
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              layout
              className="flex items-center justify-center flex-col"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-shopping-cart stroke-white"
                width="25"
                height="25"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="#000000"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                <path d="M17 17h-11v-14h-2" />
                <path d="M6 5l14 1l-1 7h-13" />
              </svg>
              <h1 className="absolute text-xs bg-white text-green-500 h-4 w-4 rounded-full items-center text-center ml-5 mb-1">
                {cartCount}
              </h1>
            </motion.a>
          </li>

          <li>
            <motion.button onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`icon icon-tabler transition-all duration-500  icon-tabler-chevron-down block md:hidden ${
                  navMenu ? "rotate-180" : ""
                }`}
                width="25"
                height="25"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#ffffff"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 9l6 6l6 -6" />
              </svg>
            </motion.button>
          </li>
        </motion.ul>
        <AnimatePresence>
          <>
            <motion.div
              className={`mt-4 fixed bottom-0 block transition-all duration-700 md:hidden z-[10000] w-full ${
                scrolled ? "bottom-6 px-4 " : ""
              }`}
              transition={{ type: "tween", duration: 0.2 }}
              layout
            >
              <motion.ul
                layout
                className={`flex  text-xs transition-all duration-700 font-extrabold justify-between h-fit py-2 -mt-4  px-6 items-center ${
                  scrolled
                    ? "bg-black bg-opacity-50 rounded-lg py-4 "
                    : " bg-green-600 "
                }`}
              >
                <motion.li layout>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    layout
                    href="./home"
                    className="flex items-center justify-center flex-col"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={` icon icon-tabler icon-tabler-home-2`}
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ffffff"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                      <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                      <path d="M10 12h4v4h-4z" />
                    </svg>
                    <AnimatePresence>
                      {!scrolled && (
                        <motion.label
                          layout
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          Home
                        </motion.label>
                      )}
                    </AnimatePresence>
                  </motion.a>
                </motion.li>
                <li>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    layout
                    href="./order"
                    className="flex items-center justify-center flex-col"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={`icon icon-tabler icon-tabler-truck-delivery `}
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ffffff"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M7 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M17 17m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M5 17h-2v-4m-1 -8h11v12m-4 0h6m4 0h2v-6h-8m0 -5h5l3 5" />
                      <path d="M3 9l4 0" />
                    </svg>
                    <AnimatePresence>
                      {!scrolled && (
                        <motion.label
                          layout
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          Order
                        </motion.label>
                      )}
                    </AnimatePresence>
                  </motion.a>
                </li>
                <li>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    layout
                    href="./careers"
                    className="flex items-center justify-center flex-col"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={` icon icon-tabler icon-tabler-users`}
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      stroke-width="1.5"
                      stroke="#ffffff"
                      fill="none"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                      <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                    </svg>
                    <AnimatePresence>
                      {!scrolled && (
                        <motion.label
                          layout
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          Careers
                        </motion.label>
                      )}
                    </AnimatePresence>
                  </motion.a>
                </li>

                <li onClick={toggleCartVisible}>
                  <motion.a
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    layout
                    className="flex items-center justify-center flex-col"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-shopping-cart stroke-white"
                      width="25"
                      height="25"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="#000000"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                      <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M17 17h-11v-14h-2" />
                      <path d="M6 5l14 1l-1 7h-13" />
                    </svg>
                    <h1 className="absolute bg-white text-green-500 h-4 w-4 rounded-full items-center text-center ml-5 mb-1">
                      {cartCount}
                    </h1>
                    <AnimatePresence>
                      {!scrolled && (
                        <motion.label
                          layout
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          exit={{ scale: 0 }}
                        >
                          Cart
                        </motion.label>
                      )}
                    </AnimatePresence>
                  </motion.a>
                </li>
              </motion.ul>{" "}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.2 }}
                className="h-full"
                layout
              ></motion.div>
            </motion.div>
          </>
        </AnimatePresence>
      </motion.div>
      <AnimatePresence>
        {cartVisible && (
          <motion.div
            initial={{ y: 10000 }}
            animate={{ y: 0 }}
            exit={{ y: 10000 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="no_transition"
          >
            <Checkout toggleCartVisible={toggleCartVisible} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Navbar;
