import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from '../../Administrador/Footer';
import ReciboPublico from './ReciboPublico';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
const ModuloReciboPublico = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <ReciboPublico />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}
export default ModuloReciboPublico;