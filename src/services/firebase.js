import { initializeApp } from 'firebase/app'
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyBdhzZFwlsBxg651TupPZ6f4cZRVo6_3pY',
  authDomain: 'studysprint-5d66c.firebaseapp.com',
  projectId: 'studysprint-5d66c',
  storageBucket: 'studysprint-5d66c.firebasestorage.app',
  messagingSenderId: '4567622077',
  appId: '1:4567622077:web:3d2fcdea75a7749f1bf2d4',
  measurementId: 'G-K5ZPDRQ47B',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)

setPersistence(auth, browserLocalPersistence).catch((error) => {
  console.error('Failed to set persistence:', error)
})

export { signOut, createUserWithEmailAndPassword, signInWithEmailAndPassword }
