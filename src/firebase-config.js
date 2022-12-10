import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyCZo-Q_jRAFeO-KPHfzIxu8CmUmvyJjjLA",
  authDomain: "auth-system-ff45a.firebaseapp.com",
  projectId: "auth-system-ff45a",
  storageBucket: "auth-system-ff45a.appspot.com",
  messagingSenderId: "830694590447",
  appId: "1:830694590447:web:dc0e0b1eeef2f49f1d981a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);