import {useContext, useEffect, useState} from "react";
import {LOCAL_STORAGE_AUTH_USER} from "../constants/DevConstants";
import FirebaseContext from "../context/FirebaseContext";

const useAuth = () => {
    const {firebase} = useContext(FirebaseContext);

    const [firebaseUser, setFirebaseUser] = useState();

    useEffect(() => {
        const userListener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                const cachedUser = JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER));
                if (cachedUser && cachedUser?.uid === authUser.uid) {
                    setFirebaseUser(cachedUser);
                }
                else {
                    localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
                }
            }
            else {
                localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
                setFirebaseUser(null);
            }
        });

        return () => userListener();

    }, [JSON.stringify(firebase.auth())]);

    return firebaseUser;
};

export default useAuth;
