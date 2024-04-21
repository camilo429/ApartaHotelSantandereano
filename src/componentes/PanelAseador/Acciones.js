import React from 'react';
import SidebarAdmin from '../Administrador/SidebarAdmin';
import Footer from '../Administrador/Footer';
import AseadorDashboard from '../PanelAseador/AseadorDashboard';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const Acciones = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <AseadorDashboard />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}
export default Acciones;