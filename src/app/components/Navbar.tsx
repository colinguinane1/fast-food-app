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
              initial={{ y: -150 }}
              animate={{ y: 0 }}
              exit={{ y: -150 }}
              className="mt-4 fixed bottom-0 block md:hidden z-[10000] w-full"
              transition={{ type: "tween", duration: 0.2 }}
              layout
            >
              <ul className="flex text-xs font-extrabold justify-between h-fit py-2 -mt-4 bg-green-600 px-6 items-center">
                <li>
                  <a
                    href="./home"
                    className="flex items-center justify-center flex-col"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-home-2"
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
                    <label>Home</label>
                  </a>
                </li>
                <li>
                  <a
                    href="./order"
                    className="flex items-center justify-center flex-col"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-truck-delivery"
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
                    <label>Order</label>
                  </a>
                </li>
                <li>
                  <a
                    href="./careers"
                    className="flex items-center justify-center flex-col"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-users"
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
                    <label>Careers</label>
                  </a>
                </li>
                <li>
                  <a
                    href="./contact"
                    className="flex items-center justify-center flex-col"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="icon icon-tabler icon-tabler-address-book"
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
                      <path d="M20 6v12a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2z" />
                      <path d="M10 16h6" />
                      <path d="M13 11m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
                      <path d="M4 8h3" />
                      <path d="M4 12h3" />
                      <path d="M4 16h3" />
                    </svg>
                    <label>Contact</label>
                  </a>
                </li>
              </ul>{" "}
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
    </main>
  );
};

export default Navbar;
