import React from "react";
import Tarjeta from "./Home/Tarjeta";
import Llamadas from "./Home/Llamadas";
import Aceptacion from "./Home/Aceptacion";

function Graficas() {
  return (
    <div style={{ margin: "10px" }}>
      <div className="flex">
        <Tarjeta
          propiedad="Cantidad de ingresos Totatles Octubre"
          cantidad="$12.350.000"
        />
        <Tarjeta propiedad="Costos Octubre" cantidad="$4.500.000" />
        <Tarjeta propiedad="Gastos Octubre" cantidad="$3.500.000" />
      </div>
      <div style={{ width: "600px", height: "600px" }} className="flex">
        <div>
          <Llamadas />
        </div>
        <Aceptacion />
      </div>
    </div>
  );
}

export default Graficas;
