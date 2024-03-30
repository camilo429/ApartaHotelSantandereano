import React from 'react';
import SidebarAdmin from "../Administrador/SidebarAdmin";
import Footer from '../Administrador/Footer';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
import EmpleadoComponent from './EmpleadoComponent';
const ModuloEmpleado = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <EmpleadoComponent />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}
export default ModuloEmpleado;