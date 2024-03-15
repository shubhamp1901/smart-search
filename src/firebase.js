// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import {getStorage} from 'firebase/storage'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBy7ef2Od34Lr_jldEV2uRxX9-DfDD3wg8",
  authDomain: "smart-search-2a05e.firebaseapp.com",
  projectId: "smart-search-2a05e",
  storageBucket: "smart-search-2a05e.appspot.com",
  messagingSenderId: "246181404483",
  appId: "1:246181404483:web:b69e87d20811f7379959f6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);