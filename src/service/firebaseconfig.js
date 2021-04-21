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
const store = fb.firestore();
const auth = fb.auth();


export const signInWithGoogle = () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithRedirect(provider)
  .then(() => {
  })
  .catch((error) => {
    console.log(error.mesage)
  });
  }

  export {auth, store}
