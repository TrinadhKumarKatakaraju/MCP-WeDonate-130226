import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: process.env.VITE_API_KEY,
  authDomain: process.env.VITE_AUTH_DOMAIN,
  projectId: process.env.VITE_PROJECT_ID,
  storageBucket: process.env.VITE_STORAGE_BUCKET,
  messagingSenderId: process.env.VITE_MESSAGING_SENDER_ID,
  appId: process.env.VITE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function createUserDocument() {
  try {
    await setDoc(doc(db, 'users', '7Zd9IFXj5Fabby6GuzvmK6hHedf2'), {
      email: 'trinadh.katakaraju2@gmail.com',
      role: 'donor',
    });
    console.log('User document created successfully!');
  } catch (e) {
    console.error('Error adding document: ', e);
  }
}

createUserDocument();
