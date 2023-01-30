import {useContext, useEffect, useState} from "react";
import {LOCAL_STORAGE_AUTH_USER} from "../constants/DevConstants";
import FirebaseContext from "../context/FirebaseContext";
import {getUserByUID} from "../services/FirebaseServcie";

const useAuth = () => {
    const {firebase} = useContext(FirebaseContext);

    const [activeUser, setActiveUser] = useState();

    // Handles only the saving/removing of the local storage.
    useEffect(() => {
        if(!!activeUser) {
            console.log('****** ActiveUser modified: ', activeUser);
            localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(activeUser));
        } else {
            console.log('****** ActiveUser REMOVED: ');
            localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
        }
    }, [activeUser]);

    // Listen for changes in the auth user, deleting when logout or fetching the userInfo when auth user is present.
    useEffect(() => {
        // TODO: read the cached user, and determine if fetching user info or not.
        async function getUserInfo(uid) {
            const userInfo = await getUserByUID(uid);
            setActiveUser({...activeUser, ...userInfo});
        }

        const userListener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                getUserInfo(authUser.uid);
            }
            else {
                setActiveUser(undefined);
            }
        });

        return () => userListener();

    }, [JSON.stringify(firebase.auth().user)]);

    return [activeUser, setActiveUser];
};

export default useAuth;
