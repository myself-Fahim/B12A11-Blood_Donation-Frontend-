// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCTlhTtJrmKPhTM4OyxfRRqnmLAjtZZu64",
  authDomain: "blood-donation-bd102.firebaseapp.com",
  projectId: "blood-donation-bd102",
  storageBucket: "blood-donation-bd102.firebasestorage.app",
  messagingSenderId: "502237669404",
  appId: "1:502237669404:web:8e653c6ea7b19169b557d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth