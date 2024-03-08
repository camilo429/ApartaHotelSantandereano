import React, { useEffect, useState } from "react";
// librerias
import axios from "axios";
// css
import Select from "react-select";
// url
import { Apiurl } from "../../services/userService";
const url = Apiurl + "estadoHabitacion/listarEstadoHabitacion";

function EstadoHabitacion({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  const getEstadoHabitacion = async () => {
    axios
      .request({
        method: "get",
        url: url,
        withCredentials: true,
        crossdomain: true,
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          setData(response.data);
          //console.log(response.data);
        }
      });
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
    <div className="estadoHabitacion">
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

export default EstadoHabitacion;
