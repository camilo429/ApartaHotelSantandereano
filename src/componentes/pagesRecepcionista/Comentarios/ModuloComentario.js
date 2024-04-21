import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from '../../Administrador/Footer';
import Comentarios from './Comentarios';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";
const ModuloComentario = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <Comentarios />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}

export default ModuloComentario;
