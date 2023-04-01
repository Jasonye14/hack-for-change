import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    databaseURL: 'https://hack-for-change-b2184-default-rtdb.firebaseio.com/', // can't access this through process.env for some reason?
    messagingSenderId: process.env.FIREBASE_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
}

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export default db;