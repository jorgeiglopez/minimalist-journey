import {FieldValue, firebase} from "../lib/Firebase";
import {COLLEC_POSTS, COLLEC_USERS, USER_ID_FIELD} from "../constants/FirebaseCollections";
import {mapFirestoreResponse} from "../helpers/HelperFunctions";

export async function getUserByUID(uid) {
    if (!uid) return null;

    try {
        const userRef = firebase.firestore().collection(COLLEC_USERS).doc(uid);
        const userSnapshot = await userRef.get();
        if (!userSnapshot.exists) {
            console.error('User not found', uid);
            return null
        }
        return {...userSnapshot.data(), uid: uid};
    } catch (error) {
        console.error('Error getting user: ', error);
        return null;
    }
}

export const getSuggestedProfiles = async (toExclude, limit = 10) => {
    let result = [];
    try {
        const response = await firebase.firestore().collection(COLLEC_USERS)
            .where('__name__', 'not-in', toExclude)
            .limit(limit)
            .get();

        result = mapFirestoreResponse(response, USER_ID_FIELD);
    } catch (error) {
        console.error('Error while getting suggested profiles: ', error.message);
    }

    return result;
}

const updateUserByUID = async (uid, updateObject) => {
    try {
        const userDocRef = firebase.firestore()
            .collection(COLLEC_USERS)
            .doc(uid);

        const resp = await userDocRef.update(updateObject);
        console.log('updateUserByUID',resp);
    } catch (error) {
        console.error(`ERROR updating uid: ${uid} - `, error);
    }
}

export const updateFollowingByUID = async (currentUserUid, uidToFollow) => {
    await updateUserByUID(currentUserUid, {following: FieldValue.arrayUnion(uidToFollow)});
}

export const updateFollowersByUID = async (currentUserUid, uidAsAFollower) => {
    await updateUserByUID(currentUserUid, {followers: FieldValue.arrayUnion(uidAsAFollower)});
}

export async function getFollowingPosts(user) {
    if (!user) return null;
    if (!user?.following || user?.following?.length === 0) return [];

    return firebase.firestore()
        .collection(COLLEC_POSTS)
        .where(USER_ID_FIELD, 'in', user?.following)
        // .orderBy('createdOn', "desc") // The query requires an index. You can create it here
        .limit(20)
        .get();
}

const validateUsernameUniqueness = async (username) => {
    const result = await firebase.firestore()
        .collection(COLLEC_USERS)
        .where('username', '==', username?.toLowerCase())
        .get();

    return result?.docs?.length !== 0;
}

export const createUserWithUniqueUsername = async ({username, email, password, firstName, lastName, avatarUrl, dob, createdOn}) => {
    let authServiceResponse;
    let firestoreResponse;
    try {
        if (await validateUsernameUniqueness(username)) {
            throw new Error(`The username: ${username} has been taken`);
        }

        authServiceResponse = await firebase.auth()
            .createUserWithEmailAndPassword(email, password);

        // update the displayName in FirebaseAuth
        await authServiceResponse.user.updateProfile({
            displayName: username.toLowerCase()
        });

        // once the FirebaseAuth has been recorded, create the Firestore record
        const docRef = firebase.firestore()
            .collection(COLLEC_USERS)
            .doc(authServiceResponse.user.uid);

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

export const loginWithEmailAndPassword = async (email, password, setActiveUser) => {
    try {
        const signedInUser = await firebase.auth()
            .signInWithEmailAndPassword(email, password);
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
            refreshToken,
            firstName: '',
            lastName: '',
            avatarUrl: '',
            following: [],
            followers: []
        }

        setActiveUser(cachedUser);
        // localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(cachedUser));

    } catch (error) {
        console.error('Error signing in: ', error);
        throw new Error(error);
    }
}

export const logOutCurrentUser = async () => {
    await firebase.auth()
        .signOut()
}

export const savePost = async post => {
    await firebase.firestore()
        .collection(COLLEC_POSTS)
        .add(post);
}

export const appendComment = async (docId, commentObj) => {
    await firebase.firestore()
        .collection(COLLEC_POSTS)
        .doc(docId)
        .update({comments: FieldValue.arrayUnion(commentObj)})
}

export const setToggleLikedValue = async (docId, uid, liked) => {
    await firebase.firestore()
        .collection(COLLEC_POSTS)
        .doc(docId)
        .update({likes: liked? FieldValue.arrayUnion(uid) : FieldValue.arrayRemove(uid)});
}

