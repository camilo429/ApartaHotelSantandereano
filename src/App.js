import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";

import NacionalidadComponent from "./componentes/Nacionalidad/NacionalidadComponent";
import PaginaInicio from "./componentes/PaginaInicio/PaginaInicio";
import QuienesSomosComponent from "./componentes/PaginaInicio/QuienesSomosComponent";
import ServiciosComponent from "./componentes/PaginaInicio/Servicios";
import ContactoComponent from "./componentes/PaginaInicio/ContactoComponent";
import LoginComponent from "./componentes/PaginaInicio/LoginComponent";

import HuespedComponent from "./componentes/Huesped/HuespedComponent";
import EmpleadoComponent from "./componentes/Empleado/EmpleadoComponent";
import AdministradorComponent from "./componentes/Administrador/AdministradorComponent";
import DocumentoComponent from "./componentes/Documento/DocumentoComponent";
import DocumentoEmpleado from "./componentes/Empleado/DocumentoEmpleado";
import PanelAdministrador from "./componentes/Administrador/PanelAdministrador";

function App() {
  return (
    <div className="App">
      <div className="pagina">
        <BrowserRouter>
          <Routes>
            <Route path="/" exament element={<PaginaInicio />} />
            <Route path="/inicio" element={<PaginaInicio />} />
            <Route path="/QuienesSomos" element={<QuienesSomosComponent />} />
            <Route path="/Servicios" element={<ServiciosComponent />} />
            <Route path="/Contacto" element={<ContactoComponent />} />
            <Route path="/Login" element={<LoginComponent />} />

            <Route
              path="/ListarNacionalidades"
              element={<NacionalidadComponent />}
            />
            <Route path="/ListarHuespedes" element={<HuespedComponent />} />
            <Route path="/ListarDocumento" element={<DocumentoComponent />} />
            <Route path="/ListarEmpleado" element={<EmpleadoComponent />} />
            <Route path="/documentoEmpleado" element={<DocumentoEmpleado />} />
            <Route path="/Administrador" element={<AdministradorComponent />} />
            <Route path="/PanelAdministrador/*" element={<PanelAdministrador />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
