import React from 'react';
import SidebarAdmin from "../../Administrador/SidebarAdmin";
import Footer from '../../Administrador/Footer';
import Huespedes from './Huespedes';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";


const ModuloHuespued = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <Huespedes />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}

export default ModuloHuespued;
