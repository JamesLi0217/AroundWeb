import React from 'react';
import logo from '../assets/image/logo.svg';
import { LogoutOutlined } from '@ant-design/icons';

function TopBar(props) {
    const { loggedIn, logout } = props;
    return (
        <header className="App-header">
            <img className="App-logo" src={logo}/>
            <span className="App-title"> TopBar</span>

            {
                loggedIn ? <LogoutOutlined className="logout" onClick={logout}/> : null
            }
        </header>
    );
}

export default TopBar;