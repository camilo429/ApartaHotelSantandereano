import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler, } from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

var beneficios = [3, 2, 8, 1, 6, 2, 1];
var meses = ["Domingo", "Lunes", "Martes", "Miercoles", "Jueves", "Viernes", "Sabado",];
var midata = {
  labels: meses,
  datasets: [
    {
      label: "Número Mensajes Des (Domingo 07/04/2024 - Sábado 13/04/2024)",
      data: beneficios,
      tension: 0.5,
      fill: true,
      borderColor: "rgb(255,99,132)",
      backgroundColor: "rgba(255,99,132,0.5)",
      pointRadius: 5,
      pointBorderColor: "rgba(255,99,132)",
      pointBackgroundColor: "rgba(255,99,132)",
    },
  ],
};

var misoptions = {};
export default function LinesChart() {
  return (
    <div style={{ width: "70%", height: "70%", margin: "10px" }}>
      <Line data={midata} options={misoptions} />
      <div>
        <p>
          Es una grafica de cantidad de comentario recibidos (Domingo 07/04/2024 - Sábado 13/04/2024)
        </p>
      </div>
    </div>
  );
}
