// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-auth-8c16a.firebaseapp.com",
    projectId: "mern-auth-8c16a",
    storageBucket: "mern-auth-8c16a.appspot.com",
    messagingSenderId: "330496462345",
    appId: "1:330496462345:web:c5e6874b8c383fafa1f2d8",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
