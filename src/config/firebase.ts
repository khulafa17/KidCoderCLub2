// Firebase configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDmp0wxBayGi78HiriFwt8koXU1aR0QbVc",
  authDomain: "kidcoderclub.firebaseapp.com",
  projectId: "kidcoderclub",
  storageBucket: "kidcoderclub.firebasestorage.app",
  messagingSenderId: "1085479821149",
  appId: "1:1085479821149:web:ffe66ad61c16d9b5c6d2b4",
  measurementId: "G-TYJG7GQHVQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);

export default app;
