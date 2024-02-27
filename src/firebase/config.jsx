import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';    
import { getFirestore } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyAoiYJhQJh78VHhuOVh-liBJbcRg9uY29k",
    authDomain: "olx-clone-d1a77.firebaseapp.com",
    projectId: "olx-clone-d1a77",
    storageBucket: "olx-clone-d1a77.appspot.com",
    messagingSenderId: "22461007835",
    appId: "1:22461007835:web:1e95a854cd9cc3474949fe",
    measurementId: "G-YB3FJWNB9F"
  };

  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);
  
  export {app, auth, db };

