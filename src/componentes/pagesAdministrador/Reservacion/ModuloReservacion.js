import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from '../../Administrador/Footer';
import Reservacion from './Reservacion';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
const ModuloReservacion = () => {
    return (
        <div>
            <div className='main'>
                <SidebarAdmin />
                <Reservacion />
                <a href='#html' className='theme-toggle'>
                    <CiSun />
                    <FaMoon />
                </a>
                <Footer />
            </div>
        </div>
    );
}

export default ModuloReservacion;
