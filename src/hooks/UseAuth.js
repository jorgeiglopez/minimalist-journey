import {useContext, useEffect, useState} from "react";
import {LOCAL_STORAGE_AUTH_USER} from "../constants/DevConstants";
import FirebaseContext from "../context/FirebaseContext";
import {getUserByUID, logOutCurrentUser} from "../services/FirebaseServcie";

const useAuth = () => {
    const {firebase} = useContext(FirebaseContext);

    const [activeUser, setActiveUser] = useState();

    // Handles only the saving/removing of the local storage.
    useEffect(() => {
        if(!!activeUser) {
            // console.log('****** ActiveUser modified: ', activeUser);
            localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(activeUser));
        } else {

        }
    }, [JSON.stringify(activeUser)]);

    // Listen for changes in the auth user, deleting when logout or fetching the userInfo when auth user is present.
    useEffect(() => {
        async function getUserInfo(uid) {
            const userInfo = await getUserByUID(uid);
            setActiveUser({...activeUser, ...userInfo});
        }

        const userListener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                const cachedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER));
                if (cachedUser && cachedUser?.firstName && cachedUser?.lastName) {
                    // console.log("------> setting from cache", cachedUser);
                    setActiveUser(cachedUser);
                } else {
                    getUserInfo(authUser.uid);
                }
            } else {
                setActiveUser(null);
                console.log('****** ActiveUser logged out, so-->  REMOVED: ');
                localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
            }
        });

        return () => {
            // logOutCurrentUser().then(_response => setActiveUser(null));
            userListener();
        };

    }, [JSON.stringify(firebase.auth().user)]);

    return [activeUser, setActiveUser];
};

export default useAuth;
