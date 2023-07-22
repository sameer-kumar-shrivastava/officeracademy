import React from "react";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDexZ2esi-HVqmUMnZetcwLHV-9cm20z0Y",
  authDomain: "officer-academy-ab110.firebaseapp.com",
  projectId: "officer-academy-ab110",
  storageBucket: "officer-academy-ab110.appspot.com",
  messagingSenderId: "347525514676",
  appId: "1:347525514676:web:7d9afa07a342f4082fdee1",
  measurementId: "G-B9S3M2YLQ3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const Login = () =>{
    return(<><h1>Login USSSS</h1></>);
    }

    export default Login;