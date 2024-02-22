import React from "react";
import SidebarAdmin from "./SidebarAdmin";
import { FaListUl } from "react-icons/fa";
import { MdOutlineRestorePage } from "react-icons/md";
import { FaSliders } from "react-icons/fa6";
import { FaUser } from "react-icons/fa";
import { BsFillGrid3X3GapFill } from "react-icons/bs";

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
                <a href="link.html" className="sidebar-link"><FaListUl style={{ margin: "3px" }} /> Acciones </a>
              </li>
              <li className="sidebar-item">
                <a href="pages.html" className="sidebar-link collapsed" data-bs-target="#pages" data-bs-toggle="collapse" aria-expanded="false">
                  <MdOutlineRestorePage style={{ margin: "3px" }} />
                  Usuario
                </a>
                <ul id="pages" className="sidebar-dropdown list-unstyled collapse" data-bs-parent="#sidebar">
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link">Huespedes</a>
                  </li>
                  <li className="sidebar-item">
                    <a href="#clas" className="sidebar-link">Empleados</a>
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
        <SidebarAdmin />
      </div>
    </div>
  );
}
export default MenuLateral;