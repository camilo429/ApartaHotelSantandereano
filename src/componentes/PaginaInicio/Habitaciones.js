import React, { useEffect, useState } from "react";
// librerias
import axios from "axios";
import Select from "react-select"

function Habitaciones({ name, handleChangeData, value = null, url }) {
    const [data, setData] = useState([]);

    useEffect(() => {
        const getHabitaciones = async () => {
            try {
                axios.get(url)
                    .then(response => {
                        setData(response.data);
                    })
                    .catch(error => {
                        console.error('Error al obtener las opciones:', error);
                    });
            } catch (error) {
                console.log("Error al obtener las opciones:", error)
            }
        }
        getHabitaciones();
    }, [url]);

    const handleChange = ({ label, value, descripHabitacion, numHabitacion, pisoHabitacion, maxPersonasDisponibles,
        precioDia, estadoHabitacion, imagenHabitacion }) => {
        handleChangeData({
            target: {
                name, value: {
                    codHabitacion: value,
                    nombreHabitacion: label,
                    descripHabitacion: descripHabitacion,
                    numHabitacion: numHabitacion,
                    pisoHabitacion: pisoHabitacion,
                    maxPersonasDisponibles: maxPersonasDisponibles,
                    precioDia: precioDia,
                    estadoHabitacion: estadoHabitacion,
                    imagenHabitacion: imagenHabitacion
                }
            },
        });
    };

    return (
        <div className="habitaciones">
            <Select
                options={
                    data.map((docu) => ({
                        label: docu.nombreHabitacion,
                        value: docu.codHabitacion,
                        descripHabitacion: docu.descripHabitacion,
                        numHabitacion: docu.numHabitacion,
                        pisoHabitacion: docu.pisoHabitacion,
                        maxPersonasDisponibles: docu.maxPersonasDisponibles,
                        precioDia: docu.precioDia,
                        estadoHabitacion: docu.estadoHabitacion,
                        imagenHabitacion: docu.imagenHabitacion
                    }))
                }
                onChange={handleChange}
                placeholder="Seleccione Habitacion"
            />
        </div>
    );
}

export default Habitaciones;