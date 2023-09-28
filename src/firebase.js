import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { initializeApp } from "firebase/app";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA_RKr2im0C_uAdsfeyn4JWTH_adYQn_sk",
  authDomain: "clone297-942e5.firebaseapp.com",
  projectId: "clone297-942e5",
  storageBucket: "clone297-942e5.appspot.com",
  messagingSenderId: "97086925156",
  appId: "1:97086925156:web:3ae395ef9aa604d1c83271",
  measurementId: "G-KZYV5JP7FM",
};

const firebaseApp = initializeApp(firebaseConfig);

export default firebaseApp;
