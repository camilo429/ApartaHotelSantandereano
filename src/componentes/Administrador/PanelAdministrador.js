import React from "react";
import Home from "../pagesAdministrador/Home";
import Huespedes from "../pagesAdministrador/Huespedes";
import Sales from "../pagesAdministrador/Sales";
import NavbarA from "./NavbarA";
import Sidebar from "./Sidebar";
import Tablas from "../pagesAdministrador/Tablas";
import Graficas from "../pagesAdministrador/Graficas";
import { Routes, Route } from "react-router-dom";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";

function PanelAdministrador() {
  return (
    <div>
      <div className="flex">
        <Sidebar className="w-100"/>
        <div className="content w-100">
          <NavbarA />
          <Routes>
            <Route
              path="PanelAdministrador/Home"
              exact={true}
              element={<Home />}
            />
            <Route
              path="PanelAdministrador/Huespedes"
              exact={true}
              element={<Huespedes />}
            />
            <Route
              path="PanelAdministrador/Sales"
              exact={true}
              element={<Sales />}
            />
             <Route
              path="PanelAdministrador/Graficas"
              exact={true}
              element={<Graficas />}
            />
             <Route
              path="PanelAdministrador/Tablas"
              exact={true}
              element={<Tablas />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default PanelAdministrador;
