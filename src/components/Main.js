import React from 'react';
import { Switch, Route, Redirect } from 'react-router';
import Login from './Login';
import Register from './Register';
import Home from './Home';


function Main(props) {
    const { login, loggedIn } = props;

    const showLogin = () => {
        return loggedIn ? <Redirect to="/home" /> : <Login login={login} />
    }

    const showHome = () => {
        return loggedIn ? <Home /> : <Redirect to="/login" />
    }

    return (
        <div className="main">
            <Switch>
                <Route path="/login" render={showLogin} />
                <Route path="/register" component={Register}/>
                <Route path="/home" component={showHome}/>
            </Switch>
        </div>
    );
}

export default Main;