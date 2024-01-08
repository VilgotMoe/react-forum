import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "react-chat-forum.firebaseapp.com",
  projectId: "react-chat-forum",
  storageBucket: "react-chat-forum.appspot.com",
  messagingSenderId: process.env.MESSAGE_SENDER_ID,
  appId: process.env.API_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const dbb = getFirestore(firebaseApp);

export { firebaseApp, auth, dbb };
