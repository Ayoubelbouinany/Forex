// Firebase App (the core Firebase SDK) is always required and must be listed first
import * as firebase from "firebase";
// If you are using v7 or any earlier version of the JS SDK, you should import firebase using namespace import
// import * as firebase from "firebase/app"

// Add the Firebase products that you want to use
import "firebase/auth";
import "firebase/firestore";

var firebaseConfig = {
  apiKey: "AIzaSyBRBgrL7o7h3N-lBWeOA4tSduXjKQK9O30",
  authDomain: "forex-c5736.firebaseapp.com",
  projectId: "forex-c5736",
  storageBucket: "forex-c5736.appspot.com",
  databaseURL: "https://forex-c5736-default-rtdb.firebaseio.com",
  messagingSenderId: "651602992302",
  appId: "1:651602992302:web:2cfeb1bfdbae3a7121613f",
  measurementId: "G-R08RGDBMVE"
};
// Initialize Firebase



if (!firebase.apps.length) {
 // firebase.initializeApp(firebaseConfig);
 firebase.initializeApp(firebaseConfig);
}

export { firebase };
