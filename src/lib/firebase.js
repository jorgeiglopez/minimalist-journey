import Firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import {firebaseConfig} from "./firebase-config";


const firebase = Firebase.initializeApp(firebaseConfig);
const { FieldValue } = Firebase.firestore;


export {firebase, FieldValue}
