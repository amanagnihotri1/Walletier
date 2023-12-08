import { initializeApp} from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
export const firebaseConfig=
{
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID, 
    measurementId: "G-TJQJ11TRYD"
}
export const app = initializeApp(firebaseConfig);
export const database = getFirestore(app);
export const auth=getAuth();