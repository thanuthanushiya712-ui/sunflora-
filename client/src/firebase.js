import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBvXknZOFBWNCtEBYAp9rQk4BKL8tMDRh4",
  authDomain: "sunflora-organics.firebaseapp.com",
  projectId: "sunflora-organics",
  storageBucket: "sunflora-organics.firebasestorage.app",
  messagingSenderId: "401956778708",
  appId: "1:401956778708:web:8e644face8cf3137bd8141",
  measurementId: "G-1V01BPCECH"
};

const app = initializeApp(firebaseConfig);

export default app;