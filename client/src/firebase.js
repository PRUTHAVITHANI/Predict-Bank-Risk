
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "smart-real-estate-6600f.firebaseapp.com",
  projectId: "smart-real-estate-6600f",
  storageBucket: "smart-real-estate-6600f.appspot.com",
  messagingSenderId: "110792801861",
  appId: "1:110792801861:web:ffd139273717615e7a2d2c",
  measurementId: "G-7VB9CB2Q8T"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);