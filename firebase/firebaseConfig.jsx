// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
    initializeAuth,
    getReactNativePersistence
} from 'firebase/auth';

import AsyncStorage from '@react-native-async-storage/async-storage';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDf1u33yCx47cgoxFo-1NQaYQ6DC18ddCw",
    authDomain: "bfbmobilehub.firebaseapp.com",
    projectId: "bfbmobilehub",
    storageBucket: "bfbmobilehub.firebasestorage.app",
    messagingSenderId: "64180973500",
    appId: "1:64180973500:web:69fa32f197acc524a945b9"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
});

export { auth };