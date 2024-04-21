import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from "../../Administrador/Footer";
import Habitacion from './Habitacion';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const ModuloHabitacion = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <Habitacion />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}

export default ModuloHabitacion;
