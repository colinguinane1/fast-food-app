"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebase/firebase";
import Backdrop from "../components/Backdrop";
import Modal from "../components/Modal";
import { AnimatePresence, motion } from "framer-motion";
import { useMediaQuery } from "@react-hook/media-query";
import Footer from "../components/Footer";
import LoadingSpinner from "../components/ui/LoadingSpinner";

interface Category {
  id: string;
  CategoryNewProduct: boolean;
}

interface CartItem {
  name: string;
  price: number;
  sizeCustomizations: [];
  dipCustomizations: [];
  itemCustomizations: [];
  extraAdditions: [];
  image: string;
}

interface ItemData {
  itemNewProduct: boolean;
  itemImageURL: string;
  itemName: string;
  itemDescription: string;
  itemBasePrice: number;
  itemCalories: number;
  itemSale: boolean;
  itemSalePrice: number;
  itemVegetarian: boolean;
  itemSizes: {
    [key: string]: {
      price: number;
    };
  };
  itemDip: {
    maxDips: number;
    availableDips: {
      [key: string]: {
        count: number;
        max: number;
        min: number;
      };
    };
  };
  itemIngredients: {
    [key: string]: {
      count: number;
      price: number;
      comesWith: number;
      max: number;
      min: number;
    };
  };
  itemExtraIngredients: {
    [key: string]: {
      count: number;
      price: number;
      comesWith: number;
      max: number;
      min: number;
    };
  };
}
interface CartItem {
  name: string;
  price: number;
}

