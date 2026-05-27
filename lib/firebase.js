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
    "APNI_NEW_APIKEY_YAHA_DAL",

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
    "APNI_NEW_APPID_YAHA_DAL"

};

const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

export const auth =
  getAuth(app);

export const db =
  getDatabase(app);
