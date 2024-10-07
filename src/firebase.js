// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore, collection, addDoc } from 'firebase/firestore' // Import Firestore functions

// Firebase configuration using environment variables
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
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
    throw error
  }
}

export { db }
