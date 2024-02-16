// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDJhbChrnai7W7f8p_FYKG7nELwzDql1bA",
  authDomain: "gptdaiary.firebaseapp.com",
  projectId: "gptdaiary",
  storageBucket: "gptdaiary.appspot.com",
  messagingSenderId: "142574620984",
  appId: "1:142574620984:web:1f99aa4e298634baf4b1cd",
  measurementId: "G-THTRNE64VB",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
