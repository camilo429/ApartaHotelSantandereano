import { Routes, Route, BrowserRouter } from "react-router-dom";
import React from "react";
import PanelAdministrador from "./componentes/Administrador/PanelAdministrador";
import Inicio from "./componentes/PaginaInicio/Inicio";
import About from "./componentes/PaginaInicio/About";
import Contacto from "./componentes/PaginaInicio/Contacto";
import Login from "./componentes/PaginaInicio/Login";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.min.css";
import PanelRecepcionista from "./componentes/PanelRecepcionista/PanelRecepcionista";
import PanelAseador from "./componentes/PanelAseador/PanelAseador";

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
            <Route path="/Contactanos" element={<Contacto />} />
            <Route path="/Login" element={<Login />} />
            {/* Rutas para El administrador */}
            <Route path="/PanelAdministrador/*" element={<PanelAdministrador />} />
            <Route path="/PanelRecepcionista/*" element={<PanelRecepcionista />} />
            <Route path="/PanelAseador/*" element={<PanelAseador />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
export default App;