import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Ensure this path is correct
import { AnimatePresence, motion } from "framer-motion";

interface CartItem {
  name: string;
  price: number;
  basePrice: number;
  saleActive: boolean;
  salePrice: number;
  image: string;
  sizeCustomizations: {
    [key: string]: {
      price: number;
    };
  };
  dipCustomizations: {
    maxDips: number;
    availableDips: {
      [key: string]: {
        count: number;
        max: number;
        min: number;
      };
    };
  };
  itemCustomizations: {
    [key: string]: {
      count: number;
      price: number;
      comesWith: number;
      max: number;
      min: number;
    };
  };
  extraAdditions: {
    [key: string]: {
      count: number;
      price: number;
      comesWith: number;
      max: number;
      min: number;
    };
  };
}

interface CheckoutProps {
  toggleCartVisible: () => void; // Define the type of toggleCartVisible prop
}

const Checkout: React.FC<CheckoutProps> = ({ toggleCartVisible }) => {
  const { cartContents, removeFromCart } = useCart(); // Get cart items from the context
  const { cartCount } = useCart();

  // Calculate the total price
  const totalPrice = cartContents.reduce((acc, item) => acc + item.price, 0);
  const [taxes, setTaxes] = useState(false);
  const taxRate = 0.05;
  const deliveryFee = 5.0;
  const [deliveryOption, setDeliveryOption] = useState<string>("delivery");
  const [cartRemove, setCartRemove] = useState(false);
  const [selectedItem, setSelectedItem] = useState<CartItem | null>(null);

  // Function to handle delivery option change
  const handleDeliveryOptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDeliveryOption(event.target.value);
  };

  const toggleCartRemove = (item?: CartItem) => {
    setSelectedItem(item || null);
    setCartRemove(!cartRemove);
  };

  return (
    <main className="z-10 overflow-y-auto pb-20 md:pb-4 fixed bg-gradient-to-b from-slate-200 to-white w-screen h-screen inset-0">
      <div className="flex flex-col items-center "></div>
      {cartCount > 0 ? (
        <>
          <div className="p-2 flex flex-col items-center w-full  justify-center ">
            <div className="max-w-[70rem]">
              <div className="flex justify-between">
                <h1 className=" flex  items-center   gap-2 font-extrabold text-4xl py-4">
                  Checkout{" "}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-shopping-cart stroke-black"
                    width="30"
                    height="30"
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
                </h1>
                <button className="block" onClick={toggleCartVisible}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="icon icon-tabler icon-tabler-chevron-down"
                    width="44"
                    height="44"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#2c3e50"
                    fill="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <path d="M6 9l6 6l6 -6" />
                  </svg>
                </button>
              </div>

              <ul className="py-4 flex flex-col gap-6">
                {cartContents.map((item, index) => (
                  <li
                    key={index}
                    onClick={() => toggleCartRemove(item)}
                    className="flex rounded-lg justify-between hover:cursor-pointer hover:bg-gray-100 px-4 w-full items-center transition-all min-h-40 text-left shadow-lg hover:border-red-500 hover:shadow-xl hover:border-2 bg-white p-2"
                  >
                    <div className="flex flex-col">
                      <span className="font-extrabold">{item.name}</span>
                      <h1 className="text-gray-500">
                        {item.saleActive
                          ? item.price != item.salePrice
                            ? "Customized"
                            : "Regular"
                          : item.price != item.basePrice
                          ? "Customized"
                          : "Regular"}
                      </h1>
                      {item.saleActive ? (
                        <div className="flex items-center gap-2">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="icon icon-tabler icon-tabler-tag stroke-green-500"
                            width="15"
                            height="15"
                            viewBox="0 0 24 24"
                            strokeWidth="1.5"
                            stroke="#2c3e50"
                            fill="none"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <path d="M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                            <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" />
                          </svg>
                          <h1 className="text-green-500">${item.price}</h1>
                        </div>
                      ) : (
                        <h1>${item.price}</h1>
                      )}
                    </div>
                    <div>
                      <img
                        className="w-32 max-w-22 min-w-22"
                        src={item.image}
                        alt={"Image of " + item.image}
                      />
                    </div>
                  </li>
                ))}
              </ul>
              <div className="border-b w-full py-4">
                <h1 className="font-extrabold py-2 text-lg">
                  How do you want to get your food?
                </h1>
                <input
                  type="radio"
                  name="delivery-option"
                  id="delivery"
                  value="delivery"
                  checked={deliveryOption === "delivery"}
                  onChange={handleDeliveryOptionChange}
                />
                <label htmlFor="delivery" className="px-2">
                  Delivery
                </label>
                <input
                  type="radio"
                  name="delivery-option"
                  id="pickup"
                  value="pickup"
                  checked={deliveryOption === "pickup"}
                  onChange={handleDeliveryOptionChange}
                />
                <label htmlFor="pickup" className="px-2">
                  Pick-up
                </label>
              </div>
              <div>
                <h1 className="text-lg font-extrabold py-4">
                  {deliveryOption === "delivery"
                    ? "Enter your address:"
                    : "Pick your nearest store:"}
                </h1>
                {deliveryOption === "delivery" && (
                  <input
                    className="border rounded-lg p-2 w-full"
                    placeholder="Don't actually enter your addrees here"
                  ></input>
                )}
                {deliveryOption === "pickup" && (
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <input className="flex" type="radio"></input>{" "}
                      <label> 178th ST, NW, Edmonton, AB (2.1km)</label>
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="radio"></input>{" "}
                      <label> 140th Ave, SW, Edmonton, AB (3.1km)</label>
                    </div>
                    <div className="flex items-center gap-4">
                      <input type="radio"></input>{" "}
                      <label> Parsons Rd, SW, Edmonton, AB (3.4km)</label>
                    </div>
                  </div>
                )}
              </div>
              <div className="text-right py-4">
                <h2>Subtotal: ${totalPrice.toFixed(2)}</h2>
                <h2>
                  Tax: +$<span>{(totalPrice * taxRate).toFixed(2)} </span>
                </h2>
                {deliveryOption === "delivery" && (
                  <h2>
                    Delivery Fee: +$<span>{deliveryFee.toFixed(2)} </span>
                  </h2>
                )}
                <h2>
                  Total: $
                  <span>
                    {(
                      totalPrice +
                      totalPrice * taxRate +
                      (deliveryOption === "delivery" ? deliveryFee : 0)
                    ).toFixed(2)}{" "}
                  </span>
                </h2>
              </div>
            </div>
            <div className="mx-4">
              <button className="w-full h-10 rounded-full bg-green-500 px-4 text-white font-extrabold">
                Pay $
                {(
                  totalPrice +
                  totalPrice * taxRate +
                  (deliveryOption === "delivery" ? deliveryFee : 0)
                ).toFixed(2)}
              </button>
            </div>
          </div>
        </>
      ) : (
        <div>
          <div className="flex justify-between p-4">
            <h1 className=" flex  items-center   gap-2 font-extrabold text-4xl py-4">
              Checkout{" "}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-shopping-cart stroke-black"
                width="30"
                height="30"
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
            </h1>
            <button className="block" onClick={toggleCartVisible}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="icon icon-tabler icon-tabler-chevron-down"
                width="44"
                height="44"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="#2c3e50"
                fill="none"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 9l6 6l6 -6" />
              </svg>
            </button>
          </div>
          <div className="flex flex-col items-center gap-10 py-10 text-3xl">
            Your cart is empty! 😢
            <a href="./order">
              <button
                onClick={toggleCartVisible}
                className="bg-green-500 text-white p-2 px-4 rounded-full text-lg font-extrabold "
              >
                Order Now
              </button>
            </a>
          </div>
        </div>
      )}
      {cartRemove && selectedItem && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed no_transition top-0 h-screen w-screen bg-black bg-opacity-40"
        >
          {" "}
          <div className="flex items-center justify-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ delay: 0.2 }}
              className="flex no_transition flex-col text-left  w-60 mt-[50%] p-2 px-4 bg-white rounded-lg"
            >
              <div>
                {" "}
                <h1 className="font-semibold text-xl py-3">
                  Remove from Cart?
                </h1>
                <p>{selectedItem.name}</p>
              </div>

              <div className="flex py-3 justify-between gap-4">
                <button
                  onClick={() => toggleCartRemove}
                  className="bg-slate-200 font-semibold p-2 rounded-lg w-full"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    removeFromCart(selectedItem);
                    toggleCartRemove();
                  }}
                  className="bg-red-500 text-white font-semibold p-2 rounded-lg w-full"
                >
                  Remove
                </button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </main>
  );
};

export default Checkout;
