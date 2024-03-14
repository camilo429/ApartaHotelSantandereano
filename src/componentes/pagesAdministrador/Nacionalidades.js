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
    axios.request({
      method: "get",
      url: url,
      withCredentials: true,
      crossdomain: true,
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
      }
    }).then(response => {
      if (response.status === 200) {
        setData(response.data);
       // console.log(response.data);
      }
    })
  };
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
    <div className="Nacionalidades" style={{ height: "25px", width: "175px"}}>
      <Select
        defaultValue={
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
        placeholder="Nacionalidad"
      />
    </div>
  );
}
export default Nacionalidades;