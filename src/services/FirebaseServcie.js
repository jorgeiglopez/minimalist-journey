import {FieldValue, firebase} from "../lib/Firebase";
import {COLLEC_USERS} from "../constants/FirebaseCollections";


export async function doesUsernameExist(username) {
    const result = await firebase.firestore()
        .collection(COLLEC_USERS)
        .where('username','==', username?.toLowerCase())
        .get();

    return result?.docs?.length !== 0;
}

export async function getUserByUID(uid) {
    if(!uid) return null;
    const result = await firebase.firestore()
        .collection(COLLEC_USERS)
        .where('uid','==', uid)
        .get();

    // return await result?.docs?.length > 0 ? {...await result.docs[0].data(), docId: result.docs[0].id} : null;
    return result?.docs?.length > 0? result.docs.map((item) => ({
            ...item.data(),
            docId: item.id
        }))[0] : null;
}

export async function getSuggestedProfiles(uid, following) {
    console.log("Calling for suggestions: -----", uid, following)
    let query = firebase.firestore().collection(COLLEC_USERS);

    if (following && following.length > 0) {
        query = query.where('uid', 'not-in', [...following, uid]);
    } else {
        query = query.where('uid', '!=', uid);
    }
    const result = await query.limit(10).get();
    console.log("result suggestions: -----", result)
    return result.docs.map((user) => ({
        ...user.data(),
        docId: user.id
    }));
}

export async function updateLoggedInUserFollowing(
    loggedInUserDocId, // currently logged in user document id (karl's profile)
    profileId, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(loggedInUserDocId)
        .update({
            following: isFollowingProfile ?
                FieldValue.arrayRemove(profileId) :
                FieldValue.arrayUnion(profileId)
        });
}

export async function updateFollowedUserFollowers(
    profileDocId, // currently logged in user document id (karl's profile)
    loggedInUserDocId, // the user that karl requests to follow
    isFollowingProfile // true/false (am i currently following this person?)
) {
    return firebase
        .firestore()
        .collection('users')
        .doc(profileDocId)
        .update({
            followers: isFollowingProfile ?
                FieldValue.arrayRemove(loggedInUserDocId) :
                FieldValue.arrayUnion(loggedInUserDocId)
        });
}

export async function getUsersPhotos(user) {
    if(!user) return null;
    return firebase.firestore()
        .collection('photos')
        .where('uid', '==', user?.uid)
        .get();
}

