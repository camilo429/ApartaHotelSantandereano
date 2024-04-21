import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from '../../Administrador/Footer';
import AnalisisComentario from './AnalisisComentario';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
const ModuloAnalisisComentario = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <AnalisisComentario />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}

export default ModuloAnalisisComentario;
