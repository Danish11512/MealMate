import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAlgB-GPO41zHT06pwwdS10O41SPq_TPfY",
    authDomain: "meal-mate-dfa55.firebaseapp.com",
    projectId: "meal-mate-dfa55",
    storageBucket: "meal-mate-dfa55.appspot.com",
    messagingSenderId: "432171471215",
    appId: "1:432171471215:web:2339487e26433ad62e589a",
    measurementId: "G-FXYLT3YYJY"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const firestore = firebase.firestore();
