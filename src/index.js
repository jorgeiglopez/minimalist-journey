import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './styles/app.css'
import FirebaseContext from "./context/context";
import {FieldValue, firebase} from "./lib/firebase";

ReactDOM.render(
    <FirebaseContext.Provider value={{firebase, FieldValue}}>
        <App />
    </FirebaseContext.Provider>,
    document.getElementById('root')
);
