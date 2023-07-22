// firebase.js
import firebase from 'firebase/compat/app'; // Correct way to import Firebase in version 9 (v9) and above
import 'firebase/compat/auth'; // Import the specific authentication module
import 'firebase/compat/firestore';
import 'firebase/compat/storage';


const firebaseConfig = {
    apiKey: "AIzaSyDexZ2esi-HVqmUMnZetcwLHV-9cm20z0Y",
    authDomain: "officer-academy-ab110.firebaseapp.com",
    projectId: "officer-academy-ab110",
    storageBucket: "officer-academy-ab110.appspot.com",
    messagingSenderId: "347525514676",
    appId: "1:347525514676:web:7d9afa07a342f4082fdee1",
    measurementId: "G-B9S3M2YLQ3"
  };

firebase.initializeApp(firebaseConfig);
// const db = firebase.firestore();


// const firestore = firebase.firestore();

export default firebase;


