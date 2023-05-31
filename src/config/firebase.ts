// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA7qRoQqE748BNzZ60FLkeyp8Gx1rDS1K4",
  authDomain: "socialite-54f69.firebaseapp.com",
  projectId: "socialite-54f69",
  storageBucket: "socialite-54f69.appspot.com",
  messagingSenderId: "301892496059",
  appId: "1:301892496059:web:f25972071979db423b179e",
  measurementId: "G-XZCCLTKD2M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const database = getFirestore(app)