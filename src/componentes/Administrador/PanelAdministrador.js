import React from "react";
import Home from "../pagesAdministrador/Home";
import Huespedes from "../pagesAdministrador/Huespedes";
import Sales from "../pagesAdministrador/Sales";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { Routes, Route} from "react-router-dom";

function PanelAdministrador() {
  return (
    <div>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <div className="content">
          <Routes>
            <Route path="PanelAdministrador/Home" exact={true} element={<Home />} />
            <Route path="PanelAdministrador/Huespedes" exact={true} element={<Huespedes />} />
            <Route path="PanelAdministrador/Sales" exact={true} element={<Sales />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default PanelAdministrador;
