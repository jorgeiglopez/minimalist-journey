import {useState, useEffect} from 'react';
import {getUserByUserId} from '../services/FirebaseServcie';

export default function useUser(userId) {
    const [activeUser, setActiveUser] = useState();

    useEffect(() => {
        async function getUserObjByUserId(userId) {
            const user = await getUserByUserId(userId);
            return user;
        }

        if (userId) {
            getUserObjByUserId(userId).then(result => setActiveUser(result));
        }
    }, [userId]);

    return { user: activeUser, setActiveUser };
}
