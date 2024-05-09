"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "./firebase/firebase";
import Backdrop from "./components/Backdrop";
import Modal from "./components/Modal";
import { AnimatePresence, motion } from "framer-motion";

interface Category {
  id: string;
}

interface ItemData {
  itemImageURL: string;
  itemName: string;
  itemDescription: string;
  itemBasePrice: number;
  itemCalories: number;
  itemIngredients: { [key: string]: { count: number; price: number } };
  // Add other properties as needed
}

const IndexPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItems, setSelectedItems] = useState<DocumentData[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<ItemData | null>(
    null
  );

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };

  useEffect(() => {
    async function fetchData() {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const data: Category[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Category);
      });
      setCategories(data);
    }

    fetchData();
  }, []);

  const handleCategoryClick = async (categoryId: string) => {
    const querySnapshot = await getDocs(
      collection(db, "categories", categoryId, "items")
    );
    const items: DocumentData[] = [];
    querySnapshot.forEach((doc) => {
      items.push(doc.data());
    });
    console.log("Selected Items:", items);
    setSelectedItems(items);
  };

  const handleItemClick = (itemData: DocumentData) => {
    setSelectedItemData({
      itemImageURL: itemData.itemImageURL,
      itemName: itemData.itemName,
      itemDescription: itemData.itemDescription,
      itemBasePrice: itemData.itemBasePrice,
      itemCalories: itemData.itemCalories,
      itemIngredients: itemData.itemIngredients,
    });
    toggleModal();
  };

  return (
    <main className="flex">
      <div className="h-screen shaodw-lg bg-white flex flex-col justify-between">
        <ul className="flex flex-col ">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`capitalize hover:underline hover:text-blue-500 px-6 py-2 border-b cursor-pointer`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.id}
            </li>
          ))}
        </ul>
        <button className="flex items-center max-h-12  justify-center gap-1 text-white hover:bg-green-700 bg-green-500 w-full h-full">
          Cart
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="icon icon-tabler icon-tabler-shopping-cart stroke-white"
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
        </button>
      </div>
      {selectedItems.length > 0 && (
        <div className="">
          <ul className="z-10">
            {selectedItems.map((item, index) => (
              <button
                key={index}
                className="flex text-left w-screen border hover:bg-slate-100 bg-white p-2 rounded-md shadow-lg items-center"
                onClick={() => handleItemClick(item)}
              >
                <div className="">
                  <h1 className="text-2xl font-extrabold">{item.itemName}</h1>
                  <p className="text-sm max-w-52">{item.itemDescription}</p>
                  <div className="flex items-center gap-4">
                    <h1 className="font-extralight text-sm">
                      ${item.itemBasePrice}
                    </h1>
                    <h1 className="font-extralight text-sm">
                      {item.itemCalories} cals
                    </h1>
                  </div>
                </div>
                <img
                  className="w-16 h-16 ml-2"
                  src={item.itemImageURL}
                  alt={item.itemName}
                />
              </button>
            ))}
          </ul>
        </div>
      )}
      <AnimatePresence>
        {isModalOpen && selectedItemData && (
          <>
            <motion.div
              initial={{ scale: 1, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ opacity: 0 }}
              className="no_transition"
            >
              <Backdrop />
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              transition={{ type: "spring", duration: 0.4 }}
              className="absolute h-screen w-screen no_transition"
            >
              <Modal itemData={selectedItemData} toggleModal={toggleModal} />
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </main>
  );
};

export default IndexPage;
