// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage} from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAyb8DqIh9SRaQglsm5V2XWH8K-nA5TV5U",
  authDomain: "nwitter-reloaded-bfffe.firebaseapp.com",
  projectId: "nwitter-reloaded-bfffe",
  storageBucket: "nwitter-reloaded-bfffe.firebasestorage.app",
  messagingSenderId: "960699221543",
  appId: "1:960699221543:web:73d37c12a81db04a95b002",
  measurementId: "G-1RMC3HS00M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const storage = getStorage(app);
export const db = getFirestore(app);
