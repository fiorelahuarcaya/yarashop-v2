import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import {
    connectFirestoreEmulator,
    Firestore,
    getFirestore,
    initializeFirestore,
  } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyDFRdbTcriofsx4rKN8_1z6a6z_vWW-grQ",
  authDomain: "yarashop-fe6d0.firebaseapp.com",
  projectId: "yarashop-fe6d0",
  storageBucket: "yarashop-fe6d0.appspot.com",
  messagingSenderId: "1081797079138",
  appId: "1:1081797079138:web:fbded0ff1adb97cab2213b",
  measurementId: "G-GPRRMYPNDY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);