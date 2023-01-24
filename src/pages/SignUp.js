import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import FirebaseContext from "../context/FirebaseCxt";
import * as ROUTES from '../constants/Routes';
import {doesUsernameExist} from "../services/FirebaseServcie";
import {isEmpty, validateEmail} from "../helpers/HelperFunctions";
import {COLLEC_USERS} from "../constants/FirebaseCollections";


const Login = () => {
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [error, setError] = useState('');

    const isInvalid = !validateEmail(emailAddress) || isEmpty(password) || isEmpty(username) || isEmpty(fullName);

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const exist = await doesUsernameExist(username);
            console.log("The user ", exist ? "does" : "doesn't", " exist!")
            if (!exist) {
                try {
                    const createUserResult = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password);

                    await createUserResult.user.updateProfile({displayName: username.toLowerCase()});

                    await firebase.firestore().collection(COLLEC_USERS).add({
                        userId: createUserResult.user.uid,
                        username: username.toLowerCase(),
                        fullName,
                        emailAddress: emailAddress.toLowerCase(),
                        following: [],
                        dateCreated: Date.now()
                    })
                    history.push(ROUTES.DASHBOARD);
                } catch (error) {
                    console.log(error.message);
                    setError(error.message);

                }

            } else {
                setError("The username already exist, please Login instead.")
            }
        } catch (error) {
            console.log("ERROR: ", error);
            setError(error.message);
        }
    }

    useEffect(() => {
        document.title = 'Instagram Sign up'
    }, [])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5">
                <img src="/images/iphone-with-profile.jpg" alt="iPhone with Instagram app"/>
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/logo.png" alt="Instagram" className="mt-2 w-6/12 mb-4"/>
                    </h1>

                    {error && <p className="mb-4 text-xs text-red-primary">{error}</p>}

                    <form onSubmit={handleSignup} method="POST">
                        <input
                            aria-label="Enter your username"
                            type="text"
                            placeholder="Username"
                            autoComplete="on"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={e => setUsername(e.target.value)}
                            value={username}
                        />
                        <input
                            aria-label="Enter your full name"
                            type="text"
                            placeholder="Full name"
                            autoComplete="off"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={e => setFullName(e.target.value)}
                            value={fullName}
                        />
                        <input
                            aria-label="Enter your email address"
                            type="email"
                            placeholder="Email address"
                            autoComplete="on"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={e => setEmailAddress(e.target.value)}
                            value={emailAddress}
                        />
                        <input
                            aria-label="Enter your password"
                            type="password"
                            placeholder="Password"
                            autoComplete="new-password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-blue-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'}`}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">
                        Have an account?{` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-blue-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;