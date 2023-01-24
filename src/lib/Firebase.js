import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {firebaseConfig} from "./FirebaseConfig";


const firebase = Firebase.initializeApp(firebaseConfig);
const { FieldValue } = Firebase.firestore;


export {firebase, FieldValue}
