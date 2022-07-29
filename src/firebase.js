import firebase from "firebase/app"
import "firebase/auth"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxuH_8649oB1sOcMGFXKlNgsFGxdPmFzw",
  authDomain: "onlinebookstore-939b9.firebaseapp.com",
  projectId: "onlinebookstore-939b9",
  storageBucket: "onlinebookstore-939b9.appspot.com",
  messagingSenderId: "480223586163",
  appId: "1:480223586163:web:559f1d064bbf4730f84706"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
