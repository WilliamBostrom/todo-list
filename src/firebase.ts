import { initializeApp } from "firebase/app";
/* import {
  getFirestore,
  collection,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  DocumentReference,
} from "firebase/firestore";

import { getAuth } from "firebase/auth"; */
//Auth -login

/* export {
  auth,
  app,
  data,
  dbRef,
  addDoc,
  onSnapshot,
  doc,
  updateDoc,
  deleteDoc,
  DocumentReference,
}; */
const firebaseConfig: any = {
  apiKey: "AIzaSyBwikN3hWkM1zkAK9T_e7uAYG2Ql67U3ZM",
  authDomain: "todo-list-a0a13.firebaseapp.com",
  projectId: "todo-list-a0a13",
  storageBucket: "todo-list-a0a13.appspot.com",
  messagingSenderId: "219957146252",
  appId: "1:219957146252:web:87fc9408c86649760c81a9",
};

export const app = initializeApp(firebaseConfig);
// console.log(app);
/* const auth = getAuth(app);
const data = getFirestore();
const dbRef = collection(data, "todos"); */
