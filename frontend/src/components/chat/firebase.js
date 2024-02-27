// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from 'firebase/database';
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDCwvHKb-5rhHT-W0J5kJH69WXpr0CJoUg",
    authDomain: "chat-test-285f6.firebaseapp.com",
    databaseURL: "https://chat-test-285f6-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chat-test-285f6",
    storageBucket: "chat-test-285f6.appspot.com",
    messagingSenderId: "553877718109",
    appId: "1:553877718109:web:852f612a9dc46baca439b4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getDatabase(app);
export const storage = getStorage(app);

export default app;