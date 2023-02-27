import { BrowserRouter, Routes, Route } from "react-router-dom";
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

function App() {
  return (
    <div>
      <BrowserRouter>
        <div className="pagian">
          <Routes>
            <Route path="/" exament element={<PaginaInicio />}></Route>
            <Route path="/inicio" element={<PaginaInicio />}></Route>
            <Route
              path="/QuienesSomos"
              element={<QuienesSomosComponent />}
            ></Route>
            <Route path="/Servicios" element={<ServiciosComponent />}></Route>
            <Route path="/Contacto" element={<ContactoComponent />}></Route>
            <Route path="/Login" element={<LoginComponent />}></Route>

            <Route
              path="/ListarNacionalidades"
              element={<NacionalidadComponent />}
            ></Route>
            {/* <Route path='/ListarTipoDocumento' element={<ListTipoDocumentoComponent/>}></Route> */}
            <Route
              path="/ListarHuespedes"
              element={<HuespedComponent />}
            ></Route>
            <Route
              path="/ListarDocumento"
              element={<DocumentoComponent />}
            ></Route>
            <Route
              path="/ListarEmpleado"
              element={<EmpleadoComponent />}
            ></Route>

            <Route
              path="/documentoEmpleado"
              element={<DocumentoEmpleado />}
            ></Route>

            <Route
              path="/Administrador"
              element={<AdministradorComponent />}
            ></Route>
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
