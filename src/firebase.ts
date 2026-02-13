
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCY7gks-wYZC_LGgS1I59yyixb-vIFTGVI",
  authDomain: "mcp-wedonate-130226.firebaseapp.com",
  projectId: "mcp-wedonate-130226",
  storageBucket: "mcp-wedonate-130226.appspot.com",
  messagingSenderId: "759546477283",
  appId: "1:759546477283:web:9a96a77f69d8633ed363d6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
