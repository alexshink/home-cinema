import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

export const firebaseApp = initializeApp({
  apiKey: "AIzaSyBBi-qazeRwtQ223P0Gfm01uiflzvjvSxk",
  authDomain: "home-cinema-28af0.firebaseapp.com",
  projectId: "home-cinema-28af0",
  storageBucket: "home-cinema-28af0.appspot.com",
  messagingSenderId: "642870991425",
  appId: "1:642870991425:web:05c0f861395d9758fec4c0",
  measurementId: "G-D7CZHB9FZY"
})

// used for the firestore refs
export const db = getFirestore(firebaseApp)