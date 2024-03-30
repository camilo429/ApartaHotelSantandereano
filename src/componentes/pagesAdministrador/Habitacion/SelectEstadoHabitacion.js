import React, { useEffect, useState } from "react";
// librerias
import axios from "axios";
// css
import Select from "react-select";
// url
import { Apiurl } from "../../../services/userService";
const LISTAR_ESTADOS_HABITACION = Apiurl + "estadoHabitacion/listarEstadoHabitacion";

function SelectEstadoHabitacion({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  const getEstadoHabitacion = async () => {
    try {
      const response = await axios.get(LISTAR_ESTADOS_HABITACION, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        }
      })
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.log("error cargar estados habitaciòn", response.status);
      }
    } catch (error) {
      console.log("Error al cargar Estados Habitaciòn", error);
    }
  };
  useEffect(() => {
    getEstadoHabitacion();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: { name, value: { codEstadoHabitacion: value, nombre: label } },
    });
  };

  return (
    <div className="estadoHabitacion" style={{ width: "170px", margin: "0px" }}>
      <Select
        defaultValue={
          value
            ? {
              label: value?.nombre,
              value: value?.codEstadoHabitacion,
            }
            : null
        }
        options={data.map((nacio) => ({
          label: nacio.nombre,
          value: nacio.codEstadoHabitacion,
        }))}
        onChange={handleChange}
        placeholder="Seleccione EstadoHabitación"
      />
    </div>
  );
}

export default SelectEstadoHabitacion;
