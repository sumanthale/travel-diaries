// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCIDAQhljlTQGY59STEnF6EvrqBWmwWQD4",
  authDomain: "travel-37b6d.firebaseapp.com",
  projectId: "travel-37b6d",
  storageBucket: "travel-37b6d.appspot.com",
  messagingSenderId: "819339224842",
  appId: "1:819339224842:web:e0deee7f2b956520e1bcf3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
