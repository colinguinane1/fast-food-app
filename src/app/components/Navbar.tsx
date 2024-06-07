import Image from "next/image";
import Backdrop from "./Backdrop";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

// interface NavbarProps {
//   cartValue: number;
//   currentCurrency: string;
// }
const Navbar = ({}) => {
  const [navMenu, setNavMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [currentCurrency, setCurrentCurrency] = useState("CAD");
  const [cartValue, setCartValue] = useState<number>(0);

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
        className={`top-0 fixed bg-green-500 z-[10000] text-white w-screen md:py-2 py-4 ${
          scrolled ? "text-white py-[6px] shadow-2xl" : ""
        }`}
      >
        <ul className="flex items-center font-extrabold  justify-between mx-4 md:mr-10">
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
          <li>
            {cartValue != 0 ? (
              <button className="flex mr-10  bg-white text-green-500  items-center h-fit w-fit p-1 rounded-lg  px-2 z-[1000]   justify-center gap-1  hover:bg-green-700 ">
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
            ) : (
              ""
            )}
          </li>
          <li className="flex gap-2 items-center  md:hidden ">
            {" "}
            {/* <motion.button className="bg-white text-green-500 p-1 px-4 rounded-lg">
              Login
            </motion.button> */}
            <motion.button
              whileHover={navMenu ? { scale: 1.0 } : { scale: 1.1 }}
              whileTap={navMenu ? { scale: 1.0 } : { scale: 0.9 }}
              className="group no_transition flex items-center z-[1] gap-4"
              onClick={toggleMenu}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`icon icon-tabler icon-tabler-menu-2 stroke-black   rounded-full  p-1 group:hover:stroke-black ${
                  navMenu ? "bg-green-200" : "bg-white"
                }`}
                width="30"
                height="30"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 6l16 0" />
                <path d="M4 12l16 0" />
                <path d="M4 18l16 0" />
              </svg>{" "}
              <AnimatePresence>
                {navMenu && (
                  <motion.div
                    initial={{ y: -500 }}
                    animate={{ y: 0 }}
                    exit={{ y: -500 }}
                    transition={{ type: "spring", duration: 0.4 }}
                    className="fixed h-screen w-screen top-12 right-0   no_transition"
                  >
                    <ul
                      className={`p-4 flex z-[10000]  ${
                        scrolled ? "" : ""
                      }text-2xl flex-col gap-4 rounded-lg shadow-2xl border-2    font-extrabold text-white bg-green-400  `}
                    >
                      <a href="./home">
                        <li className="flex gap-1 items-center">
                          <div className="flex hover:bg-green-300 rounded-lg py-1 w-full items-center ">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="icon icon-tabler icon-tabler-home-2 stroke-white hover:stroke-green-200"
                              width="25"
                              height="25"
                              viewBox="0 0 24 24"
                              stroke-width="1.5"
                              stroke="#2c3e50"
                              fill="none"
                              stroke-linecap="round"
                              stroke-linejoin="round"
                            >
                              <path
                                stroke="none"
                                d="M0 0h24v24H0z"
                                fill="none"
                              />
                              <path d="M5 12l-2 0l9 -9l9 9l-2 0" />
                              <path d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7" />
                              <path d="M10 12h4v4h-4z" />
                            </svg>
                            Home
                          </div>
                        </li>
                      </a>
                      <a href="./order">
                        <li className="flex hover:bg-green-300 rounded-lg py-1 w-full items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-truck-delivery stroke-white"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#2c3e50"
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
                          Order
                        </li>
                      </a>
                      <li className="flex hover:bg-green-300 rounded-lg py-1 w-full items-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="icon icon-tabler icon-tabler-users stroke-white"
                          width="25"
                          height="25"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#2c3e50"
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
                        <a href="./careers">Careers</a>
                      </li>
                      <a href="./contact">
                        <li className="flex hover:bg-green-300 rounded-lg py-1 w-full items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-address-book stroke-white"
                            width="25"
                            height="25"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="#2c3e50"
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
                          Contact
                        </li>
                      </a>
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>
          </li>
        </ul>
      </div>
    </main>
  );
};

export default Navbar;
