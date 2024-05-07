// pages/[itemId].tsx

import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import firebase from "firebase/app";
import "firebase/firestore";

interface Item {
  itemName: string;
  itemImageURL: string;
  itemCalories: number;
  itemBasePrice: number;
  itemIngredients: { [key: string]: Ingredient };
}

interface Ingredient {
  comesWith: number;
  count: number;
  price: number;
  max: number;
  min: number;
}

const ItemPage = () => {
  const [itemData, setItemData] = useState<Item | null>(null);

  useEffect(() => {
    const fetchItemData = async () => {
      try {
        // Initialize Firebase if not already initialized
        if (!firebase.apps.length) {
          firebase.initializeApp({
            // Your Firebase config here
          });
        }
        // Reference to the Firestore collection
        const itemsCollection = firebase.firestore().collection("items");

        // Query the Firestore collection for the specified item ID
        const snapshot = await itemsCollection.doc(itemId).get();
        if (snapshot.exists) {
          setItemData(snapshot.data() as Item);
        } else {
          console.log("No such item found!");
        }
      } catch (error) {
        console.error("Error fetching item data:", error);
      }
    };

    fetchItemData();
  }, [router.query.itemId]); // Dependency on itemId from router query

  return (
    <div>
      {itemData && (
        <div>
          <h1>{itemData.itemName}</h1>
          <img src={itemData.itemImageURL} alt={itemData.itemName} />
          <p>Calories: {itemData.itemCalories}</p>
          <p>Base Price: ${itemData.itemBasePrice}</p>
          <h2>Ingredients:</h2>
          <ul>
            {Object.entries(itemData.itemIngredients).map(
              ([ingredient, details]) => (
                <li key={ingredient}>
                  {ingredient}: {details.count} {details.price}
                </li>
              )
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ItemPage;
