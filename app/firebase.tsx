import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCYMkG_fXoxCRsKImpuWSHvSOZq_zv1fJU",
  authDomain: "teddycare-12aaf.firebaseapp.com",
  databaseURL: "https://teddycare-12aaf-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "teddycare-12aaf",
  storageBucket: "teddycare-12aaf.appspot.com",
  messagingSenderId: "196422363895",
  appId: "1:196422363895:web:9210efa3e8fc77e62ec1f2",
  measurementId: "G-BHFY68W6Q5"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);