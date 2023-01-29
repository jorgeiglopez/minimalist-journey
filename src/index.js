import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/app.css'
import FirebaseContext from "./context/FirebaseContext";
import {FieldValue, firebase} from "./lib/Firebase";

ReactDOM.render(
    <FirebaseContext.Provider value={{firebase, FieldValue}}>
        <App/>
    </FirebaseContext.Provider>,
    document.getElementById('root')
);
