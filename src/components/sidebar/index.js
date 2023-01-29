import { useContext } from 'react';
import User from './User';
import Suggestions from './Suggestions';
import UserContext from '../../context/UserContext';

export default function Sidebar() {
    const user = useContext(UserContext);
    console.log("***** Sidebar  user:", user);
    return (
        <div className="p-4">
            <User username={user?.username} fullName={user?.fullName} />
            <Suggestions userId={user?.userId} following={user?.following} loggedInUserDocId={user?.docId} />
        </div>
    );
}
