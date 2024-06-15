"use client";
import Image from "next/image";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface NavbarProps {
  cartValue: number;
}

const Navbar: React.FC<NavbarProps> = ({ cartValue }) => {
  const [navMenu, setNavMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState("CAD");

  if (cartValue == null) {
    cartValue = 0;
  }

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
        className={`top-0 h-fit fixed bg-green-500 z-[10000] text-white w-screen ${
          scrolled ? "text-white shadow-2xl" : ""
        }`}
      >
        <motion.ul
          layout
          className="flex items-center font-extrabold md:py-2 py-4 justify-between mx-4 md:mr-10"
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

          {cartValue != 0 ? (
            <li>
              <button className="flex mr-10 bg-white text-green-500 items-center h-fit w-fit p-1 rounded-lg px-2 z-[1000] justify-center gap-1 hover:bg-green-700">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="icon icon-tabler icon-tabler-shopping-cart stroke-green-500"
                  width="18"
                  height="18"
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
                <span className="font-bold">
                  ${cartValue.toFixed(2)}
                  {currentCurrency}
                </span>
              </button>
            </li>
          ) : (
            ""
          )}
          <li>
            <button onClick={toggleMenu}>
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
            </button>
          </li>
        </motion.ul>
        <AnimatePresence>
          {navMenu && (
            <>
              <motion.div
                initial={{ y: -150 }}
                animate={{ y: 0 }}
                exit={{ y: -150 }}
                className="mt-4 block md:hidden w-full"
                transition={{ type: "tween", duration: 0.2 }}
                layout
              >
                <ul className="flex font-extrabold justify-between h-10 -mt-4 bg-green-600 px-6 items-center">
                  <li>
                    <a href="./home">Home</a>
                  </li>
                  <li>
                    <a href="./order">Order</a>
                  </li>
                  <li>
                    <a href="./careers">Careers</a>
                  </li>
                  <li>
                    <a href="./contact">Contact</a>
                  </li>
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ type: "tween", duration: 0.2, delay: 0.28 }}
              >
                <div className="fixed block md:hidden h-full w-full bg-gradient-to-b from-black to-transparent  opacity-40"></div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </main>
  );
};

export default Navbar;
