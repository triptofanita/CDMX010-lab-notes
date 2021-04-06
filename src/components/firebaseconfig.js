import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyARiwIMfmui4oX7TA4nyRUAzBCp78BaXbE",
    authDomain: "secret-notes-573aa.firebaseapp.com",
    projectId: "secret-notes-573aa",
    storageBucket: "secret-notes-573aa.appspot.com",
    messagingSenderId: "846350952623",
    appId: "1:846350952623:web:2b96a66d0844cc5ba94c5a"
  };
  // Initialize Firebase
 const fb = firebase.initializeApp(firebaseConfig);
 const store = fb.firestore();

 export {store}