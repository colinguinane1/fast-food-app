const Navbar = () => {
  return (
    <main className="top-0 fixed w-screen bg-white border py-4">
      <li className="font-bold absolute  -mt-1 left-10 border-2 border-black h-8 w-8 bg-red-400 rounded-full items-center flex justify-center">
        FF
      </li>
      <ul className="flex items-center justify-between mx-40">
        <li>Home</li>
        <li>Order</li>
        <li>Careers</li>
        <li>Contact</li>
      </ul>
    </main>
  );
};

export default Navbar;
