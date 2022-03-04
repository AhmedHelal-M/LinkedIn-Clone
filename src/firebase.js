import firebase from "firebase";
// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7PfOPLXLVgL3shqP60_M-5_l8AZ1kEOg",
  authDomain: "linkedin-7a5c3.firebaseapp.com",
  projectId: "linkedin-7a5c3",
  storageBucket: "linkedin-7a5c3.appspot.com",
  messagingSenderId: "714324351567",
  appId: "1:714324351567:web:fae589d4180511ec05283a",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = app.firestore();
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();
const storage = firebase.storage();

export { auth, provider, storage };

export default db;
