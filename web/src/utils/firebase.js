import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database"
import firebaseConfig from "./firebase.config";

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

export default db;