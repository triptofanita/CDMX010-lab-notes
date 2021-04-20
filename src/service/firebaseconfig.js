import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyCsbb9fHmuK84hCDv62BRbjcOpVLgOwmWs",
  authDomain: "secret-notes-ii.firebaseapp.com",
  projectId: "secret-notes-ii",
  storageBucket: "secret-notes-ii.appspot.com",
  messagingSenderId: "347944666478",
  appId: "1:347944666478:web:0afac988cd932eb3a76d7f"
  };
  // Initialize Firebase
 const fb = firebase.initializeApp(firebaseConfig);
 const auth = fb.auth();
 const store = fb.firestore();

 export {auth, store}
