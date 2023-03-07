import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import axios from "axios";
import "../../componentes/Empleado/Empleado.css";
import Select from "react-select";

const url = "http://localhost:8001/nacionalidad/listarNacionalidades";
function Nacionalidades({ name, handleChangeData, value = null }) {
  const [data, setData] = useState([]);

  const getNacionalidades = async () => {
    await axios.get(url).then((response) => {
      setData(response.data);
    });
  };
  useEffect(() => {
    getNacionalidades();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: { name, value: { id: value, nombre: label } },
    });
  };
  return (
    <div className="Nacionalidades">
      <Select
        defaultValue={
          value
            ? {
                label: value?.nombre,
                value: value?.id,
              }
            : null
        }
        options={data.map((docu) => ({
          label: docu.nombre,
          value: docu.id,
        }))}
        onChange={handleChange}
        placeholder="Seleccione Nacionalidad"
      />
    </div>
  );
}

export default Nacionalidades;
