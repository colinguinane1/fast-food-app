import Image from "next/image";
import Backdrop from "./Backdrop";
import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
const Navbar = () => {
  const [navMenu, setNavMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
        className={`top-0 fixed bg-green-500 text-white w-screen py-4 z-[1000] ${
          scrolled ? "text-white py-[8px] shadow-2xl" : ""
        }`}
      >
        <ul className="flex items-center font-extrabold  justify-between mx-4 md:mr-40">
          <li className="">
            <Image
              src={"/burgerb-2-2-2.png"}
              alt={"burger"}
              width={70}
              height={70}
            />
          </li>
          <li className="navbar_element">
            <a href="#">Home</a>
          </li>
          <li className="navbar_element">
            <a href="#">Order</a>
          </li>
          <li className="navbar_element">
            <a href="#">Careers</a>
          </li>
          <li className="navbar_element">
            <a href="#">Contact</a>
          </li>
          <li className="flex flex-col items-center  md:hidden">
            <button onClick={toggleMenu}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-menu-2 stroke-white"
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
                <path d="M4 6l16 0" />
                <path d="M4 12l16 0" />
                <path d="M4 18l16 0" />
              </svg>
            </button>
          </li>
        </ul>
      </div>
      <AnimatePresence>
        {navMenu && (
          <motion.div
            initial={{ x: 1000 }}
            animate={{ x: 0 }}
            exit={{ x: 1000 }}
            transition={{ type: "just" }}
            className="fixed  no_transition"
          >
            <ul className=" p-4 flex text-6xl flex-col gap-10 -mt-6 font-extrabold text-white bg-black bg-opacity-80 backdrop-blur-2xl  w-screen h-screen">
              <li>HOME</li>
              <li>ORDER</li>
              <li>CAREERS</li>
              <li>CONTACT</li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
};

export default Navbar;
