import {FieldValue, firebase} from "../lib/Firebase";
import {COLLEC_PHOTOS, COLLEC_USERS, USER_ID_FIELD} from "../constants/FirebaseCollections";

const DEFAULT_NUMBER_OF_SUGGESTED_PROFILES = 10;


export async function doesUsernameExist(username) {
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
    try{
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

