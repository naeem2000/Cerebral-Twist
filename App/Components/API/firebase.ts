import {getFirestore, Firestore} from 'firebase/firestore';
import {initializeApp, getApps} from 'firebase/app';
import {getAuth, Auth} from 'firebase/auth';
import {
  API_KEY,
  APP_ID,
  PROJECT_ID,
  AUTH_DOMAIN,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
} from '@env';

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const authGlobal: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);

export const auth: Auth = getAuth(app);
