// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCOMGvnNfla6s6FZuNL34Eab9HYVK_A6tU",
  authDomain: "slack-clone-app-b5d82.firebaseapp.com",
  projectId: "slack-clone-app-b5d82",
  storageBucket: "slack-clone-app-b5d82.appspot.com",
  messagingSenderId: "192335686007",
  appId: "1:192335686007:web:ac7c9af08dcf748ba8d972",
  measurementId: "G-7H3W1116EN",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();
export const auth = firebaseApp.auth();
export const provider = new firebase.auth.GoogleAuthProvider();

export default db;
