import React from 'react';
import SidebarAdmin from '../Administrador/SidebarAdmin';
import Footer from '../Administrador/Footer';
import AdminDashboard from '../Administrador/AdminDashboard';
import { CiSun } from "react-icons/ci";
import { FaMoon } from "react-icons/fa";

const Acciones = () => {
    return (
        <div className='main'>
            <SidebarAdmin />
            <AdminDashboard />
            <a href='#html' className='theme-toggle'>
                <CiSun />
                <FaMoon />
            </a>
            <Footer />
        </div>
    );
}
export default Acciones;