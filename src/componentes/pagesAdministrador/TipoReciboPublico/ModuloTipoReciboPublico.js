import React from 'react';
import SidebarAdmin from '../../Administrador/SidebarAdmin';
import Footer from '../../Administrador/Footer';
import TipoReciboPublico from './TipoReciboPublico';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const ModuloTipoReciboPublico = () => {
    return (
        <div>
            <div className='main'>
                <SidebarAdmin />
                <TipoReciboPublico />
                <a href='#html' className='theme-toggle'>
                    <CiSun />
                    <FaMoon />
                </a>
                <Footer />
            </div>
        </div>
    );
}
export default ModuloTipoReciboPublico;