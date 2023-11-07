// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyANuWfr1pt2B5b2rrLp4qF493YeopxhKIk",
  authDomain: "mannam2.firebaseapp.com",
  projectId: "mannam2",
  storageBucket: "mannam2.appspot.com",
  messagingSenderId: "125225470759",
  appId: "1:125225470759:web:b78e6876fd6ac79375f702",
  measurementId: "G-4D2Y2CY1FM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);;
export const db = getFirestore(app);
