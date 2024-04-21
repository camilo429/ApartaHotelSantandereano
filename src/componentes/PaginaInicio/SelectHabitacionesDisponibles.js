import React, { useEffect, useState } from "react";
// librerias
import axios from "axios";
import Select from "react-select";
import { Apiurl } from "../../services/userService";
const url = Apiurl + "habitacion/listarHabitaciones/estado/1";

function SelectHabitacionesDisponibles({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  const getHabitaciones = async () => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        setData(response.data);
        // console.log(response.data);
      } else {
        console.log("Error", response.data.mensaje);
      }
    } catch (error) {
      console.log("Error al obtener las habitaciones", error)
    }
  }

  useEffect(() => {
    getHabitaciones()
  }, [])

  const handleChange = ({ label, value, nombreHabitacion, descripHabitacion, numHabitacion, pisoHabitacion, maxPersonasDisponibles, imagenHabitacion, estadoHabitacion }) => {
    const { codTipoHabitacion, precioXPersona, precioXAcompanante } = nombreHabitacion;
    const { codEstadoHabitacion, nombre: nombreEstado } = estadoHabitacion;

    handleChangeData({
      target: {
        name,
        value: {
          codHabitacion: value,
          nombre: label,
          nombreHabitacion: {
            codTipoHabitacion,
            nombre: label,
            precioXPersona,
            precioXAcompanante,
          },
          descripHabitacion,
          numHabitacion,
          pisoHabitacion,
          maxPersonasDisponibles,
          estadoHabitacion: {
            codEstadoHabitacion,
            nombre: nombreEstado,
          },
          imagenHabitacion,
        },
      },
    });
  };

  return (
    <>
      <div className="habitaciones" style={{ height: "25px", width: "170px" }}>
        <Select
          value={
            value
              ? {
                label: value?.nombreHabitacion.nombre,
                value: value?.codHabitacion,
              } : null
          }
          options={data.map((docu) => ({
            value: docu.codHabitacion,
            label: docu.nombreHabitacion.nombre,
            nombreHabitacion: {
              codTipoHabitacion: docu.nombreHabitacion.codTipoHabitacion,
              nombre: docu.nombreHabitacion.nombre,
              precioXPersona: docu.nombreHabitacion.precioXPersona,
              precioXAcompanante: docu.nombreHabitacion.precioXAcompanante
            },
            descripHabitacion: docu.descripHabitacion,
            numHabitacion: docu.numHabitacion,
            pisoHabitacion: docu.pisoHabitacion,
            maxPersonasDisponibles: docu.maxPersonasDisponibles,
            estadoHabitacion: {
              codEstadoHabitacion: docu.estadoHabitacion.codEstadoHabitacion,
              nombre: docu.estadoHabitacion.nombre
            },
            imagenHabitacion: docu.imagenHabitacion,
          }))

          }
          onChange={handleChange}
          required
          placeholder="Habitación" />
      </div>
    </>
  );
}
export default SelectHabitacionesDisponibles;