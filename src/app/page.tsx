"use client";
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
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
  itemIngredients: {
    [key: string]: {
      count: number;
      price: number;
      comesWith: number;
      max: number;
      min: number;
    };
  };
}

const IndexPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItems, setSelectedItems] = useState<DocumentData[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<ItemData | null>(
    null
  );
  const [cartValue, setCartValue] = useState<number>(0);

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
    <main className="md:flex mt-[58px] ">
      <Navbar />

      <div className="md:h-screen h-10  md:flex border-b md:border-r  shaodw-lg  bg-white  flex-col justify-between">
        <ul
          className="flex md:flex-col gap-2  overflow-x-auto
        "
        >
          {categories.map((category, index) => (
            <li
              key={index}
              className={`capitalize font-extrabold hover:border-spacing-3  hover:text-blue-500 px-4 py-2 border-b cursor-pointer`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.id}
            </li>
          ))}
        </ul>
        <button className="flex absolute items-center h-fit w-fit p-2 rounded-lg bottom-2 px-4 right-2  justify-center gap-1 text-white hover:bg-green-700 bg-green-500">
          <span className="font-extrabold">${cartValue.toFixed(2)}</span>
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
        <div className="h-screen bg-slate-50">
          <ul className="z-10">
            {selectedItems.map((item, index) => (
              <motion.button
                whileTap={{}}
                key={index}
                className="flex items-center px-4  hover:py-8 transition-all min-h-32  text-left w-screen  border-b hover:bg-slate-100 bg-white p-2 "
                onClick={() => handleItemClick(item)}
              >
                <div className="flex flex-col">
                  <h1 className="text-2xl font-extrabold">{item.itemName}</h1>
                  <p className="text-sm max-w-80">{item.itemDescription}</p>
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
              </motion.button>
            ))}
          </ul>
        </div>
      )}
      <AnimatePresence>
        {isModalOpen && selectedItemData && (
          <main className="absolute h-screen w-screen top-0">
            <div>
              <Backdrop />
            </div>
            <Modal
              itemData={selectedItemData}
              toggleModal={toggleModal}
              cartValue={cartValue}
              setCartValue={setCartValue}
            />
          </main>
        )}
      </AnimatePresence>
    </main>
  );
};

export default IndexPage;
