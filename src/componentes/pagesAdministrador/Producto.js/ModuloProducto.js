import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from "../../Administrador/Footer";
import Producto from './Producto';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const ModuloProducto = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <Producto />
            <a href='productos.html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}
export default ModuloProducto;