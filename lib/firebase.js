import {
  initializeApp,
  getApps
} from "firebase/app";

import {
  getAuth
} from "firebase/auth";

import {
  getDatabase
} from "firebase/database";

const firebaseConfig = {

  apiKey:
    "AIzaSyApdnmAocuiu7vxPKkmu_883AlKZXjrCTc",

  authDomain:
    "bharatp2papp.firebaseapp.com",

  databaseURL:
    "https://bharatp2papp-default-rtdb.firebaseio.com",

  projectId:
    "bharatp2papp",

  storageBucket:
    "bharatp2papp.firebasestorage.app",

  messagingSenderId:
    "754332428439",

  appId:
    "1:754332428439:web:ec8ce4c74a4ef4a4f9e1d2"

};

const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

export const auth =
  getAuth(app);

export const db =
  getDatabase(app);
