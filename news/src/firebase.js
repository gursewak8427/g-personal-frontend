import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: "AIzaSyCPuI-iQrh3auGkHleWUU7PNxMV0UFcZ48",
    authDomain: "learn-global.firebaseapp.com",
    databaseURL: "https://learn-global.firebaseio.com",
    projectId: "learn-global",
    storageBucket: "learn-global.appspot.com",
    messagingSenderId: "1040801243645",
    appId: "1:1040801243645:web:a3b565edaa8c08749e7994"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
// export const fbDatabase = getDatabase(app);
// export const fStore = getFirestore(app);
// export const fStorage = getStorage(app);