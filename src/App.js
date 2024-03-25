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
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <div className="App">
      <div className="pagina">
        <BrowserRouter>
          <Routes>
            {/* url para navegar en la pagina inicial */}
            <Route path="/" exament element={<Inicio />} />
            <Route path="/Inicio" element={<Inicio />} />
            <Route path="/SobreNosotros" element={<About />} />
            <Route path="/Lugares" element={<Lugares />} />
            <Route path="/Contactanos" element={<Contacto />} />
            <Route path="/Login" element={<Login />} />
            {/* url para navegar en empleado */}
            <Route path="/ListarNacionalidades" element={<NacionalidadComponent />} />
            <Route path="/ListarDocumento" element={<DocumentoComponent />} />
            <Route path="/documentoEmpleado" element={<DocumentoEmpleado />} />
            <Route path="/Administrador" element={<AdministradorComponent />} />
            <Route path="/ListarEmpleado" element={<EmpleadoComponent />} />
            {/* Rutas para El administrador */}
            <Route path="/PanelAdministrador/*" element={<PanelAdministrador />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;