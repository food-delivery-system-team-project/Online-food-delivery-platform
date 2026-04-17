// Import the functions you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"; // ✅ ADD THIS

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBeT2CXILbKZ5gMPTo0HO6yptjsS2ok8Q4",
  authDomain: "food-delivery-60b39.firebaseapp.com",
  projectId: "food-delivery-60b39",
  storageBucket: "food-delivery-60b39.firebasestorage.app",
  messagingSenderId: "469888855332",
  appId: "1:469888855332:web:bc81c54f843010a6d8d7b1",
  measurementId: "G-BVV6E66ME5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// ✅ Auth setup
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();