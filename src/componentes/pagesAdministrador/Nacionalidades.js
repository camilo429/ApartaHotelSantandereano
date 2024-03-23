import React, { useEffect, useState } from "react";
// librerias
import axios from "axios";
// css
import Select from "react-select"
// url
import { Apiurl } from "../../services/userService"
const url = Apiurl + "nacionalidad/listarNacionalidades";

function Nacionalidades({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  const getNacionalidades = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
        }
      })

      if (response.status === 200) {
        setData(response.data);
      } else {
        console.log("A ocurrido un error con nacionalidades", response.error.data);
      }
    } catch (error) {
      console.log("Ha ocurrido un error al listar Nacionalidades", error);
      alert("Ha ocurrido un error al listar Nacionalidades")
    }
  }
  useEffect(() => {
    getNacionalidades();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: {
        name,
        value: {
          codNacion: value,
          nombre: label
        }
      },
    });
  };

  return (
    <div className="Nacionalidades" style={{ height: "25px", width: "175px" }}>
      <Select
        value={
          value
            ? {
              label: value?.nombre,
              value: value?.codNacion,
            } : null
        }
        options={
          data.map((nacio) => ({
            label: nacio.nombre,
            value: nacio.codNacion,
          }))
        }
        onChange={handleChange}
        placeholder="Seleccione una nacionalidad"
      />
    </div>
  );
}
export default Nacionalidades;