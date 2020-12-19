import React, {useState} from 'react';
import '../index.css';
import TopBar from './TopBar';

function App() {
    const [loggedIn, setLoggedIn] = useState(false);

    const logout = () => {
        setLoggedIn(false);
    }

    const login = () => {
        setLoggedIn(true);
    }

  return (
    <div className="App">
      <TopBar loggedIn={loggedIn} logout={logout}/>
    </div>
  );
}

export default App;
