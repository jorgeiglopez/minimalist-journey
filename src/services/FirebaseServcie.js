import {FieldValue, firebase} from "../lib/Firebase";
import {COLLEC_PHOTOS, COLLEC_USERS, USER_ID_FIELD} from "../constants/FirebaseCollections";


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

export async function getSuggestedProfiles(uid, following) {
    let query = firebase.firestore().collection(COLLEC_USERS);

    if (following && following.length > 0) {
        query = query.where(USER_ID_FIELD, 'not-in', [...following, uid]);
    }
    else {
        query = query.where(USER_ID_FIELD, '!=', uid);
    }
    const result = await query.limit(10).get();
    return result.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }));
}

export async function updateLoggedInUserFollowing( // TODO: FIX
    docId, // currently logged in user document id (karl's profile)
    uid, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    return firebase
        .firestore()
        .collection(COLLEC_USERS)
        .doc(docId)
        .update({
            following: isFollowingProfile ?
                FieldValue.arrayRemove(uid) :
                FieldValue.arrayUnion(uid)
        });
}

export async function updateFollowedUserFollowers( // TODO: FIX
    docId, // currently logged in user document id (karl's profile)
    uid, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    return firebase
        .firestore()
        .collection(COLLEC_USERS)
        .doc(docId)
        .update({
            followers: isFollowingProfile ?
                FieldValue.arrayRemove(uid) :
                FieldValue.arrayUnion(uid)
        });
}

export async function getUsersPhotos(user) {
    if (!user) return null;
    return firebase.firestore()
        .collection(COLLEC_PHOTOS)
        .where(USER_ID_FIELD, '==', user?.uid)
        .get();
}

