import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from './components/LandingPage';
import SideBar from './components/SideBar';
import Account from './pages/Account';
import Songs from './components/Songs';
import PlayList from './components/PlayList';

const App=()=>{
  return (
        <Router>
        <SideBar/>
          <Routes>
            <Route path="/" element={<Account />} />
            <Route path="/tracks" element={<LandingPage />} />
            <Route path="/songs" element={<Songs />} />
            <Route path="/playlist" element ={<PlayList/>}/>
          </Routes>
      </Router>
  )
}

export default App
