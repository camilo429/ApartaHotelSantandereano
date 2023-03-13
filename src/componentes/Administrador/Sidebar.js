import React from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as HiIcons from "react-icons/hi";
import * as BsIcons from "react-icons/bs";
import * as GrIcons from "react-icons/gr";
import * as MdHotel from "react-icons/md";
import "../../App.scss";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import "../../css/sb-admin-2.min.css";
import "../../vendor/fontawesome-free/css/all.min.css";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion">
        <a
          className="sidebar-brand d-flex align-items-center justify-content-center"
          href="index.html"
        >
          <div className="sidebar-brand-icon rotate-n-15">
            <i className="fas fa-laugh-wink"></i>
          </div>

          <div className="sidebar-brand-text mx-3">Administrador</div>
        </a>
        <br></br>
        <div className="sidebar-heading">Interface</div>

        <li className="nav-item active">
          <NavLink
            className="text-blue rounded py-2 w-100 d-inline-block px-1"
            to="/Home"
            exact="true"
            activeclassname="active"
          >
            <FaIcons.FaHome className="me-2" />
            Incio
          </NavLink>
        </li>

        <li className="nav-item active">
          <NavLink
            className="text-blue rounded py-2 w-100 d-inline-block px-1"
            to="/Sales"
            exact="true"
            activeclassname="active"
          >
            <FcIcons.FcSalesPerformance className="me-2" />
            Ventas
          </NavLink>
        </li>

        <li className="nav-item active">
          <NavLink
            className="text-blue rounded py-2 w-100 d-inline-block px-1"
            to="/Huespedes"
            exact="true"
            activeclassname="active"
          >
            <HiIcons.HiUsers className="me-2" />
            Huespedes
          </NavLink>
        </li>

        <li className="nav-item active">
          <NavLink
            className="text-blue rounded py-2 w-100 d-inline-block px-1"
            to="/Empleados"
            exact="true"
            activeclassname="active"
          >
            <HiIcons.HiUsers className="me-2" />
            Empleados
          </NavLink>
        </li>

        <li className="nav-item active">
          <NavLink
            className="text-blue rounded py-2 w-100 d-inline-block px-1"
            to="/Graficas"
            exact="true"
            activeclassname="active"
          >
            <BsIcons.BsWindows className="me-2" />
            Graficas
          </NavLink>
        </li>
        <li className="nav-item active">
          <NavLink
            className="text-blue rounded py-2 w-100 d-inline-block px-1"
            to="/Habitacion"
            exact="true"
            activeclassname="active"
          >
            <MdHotel.MdHotel className="me-2" />
            Habitaciones
          </NavLink>
        </li>

        <li className="nav-item active">
          <NavLink
            className="text-blue rounded py-2 w-100 d-inline-block px-1"
            to="/Tablas"
            exact="true"
            activeclassname="active"
          >
            <GrIcons.GrTable className="me-2" />
            Tablas
          </NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
