import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

const app = firebase.initializeApp({
  apiKey: "AIzaSyBXPWOPBLz87VXW5Hh_DGVSxw8Ak23pgEM",
  authDomain: "leave-management-840a3.firebaseapp.com",
  databaseURL: "https://leave-management-840a3.firebaseio.com",
  projectId: "leave-management-840a3",
  storageBucket: "leave-management-840a3.appspot.com",
  messagingSenderId: "116832669800",
  appId: "1:116832669800:web:19e5f5de80209738ffebdd"
});

export default app;
