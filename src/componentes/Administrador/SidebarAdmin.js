import React, { useEffect, useState } from 'react';
// import { CiSun } from "react-icons/ci";
// import { FaMoon } from "react-icons/fa";
// import AdminDashboard from "./AdminDashboard"
// import Footer from './Footer';

function SidebarAdmin() {

    const [isLightTheme, setIsLightTheme] = useState(true);

    useEffect(() => {
        const themeToggle = document.querySelector('.theme-toggle');
        const sidebarToggle = document.getElementById('sidebar-toggle');

        const handleClick = () => {
            const sidebar = document.getElementById('sidebar');
            if (sidebar) {
                sidebar.classList.toggle('collapsed');
            }
        };
        const pinchar = () => {
            toggleLocalStorage();
            toggleRootClass();
        }
        if (sidebarToggle) {
            sidebarToggle.addEventListener('click', handleClick);
        }
        if (themeToggle) {
            themeToggle.addEventListener('click', pinchar);
        }
        // Limpiar el event listener al desmontar el componente
        return () => {
            if (sidebarToggle) {
                sidebarToggle.removeEventListener('click', handleClick);
            }
            if (themeToggle) {
                themeToggle.removeEventListener('click', pinchar);
            }
        };
    }, []);

    const toggleRootClass = () => {
        setIsLightTheme((prevTheme) => !prevTheme);
    };
    const toggleLocalStorage = () => {
        if (isLightTheme) {
            localStorage.removeItem('light');
        } else {
            localStorage.setItem('light', 'set');
        }
    };

    useEffect(() => {
        if (isLightTheme) {
            document.documentElement.setAttribute('data-bs-theme', 'light');
        } else {
            document.documentElement.setAttribute('data-bs-theme', 'dark');
        }
    }, [isLightTheme]);

    useEffect(() => {
        if (localStorage.getItem('light')) {
            toggleRootClass();
        }
    }, []);

    return (
        <div className="main">
            <nav className="navbar navbar-expand px-3 border-bottom">
                <button className="btn" id='sidebar-toggle' type='button'>
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className='navbar-collapse navbar'>
                    <ul className='navbar-nav'>
                        <li className='nav-item dropdown'>
                            <a href='#hml' data-bs-toggle="dropdown" className='nav-icon pe-md-0'>
                                <img src='./cliente1.jpg' className='avatar img-fluid rounded' alt='monacho' />
                            </a>
                            <div className='dropdown-menu dropdown-menu-end'>
                                <a href='#fe' className='dropdown-item'>Profile</a>
                                <a href='#fe' className='dropdown-item'>Setting</a>
                                <a href='#fe' className='dropdown-item'>Logout</a>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default SidebarAdmin