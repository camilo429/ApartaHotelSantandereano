import React from "react";
import { NavLink } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as FcIcons from "react-icons/fc";
import * as HiIcons from "react-icons/hi";
import "../../App.scss";

const Sidebar = () => { 
  return (
    <div className="sidebar">
      <ul>
        <li>
          <NavLink className="text-blue rounded py-2 w-100 d-inline-block px-3" to="PanelAdministrador/Home" exact="true" activeclassname="active"><FaIcons.FaHome className="me-2"/>Incio</NavLink>
        </li>
        <li>
          <NavLink className="text-blue rounded py-2 w-100 d-inline-block px-3" to="PanelAdministrador/Sales" exact="true" activeclassname="active" ><FcIcons.FcSalesPerformance className="me-2"/>Ventas</NavLink>
        </li>
        <li>
          <NavLink className="text-blue rounded py-2 w-100 d-inline-block px-1" to="PanelAdministrador/Huespedes" exact="true" activeclassname="active"><HiIcons.HiUsers className="me-2"/>Huespedes</NavLink>
        </li>
      </ul>
    </div>
  );
};
export default Sidebar;
