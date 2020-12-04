import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDuTvKBQsvdB4NudsSt95q3ZXfUw_fg_JA",
  authDomain: "my-ecommerce-store-9d101.firebaseapp.com",
  projectId: "my-ecommerce-store-9d101",
  storageBucket: "my-ecommerce-store-9d101.appspot.com",
  messagingSenderId: "456018180042",
  appId: "1:456018180042:web:e790bc2359034aa5c50133",
  measurementId: "G-NXWZS3PNC2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

export { auth, db, storage };
