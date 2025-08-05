import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyBQ-MivXT0-aVDL8xPNg_Fl5iWjkZBknIQ',
  authDomain: 'pixelbox-564d5.firebaseapp.com',
  projectId: 'pixelbox-564d5',
  storageBucket: 'pixelbox-564d5.firebasestorage.app',
  messagingSenderId: '1021043248512',
  appId: '1:1021043248512:web:e252618e5ea17ce449c565',
  measurementId: 'G-XBQQ04C1X5',
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
