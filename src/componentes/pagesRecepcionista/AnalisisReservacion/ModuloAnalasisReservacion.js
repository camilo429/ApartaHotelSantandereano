import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from '../../Administrador/Footer';
import AnalisisReservacion from './AnalisisReservacion';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const ModuloAnalisisFactura = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <AnalisisReservacion />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}

export default ModuloAnalisisFactura;
