import {FieldValue, firebase} from "../lib/Firebase";
import {COLLEC_PHOTOS, COLLEC_USERS, USER_ID_FIELD} from "../constants/FirebaseCollections";
import {LOCAL_STORAGE_AUTH_USER} from "../constants/DevConstants";

const DEFAULT_NUMBER_OF_SUGGESTED_PROFILES = 10;


export const doesUsernameExist = async (username) => {
    const result = await firebase.firestore()
        .collection(COLLEC_USERS)
        .where('username', '==', username?.toLowerCase())
        .get();

    return result?.docs?.length !== 0;
}

export async function getUserByUID(uid) {
    if (!uid) return null;
    const result = await firebase.firestore()
        .collection(COLLEC_USERS)
        .where(USER_ID_FIELD, '==', uid)
        .get();

    // return await result?.docs?.length > 0 ? {...await result.docs[0].data(), docId: result.docs[0].id} : null;
    return result?.docs?.length > 0 ? result.docs.map((item) => ({
        ...item.data(),
        docId: item.id
    }))[0] : null;
}

const mapFirestoreDocsToUser = (response) => {
    if (!response || !response.docs || response.docs.length === 0) {
        return null;
    }

    return response.docs.map((doc) => ({
        ...doc.data(),
        docId: doc.id
    }));
}

export const getSuggestedProfiles = async (uid, following) => {
    let result = null;

    try {
        const response = await firebase.firestore().collection(COLLEC_USERS)
            .where(USER_ID_FIELD, 'not-in', [...following, uid])
            .limit(DEFAULT_NUMBER_OF_SUGGESTED_PROFILES)
            .get();

        result = mapFirestoreDocsToUser(response);
    } catch (error) {
        console.error(error);
    }

    return result;
}

const updateUserByDocId = async (docId, updateObject) => {
    try {
        const userDocRef = firebase.firestore()
            .collection(COLLEC_USERS)
            .doc(docId);

        await userDocRef.update(updateObject);
    } catch (error) {
        console.error(`ERROR updating docId: ${docId} - `, error);
    }
}

export const updateFollowingByDocId = async (docId, uidToFollow, isFollowingProfile) => {
    await updateUserByDocId(docId, {following: FieldValue.arrayUnion(uidToFollow)});
}

export const updateFollowersByDocId = async (docId, uidAsAFollower, isFollowingProfile) => {
    await updateUserByDocId(docId, {followers: FieldValue.arrayUnion(uidAsAFollower)});
}

export async function getUsersPhotos(user) {
    if (!user) return null;
    return firebase.firestore()
        .collection(COLLEC_PHOTOS)
        .where(USER_ID_FIELD, '==', user?.uid)
        .get();
}

export const createUserWithUniqueUsername = async ({username, email, password, firstName, lastName, avatarUrl, dob, createdOn}) => {
    let authServiceResponse;
    let firestoreResponse;
    try {
        if (await doesUsernameExist(username)) {
            throw new Error(`The username: ${username} has been taken`);
        }

        authServiceResponse = await firebase.auth()
            .createUserWithEmailAndPassword(email, password);

        // update the displayName in FirebaseAuth
        await authServiceResponse.user.updateProfile({
            displayName: username.toLowerCase()
        });

        // once the FirebaseAuth has been recorded, create the Firestore record
        const docRef = firebase.firestore().collection(COLLEC_USERS).doc(authServiceResponse.user.uid);
        firestoreResponse = await docRef.set({
            username: username.toLowerCase(),
            firstName,
            lastName,
            email: email.toLowerCase(),
            createdOn: createdOn || Date.now(),
            avatarUrl: avatarUrl || null,
            dob: dob || null,
            following: [],
            followers: []
        });

    } catch (error) {
        // If the account gets created in Auth service, then it's impossible to re-try with different username, since the
        // email address will be taken. Hence, we delete the fresh user, to allow create again.
        if (authServiceResponse && authServiceResponse.user && !firestoreResponse) {
            console.log("Removing user when response: ", await authServiceResponse.user.delete());
        }
        console.error('Error while creating user:', error.message);
        throw new Error(error);
    }
}

export const loginWithEmailAndPassword = async (email, password) => {
    try {
        const signedInUser = await firebase.auth().signInWithEmailAndPassword(email, password);
        const idTokenResult = await signedInUser.user.getIdTokenResult();

        const {uid, displayName, emailVerified, refreshToken, isAnonymous} = signedInUser.user;
        const cachedUser = {
            uid,
            displayName,
            email,
            emailVerified,
            isAnonymous,
            idToken: idTokenResult?.token,
            expiresIn: idTokenResult?.claims?.exp,
            refreshToken
        }

        localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(cachedUser));

    } catch (error) {
        console.error('Error signing in: ', error);
        throw new Error(error);
    }
}

