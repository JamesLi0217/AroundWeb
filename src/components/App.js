import React, {useState} from 'react';
import '../index.css';
import TopBar from './TopBar';
import Main from './Main'
import {TOKEN_KEY} from '../constants'

function App() {
    const [loggedIn, setLoggedIn] = useState(
        localStorage.getItem(TOKEN_KEY) ? true : false
    );

    const logout = () => {
        setLoggedIn(false);
        localStorage.removeItem(TOKEN_KEY);
    }

    const login = (token) => {
        setLoggedIn(true);
        localStorage.setItem(TOKEN_KEY, token);
    }

  return (
    <div className="App">
      <TopBar loggedIn={loggedIn} logout={logout}/>
      <Main loggedIn={loggedIn} login={login}/>
    </div>
  );
}

export default App;
