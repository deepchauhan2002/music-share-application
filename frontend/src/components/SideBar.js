import React, {useEffect,useState} from 'react';
import ReactDOM from 'react-dom';
import './SideBar.css';
import { checkAuth } from '../services/UserService';
import { useNavigate } from "react-router-dom";


const SideBar = () => {
    const navigate = useNavigate();
    const token=localStorage.getItem('token')

    const portalRoot = document.getElementById('portal-root');


    return ReactDOM.createPortal(
        <div className="sidebar">
            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{navigate('./')}} class="icon icon-tabler icon-tabler-user" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="12" cy="7" r="4" />
                <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
            </svg>
            {token && <div>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{navigate('./tracks')}} class="icon icon-tabler icon-tabler-music" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="6" cy="17" r="3" />
                <circle cx="16" cy="17" r="3" />
                <polyline points="9 17 9 4 19 4 19 17" />
                <line x1="9" y1="8" x2="19" y2="8" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{navigate('./songs')}} class="icon icon-tabler icon-tabler-player-play" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <path d="M7 4v16l13 -8z" />
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" onClick={()=>{navigate('./playlist')}} class="icon icon-tabler icon-tabler-playlist" width="40" height="40" viewBox="0 0 24 24" stroke-width="1.5" stroke="#9e9e9e" fill="none" stroke-linecap="round" stroke-linejoin="round">
                <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                <circle cx="14" cy="17" r="3" />
                <path d="M17 17v-13h4" />
                <path d="M13 5h-10" />
                <line x1="3" y1="9" x2="13" y2="9" />
                <path d="M9 13h-6" />
            </svg></div>}
        </div>,
        portalRoot
    )
    }
    

export default SideBar