import {useEffect} from "react";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/sidebar";
import LoggedInUserContext from '../context/LoggedUserCtx';
import useUser from "../hooks/UseUser";

const Dashboard = () => { //{ user: loggedInUser }

    const { user, setActiveUser } = useUser('ciHYndscGWflKD54dASRm3Ra2QA3'); //useUser(loggedInUser.uid);

    useEffect(() => {
        document.title = 'Instagram';
    }, []);

    return (
        <LoggedInUserContext.Provider value={{ user, setActiveUser }}>
            <div className="bg-gray-background">
                <Header />
                <div className="grid grid-cols-3 gap-4 justify-between mx-auto max-w-screen-lg">
                    <Timeline />
                    <Sidebar />
                </div>
            </div>
        </LoggedInUserContext.Provider>
    );
};

export default Dashboard;
