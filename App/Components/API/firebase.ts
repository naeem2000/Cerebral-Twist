import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyD1JseEqXUrDgmtsSw1vPs-nr7NPy0LIQI',
  authDomain: 'minimemorygame.firebaseapp.com',
  projectId: 'minimemorygame',
  storageBucket: 'minimemorygame.appspot.com',
  messagingSenderId: '1037399154296',
  appId: '1:1037399154296:web:5c864992d1be49f035178d',
  measurementId: 'G-3W4SDGWL69',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
