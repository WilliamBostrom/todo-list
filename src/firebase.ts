import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc } from "firebase/firestore";

const firebaseConfig: any = {
  apiKey: "AIzaSyBwikN3hWkM1zkAK9T_e7uAYG2Ql67U3ZM",
  authDomain: "todo-list-a0a13.firebaseapp.com",
  projectId: "todo-list-a0a13",
  storageBucket: "todo-list-a0a13.appspot.com",
  messagingSenderId: "219957146252",
  appId: "1:219957146252:web:87fc9408c86649760c81a9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app);

const db = getFirestore(app);
console.log(db);

/* ADD DOC TAR TVÅ ARUGEMENT */
/* Sätter ett redan valt ID */

addDoc(collection(db, "users"), {
  todo: "Äta pizza",
  comment: "Beställa foodora",
})
  .then((docRef) => {
    // Visar om vi lyckats lägga till data i firestore
    console.log(docRef.id);
  })
  .catch((err) => {
    console.log(err);
  });

/* Setdoc för att ge sitt egna ID*/
/* För att använda setDock behövs 
DB- vart vi vi vi lägg till data
DOC(), vart vi vi passa DB, collection namn och custom ID,
SETDOCK vart vi passar datan med Doc() Metoden*/
