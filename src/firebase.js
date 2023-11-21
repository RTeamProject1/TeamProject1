// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_qEuh7Jw63-YH-V4TGWgLWSZYKd0ct1M",
  authDomain: "teamproject-react.firebaseapp.com",
  projectId: "teamproject-react",
  storageBucket: "teamproject-react.appspot.com",
  messagingSenderId: "558984290729",
  appId: "1:558984290729:web:ca7a734a690da58fb3e4b8",
  measurementId: "G-VPZPRVPFVE"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);;
export const db = getFirestore(app);
