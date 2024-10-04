// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore"; // Import Firestore functions
import { getAnalytics } from "firebase/analytics";

// Firebase configuration
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
const db = getFirestore(app); // Initialize Firestore

// Função para armazenar dados no Firestore
export async function saveData(link, interest) {
  try {
    await addDoc(collection(db, "qrcodes"), {
      link: link,
      interest: interest,
      timestamp: new Date() // Adiciona um timestamp para referência
    });
    console.log("Dados salvos com sucesso no Firestore!");
  } catch (error) {
    console.error("Erro ao salvar dados no Firestore: ", error);
  }
}
