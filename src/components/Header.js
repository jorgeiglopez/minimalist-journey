import FirebaseContext from "../context/FirebaseContext";
import {useContext} from "react";
import {Link, useHistory} from "react-router-dom";
import * as ROUTES from "../constants/Routes";
import {DEFAULT_IMAGE_PATH} from "../constants/DevConstants";
import UserContext from "../context/UserContext";

const Header = () => {
    const {firebase} = useContext(FirebaseContext);
    const user = useContext(UserContext);
    const history = useHistory();

    const LinkToHomePage = <Link to={ROUTES.DASHBOARD} aria-label="Dashboard">
        <svg
            className="w-8 mr-6 text-black-light cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
            />
        </svg>
    </Link>;

    const SignOutButton = <button
        type="button"
        title="Sign Out"
        onClick={() => {
            firebase.auth().signOut();
            history.push(ROUTES.LOGIN);
        }}
        onKeyDown={(event) => {
            if (event.key === 'Enter') {
                firebase.auth().signOut();
                history.push(ROUTES.LOGIN);
            }
        }}
    >
        <svg
            className="w-8 mr-6 text-black-light cursor-pointer"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
        >
            <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
            />
        </svg>
    </button>;

    const UserAvatar = <Link to={`/p/${user?.username}`}>
        <img
            className="rounded-full h-8 w-8 mr-4"
            src={`/images/avatars/dali.jpg`}
            alt={`${user?.username} profile`}
            onError={(e) => {
                e.target.src = DEFAULT_IMAGE_PATH;
            }}
        />
    </Link>;


    return (
        <header className="h-16 bg-white border-b border-gray-primary mb-8">
            <div className="container mx-auto max-w-screen-lg h-full">
                <div className="flex justify-between h-full">
                    <div className="text-gray-700 text-center flex items-center align-items cursor-pointer">
                        <h1 className="flex justify-center w-full">
                            <Link to={ROUTES.DASHBOARD} aria-label="Simplify logo">
                                <img src="/images/simplify/simplify-1000x260_1.png" alt="SIMPLIFY" className="mt-2 w-2/12"/>
                            </Link>
                        </h1>
                    </div>
                    <div className="text-gray-700 text-center flex items-center align-items">
                        {user ? (
                            <>
                                {LinkToHomePage}
                                {SignOutButton}
                                {UserAvatar}
                            </>
                        ) : (
                            <>
                                <Link to={ROUTES.LOGIN}>
                                    <button type="button" className="bg-brown-medium font-bold text-sm rounded text-white w-20 h-8">
                                        Log In
                                    </button>
                                </Link>
                                <Link to={ROUTES.SIGN_UP}>
                                    <button type="button" className="font-bold text-sm rounded text-brown-medium w-20 h-8">
                                        Sign Up
                                    </button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
