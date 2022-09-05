// COMMENT: import required modules
import firebase from 'firebase/compat/app';// rollup bundle issue with ESM import
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// COMMENT: create the configuration based on your firebase project settings
const firebaseConfig = {
  apiKey: "AIzaSyDlHKWwZtI8AUf7i75a-unn4mgKU9zG6ak",
  authDomain: "todo-9cf17.firebaseapp.com",
  projectId: "todo-9cf17",
  storageBucket: "todo-9cf17.appspot.com",
  messagingSenderId: "303666986888",
  appId: "1:303666986888:web:12fa04968bfd691a34843d",
  measurementId: "G-5BHDYBZ51L"
};

console.log(firebase)

// COMMENT: intialize the firebase app
firebase.initializeApp(firebaseConfig);

// COMMENT: export the authentication, provider, and database
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();


