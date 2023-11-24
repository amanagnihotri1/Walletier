import { initializeApp} from 'firebase/app';
import {getAnalytics} from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
import {getStorage} from "firebase/storage";
export const firebaseConfig=
{
    apiKey:process.env.REACT_APP_API_KEY,
    authDomain:process.env.REACT_APP_AUTH_DOMAIN,
    projectId:process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId:process.env.REACT_APP_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID, 
    databaseURL:"https://DATABASE_NAME.firebaseio.com" 
}
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const auth=getAuth();
export const storage=getStorage();