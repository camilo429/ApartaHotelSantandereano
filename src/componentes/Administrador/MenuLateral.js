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
import Comentario from "../pagesAdministrador/Comentario";

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
import Acciones from "../pagesAdministrador/Acciones";
import { MdBedroomParent } from "react-icons/md";
import ModuloHuespued from "../pagesAdministrador/Huespedes/ModuloHuespued";
import ModuloHabitacion from "../pagesAdministrador/Habitacion/ModuloHabitacion";
import ModuloEmpleado from "../Empleado/ModuloEmpleado";

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
                  <MdOutlineRestorePage style={{ margin: "3px" }} />
                  Usuario
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
              {/*<li className="sidebar-item">
                <NavLink className="sidebar-link" to="Habitaciones" exact="true" activeclassname="active">
                  <MdBedroomParent className="me-2" /> Habitaciones
                </NavLink>
              </li>*/}

              <li className="sidebar-item">
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#posts" data-bs-toggle="collapse" aria-expanded="false">
                  <MdBedroomParent style={{ margin: "3px" }} />Habitación
                </a>
                <ul id="posts" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="Habitaciones" exact="true" activeclassname="active">
                      <MdOutlineBedroomParent className="me-2" /> Habitaciones
                    </NavLink>
                  </li>
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link">Tipo Habitación</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link"> Otra opcion </a>
                  </li>
                </ul>
              </li>

              <li className="sidebar-item">
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#posts" data-bs-toggle="collapse" aria-expanded="false">
                  <FaSliders style={{ margin: "3px" }} />Gastos
                </a>
                <ul id="posts" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link">Gastos Fijos</a>
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
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#auth" data-bs-toggle="collapse" aria-expanded="false">
                  <FaUser style={{ margin: "3px" }} /> Actividades
                </a>
                <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link">Tareas</a>
                  </li>
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
                      Mensuales
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
          <Route path="/Sales" exact={true} element={<Sales />} />
          <Route path="/Graficas" exact={true} element={<Graficas />} />
          <Route path="/Reservaciones" exact={true} element={<Reservaciones />} />
          <Route path="/Recibos" exact={true} element={<Recibos />} />
          <Route path="/Tarea" exact={true} element={<Tarea />} />
          <Route path="/Comentario" exact={true} element={<Comentario />} />
          <Route path="/Acciones" exact={true} element={<Acciones />} />
          <Route path="/Habitaciones" exact={true} element={<ModuloHabitacion />} />
        </Routes>
      </div>
    </div>
  );
}
export default MenuLateral;