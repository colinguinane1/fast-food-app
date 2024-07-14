"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Checkout from "./Checkout";
import { useCart } from "../context/CartContext";

import { LuShoppingCart } from "react-icons/lu";

import { NavbarData } from "../../../public/data/NavbarData";

const Navbar = ({}) => {
  const [navMenu, setNavMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const [cartVisible, setCartVisible] = useState(false);
  const { cartValue, cartCount } = useCart();

  const toggleCartVisible = () => {
    setCartVisible(!cartVisible);
  };

  const navbarIconsColor = "black";

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
      <div
        className={`top-0 fixed  z-[10000] text-white bg-green-500 w-screen h-fit ${
          scrolled ? "text-white shadow-2xl" : ""
        }`}
      >
        <>
          <div
            className={`mt-4 fixed bottom-0 block  md:top-0 z-[10000] w-full ${
              scrolled
                ? // "bottom-6 px-4 "
                  ""
                : ""
            }`}
          >
            <ul
              className={`flex  text-xs transition-all duration-700 font-extrabold justify-between h-fit py-2 -mt-4  px-6 items-center
               
                     bg-white border-t backdrop-blur-2xl bg-opacity-80  "
                 
                }`}
            >
              {" "}
              <li className="hidden md:block">
                <Image
                  alt="logo"
                  width={70}
                  height={70}
                  src="/burgerb-2-2-2.png"
                ></Image>
              </li>
              {NavbarData.map((navbar, index) => (
                <li key={index} className="text-black">
                  <a
                    className="flex items-center flex-col md:flex-row md:gap-2"
                    href={navbar.href}
                  >
                    {navbar.icon}
                    <p>{navbar.pageName}</p>
                  </a>
                </li>
              ))}
              <li className="cursor-pointer" onClick={toggleCartVisible}>
                <a className="flex md:flex-row md:gap-2 hover:bg-green-500 px-2 rounded-md items-center no_transition justify-center flex-col group">
                  <LuShoppingCart
                    size={20}
                    color={navbarIconsColor}
                    className="group-hover:stroke-white no_transition"
                  />
                  {cartCount > 0 && (
                    <h1 className="absolute bg-white text-green-500 h-4 w-4 rounded-full items-center text-center ml-5 mb-1">
                      {cartCount}
                    </h1>
                  )}

                  <label
                    className={`text-${navbarIconsColor} group-hover:text-white`}
                  >
                    Cart
                  </label>
                </a>
              </li>
            </ul>{" "}
            <div className="h-full"></div>
          </div>
        </>
      </div>
    </main>
  );
};

export default Navbar;
