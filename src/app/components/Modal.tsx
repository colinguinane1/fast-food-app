import React, { useRef, useEffect } from "react";
import Backdrop from "./Backdrop";
interface ItemData {
  itemImageURL: string;
  itemName: string;
  itemCalories: number;
  itemDescription: string;
  itemBasePrice: number;
  itemIngredients: string;
  // Add other properties as needed
}

interface ModalProps {
  itemData: ItemData;
  toggleModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ itemData, toggleModal }) => {
  const modalRef = useRef<HTMLDivElement>(null);
  console.log(itemData.itemIngredients);

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      toggleModal();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <main>
      <div className="fixed inset-0 flex items-center justify-center">
        <div ref={modalRef} className="bg-white p-4 rounded-lg">
          <div className="border-b mb-2">
            <h1 className="font-extrabold text-2xl">{itemData.itemName}</h1>
            <p className="text-sm">{itemData.itemDescription}</p>
            <div className="flex flex-col">
              <h1 className="">${itemData.itemBasePrice}</h1>
              <h1>{itemData.itemCalories}</h1>
            </div>
          </div>
          {/* Display Ingredients Grid */}
          <div className="grid grid-cols-3 gap-4">
            <h1>{itemData.itemIngredients}</h1>
          </div>
          <div>
            <button className="bg-green-500 hover:bg-green-700 rounded-full px-4 p-1 text-white">
              Add
            </button>{" "}
            <button className="bg-green-500 hover:bg-green-700 rounded-full px-4 p-1 text-white">
              Customize
            </button>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Modal;
