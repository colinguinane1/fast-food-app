import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Ensure this path is correct
import { AnimatePresence, motion } from "framer-motion";
import RemoveFromCartDialog from "./ui/RemoveFromCartDialog";
import EmptyCart from "./ui/EmptyCart";
import { GoChevronDown } from "react-icons/go";
import { LuShoppingCart } from "react-icons/lu";
import { GoTag } from "react-icons/go";

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

  const toggleCancelCartRemove = () => {
    setCartRemove(!cartRemove);
  };

  return (
    <main className="z-10 overflow-y-auto pb-20 md:pb-4 fixed bg-gradient-to-b from-slate-200 to-white w-screen h-screen inset-0">
      <div className="flex flex-col items-center "></div>
      {cartCount > 0 ? (
        <>
          <div className="p-2 flex flex-col items-center w-full  justify-center ">
            <div className="max-w-[40rem] w-full">
              <div className="flex justify-between">
                <button className="block" onClick={toggleCartVisible}>
                  <GoChevronDown size={50} />
                </button>{" "}
                <h1 className=" flex  items-center   gap-2 font-extrabold text-4xl py-4">
                  Checkout <LuShoppingCart size={30} />
                </h1>
              </div>

              <ul className="py-4 flex flex-col gap-6">
                {cartContents.map((item, index) => (
                  <motion.li
                    whileTap={{ scale: 0.98 }}
                    key={index}
                    onClick={() => toggleCartRemove(item)}
                    className="flex rounded-lg justify-between hover:cursor-pointer  px-4 w-full items-center transition-all min-h-40 text-left shadow-lg hover:bg-red-100 hover:border-red-500 hover:shadow-xl hover:border-2 bg-white p-2"
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
                          <GoTag color="rgb(34 197 94)" />
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
                  </motion.li>
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
            <div className="px-10 w-full">
              <button className="w-full  h-10 rounded-lg bg-green-500 px-4 text-white font-semiabold">
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
            {" "}
            <button className="block" onClick={toggleCartVisible}>
              <GoChevronDown size={50} />
            </button>
            <h1 className=" flex  items-center   gap-2 font-extrabold text-4xl py-4">
              Checkout <LuShoppingCart size={30} />
            </h1>
          </div>
          <EmptyCart toggleCartVisible={toggleCartVisible} />
        </div>
      )}
      <AnimatePresence>
        {cartRemove && selectedItem && (
          <RemoveFromCartDialog
            selectedItem={selectedItem}
            removeFromCart={removeFromCart}
            toggleCartRemove={toggleCartRemove}
            toggleCancelCartRemove={toggleCancelCartRemove}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

export default Checkout;
