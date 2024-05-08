"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "./firebase/firebase";
import { motion } from "framer-motion";
import Backdrop from "./components/Backdrop";
import Modal from "./components/Modal";

interface Category {
  id: string;
  // Add any other fields here according to your data structure
}

const IndexPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItems, setSelectedItems] = useState<DocumentData[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedItemData, setSelectedItemData] = useState<DocumentData | null>(
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
    console.log("Selected Items:", items); // Log the selected items
    setSelectedItems(items);
  };
  const handleItemClick = (itemData: DocumentData) => {
    setSelectedItemData(itemData); // Ensure itemData is correctly set
    console.log(itemData); // Log the itemData to check if it's correct
    toggleModal();
  };

  return (
    <main className="flex">
      <div className="h-screen w-40 shaodw-lg bg-white">
        <ul className="max-w-[400px]">
          {categories.map((category, index) => (
            <li
              key={index}
              className={`capitalize hover:bg-gray-200 p-3 border-b  cursor-pointer ${category}`}
              onClick={() => handleCategoryClick(category.id)}
            >
              {category.id}
            </li>
          ))}{" "}
          <button className="absolute flex items-center justify-center gap-1 text-white bottom-0 hover:bg-green-700 bg-green-500 w-40 h-12">
            Cart
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-shopping-cart stroke-white"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="#000000"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none" />
              <path d="M6 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0" />
              <path d="M17 17h-11v-14h-2" />
              <path d="M6 5l14 1l-1 7h-13" />
            </svg>
          </button>
        </ul>
      </div>
      {selectedItems.length > 0 && (
        <div className="p-4">
          <h2></h2>
          <ul className="">
            {selectedItems.map((item, index) => (
              <button
                key={index}
                className="flex  text-left border hover:bg-slate-100 bg-white p-2 rounded-md shadow-lg items-center"
                onClick={() => handleItemClick(item)}
              >
                <div className="">
                  <h1 className="text-2xl font-extrabold">{item.itemName}</h1>
                  <p className="text-sm max-w-52">{item.itemDescription}</p>
                  <h1 className="font-extralight">${item.itemBasePrice}</h1>
                </div>
                <img className="w-16 h-16 ml-2" src={item.itemImageURL}></img>{" "}
              </button> // Adjust this according to your item structure
            ))}
          </ul>
        </div>
      )}
      {isModalOpen && selectedItemData && (
        <div className="absolute">
          <Modal itemData={selectedItemData} toggleModal={toggleModal} />
        </div>
      )}
    </main>
  );
};

export default IndexPage;
