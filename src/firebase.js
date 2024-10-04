// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Importando o Firestore
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCV3L3z4p9UUsnik5H1KLIZLh2kShGyyLo",
  authDomain: "rueda-qrcode.firebaseapp.com",
  projectId: "rueda-qrcode",
  storageBucket: "rueda-qrcode.appspot.com",
  messagingSenderId: "351567393506",
  appId: "1:351567393506:web:0f962a51b6d17558e3a4bb",
  measurementId: "G-PGLM3LXN7B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app); // Inicializando o Firestore

export { db }; // Exportando o objeto db
