import { IoHomeOutline } from "react-icons/io5";
import { PiHamburger } from "react-icons/pi";
import { GoPersonAdd } from "react-icons/go";

export const NavbarData = [
  { pageName: "Home", icon: <IoHomeOutline size={20} />, href: "./home" },
  { pageName: "Order", icon: <PiHamburger size={20} />, href: "./order" },
  { pageName: "Careers", icon: <GoPersonAdd size={20} />, href: "./careers" },
];
