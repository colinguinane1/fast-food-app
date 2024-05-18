import Image from "next/image";
const Navbar = () => {
  return (
    <main className="top-0 fixed w-screen bg-green-500 py-4">
      <ul className="flex items-center font-extrabold text-white  justify-between mx-4 md:mr-40">
        <li className="">
          <Image
            src={"/burgerb-2-2-2.png"}
            alt={"burger"}
            width={70}
            height={70}
          />
        </li>
        <li className="navbar_element">Home</li>
        <li className="navbar_element">Order</li>
        <li className="navbar_element">Careers</li>
        <li className="navbar_element">Contact</li>
        <li className="flex flex-col items-center block md:hidden">
          <button>
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
    </main>
  );
};

export default Navbar;
