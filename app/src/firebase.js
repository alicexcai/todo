// COMMENT: import required modules
import firebase from 'firebase/compat/app';// rollup bundle issue with ESM import
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// COMMENT: create the configuration based on your firebase project settings
const firebaseConfig = {
  apiKey: "enter api key",
  authDomain: "enter auth domain",
  projectId: "enter project id",
  storageBucket: "enter storage bucket",
  messagingSenderId: "enter messaging sender id",
  appId: "enter app id",
  measurementId: "enter measurement id"
};

console.log(firebase)

// COMMENT: intialize the firebase app
firebase.initializeApp(firebaseConfig);

// COMMENT: export the authentication, provider, and database
export const auth = firebase.auth();
export const googleProvider = new firebase.auth.GoogleAuthProvider();

export const db = firebase.firestore();


