import React, { useEffect, useState } from "react";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../../../node_modules/bootstrap/scss/bootstrap.scss";
import axios from "axios";
import "./Empleado.css";
import Select from "react-select";

const url = "http://localhost:8001/genero/listarGenero";

function GeneroEmpleado({ name, handleChangeData ,value=null }) {

  const [data, setData] = useState([]);

  const getGeneroEmpleado = async () => {
    await axios.get(url).then((response) => {
      setData(response.data);
    });
  };
  
  useEffect(() => {
    getGeneroEmpleado();
  }, []);

  const handleChange = ({ label, value }) => {
    handleChangeData({
      target: { name, value: { idSexoBio: value, sexoBio: label } },
    });
  };

  return (
    <div className="GeneroEmpleado">
      <Select
      defaultValue={value?{
        label: value?.sexoBio,
        value: value?.idSexoBio,
      }:null}
        options={data.map((docu) => ({
          label: docu.sexoBio,
          value: docu.idSexoBio,
        }))}
        onChange={handleChange}
        placeholder="seleccione Tipo Genero"
      />
    </div>
  );
}

export default GeneroEmpleado;
