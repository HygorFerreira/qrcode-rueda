// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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