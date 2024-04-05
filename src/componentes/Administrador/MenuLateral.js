import React from "react";
// Componentes
import SidebarAdmin from "./SidebarAdmin";
import Home from "../pagesAdministrador/Home";
import Huespedes from "../pagesAdministrador/Huespedes/Huespedes";
import Sales from "../pagesAdministrador/Sales";
import Reservaciones from "../pagesAdministrador/Reservaciones";
import Graficas from "../pagesAdministrador/Graficas";
import EmpleadoComponent from "../Empleado/EmpleadoComponent";
import Recibos from "../pagesAdministrador/Recibos";
import Tarea from "../pagesAdministrador/Tarea";

//iconos
import { Routes, Route } from "react-router-dom";
// import { FaListUl } from "react-icons/fa";
import { MdOutlineRestorePage } from "react-icons/md";
import { FaSliders } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import { NavLink } from "react-router-dom";
import * as HiIcons from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineBedroomParent } from "react-icons/md";
import { MdFamilyRestroom } from "react-icons/md";
import { FaPeopleCarry } from "react-icons/fa";

import Acciones from "../pagesAdministrador/Acciones";
import { MdBedroomParent } from "react-icons/md";
import ModuloHuespued from "../pagesAdministrador/Huespedes/ModuloHuespued";
import ModuloHabitacion from "../pagesAdministrador/Habitacion/ModuloHabitacion";
import ModuloEmpleado from "../Empleado/ModuloEmpleado";
import ModuloTipoHabitacion from "../pagesAdministrador/TipoHabitacion/ModuloTipoHabitacion";
import ModuloProducto from "../pagesAdministrador/Producto.js/ModuloProducto";
import Reservacion from "../pagesAdministrador/Reservacion/Reservacion";
import ModuloReservacion from "../pagesAdministrador/Reservacion/ModuloReservacion";
import Comentarios from "../pagesAdministrador/Comentarios/Comentarios";
import ModuloComentario from "../pagesAdministrador/Comentarios/ModuloComentario";

function MenuLateral() {
  return (
    <div>
      <div className="wrapper">
        <aside id="sidebar">
          <div className="h-100">
            <div className="sidebar-logo">
              <a href="hola.html">Administrador</a>
            </div>
            <ul className="sidebar-nav">
              <li className="sidebar-header">Elementos Administrador</li>
              <li className="sidebar-item">
                <NavLink className="sidebar-link" to="Acciones" exact="true" activeclassname="active">
                  <MdOutlinePendingActions className="me-2" /> Acciones
                </NavLink>
              </li>

              <li className="sidebar-item">
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#pages" data-bs-toggle="collapse" aria-expanded="false">
                  <MdOutlineRestorePage style={{ margin: "3px" }} />Usuario
                </a>
                <ul id="pages" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="Huespedes" exact="true" activeclassname="active">
                      <HiIcons.HiUsers className="me-2" />Huespedes
                    </NavLink>
                  </li>
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="Empleados" exact="true" activeclassname="active">
                      <FaUsers className="me-2" />Empleados
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="sidebar-item">
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#posts" data-bs-toggle="collapse" aria-expanded="false">
                  <MdBedroomParent style={{ margin: "3px" }} /> Habitación
                </a>
                <ul id="posts" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="Habitaciones" exact="true" activeclassname="active">
                      <MdOutlineBedroomParent className="me-2" /> Habitaciones
                    </NavLink>
                  </li>
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="TipoHabitacion" exact="true" activeclassname="active">
                      <MdFamilyRestroom /> Tipo Habitación
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="sidebar-item">
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#products" data-bs-toggle="collapse" aria-expanded="false">
                  <FaSliders style={{ margin: "3px" }} /> Producto
                </a>
                <ul id="products" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="Productos" exact="true" activeclassname="active">
                      <FaPeopleCarry className="me-2" /> Productos
                    </NavLink>
                  </li>
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link">Gastos Variables</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link">Gastos indirectos </a>
                  </li>
                </ul>
              </li>

              <li className="sidebar-item">
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#reservation" data-bs-toggle="collapse" aria-expanded="false">
                  <FaSliders style={{ margin: "3px" }} /> Reservación
                </a>
                <ul id="reservation" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="Reservacion" exact="true" activeclassname="active">
                      <FaPeopleCarry className="me-2" /> Reservaciones
                    </NavLink>
                  </li>
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link">Reservaciones 1</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link">Reservaciones 2 </a>
                  </li>
                </ul>
              </li>

              <li className="sidebar-item">
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#auth" data-bs-toggle="collapse" aria-expanded="false">
                  <FaUser style={{ margin: "3px" }} /> Actividades
                </a>
                <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <NavLink className="sidebar-link" to="Comentarios" exact="true" activeclassname="active">
                    <FaPeopleCarry className="me-2" /> Comentarios
                  </NavLink>
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link"> Graficas</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link"> Comentarios</a>
                  </li>
                </ul>
              </li>

              <li className="sidebar-header">Graficas</li>
              <li className="sidebar-item">
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#multi" data-bs-toggle="collapse" aria-expanded="false">
                  <BsFillGrid3X3GapFill style={{ margin: "3px" }} /> Desarrollo
                </a>
                <ul id="multi" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#level-1" data-bs-toggle="collapse" aria-expanded="false">
                      Comentarios
                    </a>
                    <ul id="level-1" className="sidebar-dropdown list-unstyled collapse">
                      <li className="sidebar-item">
                        <a href="#clas" className="sidebar-link">Semanales</a>
                      </li>
                      <li className="sidebar-item">
                        <a href="#clas" className="sidebar-link">Diarias</a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>
        <Routes>
          <Route path="/" exact={true} element={<Home />} />
          <Route path="/Home" exact={true} element={<Home />} />
          <Route path="/Huespedes" exact={true} element={<ModuloHuespued />} />
          <Route path="/Empleados" exact={true} element={<ModuloEmpleado />} />
          <Route path="TipoHabitacion" exact={true} element={<ModuloTipoHabitacion />} />
          <Route path="Productos" exact={true} element={<ModuloProducto />} />
          <Route path="Reservacion" exact={true} element={<ModuloReservacion />} />
          <Route path="Comentarios" exact={true} element={<ModuloComentario />} />
          <Route path="/Sales" exact={true} element={<Sales />} />
          <Route path="/Graficas" exact={true} element={<Graficas />} />
          <Route path="/Reservaciones" exact={true} element={<Reservaciones />} />
          <Route path="/Recibos" exact={true} element={<Recibos />} />
          <Route path="/Tarea" exact={true} element={<Tarea />} />
          <Route path="/Acciones" exact={true} element={<Acciones />} />
          <Route path="/Habitaciones" exact={true} element={<ModuloHabitacion />} />
        </Routes>
      </div>
    </div>
  );
}
export default MenuLateral;