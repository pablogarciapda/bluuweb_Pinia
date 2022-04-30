import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore/lite'

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: 'AIzaSyA_OuxZiJP_yibD8eN4hCRFxDl1d0lYIoE',
  authDomain: 'vite-firebase-144be.firebaseapp.com',
  projectId: 'vite-firebase-144be',
  storageBucket: 'vite-firebase-144be.appspot.com',
  messagingSenderId: '151658304446',
  appId: '1:151658304446:web:5dc63c7a7d2e483cdc5fef',
}

initializeApp(firebaseConfig)
const auth = getAuth()
const db = getFirestore()

export { auth, db }
