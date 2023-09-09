import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import {getAuth} from "firebase/auth";
import admin from "firebase-admin";
// import { initializeApp } from 'firebase-admin/app';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_ID,
    projectId: "to-do-ap-790f3",
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: "188684636069",
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: "G-6KL1F14867"
  };

  export const app = initializeApp(firebaseConfig);
  // export const app = initializeApp();
  // export const db = getFirestore(app);
  export const auth = getAuth(app);
  
