import { getFirestore } from '@firebase/firestore';
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyBL1kPFlXWdoniW7ucaQrC5z4knEJSBITw',
  authDomain: 'svintus3-f2840.firebaseapp.com',
  projectId: 'svintus3-f2840',
  storageBucket: 'svintus3-f2840.appspot.com',
  messagingSenderId: '546736648325',
  appId: '1:546736648325:web:8078aca4edf124be4439ec',
  measurementId: 'G-D9S8RGT65H',
};

const app = initializeApp(firebaseConfig);

export const firestore = getFirestore(app);
