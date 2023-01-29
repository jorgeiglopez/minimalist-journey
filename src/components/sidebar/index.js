import { useContext } from 'react';
import LoggedUser from './LoggedUser';
import Suggestions from './Suggestions';
import UserContext from '../../context/UserContext';

export default function Sidebar() {
    const user = useContext(UserContext);
    console.log("***** Sidebar  user:", user);
    return (
        <div className="p-4">
            <LoggedUser user={user} />
            <Suggestions user={user} />
        </div>
    );
}
