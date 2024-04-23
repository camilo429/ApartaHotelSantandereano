import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from "../../Administrador/Footer";
import Inventario from './Inventario';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const ModuloInventario = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <Inventario />
            <a href='productos.html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}
export default ModuloInventario;