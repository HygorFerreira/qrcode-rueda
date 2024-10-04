// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore' // Import Firestore functions

// Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCV3L3z4p9UUsnik5H1KLIZLh2kShGyyLo',
  authDomain: 'rueda-qrcode.firebaseapp.com',
  projectId: 'rueda-qrcode',
  storageBucket: 'rueda-qrcode.appspot.com',
  messagingSenderId: '351567393506',
  appId: '1:351567393506:web:0f962a51b6d17558e3a4bb',
  measurementId: 'G-PGLM3LXN7B'
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const db = getFirestore(app) // Initialize Firestore

// Função para armazenar dados no Firestore
export async function saveData(link, interest) {
  try {
    const docRef = await addDoc(collection(db, 'qrcodes'), {
      link: link,
      interest: interest,
      timestamp: new Date()
    })
    console.log('Dados salvos com sucesso no Firestore com ID: ', docRef.id)
    return docRef.id
  } catch (error) {
    console.error('Erro ao salvar dados no Firestore: ', error)
    throw error // Propaga o erro para ser tratado pelo chamador
  }
}

export { db }
