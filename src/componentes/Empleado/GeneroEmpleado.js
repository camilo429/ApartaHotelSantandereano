import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import axios from "axios";
import "./Empleado.css";
import Select from "react-select";
import { Apiurl } from "../../services/userService";

const url = Apiurl + "sexo/listarSexo";

function GeneroEmpleado({ name, handleChangeData, value = null }) {

  const [data, setData] = useState([]);

  const getGeneroEmpleado = async () => {
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
        console.log(response.data);
      }

    })
  };

  useEffect(() => {
    getGeneroEmpleado();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: { name, value: { codSexo: value, nomSexo: label } },
    });
  };

  return (
    <div className="GeneroEmpleado">
      <Select
        defaultValue={value ? {
          label: value?.nomSexo,
          value: value?.codSexo,
        } : null}
        options={data.map((docu) => ({
          label: docu.nomSexo,
          value: docu.codSexo,
        }))}
        onChange={handleChange}
        placeholder="seleccione Tipo Genero"
      />
    </div>
  );
}

export default GeneroEmpleado;
