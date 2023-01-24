import {firebase} from "../lib/Firebase";
import {COLLEC_USERS} from "../constants/FirebaseCollections";


export async function doesUsernameExist(username) {
    const result = await firebase.firestore()
        .collection(COLLEC_USERS)
        .where('username','==', username.toLowerCase())
        .get();

    return result.docs.length !== 0;
}

export async function getUserByUserId(id) {
    const result = await firebase.firestore()
        .collection(COLLEC_USERS)
        .where('uid','==', id)
        .get();
    // console.log(result);

    return result.docs.length > 0? result.docs[0] : null;
}
