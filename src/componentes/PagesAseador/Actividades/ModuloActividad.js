import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from '../../Administrador/Footer';
import Actividad from './Actividad';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const ModuloActividad = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <Actividad />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}

export default ModuloActividad;
