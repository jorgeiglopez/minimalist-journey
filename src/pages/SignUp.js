import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import FirebaseContext from "../context/FirebaseContext";
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
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');

    const isInvalid = !validateEmail(emailAddress) || isEmpty(password) || isEmpty(username) || isEmpty(firstName) || isEmpty(lastName);

    const handleSignup = async (event) => {
        event.preventDefault();
        try {
            const exist = await doesUsernameExist(username);
            if (!exist) {
                try {
                    const createUserResult = await firebase.auth().createUserWithEmailAndPassword(emailAddress, password);

                    await createUserResult.user.updateProfile({displayName: username.toLowerCase()});

                    await firebase.firestore().collection(COLLEC_USERS).add({
                        uid: createUserResult.user.uid, // The UID is coming from the Auth service. It's the link between the 2 entities.
                        username: username.toLowerCase(),
                        firstName,
                        lastName,
                        emailAddress: emailAddress.toLowerCase(),
                        following: [],
                        dateCreated: Date.now()
                    })
                    history.push(ROUTES.DASHBOARD);
                } catch (error) {
                    console.error(error.message);
                    setError(error.message);

                }

            } else {
                setError("The username already exist, please Login instead.")
            }
        } catch (error) {
            console.error("ERROR: ", error);
            setError(error.message);
        }
    }

    useEffect(() => {
        document.title = 'Simplify - Sign up'
    }, [])

    return (
        <div className="container flex mx-auto max-w-screen-md items-center h-screen">
            <div className="flex w-3/5 mr-6">
                <img src="images/simplify/login_dandelion.png" alt="iPhone with Instagram app"/>
            </div>
            <div className="flex flex-col w-2/5">
                <div className="flex flex-col items-center bg-white p-4 border border-gray-primary mb-4 rounded">
                    <h1 className="flex justify-center w-full">
                        <img src="/images/simplify/2.png" alt="Instagram" className="mt-2 w-9/12 mb-4"/>
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
                            aria-label="Enter your first name"
                            type="text"
                            placeholder="First name"
                            autoComplete="off"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={e => setFirstName(e.target.value)}
                            value={firstName}
                        />
                        <input
                            aria-label="Enter your last name"
                            type="text"
                            placeholder="Last name"
                            autoComplete="off"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={e => setLastName(e.target.value)}
                            value={lastName}
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
                            className={`bg-brown-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'} mt-2 mb-2`}
                        >
                            Sign up
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">
                        Have an account?{` `}
                        <Link to={ROUTES.LOGIN} className="font-bold text-brown-medium">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
