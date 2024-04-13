import React from 'react';
import { Bar } from 'react-chartjs-2';

const BarChart = () => {
    // Datos para el gráfico de barras
    const data = {
        labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
        datasets: [
            {
                label: 'Ventas 2022',
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
                hoverBackgroundColor: 'rgba(54, 162, 235, 0.7)',
                hoverBorderColor: 'rgba(54, 162, 235, 1)',
                data: [65, 59, 80, 81, 56]
            }
        ]
    };

    // Opciones para el gráfico de barras
    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    };

    return (
        <div>
            <h2>Diagrama de Barras</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default BarChart;