const IndexPage: React.FC = () => {
  const currentPage = "Order";
  const [cartCount, setCartCount] = useState<number>(0);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedItems, setSelectedItems] = useState<DocumentData[]>([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const largeScreen = useMediaQuery("min-width: 768px");
  const [selectedItemData, setSelectedItemData] = useState<ItemData | null>(
    null
  );
  const [cartValue, setCartValue] = useState<number>(0);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null); // Add state for selected category

  const defaultCategoryId = "burgers"; // Set your default category ID here
  const [currentCurrency, setCurrentCurrency] = useState("CAD");
  const [loading, setLoading] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [cartContents, setCartContents] = useState<CartItem[]>([]);

  const toggleModal = () => {
    setModalOpen(!isModalOpen);
    console.log(isModalOpen);
  };

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, "categories"));
      const data: Category[] = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() } as Category);
      });
      setCategories(data);
      setLoading(false);

      // Check if the default category exists and fetch its items
      const defaultCategory = data.find(
        (category) => category.id === defaultCategoryId
      );
      if (defaultCategory) {
        handleCategoryClick(defaultCategoryId);
      }
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
    setSelectedCategory(categoryId); // Set the selected category
    setLoading(false);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 0;
      setScrolled(isScrolled);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleItemClick = (itemData: DocumentData) => {
    setSelectedItemData({
      itemNewProduct: itemData.itemNewProduct,
      itemImageURL: itemData.itemImageURL,
      itemName: itemData.itemName,
      itemDescription: itemData.itemDescription,
      itemBasePrice: itemData.itemBasePrice,
      itemCalories: itemData.itemCalories,
      itemIngredients: itemData.itemIngredients,
      itemVegetarian: itemData.itemVegetarian,
      itemSale: itemData.itemSale,
      itemSalePrice: itemData.itemSalePrice,
      itemDip: itemData.itemDip,
      itemExtraIngredients: itemData.itemExtraIngredients,
      itemSizes: itemData.itemSizes,
    });
    toggleModal();

    window.scrollTo({
      top: 0,
      left: 0,
    });
  };

  return (
    <body className="bg-slate-200">
      <main className="md:flex pt-2 md:pt-0  md:mt-[56px]">
        {loading && <LoadingSpinner />}
        {!loading && (
          <>
            <div className="md:h-screen h-10 hide-scrollbar md:flex decoration shaodw-lg bg-gradient-to-b from-slate-200 to-slate-100 text-black flex-col justify-between">
              <ul className="flex md:flex-col md:mt-2  justify-between md:mx-0 mx-2 md:gap-6  overflow-x-auto">
                {categories.map((category, index) => (
                  <motion.li
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    key={index}
                    className={`capitalize gap-2 items-center flex mr-1 no_transition font-extrabold px-4 py-1 cursor-pointer ${
                      selectedCategory === category.id
                        ? "  shadow-2xl border-b-2  border-black bg-slate-200 py-2"
                        : "hover:text-green-500"
                    }`}
                    onClick={() => handleCategoryClick(category.id)}
                  >
                    {category.id}
                    {category.CategoryNewProduct && (
                      <div className="text-xs md:absolute md:mb-[45px] md:ml-1   bg-red-300  px-3 rounded-full border-red-500 border text-red-500">
                        <h1 className="animate-pulse">New</h1>
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
              {scrolled && (
                <AnimatePresence>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h1 className="z-[10000] no_transition transition-none fixed top-0 capitalize bg-slate-200 w-screen py-2 px-4 font-extrabold">
                      {selectedCategory}
                    </h1>
                  </motion.div>
                </AnimatePresence>
              )}
            </div>
            {selectedItems.length > 0 && (
              <>
                <div className="pb-10 min-h-screen w-screen bg-slate-100">
                  <ul className="z-10 grid md:grid-cols-2 gap-2 pt-2  mx-2">
                    {selectedItems.map((item, index) => (
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        key={index}
                        className="flex rounded-lg justify-between hover:bg-gray-100 px-4 w-full items-center transition-all min-h-40 text-left shadow-lg hover:border-green-500 hover:shadow-xl hover:border-2 bg-white p-2"
                        onClick={() => handleItemClick(item)}
                      >
                        <div className="flex flex-col justify-between w-full">
                          <div className="">
                            <div className="flex items-center gap-2">
                              <h1 className="min-w-fit flex items-center gap-4 font-extrabold">
                                {item.itemName}{" "}
                                {/* <h1 className="font-extralight min-w-fit text-gray-500 text-sm">  // removed for now as i think it looks better
                                  {item.itemCalories} kcals
                                </h1> */}
                              </h1>
                              <div>
                                {item.itemVegetarian && (
                                  <h1 className="bg-yellow-300 text-sm px-3 rounded-full border-yellow-500 border text-yellow-600">
                                    V
                                  </h1>
                                )}
                              </div>
                            </div>
                            <p className="text-sm max-w-80 py-1 min-w-60">
                              {item.itemDescription}
                            </p>
                            <div className="flex items-center  gap-4 max-w-[450px]">
                              <h1 className="font-extralight py-1 flex gap-2 items-center text-sm">
                                {item.itemSale ? (
                                  <>
                                    {item.itemSale && (
                                      <h1 className="bg-green-500 min-w-fit flex items-center gap-1 p-1 rounded-full bg-opacity-30 border border-green-500 text-green-500">
                                        <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="icon icon-tabler icon-tabler-tag stroke-green-500 animate-pulse"
                                          width="15"
                                          height="15"
                                          viewBox="0 0 24 24"
                                          strokeWidth="1.5"
                                          stroke="#2c3e50"
                                          fill="none"
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                        >
                                          <path
                                            stroke="none"
                                            d="M0 0h24v24H0z"
                                            fill="none"
                                          />
                                          <path d="M7.5 7.5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                                          <path d="M3 6v5.172a2 2 0 0 0 .586 1.414l7.71 7.71a2.41 2.41 0 0 0 3.408 0l5.592 -5.592a2.41 2.41 0 0 0 0 -3.408l-7.71 -7.71a2 2 0 0 0 -1.414 -.586h-5.172a3 3 0 0 0 -3 3z" />
                                        </svg>
                                      </h1>
                                    )}
                                    <h1 className="text-green-500 min-w-fit">
                                      ${item.itemSalePrice} {currentCurrency}
                                    </h1>{" "}
                                    <h1 className="line-through min-w-fit text-gray-200">
                                      ${item.itemBasePrice} {currentCurrency}
                                    </h1>{" "}
                                  </>
                                ) : (
                                  <h1>
                                    ${item.itemBasePrice} {currentCurrency}
                                  </h1>
                                )}
                              </h1>
                              {item.itemNewProduct && (
                                <h1 className="bg-red-300 text-sm px-3 rounded-full border-red-500 border text-red-500">
                                  New
                                </h1>
                              )}
                            </div>{" "}
                          </div>
                        </div>
                        <div className=" ">
                          <img
                            className="w-32 max-w-22 min-w-22"
                            src={item.itemImageURL}
                            alt={"Image of " + item.itemName}
                          />
                        </div>
                      </motion.button>
                    ))}
                  </ul>
                </div>
              </>
            )}
            <AnimatePresence>
              {isModalOpen && selectedItemData && (
                <main className="absolute h-screen w-screen top-0">
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="no_transition absolute h-screen w-screen top-0"
                  >
                    <Backdrop />
                  </motion.div>
                  <Modal
                    itemData={selectedItemData}
                    toggleModal={toggleModal}
                    cartValue={cartValue}
                    setCartCount={setCartCount}
                    cartCount={cartCount}
                    setCartValue={setCartValue}
                    currentCurrency={currentCurrency}
                    // @ts-ignore
                    cartContents={cartContents}
                    // @ts-ignore
                    setCartContents={setCartContents}
                  />
                </main>
              )}{" "}
            </AnimatePresence>{" "}
          </>
        )}{" "}
      </main>{" "}
    </body>
  );
};

export default IndexPage;
