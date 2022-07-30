import { getDatabase } from 'firebase/database';
import { getFirestore } from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDsGD-4f2HP9znW5GdHmBtOvBriBN0ri7A',
  authDomain: 'auth-study-b3782.firebaseapp.com',
  projectId: 'auth-study-b3782',
  storageBucket: 'auth-study-b3782.appspot.com',
  messagingSenderId: '269955867398',
  appId: '1:269955867398:web:7d2aa4cb542594a07a7487',
  measurementId: 'G-RJ11J9GZX3',
};

const app = initializeApp(firebaseConfig);

export const authService = getAuth(app);
export const dbService = getFirestore(app);
export const realtimeObserve = getDatabase(app);
