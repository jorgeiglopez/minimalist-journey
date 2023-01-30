import React, {useContext, useEffect, useState} from "react";
import {Link, useHistory} from "react-router-dom";
import FirebaseContext from "../context/FirebaseContext";
import * as ROUTES from '../constants/Routes';
import {isEmpty, validateEmail} from "../helpers/HelperFunctions";

// TODO:
//  - Email proper validation - touched, loose focus
//  - Add captcha
//  - Encrypt password


const Login = () => {
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);

    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isInvalid = !validateEmail(emailAddress) || isEmpty(password);

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            await firebase.auth().signInWithEmailAndPassword(emailAddress, password);
            history.push(ROUTES.DASHBOARD);
        } catch (error) {
            setError(error.message);
        }
    }

    useEffect(() => {
        document.title = 'Simplify - Login'
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

                    <form onSubmit={handleLogin} method="POST">
                        <input
                            id="email"
                            name="email"
                            aria-label="Enter your email address"
                            type="email"
                            placeholder="Email"
                            autoComplete="email"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={e => setEmailAddress(e.target.value)}
                            value={emailAddress}
                        />
                        <input
                            id="password"
                            name="password"
                            aria-label="Enter your password"
                            type="password"
                            autoComplete="on"
                            placeholder="Password"
                            className="text-sm text-gray-base w-full mr-3 py-5 px-4 h-2 border border-gray-primary rounded mb-2"
                            onChange={e => setPassword(e.target.value)}
                            value={password}
                        />
                        <button
                            disabled={isInvalid}
                            type="submit"
                            className={`bg-brown-medium text-white w-full rounded h-8 font-bold ${isInvalid && 'opacity-50'} mt-2 mb-2`}
                        >
                            Login
                        </button>
                    </form>
                </div>
                <div className="flex justify-center items-center flex-col w-full bg-white p-4 rounded border border-gray-primary">
                    <p className="text-sm">
                        Don't have an account?{` `}
                        <Link to={ROUTES.SIGN_UP} className="font-bold text-brown-medium">
                            Sign up
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
