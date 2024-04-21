import React from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";

import "../../App.scss";
// components
import Tarjeta from "./Home/Tarjeta";
import LinesChart from "./Home/LinesChart";
import RegistroGastos from "./Home/RegistroGastos";

function Home() {
  return (
    <div style={{ width: "95%", height: "100%" }}>
      <div className="container-fluid">
        <div className="d-sm-flex align-items-center justify-content-between mb-4">
          <h1 className="h3 mb-0 text-gray-800">Panel De Control</h1>
        </div>
      </div>
      {/* // Primer cuadrito */}
      <div className="row">
        <Tarjeta propiedad="Número de Personas" cantidad="35" />

        {/* //Segundo cuadrito */}
        <Tarjeta propiedad="Total de Ingresos Día" cantidad="$530.000" />

        {/* //Tercer Cuadrito */}
        <Tarjeta propiedad="Tasa de Ocupación" cantidad="90%" />

        {/* //Cuarto Cuadrito */}
        <Tarjeta propiedad="Ganancias Semanales" cantidad="$230.000" />

        <div className="flex">
          {/* //Tabla Ingresos */}

          <LinesChart />

          {/* //Grafica de porcentajes  */}
          <RegistroGastos />
        </div>
      </div>
    </div>
  );
}

export default Home;
