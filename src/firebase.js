// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvnrzNKdz4dxW0QbuD1a4Q8in9nyFA-8I",
  authDomain: "mannam2-c2568.firebaseapp.com",
  projectId: "mannam2-c2568",
  storageBucket: "mannam2-c2568.appspot.com",
  messagingSenderId: "372089425189",
  appId: "1:372089425189:web:7b59a23c1274b91f79decc",
  measurementId: "G-5FEGWGC4ZX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const auth = getAuth(app);
export {db, auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile};