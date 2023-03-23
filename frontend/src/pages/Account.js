import React, { useState,useEffect } from 'react';
import Login from './Login'
import Signup from './SignUp'
import './Account.css'
const Account = () => {
  const [tab, setTab] = useState('login');
  const [loggedIn,setIsLoggedIn] = useState(false)
  useEffect(() => {
    if (localStorage.getItem('token')) {

      setIsLoggedIn(true);
    }
  },[tab])
  const handleTabChange = (newTab) => {
    setTab(newTab);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
  };

  return (
    <div className="account-container">
      {loggedIn ?(
        <div>
        <h1>Hi, You have successfully logged in </h1>
        <button onClick={()=>handleLogout()}>Logout</button>
        </div>
      ):(
        <>
        <div className="tabs">
        <div className={`tab ${tab === 'login' ? 'active' : ''}`} onClick={() => handleTabChange('login')}>
          Login
        </div>
        <div className={`tab ${tab === 'signup' ? 'active' : ''}`} onClick={() => handleTabChange('signup')}>
          Signup
        </div>
      </div>
      <div className="card-container">
        {tab === 'login' && <Login setIsLoggedIn={setIsLoggedIn}/>}
        {tab === 'signup' && <Signup setIsLoggedIn={setIsLoggedIn} />}
      </div>
      </>
      )}
    </div>
      
      
  );
};
export default Account;