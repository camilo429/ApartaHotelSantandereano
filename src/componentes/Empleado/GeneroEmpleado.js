import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Empleado.css";
import Select from "react-select";
import { Apiurl } from "../../services/userService";

const url = Apiurl + "sexo/listarSexo";

function GeneroEmpleado({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  const getGeneroEmpleado = async () => {
    try {
      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("access_token")}`
        }
      })
      console.log("generoEmpleado", response.status);
      if (response.status === 200) {
        setData(response.data);
      } else {
        console.log("ocurrio un error al listar GeneroEmpleado", response.status);
      }
    } catch (error) {
      console.log("ocurrio un error al listar GeneroEmpleado", error);
    }
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
    <div className="GeneroEmpleado" style={{ width: "170px", margin: "0px", marginRight: "30px" }}>
      <Select
        defaultValue={
          value
            ? {
              label: value?.nomSexo,
              value: value?.codSexo,
            }
            : null
        }
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