import React, {useContext, useEffect, useState} from "react";
import {useHistory} from "react-router-dom";
import FirebaseContext from "../context/context";

const Login = () => {
    console.log("Rendering loging!");
    const history = useHistory();
    const {firebase} = useContext(FirebaseContext);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const isValid = email === '' || password === '';

    useEffect(()=> {
        document.title = 'Instagram Login'

    }, [])


    return(<div><p>This is the Login component</p></div>);
}

export default Login;
