import useUser from "../hooks/UseUser";
import UserContext from "./UserContext";

const UserContextProvider = (props) => {
    const userInfo = useUser() || null;
    return <UserContext.Provider value={userInfo} {...props}/>
};

export default UserContextProvider;
