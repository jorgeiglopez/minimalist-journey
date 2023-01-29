import {useEffect, useContext, useState} from "react";
import {LOCAL_STORAGE_AUTH_USER, LOCAL_STORAGE_USER_INFO} from "../constants/DevConstants";
import FirebaseContext from "../context/FirebaseContext";

const useAuth = () => {
    const {firebase} = useContext(FirebaseContext);
    const [firebaseUser, setFirebaseUser] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER)));

    useEffect(() => {
        const userListener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(authUser));
                setFirebaseUser(authUser);
            } else {
                localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
                localStorage.removeItem(LOCAL_STORAGE_USER_INFO);
                setFirebaseUser(null);
            }
        });
        return () => userListener();

    }, [JSON.stringify(firebase.auth())]);

    return firebaseUser;
};

export default useAuth;
