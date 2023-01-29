import {useEffect, useState} from 'react';
import {getUserByUserId} from '../services/FirebaseServcie';
import useAuth from "./UseAuth";
import {LOCAL_STORAGE_USER_INFO} from "../constants/DevConstants";

export default function useUser() {
    const authUser = useAuth();
    const [userInfo, setUserInfo] = useState();

    useEffect(() => {
        if (!authUser || !authUser?.uid) {
            console.log(' ^^^^^^^^ Not auth User from useAuth');
            return;
        }

        if (!!localStorage.getItem(LOCAL_STORAGE_USER_INFO)) {
            console.log(' ^^^^^^^^ LOCAL_STORAGE_USER_INFO found', JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_INFO)));
            setUserInfo(JSON.parse(localStorage.getItem(LOCAL_STORAGE_USER_INFO)));
            return;
        }

        async function getUserObjByUserId() {
            return await getUserByUserId(authUser.uid);
        }

        getUserObjByUserId().then(response => {
            console.log(' ^^^^^^^^ Calling user service');
            if (response && response.userId) {
                console.log(' ^^^^^^^^ RESPONSE: ', response);
                setUserInfo(response);
                localStorage.setItem(LOCAL_STORAGE_USER_INFO, JSON.stringify(response));
            }
        });


    }, [JSON.stringify(authUser)]);

    return userInfo;
}
