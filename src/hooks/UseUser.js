import {useEffect, useState} from 'react';
import {getUserByUID} from '../services/FirebaseServcie';
import useAuth from "./UseAuth";
// import {LOCAL_STORAGE_USER_INFO} from "../constants/DevConstants";

export default function useUser() {
    const authUser = useAuth();
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        if (!authUser || !authUser?.uid) {
            return;
        }

        // // TODO: FIX:: When I change my followers/following section, it won't be reflected until I logout (deleting the local storages record).
        // if (!!localStorage.getItem(LOCAL_STORAGE_USER_INFO)) {
        //     console.log(' ^^^^^^^^ LOCAL_STORAGE_USER_INFO found', JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_INFO)));
        //     setUserInfo(JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_INFO)));
        //     return;
        // }

        async function getUserInfo() {
            return await getUserByUID(authUser.uid);
        }

        getUserInfo().then(response => {
            if (response && response.uid) {
                setUserInfo(response);
                // localStorage.setItem(LOCAL_STORAGE_USER_INFO, JSON.stringify(response));
            }
        });


    }, [JSON.stringify(authUser)]);

    return userInfo;
}
