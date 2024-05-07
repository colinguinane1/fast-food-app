"use client";
import React, { useState, useEffect } from "react";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "./firebase/firebase";

interface Category {
  id: string;
  // Add any other fields here according to your data structure
}

async function fetchDataFromFirestore(): Promise<Category[]> {
  const querySnapshot = await getDocs(collection(db, "categories"));
  const data: Category[] = [];
  querySnapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() } as Category);
  });
  return data;
}

const IndexPage: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    async function fetchData() {
      const data = await fetchDataFromFirestore();
      setCategories(data);
    }

    fetchData();
  }, []); // Empty dependency array means this effect will only run once, similar to componentDidMount

  return (
    <div>
      <h1>Categories</h1>
      <ul>
        {categories.map((category, index) => (
          <li key={index}>{category.id}</li>
        ))}
      </ul>
    </div>
  );
};

export default IndexPage;
