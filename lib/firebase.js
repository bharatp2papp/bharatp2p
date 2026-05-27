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
    "AIzaSyAVc9mwnzFKjEtCue-u2t_kS2kd3m4leIA",

  authDomain:
    "bharatp2p-cfee3.firebaseapp.com",

  databaseURL:
    "https://bharatp2p-cfee3-default-rtdb.firebaseio.com",

  projectId:
    "bharatp2p-cfee3",

  storageBucket:
    "bharatp2p-cfee3.firebasestorage.app",

  messagingSenderId:
    "750618034071",

  appId:
    "1:750618034071:web:ad2975edb8428b3a0f8ed2"

};

const app =
  getApps().length === 0
    ? initializeApp(firebaseConfig)
    : getApps()[0];

export const auth =
  getAuth(app);

export const db =
  getDatabase(app);
