import {FieldValue, firebase} from "../lib/Firebase";
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
        .where('userId','==', id)
        .get();

    return result?.docs?.length > 0? result.docs.map((item) => ({
            ...item.data(),
            docId: item.id
        }))[0] : null;
}

export async function getSuggestedProfiles(userId, following) {
    let query = firebase.firestore().collection('users');

    if (following.length > 0) {
        query = query.where('userId', 'not-in', [...following, userId]);
    } else {
        query = query.where('userId', '!=', userId);
    }
    const result = await query.limit(10).get();

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
    return firebase.firestore()
        .collection('photos')
        .where('userId', '==', user.userId)
        .get();
}

