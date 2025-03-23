// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCjZyCKcFG7SbeVxIytqv0-EF_DbXEjGcU",
  authDomain: "fit-pool.firebaseapp.com",
  projectId: "fit-pool",
  storageBucket: "fit-pool.firebasestorage.app",
  messagingSenderId: "421034042515",
  appId: "1:421034042515:web:18045367a46c11e31b9966",
  measurementId: "G-9Q8XTWE2YP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;