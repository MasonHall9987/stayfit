import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ← Add this

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDjczi-v1iCE5A_X_vQ1w5IxehnRhG5v-Y",
  authDomain: "fitness-webapp-4ce92.firebaseapp.com",
  projectId: "fitness-webapp-4ce92",
  storageBucket: "fitness-webapp-4ce92.firebasestorage.app",
  messagingSenderId: "240178534704",
  appId: "1:240178534704:web:a67634704e6c973fbcd0f5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app); // ← Add this line

export {app,auth,db};