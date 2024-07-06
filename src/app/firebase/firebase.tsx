// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

// -- I know i shouldnt have this here, but my database is read-only so whatever
const firebaseConfig = {
  apiKey: "AIzaSyAR_OkOxum99ATeYva1IAYx5CdxM4MAJuA",
  authDomain: "fast-food-app-58d04.firebaseapp.com",
  projectId: "fast-food-app-58d04",
  storageBucket: "fast-food-app-58d04.appspot.com",
  messagingSenderId: "183064463850",
  appId: "1:183064463850:web:672c3ac4874c62f47e0a93",
  measurementId: "G-9E0G7KLE4X",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

export default firebaseConfig;
