import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from '../../Administrador/Footer';
import Factura from './Factura';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
const ModuloFactura = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <Factura />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>

    );
}

export default ModuloFactura;
