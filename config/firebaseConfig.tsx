// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "joystory-3cacb.firebaseapp.com",
  projectId: "joystory-3cacb",
  storageBucket: "joystory-3cacb.firebasestorage.app",
  messagingSenderId: "489058558209",
  appId: "1:489058558209:web:d9c5d56ee05b9ad6a43b00",
  measurementId: "G-7D2HVZ7HTP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage=getStorage(app);