// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration

const firebaseConfig = {
  apiKey: "AIzaSyAu2dFp-AjoAxrV-ZRcwbmU5BT2iukVxn4",
  authDomain: "travel-diary-e50f0.firebaseapp.com",
  projectId: "travel-diary-e50f0",
  storageBucket: "travel-diary-e50f0.appspot.com",
  messagingSenderId: "979965294859",
  appId: "1:979965294859:web:f28b88bf778ab0385a0a0e",
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
