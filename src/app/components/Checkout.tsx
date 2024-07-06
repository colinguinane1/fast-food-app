import React, { useState } from "react";
import { useCart } from "../context/CartContext"; // Ensure this path is correct

interface CartItem {
  name: string;
  price: number;
  image: string;
  sizeCustomizations: [];
  dipCustomizations: [];
  itemCustomizations: [];
  extraAdditions: [];
}

const Checkout: React.FC = () => {
  const { cartContents } = useCart(); // Get cart items from the context

  // Calculate the total price
  const totalPrice = cartContents.reduce((acc, item) => acc + item.price, 0);
  const [taxes, setTaxes] = useState(false);
  const taxRate = 0.05;
  const deliveryFee = 5.0;

  return (
    <main className="md:mt-14 z-10 fixed bg-gradient-to-b from-slate-200 to-white w-screen h-screen inset-0">
      <div className="p-4">
        <h1 className="font-extrabold text-4xl">Checkout</h1>

        <ul>
          {cartContents.map((item, index) => (
            <li
              key={index}
              className="flex rounded-lg justify-between hover:bg-gray-100 px-4 w-full items-center transition-all min-h-40 text-left shadow-lg hover:border-green-500 hover:shadow-xl hover:border-2 bg-white p-2"
            >
              <div className="flex flex-col">
                <span>{item.name}</span>
                <span>${item.price.toFixed(2)}</span>
              </div>
              <div className=" ">
                <img
                  className="w-32 max-w-22 min-w-22"
                  src={item.image}
                  alt={"Image of " + item.image}
                />
              </div>
            </li>
          ))}
        </ul>

        <input type="radio" name="delivery-option" id="delivery" />
        <label htmlFor="delivery">Delivery</label>
        <input type="radio" name="delivery-option" id="pickup" />
        <label htmlFor="pickup">Pick-up</label>
        <h2>Subtotal: ${totalPrice.toFixed(2)}</h2>
        <h2>
          Tax: +$<span>{(totalPrice * taxRate).toFixed(2)} </span>
        </h2>
        <h2>
          Delivery Fee: +$<span>{deliveryFee.toFixed(2)} </span>
        </h2>
        <h2>
          Total: $
          <span>
            {(totalPrice + totalPrice * taxRate + deliveryFee).toFixed(2)}{" "}
          </span>
        </h2>
      </div>
      <div className="mx-4">
        <button className="w-full h-10 rounded-full bg-green-500 px-4 text-white font-extrabold">
          Pay ${(totalPrice + totalPrice * taxRate + deliveryFee).toFixed(2)}
        </button>
      </div>
    </main>
  );
};

export default Checkout;
