// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBx-a_KCWxNfTYVriKplqB6HyX2iQ1eQVE",
  authDomain: "empathy-journal.firebaseapp.com",
  projectId: "empathy-journal",
  storageBucket: "empathy-journal.firebasestorage.app",
  messagingSenderId: "156322184483",
  appId: "1:156322184483:web:9e4987d45a7fe911dca096",
  measurementId: "G-559F98L9NM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };