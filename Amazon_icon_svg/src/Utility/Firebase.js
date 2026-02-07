import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import {getAuth} from "firebase/auth"
// import "fiberbase/compat/firesore"
// import "fiberbase/compat/auth"
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD0rMSxSDrg4xImvRcz6G86umwkhvMZAGk",
  authDomain: "clone-c34b5.firebaseapp.com",
  projectId: "clone-c34b5",
  storageBucket: "clone-c34b5.firebasestorage.app",
  messagingSenderId: "367761448820",
  appId: "1:367761448820:web:e96437923b3f0f26701621",
  measurementId: "G-36ZNJ43M44",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
