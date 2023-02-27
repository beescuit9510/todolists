import { initializeApp, getApp, getApps } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyA14fW9AFr79zEHD9A0WbvZJ_AYKrtOJbc',
  authDomain: 'todolists-c0cb3.firebaseapp.com',
  projectId: 'todolists-c0cb3',
  storageBucket: 'todolists-c0cb3.appspot.com',
  messagingSenderId: '430136396139',
  appId: '1:430136396139:web:02d92a496ae107d72aa42e',
  measurementId: 'G-7FXCC0H0YE',
};

// Initialize Firebase for SSR
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const firestore = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { app, firestore, auth, storage };
