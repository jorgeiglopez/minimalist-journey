import {useContext, useEffect} from "react";
import Header from "../components/Header";
import Timeline from "../components/Timeline";
import Sidebar from "../components/sidebar";
import LoggedInUserContext from '../context/LoggedUserCtx';
import useUser from "../hooks/UseUser";

const Dashboard = () => {

    const { user, setActiveUser } = useUser('ciHYndscGWflKD54dASRm3Ra2QA3'); //useUser(loggedInUser.uid);
    const userCtx = useContext(LoggedInUserContext);
    console.log('nacho: ', userCtx);
    useEffect(() => {
        document.title = 'Simplify';
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
