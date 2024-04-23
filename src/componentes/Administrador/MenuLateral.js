import React from "react";
//iconos
import { Routes, Route } from "react-router-dom";
import { MdOutlineRestorePage } from "react-icons/md";
import { FaSliders } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import * as HiIcons from "react-icons/hi";
import { FaUsers } from "react-icons/fa";
import { MdOutlinePendingActions } from "react-icons/md";
import { MdOutlineBedroomParent } from "react-icons/md";
import { MdFamilyRestroom } from "react-icons/md";
import { FaPeopleCarry } from "react-icons/fa";
import { MdBedroomParent } from "react-icons/md";
import { MdElectricalServices } from "react-icons/md";
import { MdOutlineWaterDrop } from "react-icons/md";
import { FaRegLightbulb } from "react-icons/fa";
import { FiActivity } from "react-icons/fi";
import { MdOutlineInventory } from "react-icons/md";
// Componentes
import Acciones from "../pagesAdministrador/Acciones";
import ModuloHuespued from "../pagesAdministrador/Huespedes/ModuloHuespued";
import ModuloHabitacion from "../pagesAdministrador/Habitacion/ModuloHabitacion";
import ModuloEmpleado from "../Empleado/ModuloEmpleado";
import ModuloTipoHabitacion from "../pagesAdministrador/TipoHabitacion/ModuloTipoHabitacion";
import ModuloProducto from "../pagesAdministrador/Producto.js/ModuloProducto";
import ModuloReservacion from "../pagesAdministrador/Reservacion/ModuloReservacion";
import ModuloComentario from "../pagesAdministrador/Comentarios/ModuloComentario";
import ModuloFactura from "../pagesAdministrador/Factura/ModuloFactura";
import ModuloCheckIn from "../pagesAdministrador/CheckIn/ModuloCheckIn";
import ModuloReciboPublico from "../pagesAdministrador/ReciboPublico/ModuloReciboPublico";
import ModuloTipoReciboPublico from "../pagesAdministrador/TipoReciboPublico/ModuloTipoReciboPublico";
import Graficas from "../pagesAdministrador/Graficas";
import Recibos from "../pagesAdministrador/Factura/Recibos";
import ModuloAnalisisComentario from "../pagesAdministrador/AnalisisComentario/ModuloAnalisisComentario";
import ModuloAnalisisReservacion from "../pagesAdministrador/AnalisisReservacion/ModuloAnalasisReservacion";
import ModuloAnalisisHuespedes from "../pagesAdministrador/AnalisisHuespedes/ModuloAnalisisHuespedes";
import ModuloActividad from "../pagesAdministrador/Actividad/ModuloActividad";
import ModuloInventario from "../pagesAdministrador/Inventario/ModuloInventario";
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
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="AnalisisHuespedes" exact="true" activeclassname="active">
                      <FaUsers className="me-2" />Analisis Huespedes
                    </NavLink>
                  </li>
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="Actividades" exact="true" activeclassname="active">
                      <FiActivity className="me-2" />Actividades
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
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="CheckIn" exact="true" activeclassname="active">
                      <MdFamilyRestroom /> CheckIn
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
                    <NavLink className="sidebar-link" to="Inventario" exact="true" activeclassname="active">
                      <MdOutlineInventory /> Inventario
                    </NavLink>
                  </li>
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="Productos" exact="true" activeclassname="active">
                      <FaPeopleCarry className="me-2" /> Analisis Productos
                    </NavLink>
                  </li>
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="Productos" exact="true" activeclassname="active">
                      <FaPeopleCarry className="me-2" /> Gastos
                    </NavLink>
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
                    <NavLink className="sidebar-link" to="AnalisisReservacion" exact="true" activeclassname="active">
                      <FaPeopleCarry className="me-2" />Analisis Reservaciones
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="sidebar-item">
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#auth" data-bs-toggle="collapse" aria-expanded="false">
                  <FaUser style={{ margin: "3px" }} /> Comentario
                </a>
                <ul id="auth" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <NavLink className="sidebar-link" to="Comentarios" exact="true" activeclassname="active">
                    <FaPeopleCarry className="me-2" /> Comentarios
                  </NavLink>
                  <NavLink className="sidebar-link" to="Facturas" exact="true" activeclassname="active">
                    <FaPeopleCarry className="me-2" /> Facturas
                  </NavLink>
                  <NavLink className="sidebar-link" to="AnalisisComentarios" exact="true" activeclassname="active">
                    <FaPeopleCarry className="me-2" /> Analisis de Comentarios
                  </NavLink>
                </ul>
              </li>

              {/*<li className="sidebar-header">Pagos</li>
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
              </li>*/}

              <li className="sidebar-item">
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#recibo" data-bs-toggle="collapse" aria-expanded="false">
                  <MdElectricalServices className="me-2" /> Recibos Publicos
                </a>
                <ul id="recibo" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="RecibosPublicos" exact="true" activeclassname="active">
                      <MdOutlineWaterDrop className="me-2" /> Recibos Publicos
                    </NavLink>
                  </li>
                  <li className="sidebar-item">
                    <NavLink className="sidebar-link" to="TipoServiciosPublicos" exact="true" activeclassname="active">
                      <FaRegLightbulb className="me-2" /> Tipo Recibo
                    </NavLink>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </aside>
        <Routes>
          <Route path="/" exact={true} element={<Acciones />} />
          <Route path="/Acciones" exact={true} element={<Acciones />} />
          <Route path="/Huespedes" exact={true} element={<ModuloHuespued />} />
          <Route path="/Empleados" exact={true} element={<ModuloEmpleado />} />
          <Route path="TipoHabitacion" exact={true} element={<ModuloTipoHabitacion />} />
          <Route path="Productos" exact={true} element={<ModuloProducto />} />
          <Route path="Reservacion" exact={true} element={<ModuloReservacion />} />
          <Route path="Comentarios" exact={true} element={<ModuloComentario />} />
          <Route path="RecibosPublicos" exact={true} element={<ModuloReciboPublico />} />
          <Route path="TipoServiciosPublicos" exact={true} element={<ModuloTipoReciboPublico />} />
          <Route path="CheckIn" exact={true} element={<ModuloCheckIn />} />
          <Route path="CheckIn/Facturas" exact={true} element={<ModuloFactura />} />
          <Route path="AnalisisComentarios" exact={true} element={<ModuloAnalisisComentario />} />
          <Route path="AnalisisReservacion" exact={true} element={<ModuloAnalisisReservacion />} />
          <Route path="AnalisisHuespedes" exact={true} element={<ModuloAnalisisHuespedes />} />
          <Route path="Actividades" exact={true} element={<ModuloActividad />} />
          <Route path="Inventario" exact={true} element={<ModuloInventario />} />
          <Route path="/Graficas" exact={true} element={<Graficas />} />
          <Route path="/Recibos" exact={true} element={<Recibos />} />
          <Route path="/Acciones" exact={true} element={<Acciones />} />
          <Route path="/Habitaciones" exact={true} element={<ModuloHabitacion />} />
        </Routes>
      </div>
    </div>
  );
}
export default MenuLateral;