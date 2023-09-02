import {getFirestore, Firestore} from 'firebase/firestore';
import {initializeApp, getApps} from 'firebase/app';
import {getAuth, Auth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDHswY5ZZZQuqFSKXIUuhJO64KE4i8_wQM',
  authDomain: 'cerebral-twist.firebaseapp.com',
  projectId: 'cerebral-twist',
  storageBucket: 'cerebral-twist.appspot.com',
  messagingSenderId: '888534795197',
  appId: '1:888534795197:web:f41aae1ea17fa4fc1f08d4',
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];

export const authGlobal: Auth = getAuth(app);
export const firestore: Firestore = getFirestore(app);

export const auth: Auth = getAuth(app);
