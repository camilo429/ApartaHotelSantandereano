import React from "react";
import Home from "../pagesAdministrador/Home";
import Huespedes from "../pagesAdministrador/Huespedes";
import Sales from "../pagesAdministrador/Sales";
import NavbarA from "./NavbarA";
import Sidebar from "./Sidebar";
import Reservaciones from "../pagesAdministrador/Reservaciones";
import Graficas from "../pagesAdministrador/Graficas";
import { Routes, Route } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import EmpleadoComponent from "../Empleado/EmpleadoComponent";
import Habitacion from "../pagesAdministrador/Habitacion";
import "../../App.scss";
import Recibos from "../pagesAdministrador/Recibos";

function
  PanelAdministrador() {
  return (
    <div className="flex">
      <Sidebar />
      <div className="cotenedor" style={{ width: "85%" }} >
        <NavbarA />
        <Routes>
          <Route
            path="/"
            exact={true}
            element={<Home />}
          />
          <Route
            path="/Home"
            exact={true}
            element={<Home />}
          />
          <Route
            path="/Huespedes"
            exact={true}
            element={<Huespedes />}
          />
          <Route
            path="/Empleados"
            exact={true}
            element={<EmpleadoComponent />}
          />
          <Route
            path="/Sales"
            exact={true}
            element={<Sales />}
          />
          <Route
            path="/Graficas"
            exact={true}
            element={<Graficas />}
          />
          <Route
            path="/Reservaciones"
            exact={true}
            element={<Reservaciones />}
          />
          <Route
            path="/Habitacion"
            exact={true}
            element={<Habitacion />}
          />
          <Route
            path="/Recibos"
            exact={true}
            element={<Recibos />}
          />
        </Routes>
      </div>
    </div>
  );
}

export default PanelAdministrador;
