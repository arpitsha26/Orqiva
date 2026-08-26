
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { GoogleAuthProvider } from "firebase/auth";


const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "orqiva-ai-58b84.firebaseapp.com",
  projectId: "orqiva-ai-58b84",
  storageBucket: "orqiva-ai-58b84.firebasestorage.app",
  messagingSenderId: "246114022726",
  appId: "1:246114022726:web:80d84a0c4bea5291d8e147"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth=getAuth(app)

export const googleProvider= new GoogleAuthProvider()