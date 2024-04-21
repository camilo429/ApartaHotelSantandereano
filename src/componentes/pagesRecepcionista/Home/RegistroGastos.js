import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

var options = {
  responsive: true,
  maintainAspectRatio: false,
};

var data = {
  labels: [
    "Inversión 15%",
    "Gastos 20%",
    "Costos 40%",
    "Ganancias 20%",
    "Ahorro 5%",
  ],
  datasets: [
    {
      label: "Tabla de Porcentages",
      data: [15, 20, 40, 20, 5],
      backgroundColor: [
        "rgba(255,99,132,0.2)",
        "rgba(255,206,86,0.2)",
        "rgba(54,162,235,0.2)",
        "rgba(75,192,192,0.2)",
        "rgba(153,102,255,0.2)",
      ],
      borderColor: [
        "rgba(255,99,132,1)",
        "rgba(255,206,86,1)",
        "rgba(54,162,235,1)",
        "rgba(75,192,192,1)",
        "rgba(153,102,255,1)",
      ],
      borderWidth: 1,
    },
  ],
};
export default function RegistroGastos() {
  return (
    <div style={{ width: "60%", height: "60%" }}>
      <Pie data={data} options={options} />;
    </div>
  );
}
