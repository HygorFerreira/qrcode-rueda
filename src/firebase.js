// Import the functions you need from the SDKs you need
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
async function saveData(link, interest) {
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

// Função para lidar com a leitura do QR Code
function handleQRCodeRead(data) {
  const interest = document.getElementById("interestDropdown").value; // Obtém o valor selecionado
  saveData(data, interest); // Salva o link e o interesse no Firestore
  alert('Dados salvos com sucesso!'); // Alerta de sucesso
}

// Adicionando a leitura do QR Code e usando um canvas otimizado
const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d', { willReadFrequently: true });

// Código para iniciar a leitura do QR Code
const scanner = new QrScanner(videoElement, handleQRCodeRead);
scanner.start();

// HTML para o dropdown de interesses
document.body.innerHTML += `
  <select id="interestDropdown">
    <option value="interesse1">Interesse 1</option>
    <option value="interesse2">Interesse 2</option>
    <option value="interesse3">Interesse 3</option>
  </select>
  <video id="videoElement"></video>
`;

// Inicia o scanner
QrScanner.WORKER_PATH = 'path/to/qr-scanner-worker.min.js'; // Altere para o caminho do seu worker
