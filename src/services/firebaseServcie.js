import {firebase} from "../lib/firebase";
import {COLLEC_USERS} from "../constants/firebaseCollections";


export async function doesUsernameExist(username) {
    const result = await firebase.firestore()
        .collection(COLLEC_USERS)
        .where('username','==', username.toLowerCase())
        .get();
    console.log(result)
    return result.docs.length !== 0;

}
