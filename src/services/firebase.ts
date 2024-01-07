import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCa4I0rQIVW3IW3htO4INH7zDy-NREaEMk",
  authDomain: "react-chat-forum.firebaseapp.com",
  projectId: "react-chat-forum",
  storageBucket: "react-chat-forum.appspot.com",
  messagingSenderId: "1048379705237",
  appId: "1:1048379705237:web:3ace1f7ee966bddb7a989c",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const dbb = getFirestore(firebaseApp);

export { firebaseApp, auth, dbb };
