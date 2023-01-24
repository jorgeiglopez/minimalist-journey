import {useEffect, useContext, useState} from "react";
import {LOCAL_STORAGE_AUTH_USER} from "../constants/DevConstants";
import FirebaseContext from "../context/FirebaseCxt";

const useAuth = () => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem(LOCAL_STORAGE_AUTH_USER)));
    const {firebase} = useContext(FirebaseContext);

    useEffect(() => {
        // console.log("The onAuthStateChanged has changed!"); //TODELETE
        // if (user) {
        //     console.log("The user has been read from local storage", user); //TODELETE
        //     return {user};
        // }
        const userListener = firebase.auth().onAuthStateChanged((authUser) => {
            if (authUser) {
                localStorage.setItem(LOCAL_STORAGE_AUTH_USER, JSON.stringify(authUser));
                setUser(authUser);
            } else {
                localStorage.removeItem(LOCAL_STORAGE_AUTH_USER);
                setUser(null);
            }
        });
        return () => userListener();

    }, [JSON.stringify(firebase.auth())]);

    return {user};
};

export default useAuth;
