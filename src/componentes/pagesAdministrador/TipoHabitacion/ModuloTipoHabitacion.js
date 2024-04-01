import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from "../../Administrador/Footer";
import TipoHabitacion from './TipoHabitacion';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const ModuloTipoHabitacion = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <TipoHabitacion />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}

export default ModuloTipoHabitacion;
