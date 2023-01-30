import UserContext from "./UserContext";
import useUser from "../hooks/UseUser";

const UserContextProvider = (props) => {
    const activeUser = useUser() || null;
    return <UserContext.Provider value={activeUser} {...props}/>
};

export default UserContextProvider;
