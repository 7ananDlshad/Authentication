import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/firebase-auth";

const firebaseConfig = {
  apiKey: "AIzaSyAXDjdzK0J30MPpi2ryhx9ogFtc0bttQe4",
  authDomain: "authentication-app-5a396.firebaseapp.com",
  databaseURL: "https://authentication-app-5a396.firebaseio.com",
  projectId: "authentication-app-5a396",
  storageBucket: "authentication-app-5a396.appspot.com",
  messagingSenderId: "834495169702",
  appId: "1:834495169702:web:3378c57cd552f8935b6067",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const dbRef = db.collection("users");

export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export default firebase;
