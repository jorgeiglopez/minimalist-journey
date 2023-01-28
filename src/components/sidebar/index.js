import { useContext } from 'react';
import User from './User';
import Suggestions from './Suggestions';
import LoggedInUserContext from '../../context/LoggedUserCtx';

export default function Sidebar() {
    const { user } = useContext(LoggedInUserContext);
    return (
        <div className="p-4">
            <User username={user?.username} fullName={user?.fullName} />
            <Suggestions userId={user?.userId} following={user?.following} loggedInUserDocId={user?.docId} />
        </div>
    );
}
