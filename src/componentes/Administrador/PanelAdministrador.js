import React from "react";
import { Routes } from "react-router-dom";
// import Home from "../pagesAdministrador/Home";
// import Huespedes from "../pagesAdministrador/Huespedes";
// import Sales from "../pagesAdministrador/Sales";
// import Reservaciones from "../pagesAdministrador/Reservaciones";
// import Graficas from "../pagesAdministrador/Graficas";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
// import EmpleadoComponent from "../Empleado/EmpleadoComponent";
// import Habitacion from "../pagesAdministrador/Habitacion";
// import Recibos from "../pagesAdministrador/Recibos";
// import Tarea from "../pagesAdministrador/Tarea";
// import Comentario from "../pagesAdministrador/Comentario";
// import SidebarAdmin from "./SidebarAdmin";
import MenuLateral from "./MenuLateral";
import "./css/style.css";

function PanelAdministrador() {
  return (
    <div>
      <MenuLateral data-bs-theme="dark" />
      <Routes>
        {/* <Route path="/" exact={true} element={<Home />} />
          <Route path="/Home" exact={true} element={<Home />} />
          <Route path="/Huespedes" exact={true} element={<Huespedes />} />
          <Route path="/Empleados" exact={true} element={<EmpleadoComponent />} />
          <Route path="/Sales" exact={true} element={<Sales />} />
          <Route path="/Graficas" exact={true} element={<Graficas />} />
          <Route path="/Reservaciones" exact={true} element={<Reservaciones />} />
          <Route path="/Habitacion" exact={true} element={<Habitacion />} />
          <Route path="/Recibos" exact={true} element={<Recibos />} />
          <Route path="/Tarea" exact={true} element={<Tarea />} />
          <Route path="/Comentario" exact={true} element={<Comentario />} /> */}
      </Routes>
    </div>
  );
}
export default PanelAdministrador;