"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "./Checkout";
import { useCart } from "../context/CartContext";
import { usePageContext } from "../context/PageContext";
import { LuShoppingCart } from "react-icons/lu";
import { GoChevronDown } from "react-icons/go";
import { IoHomeOutline } from "react-icons/io5";
import { FaBurger } from "react-icons/fa6";
import { PiHamburger } from "react-icons/pi";
import { GoPersonAdd } from "react-icons/go";

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
  const { currentPage, setCurrentPage } = usePageContext();

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

          <motion.li
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleCartVisible}
            className="flex flex-col no_transition cursor-pointer items-center justify-center"
          >
            <LuShoppingCart size={20} />
            {cartCount > 0 && (
              <h1 className="absolute text-xs bg-red-500 text-white h-4 w-4 rounded-full items-center text-center ml-5 mb-1">
                {cartCount}
              </h1>
            )}
          </motion.li>
        </motion.ul>
        <AnimatePresence>
          <>
            <motion.div
              className={`mt-4 fixed bottom-0 block transition-all duration-700 md:hidden z-[10000] w-full ${
                scrolled
                  ? // "bottom-6 px-4 "
                    ""
                  : ""
              }`}
              transition={{ type: "tween", duration: 0.2 }}
              layout
            >
              <motion.ul
                layout
                className={`flex  text-xs transition-all duration-700 font-extrabold justify-between h-fit py-2 -mt-4  px-6 items-center
               
                     bg-black backdrop-blur-lg bg-opacity-30  "
                 
                }`}
              >
                <motion.li className="cursor-pointer" layout>
                  <motion.a
                    onClick={() => setCurrentPage("Home")}
                    href="./home"
                    className="hover:bg-green-500 px-2 rounded-md no_transition flex items-center justify-center flex-col"
                  >
                    <IoHomeOutline size={20} />

                    <motion.label
                      className={`${currentPage === "Home" ? "underline" : ""}`}
                    >
                      Home
                    </motion.label>
                  </motion.a>
                </motion.li>
                <li className="cursor-pointer">
                  <motion.a
                    href="./order"
                    className="flex hover:bg-green-500 px-2 rounded-md items-center no_transition justify-center flex-col"
                  >
                    <PiHamburger size={20} />

                    <motion.label>Order</motion.label>
                  </motion.a>
                </li>
                <li className="cursor-pointer">
                  <motion.a
                    href="./careers"
                    className="flex hover:bg-green-500 px-2 rounded-md items-center no_transition justify-center flex-col"
                  >
                    <GoPersonAdd size={20} />

                    <motion.label>Careers</motion.label>
                  </motion.a>
                </li>

                <li className="cursor-pointer" onClick={toggleCartVisible}>
                  <motion.a className="flex hover:bg-green-500 px-2 rounded-md items-center no_transition justify-center flex-col">
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
                    {cartCount > 0 && (
                      <h1 className="absolute bg-white text-green-500 h-4 w-4 rounded-full items-center text-center ml-5 mb-1">
                        {cartCount}
                      </h1>
                    )}

                    <motion.label>Cart</motion.label>
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
            key="checkout"
            className="fixed inset-0 no_transition justify-center z-[11000] bg-black bg-opacity-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              initial={{ y: 1000, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 1000, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className="bg-white no_transition rounded-lg p-8 shadow-lg"
            >
              <Checkout toggleCartVisible={toggleCartVisible} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Navbar;
