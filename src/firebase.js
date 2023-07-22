// firebase.js
import firebase from 'firebase/app';
import 'firebase/auth'; // Import the specific database module you need (realtime database in this case)

// firebase.js
const firebaseConfig = {
    apiKey: 'YOUR_API_KEY',
    authDomain: 'YOUR_AUTH_DOMAIN',
    databaseURL: 'YOUR_DATABASE_URL',
    projectId: 'YOUR_PROJECT_ID',
    storageBucket: 'YOUR_STORAGE_BUCKET',
    messagingSenderId: 'YOUR_MESSAGING_SENDER_ID',
    appId: 'YOUR_APP_ID',
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  export default firebase;