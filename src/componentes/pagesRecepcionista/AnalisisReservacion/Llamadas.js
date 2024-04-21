import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

var beneficios = [8, 5, 7, 2, 1, 10, 5];
var beneficiosWeb = [2, 2, 1, 0, 0, 3, 1];
var meses = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado",];
var midata = {
  labels: meses,
  datasets: [
    {
      label: "Reservaciones por celular (Domingo 07/04/2024 - 13/04/2024)",
      data: beneficios,
      tension: 0.5,
      fill: true,
      borderColor: "rgb(255,99,132)",
      backgroundColor: "rgba(255,99,132,0.5)",
      pointRadius: 5,
      pointBorderColor: "rgba(255,99,132)",
      pointBackgroundColor: "rgba(255,99,132)",
    },
    {
      label:
        "Reservaciones Pagína Web (Domingo 07/04/2024 - 13/04/2024)",
      data: beneficiosWeb,
      tension: 0.5,
      fill: true,
      borderColor: "rgb(225,29,12)",
      backgroundColor: "rgba(225,29,12,0.5)",
      pointRadius: 5,
      pointBorderColor: "rgba(225,29,12)",
      pointBackgroundColor: "rgba(225,29,12)",
    },
  ],
};

var misoptions = {};
export default function LinesChart() {
  return (
    <div style={{ width: "96%", height: "96%", margin: "10px" }}>
      <Line data={midata} options={misoptions} />;
      <div>
      </div>
    </div>
  );
}
