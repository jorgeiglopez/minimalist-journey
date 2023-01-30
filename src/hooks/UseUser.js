import {useEffect, useState} from 'react';
import {getUserByUID} from '../services/FirebaseServcie';
import useAuth from "./UseAuth";

const useUser = () => {
    const [userInfo, setUserInfo] = useState();
    const authUser = useAuth();

    useEffect(() => {
        if (!authUser || !authUser?.uid) {
            return;
        }

        async function getUserInfo() {
            const userInfo = await getUserByUID(authUser.uid);
            setUserInfo({...authUser, ...userInfo});
        }

        getUserInfo();

    }, [JSON.stringify(authUser)]);

    return userInfo;
}

export default useUser;
