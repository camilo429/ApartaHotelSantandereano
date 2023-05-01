import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";

import NacionalidadComponent from "./componentes/Nacionalidad/NacionalidadComponent";
import EmpleadoComponent from "./componentes/Empleado/EmpleadoComponent";
import AdministradorComponent from "./componentes/Administrador/AdministradorComponent";
import DocumentoComponent from "./componentes/Documento/DocumentoComponent";
import DocumentoEmpleado from "./componentes/Empleado/DocumentoEmpleado";
import PanelAdministrador from "./componentes/Administrador/PanelAdministrador";
import Inicio from "./componentes/PaginaInicio/Inicio";
import About from "./componentes/PaginaInicio/About";
import Lugares from "./componentes/PaginaInicio/Lugares";
import Contacto from "./componentes/PaginaInicio/Contacto";
import Login from "./componentes/PaginaInicio/Login";


function App() {
  return (
    <div className="App">
      <div className="pagina">
        <BrowserRouter>
          <Routes>
            <Route path="/" exament element={<Inicio />} />
            {/* <Route path="/Paginainicio" element={<PaginaInicio />} /> */}

            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/QuienesSomos" element={<About />} />
            <Route path="/Lugares" element={<Lugares />} />
            <Route path="/Contactanos" element={<Contacto />} />

            {/* <Route path="/Servicios" element={<ServiciosComponent />} /> */}
            {/* <Route path="/Contacto" element={<ContactoComponent />} /> */}
            <Route path="/Login" element={<Login />} />

            <Route
              path="/ListarNacionalidades"
              element={<NacionalidadComponent />}
            />
            <Route path="/ListarDocumento" element={<DocumentoComponent />} />
            <Route path="/documentoEmpleado" element={<DocumentoEmpleado />} />
            <Route path="/Administrador" element={<AdministradorComponent />} />

            <Route path="/ListarEmpleado" element={<EmpleadoComponent />} />

            <Route path="/PanelAdministrador/*" element={<PanelAdministrador />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
