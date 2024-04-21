import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from '../../Administrador/Footer';
import AnalisisHuespedes from './AnalisisHuespedes';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
const ModuloAnalisisHuespedes = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <AnalisisHuespedes />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}

export default ModuloAnalisisHuespedes;
