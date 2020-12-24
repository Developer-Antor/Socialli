import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDGV3svvmdn7pY0PHTvsCEJ8wGQ1GKalYE",
  authDomain: "instagram-clone-f8f9b.firebaseapp.com",
  projectId: "instagram-clone-f8f9b",
  storageBucket: "instagram-clone-f8f9b.appspot.com",
  messagingSenderId: "970908839355",
  appId: "1:970908839355:web:746872e27489a8d570289e",
  measurementId: "G-TY9T98KNGD",
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };
