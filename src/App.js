import {lazy, Suspense} from "react";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import * as ROUTES from './constants/Routes';
import {UserContext} from "./context/UserContext";
import useAuth from "./hooks/UseAuth";

const Login = lazy(() => import('./pages/Login'));
const SignUp = lazy(() => import('./pages/SignUp'));
const NotFound = lazy(() => import('./pages/NotFound'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function App() {

    const [activeUser, setActiveUser] = useAuth();

    return (
        <UserContext.Provider value={[activeUser, setActiveUser]}>
        <Router>
            <Suspense fallback={<p>Loading...</p>}>
                <Switch>
                    <Route path={ROUTES.LOGIN} component={Login}/>
                    <Route path={ROUTES.SIGN_UP} component={SignUp}/>
                    <Route path={ROUTES.NOT_FOUND} component={NotFound}/>
                    <Route path={ROUTES.DASHBOARD} component={Dashboard} exact/>
                    <Route component={NotFound}/>
                </Switch>
            </Suspense>
        </Router>
        </UserContext.Provider>
    );
}

export default App;
