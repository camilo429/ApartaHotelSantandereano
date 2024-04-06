import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from '../../Administrador/Footer';
import CheckIn from './CheckIn';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
const ModuloCheckIn = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <CheckIn />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}

export default ModuloCheckIn;
