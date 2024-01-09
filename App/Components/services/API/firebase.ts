import { getFirestore, Firestore } from 'firebase/firestore';
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, Auth } from 'firebase/auth';
import { firebaseKeys } from '../constants';

const firebaseConfig = {
	apiKey: firebaseKeys.apiKey,
	authDomain: firebaseKeys.authDomain,
	projectId: firebaseKeys.projectId,
	storageBucket: firebaseKeys.storageBucket,
	messagingSenderId: firebaseKeys.messagingSenderId,
	appId: firebaseKeys.appId,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const authGlobal: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);

export const auth: Auth = getAuth(app);
